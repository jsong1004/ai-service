"use server"

import { z } from "zod"
import nodemailer from "nodemailer"
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

// Create a transporter using Gmail SMTP
async function getTransporter() {
  let testAccount
  let transporter

  // Check if we have Gmail credentials in environment variables
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    // Use Gmail SMTP for production
    transporter = nodemailer.createTransport({
      service: "gmail", // Using the built-in Gmail service configuration
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // This should be an App Password, not your regular Gmail password
      },
    })

    console.log("Using Gmail SMTP server")
  } else {
    // For development, use Ethereal (fake SMTP service)
    testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    console.log("Using Ethereal test account for email")
  }

  return { transporter, testAccount }
}

export async function sendConsultationEmail(data: EmailData) {
  try {
    // Validate the data
    const validatedData = emailSchema.parse(data)

    // Format the data for email
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

    // Get the email transporter
    const { transporter, testAccount } = await getTransporter()

    // Prepare email content
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

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER || `"Consultation Form" <noreply@startupconsulting.com>`,
      to: "info@koreatous.com",
      subject: `Consultation Request from ${validatedData.name} - ${validatedData.company}`,
      html: emailContent,
      // Add a text version for email clients that don't support HTML
      text: emailContent.replace(/<[^>]*>/g, ""),
    })

    // For development, log the Ethereal URL to view the email
    if (testAccount) {
      console.log("Test email sent. Preview URL: %s", nodemailer.getTestMessageUrl(info))
      return {
        success: true,
        message: "Email sent successfully (test mode)",
        previewUrl: nodemailer.getTestMessageUrl(info),
      }
    }

    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
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

// Optional: Send a confirmation email to the user
export async function sendConfirmationEmail(userEmail: string, userName: string) {
  try {
    const { transporter, testAccount } = await getTransporter()

    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER || `"Startup Consulting Inc." <noreply@startupconsulting.com>`,
      to: userEmail,
      subject: "We've Received Your Consultation Request",
      html: `
        <h2>Thank you for your consultation request, ${userName}!</h2>
        <p>We've received your request and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our <a href="https://yourwebsite.com/resources">resources</a> to learn more about our AI automation solutions.</p>
        <p>Best regards,</p>
        <p>The Startup Consulting Team</p>
      `,
      text: `
        Thank you for your consultation request, ${userName}!
        
        We've received your request and will get back to you within 24 hours.
        
        In the meantime, feel free to explore our resources to learn more about our AI automation solutions: https://yourwebsite.com/resources
        
        Best regards,
        The Startup Consulting Team
      `,
    })

    if (testAccount) {
      console.log("Test confirmation email sent. Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
