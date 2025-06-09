import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import ical from 'ical-generator'
import firestore from '@/lib/firestore'

interface SeminarFormData {
  firstName: string
  lastName: string
  email: string
  experienceLevel: string
  currentTools: string
  learningGoals: string
}

interface AttendeeInfo {
  name: string
  email: string
}

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

// Create calendar event
const createCalendarEvent = (attendee: AttendeeInfo) => {
  const calendar = ical({ name: 'AI Seminar Registration' })
  
  const event = calendar.createEvent({
    start: new Date('2025-06-16T11:00:00-07:00'), // 11 AM Pacific Time
    end: new Date('2025-06-16T12:00:00-07:00'),   // 12 PM Pacific Time
    summary: 'Free AI Seminar',
    description: 'Join us for an insightful session where you\'ll learn about AI overview, current applications, future trends, and practical implementation strategies.',
    location: 'Virtual Event (Zoom)',
    organizer: {
      name: 'KoreaToUS Team',
      email: 'info@koreatous.com'
    },
    attendees: [
      {
        name: attendee.name,
        email: attendee.email
      }
    ]
  })

  return calendar.toString()
}

// Validate form data
function validateFormData(data: any): data is SeminarFormData {
  const requiredFields = ['firstName', 'lastName', 'email', 'experienceLevel']
  return requiredFields.every(field => 
    typeof data[field] === 'string' && data[field].trim().length > 0
  ) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
}

export async function POST(request: Request) {
  try {
    // Check if environment variables are available
    if (!process.env.SENDGRID_API_KEY || !process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      )
    }

    const formData = await request.json()
    
    // Validate form data
    if (!validateFormData(formData)) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check all required fields.' },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, experienceLevel, currentTools, learningGoals } = formData
    const adminCalendar = createCalendarEvent({ name: 'Jaehee Song', email: 'jsong@koreatous.com' })
    const userCalendar = createCalendarEvent({ name: `${firstName} ${lastName}`, email })

    // Save registration to Firestore
    try {
      console.log('Attempting to save to Firestore...')
      const docRef = await firestore.collection('seminar-registrations').add({
        firstName,
        lastName,
        email,
        experienceLevel,
        currentTools,
        learningGoals,
        registeredAt: new Date()
      })
      console.log('Document written with ID:', docRef.id)
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError)
      // Continue with email sending even if Firestore fails
    }

    // Email to admin
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!,
      from: process.env.ADMIN_EMAIL!,
      subject: 'Request for Free Seminar',
      html: `
        <h2>New Seminar Registration</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Current Tools:</strong> ${currentTools}</p>
        <p><strong>Learning Goals:</strong> ${learningGoals}</p>
        <p><strong>Seminar Details:</strong></p>
        <ul>
          <li>Date: June 16, 2025</li>
          <li>Time: 11:00 AM Pacific Time</li>
          <li>Duration: 1 Hour</li>
          <li>Format: Virtual Event</li>
        </ul>
      `,
      attachments: [{
        content: Buffer.from(adminCalendar).toString('base64'),
        filename: 'seminar.ics',
        type: 'text/calendar',
        disposition: 'attachment',
      }],
    })

    // Confirmation email to user
    await sgMail.send({
      to: email,
      from: process.env.ADMIN_EMAIL!,
      subject: 'Confirmation: Free AI Seminar Registration',
      html: `
        <h2>Thank you for registering for our Free AI Seminar!</h2>
        <p>Dear ${firstName},</p>
        <p>We're excited to have you join our upcoming AI seminar. Here's a confirmation of your registration details:</p>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Experience Level:</strong> ${experienceLevel}</li>
        </ul>
        <h3>Seminar Details:</h3>
        <ul>
          <li><strong>Date:</strong> June 16, 2025</li>
          <li><strong>Time:</strong> 11:00 AM Pacific Time</li>
          <li><strong>Duration:</strong> 1 Hour</li>
          <li><strong>Format:</strong> Virtual Event</li>
        </ul>
        <p>We've attached a calendar invitation to this email. Please add it to your calendar to ensure you don't miss the event.</p>
        <p>We'll send you the Zoom meeting link and additional materials 24 hours before the event.</p>
        <p>If you have any questions, please don't hesitate to contact us at info@koreatous.com</p>
        <p>Best regards,<br>The AI Biz Team</p>
      `,
      attachments: [{
        content: Buffer.from(userCalendar).toString('base64'),
        filename: 'seminar.ics',
        type: 'text/calendar',
        disposition: 'attachment',
      }],
    })

    return NextResponse.json({ 
      success: true,
      message: 'Registration successful'
    })
  } catch (error) {
    console.error('Error processing registration:', error)
    
    // Determine the appropriate error message and status code
    let errorMessage = 'An unexpected error occurred'
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes('SendGrid')) {
        errorMessage = 'Failed to send confirmation email'
      } else if (error.message.includes('Firestore')) {
        errorMessage = 'Failed to save registration'
      }
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage 
      },
      { status: statusCode }
    )
  }
} 