import { NextResponse } from 'next/server'
import firestore from '@/lib/firestore'
import transporter from '@/lib/nodemailer'

interface ServiceRequestFormData {
  name: string
  email: string
  phone?: string
  company: string
  serviceInterest: string
  serviceDetail: string
}

export async function POST(request: Request) {
  try {
    const formData: ServiceRequestFormData = await request.json()
    const { name, email, phone, company, serviceInterest, serviceDetail } = formData

    // Save service request to Firestore
    try {
      await firestore.collection('Service-requests').add({
        name,
        email,
        phone: phone || null,
        company,
        serviceInterest,
        serviceDetail,
        submittedAt: new Date()
      })
    } catch (dbError) {
      console.error('Firestore error:', dbError)
    }

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `Service Request from ${name} - ${serviceInterest}`,
      html: `
        <h2>New Service Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service Interest:</strong> ${serviceInterest}</p>
        <h3>Details:</h3>
        <p>${serviceDetail.replace(/\n/g, "<br>")}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We've Received Your Service Request",
      html: `
        <h2>Thank you for your service request, ${name}!</h2>
        <p>We have received your request regarding "${serviceInterest}". Our team will review it and get back to you within 24 hours.</p>
        <p>Best regards,<br>The AI Biz Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending service request email:', error)
    return NextResponse.json(
      { error: 'Failed to send service request email' },
      { status: 500 }
    )
  }
} 