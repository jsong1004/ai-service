"use server"

import { z } from "zod"
import sgMail from '@sendgrid/mail'
import { format } from "date-fns"

// Email validation schema
const emailSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  serviceInterest: z.enum(["workshop", "build", "managed"]),
  message: z.string().min(10, "Message is required"),
  preferredContact: z.enum(["email", "phone"]),
  preferredDate: z.date(),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
})

type EmailData = z.infer<typeof emailSchema>

// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendConsultationEmail(data: EmailData) {
  try {
    const validatedData = emailSchema.parse(data)
    const formattedDate = format(validatedData.preferredDate, "MMMM do, yyyy")
    const formattedTime =
      validatedData.preferredTime === "morning"
        ? "Morning (9am-12pm)"
        : validatedData.preferredTime === "afternoon"
          ? "Afternoon (12pm-5pm)"
          : "Evening (5pm-8pm)"
    const formattedService =
      validatedData.serviceInterest === "workshop"
        ? "AI Automation Workshop"
        : validatedData.serviceInterest === "build"
          ? "AI Automation Build"
          : "Managed AI Automation Service"
    const emailContent = `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${validatedData.company}</p>
      <p><strong>Service Interest:</strong> ${formattedService}</p>
      <p><strong>Preferred Contact Method:</strong> ${
        validatedData.preferredContact === "email" ? "Email" : "Phone"
      }</p>
      <p><strong>Preferred Date:</strong> ${formattedDate}</p>
      <p><strong>Preferred Time:</strong> ${formattedTime}</p>
      <h3>Message:</h3>
      <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
    `
    // Send to admin
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!,
      from: process.env.ADMIN_EMAIL!,
      subject: `Consultation Request from ${validatedData.name} - ${validatedData.company}`,
      html: emailContent,
      text: emailContent.replace(/<[^>]*>/g, ""),
    })
    return {
      success: true,
      message: "Email sent successfully",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error",
        errors: error.errors,
      }
    }
    return {
      success: false,
      message: "Failed to send email",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function sendConfirmationEmail(userEmail: string, userName: string) {
  try {
    await sgMail.send({
      to: userEmail,
      from: process.env.ADMIN_EMAIL!,
      subject: "We've Received Your Consultation Request",
      html: `
        <h2>Thank you for your consultation request, ${userName}!</h2>
        <p>We've received your request and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our <a href="https://www.ai-biz.app/resources">resources</a> to learn more about our AI automation solutions.</p>
        <p>Best regards,</p>
        <p>The AI Biz Team</p>
      `,
      text: `Thank you for your consultation request, ${userName}!\n\nWe've received your request and will get back to you within 24 hours.\n\nIn the meantime, feel free to explore our resources to learn more about our AI automation solutions: https://www.ai-biz.app/resources\n\nBest regards,\nThe AI Biz Team`,
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
