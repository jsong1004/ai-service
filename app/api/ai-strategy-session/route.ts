import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import firestore from '@/lib/firestore'
import { AIStrategySessionFormData } from '@/types'
import transporter from '@/lib/nodemailer'

export async function POST(request: Request) {
  try {
    const formData: AIStrategySessionFormData = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      industry,
      teamSize,
      topPriorities,
      message, 
      preferredDate, 
      preferredTime 
    } = formData

    const formattedDate = format(new Date(preferredDate), "MMMM do, yyyy")
    
    const formattedTime = 
      preferredTime === "morning" 
        ? "Morning (9am-12pm)" 
        : preferredTime === "afternoon" 
          ? "Afternoon (12pm-5pm)" 
          : "Evening (5pm-8pm)"

    try {
      await firestore.collection('AI-Strategy-Session-registrations').add({
        name,
        email,
        phone: phone || null,
        company,
        industry,
        teamSize,
        topPriorities,
        message: message || null,
        preferredDate: new Date(preferredDate),
        preferredTime,
        preferredContact: 'email', 
        submittedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
    
    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'jsong@koreatous.com',
      subject: `AI Strategy Session Request from ${name} - ${company}`,
      html: `
        <h2>New AI Strategy Session Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Team Size:</strong> ${teamSize}</p>
        <p><strong>Top Priorities:</strong> ${topPriorities}</p>
        <p><strong>Preferred Date:</strong> ${formattedDate}</p>
        <p><strong>Preferred Time:</strong> ${formattedTime}</p>
        <h3>Additional Comments:</h3>
        <p>${message ? message.replace(/\n/g, "<br>") : "None"}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We've Received Your AI Strategy Session Request",
      html: `
        <h2>Thank you for your request, ${name}!</h2>
        <p>We've received your request for a Free AI Strategy Session and will get back to you within 24 hours to confirm your appointment.</p>
        
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Preferred Date:</strong> ${formattedDate}</li>
          <li><strong>Preferred Time:</strong> ${formattedTime}</li>
        </ul>
        
        <p>If you have any questions, please reply to this email.</p>
        
        <p>Best regards,<br>The AI Biz Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending AI strategy session email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
