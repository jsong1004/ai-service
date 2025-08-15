import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import firestore from '@/lib/firestore'
import transporter from '@/lib/nodemailer'

interface ConsultationFormData {
  name: string
  email: string
  phone?: string
  company: string
  serviceInterest: 'workshop' | 'build' | 'managed'
  message: string
  preferredContact: 'email' | 'phone'
  preferredDate: string | Date
  preferredTime: 'morning' | 'afternoon' | 'evening'
}

export async function POST(request: Request) {
  try {
    const formData: ConsultationFormData = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      serviceInterest, 
      message, 
      preferredContact,
      preferredDate, 
      preferredTime 
    } = formData

    // Format the preferred date
    const formattedDate = format(new Date(preferredDate), "MMMM do, yyyy")
    
    // Format service interest
    const formattedService = 
      serviceInterest === "workshop" 
        ? "AI Automation Workshop ($200/hour)" 
        : serviceInterest === "build" 
          ? "AI Automation Build ($500/hour)" 
          : "Managed AI Automation Service ($1000/project)"
    
    // Format preferred time
    const formattedTime = 
      preferredTime === "morning" 
        ? "Morning (9am-12pm)" 
        : preferredTime === "afternoon" 
          ? "Afternoon (12pm-5pm)" 
          : "Evening (5pm-8pm)"

    // Save registration to Firestore
    try {
      await firestore.collection('Consultation-registrations').add({
        name,
        email,
        phone: phone || null,
        company,
        serviceInterest,
        message,
        preferredContact,
        preferredDate: new Date(preferredDate),
        preferredTime,
        submittedAt: new Date()
      })
    } catch (dbError) {
      console.error('Firestore error:', dbError)
      // Decide if you want to proceed without saving to DB
    }

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `Consultation Request from ${name} - ${company}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service Interest:</strong> ${formattedService}</p>
        <p><strong>Preferred Contact Method:</strong> ${
          preferredContact === "email" ? "Email" : "Phone"
        }</p>
        <p><strong>Preferred Date:</strong> ${formattedDate}</p>
        <p><strong>Preferred Time:</strong> ${formattedTime}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We've Received Your Consultation Request",
      html: `
        <h2>Thank you for your consultation request, ${name}!</h2>
        <p>We've received your request for a consultation about our ${formattedService} service and will get back to you within 24 hours.</p>
        
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Preferred Date:</strong> ${formattedDate}</li>
          <li><strong>Preferred Time:</strong> ${formattedTime}</li>
          <li><strong>Preferred Contact Method:</strong> ${
            preferredContact === "email" ? "Email" : "Phone"
          }</li>
        </ul>
        
        <p>If you need to update any information or have any questions before our consultation, please reply to this email or contact us at info@koreatous.com.</p>
        
        <p>We look forward to discussing how we can help ${company} leverage AI automation for your business!</p>
        
        <p>Best regards,<br>The AI Biz Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in consultation endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to send consultation email.' },
      { status: 500 }
    )
  }
}