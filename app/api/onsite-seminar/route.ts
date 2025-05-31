import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

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

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

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

    // Format the preferred date if provided
    const formattedDate = preferredDate 
      ? new Date(preferredDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) 
      : 'To be determined'

    // Email to admin
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!,
      from: process.env.ADMIN_EMAIL!,
      subject: `On-site Seminar Request from ${companyName}`,
      html: `
        <h2>New On-site Seminar Request</h2>
        <p><strong>Contact Information:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p><strong>Company Information:</strong></p>
        <ul>
          <li><strong>Company Name:</strong> ${companyName}</li>
          <li><strong>Expected Attendees:</strong> ${attendanceCount}</li>
          <li><strong>Preferred Date:</strong> ${formattedDate}</li>
        </ul>
        ${additionalNotes ? `
        <p><strong>Additional Notes:</strong></p>
        <p>${additionalNotes}</p>
        ` : ''}
      `,
    })

    // Confirmation email to user
    await sgMail.send({
      to: email,
      from: process.env.ADMIN_EMAIL!,
      subject: 'On-site Seminar Request Confirmation',
      html: `
        <h2>Thank you for your on-site seminar request!</h2>
        <p>Dear ${firstName},</p>
        <p>We've received your request for an on-site AI seminar at ${companyName}. Our team will review your request and contact you within 2 business days to discuss the details and arrange the seminar.</p>
        
        <h3>Request Details:</h3>
        <ul>
          <li><strong>Company:</strong> ${companyName}</li>
          <li><strong>Expected Attendees:</strong> ${attendanceCount}</li>
          <li><strong>Preferred Date:</strong> ${formattedDate}</li>
        </ul>
        
        <p>If you have any questions or need to update your request information, please contact us at info@koreatous.com or reply to this email.</p>
        
        <p>Best regards,<br>The AI Biz Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json(
      { error: 'Failed to send request emails' },
      { status: 500 }
    )
  }
}