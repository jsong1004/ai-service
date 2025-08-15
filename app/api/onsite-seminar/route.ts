import { NextResponse } from 'next/server'
import transporter from '@/lib/nodemailer'

interface OnsiteSeminarFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  attendanceCount: string
  preferredDate?: string
  additionalNotes?: string
}

export async function POST(request: Request) {
  try {
    const formData: OnsiteSeminarFormData = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      companyName, 
      attendanceCount, 
      preferredDate, 
      additionalNotes 
    } = formData
    const name = `${firstName} ${lastName}`

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `On-site Seminar Request: ${companyName}`,
      html: `
        <h2>New On-site Seminar Request</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Contact Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Estimated Attendance:</strong> ${attendanceCount}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
        <h3>Additional Notes:</h3>
        <p>${additionalNotes ? additionalNotes.replace(/\n/g, "<br>") : 'None'}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We've Received Your On-site Seminar Request",
      html: `
        <h2>Thank you for your interest in our on-site seminars, ${firstName}!</h2>
        <p>We have received your request for an on-site seminar for <strong>${companyName}</strong>. Our team will review the details and get back to you shortly to discuss the next steps.</p>
        <p>Best regards,<br>The AI Biz Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send seminar request email' },
      { status: 500 }
    )
  }
}