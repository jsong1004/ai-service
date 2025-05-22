import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import ical from 'ical-generator'

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

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

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

export async function POST(request: Request) {
  try {
    const formData: SeminarFormData = await request.json()
    const { firstName, lastName, email, experienceLevel, currentTools, learningGoals } = formData

    // Create calendar events
    const adminCalendar = createCalendarEvent({
      name: 'Jaehee Song',
      email: 'jsong@koreatous.com'
    })
    const userCalendar = createCalendarEvent({
      name: `${firstName} ${lastName}`,
      email: email
    })

    // Email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'jsong@koreatous.com',
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
        filename: 'seminar.ics',
        content: adminCalendar
      }]
    }

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
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
        <p>Best regards,<br>The KoreaToUS Team</p>
      `,
      attachments: [{
        filename: 'seminar.ics',
        content: userCalendar
      }]
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json(
      { error: 'Failed to send registration emails' },
      { status: 500 }
    )
  }
} 