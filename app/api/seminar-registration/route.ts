import { NextResponse } from 'next/server'
import ical from 'ical-generator'
import firestore from '@/lib/firestore'
import transporter from '@/lib/nodemailer'

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

// Create calendar event
const cal = ical({ name: 'Free AI Seminar' });

const event = cal.createEvent({
  start: new Date('2024-09-10T14:00:00.000Z'),
  end: new Date('2024-09-10T15:00:00.000Z'),
  summary: 'AI Business Automation Seminar',
  description: 'Join us for a free seminar on AI business automation.',
  location: 'Online',
  url: 'https://www.ai-biz.app',
  organizer: {
    name: 'AI Biz Team',
    email: process.env.EMAIL_USER!,
  },
});


export async function POST(request: Request) {
  try {
    const formData: SeminarFormData = await request.json()
    const { firstName, lastName, email, experienceLevel, currentTools, learningGoals } = formData
    const name = `${firstName} ${lastName}`

    // Save registration to Firestore
    try {
      const docRef = await firestore.collection('seminar-registrations').add({
        firstName,
        lastName,
        email,
        experienceLevel,
        currentTools,
        learningGoals,
        registeredAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    // Create attendee list for calendar invite
    const attendees: AttendeeInfo[] = [{ name, email }];
    event.attendees(attendees);
    const calendarData = cal.toString();

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Seminar Registration: ${name}`,
      html: `
        <h2>New Seminar Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Current Tools:</strong> ${currentTools}</p>
        <p><strong>Learning Goals:</strong></p>
        <p>${learningGoals.replace(/\n/g, "<br>")}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "You're Registered for the Free AI Seminar!",
      html: `
        <h2>Thank you for registering, ${firstName}!</h2>
        <p>You're all set for the "AI Business Automation Seminar" on <strong>September 10, 2024, at 2:00 PM UTC</strong>.</p>
        <p>A calendar invitation has been sent to your email. Please accept it to add the event to your calendar.</p>
        <p>We look forward to seeing you there!</p>
      `,
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: calendarData,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json(
      { error: 'Failed to send registration emails' },
      { status: 500 }
    )
  }
} 