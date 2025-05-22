"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { SuccessMessage } from "@/components/ui/success-message"
import { FormCard } from "@/components/ui/form-card"

interface OnsiteSeminarFormProps {
  onSuccess?: () => void
}

export default function OnsiteSeminarForm({ onSuccess }: OnsiteSeminarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    attendanceCount: "",
    preferredDate: "",
    additionalNotes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/onsite-seminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit request')
      }
      
      // Set success state instead of closing immediately
      setIsSuccess(true)
      
      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        attendanceCount: "",
        preferredDate: "",
        additionalNotes: ""
      })
      
      // Close the form after a delay to show success message
      setTimeout(() => {
        onSuccess?.()
      }, 3000)
    } catch (error) {
      console.error("On-site seminar request error:", error)
      toast.error("Failed to submit request. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state UI
  if (isSuccess) {
    return (
      <SuccessMessage
        title="Request Sent Successfully!"
        message="Thank you for your interest in our on-site AI seminar. We'll review your request and contact you within 2 business days."
        showClosingMessage={true}
      />
    )
  }

  // Regular form UI
  return (
    <FormCard 
      title="Request On-site AI Seminar"
      description="Bring our AI expertise to your company! Fill out this form to request an on-site seminar tailored to your team's needs and schedule."
    >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendanceCount">Expected Number of Attendees *</Label>
              <Input
                id="attendanceCount"
                type="number"
                min="1"
                required
                value={formData.attendanceCount}
                onChange={(e) => setFormData({ ...formData, attendanceCount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date (Optional)</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes or Requirements</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Please let us know if you have any specific requirements or topics you'd like to focus on."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            Submit Request
          </Button>

          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will not share your information. For any questions, 
            please contact us at info@koreatous.com
          </p>
        </form>
    </FormCard>
  )
} 