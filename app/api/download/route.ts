import { NextResponse } from 'next/server'
import transporter from '@/lib/nodemailer'
import firestore from '@/lib/firestore'
import { format } from 'date-fns'
import { DownloadFormData } from '@/types'

export async function POST(request: Request) {
  try {
    const formData: DownloadFormData = await request.json()
    const { name, email, linkedinProfile } = formData

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Save to Firestore
    try {
      await firestore.collection('download-requests').add({
        name,
        email,
        linkedinProfile: linkedinProfile || null,
        submittedAt: new Date(),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (dbError) {
      console.error('Firestore error:', dbError)
      // Continue with email sending even if DB save fails
    }

    // Generate a unique download link (you can customize this)
    const downloadLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ai-biz.app'}/downloads/ai-automation-guide.pdf`
    
    // Email to user with download link
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Download Link - AI Automation Guide",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Thank you for your interest, ${name}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We're excited to share our comprehensive AI Automation Guide with you. This resource contains valuable insights and practical strategies to help your business leverage AI automation effectively.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Your Download Link:</h3>
            <a href="${downloadLink}" 
               style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Download AI Automation Guide
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <strong>What's included in this guide:</strong>
          </p>
          <ul style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <li>AI readiness assessment framework</li>
            <li>Step-by-step implementation strategies</li>
            <li>Common pitfalls and how to avoid them</li>
            <li>ROI calculation templates</li>
            <li>Case studies and success stories</li>
          </ul>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions about implementing AI automation in your business, feel free to reach out to us at <a href="mailto:info@koreatous.com" style="color: #007bff;">info@koreatous.com</a>.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Best regards,<br>
            <strong>The AI Biz Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            This email was sent to ${email}. If you didn't request this download, please ignore this email.
          </p>
        </div>
      `,
    })

    // Optional: Send notification email to admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Download Request from ${name}`,
        html: `
          <h3>New Download Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>LinkedIn Profile:</strong> ${linkedinProfile || 'Not provided'}</p>
          <p><strong>Date:</strong> ${format(new Date(), "MMMM do, yyyy 'at' h:mm a")}</p>
          <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || 'unknown'}</p>
        `,
      })
    } catch (adminEmailError) {
      console.error('Failed to send admin notification:', adminEmailError)
      // Don't fail the request if admin email fails
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in download endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to process download request.' },
      { status: 500 }
    )
  }
}
