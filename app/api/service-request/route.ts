import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

interface ServiceRequestFormData {
  name: string
  email: string
  phone?: string
  company: string
  serviceInterest: string
  serviceDetail: string
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  try {
    const formData: ServiceRequestFormData = await request.json()
    const { name, email, phone, company, serviceInterest, serviceDetail } = formData

    // Email to admin
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!,
      from: process.env.ADMIN_EMAIL!,
      subject: `New Service Request: ${serviceInterest}`,
      html: `
        <h2>New Service Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service Interest:</strong> ${serviceInterest}</p>
        <p><strong>Service Request Detail:</strong></p>
        <p>${serviceDetail}</p>
      `,
    })

    // Confirmation email to user
    await sgMail.send({
      to: email,
      from: process.env.ADMIN_EMAIL!,
      subject: `Confirmation: Service Request (${serviceInterest})`,
      html: `
        <h2>Thank you for your service request!</h2>
        <p>Dear ${name},</p>
        <p>We have received your request for <strong>${serviceInterest}</strong>. Our team will review your information and contact you soon.</p>
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || '-'}</li>
          <li><strong>Company:</strong> ${company}</li>
          <li><strong>Service Interest:</strong> ${serviceInterest}</li>
        </ul>
        <p><strong>Service Request Detail:</strong></p>
        <p>${serviceDetail}</p>
        <p>If you have any questions, please contact us at info@koreatous.com</p>
        <p>Best regards,<br />The AI Biz Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending service request emails:', error)
    return NextResponse.json(
      { error: 'Failed to send service request emails' },
      { status: 500 }
    )
  }
} 