"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SuccessMessage } from "@/components/ui/success-message"
import { FormCard } from "@/components/ui/form-card"
import { LoadingButton } from "@/components/ui/loading-button"
import { FormError } from "@/components/ui/form-error"
import { apiRequest } from "@/lib/api-utils"
import { ApiResponse, OnsiteSeminarFormData, FormProps } from "@/types"

export default function OnsiteSeminarForm({ onSuccess }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<OnsiteSeminarFormData>({
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
    setError(null)
    
    try {
      await apiRequest<OnsiteSeminarFormData, ApiResponse>('/api/onsite-seminar', 'POST', formData)
      
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
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request. Please try again or contact us directly.")
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
      description="Bring our AI expertise to your company! Fill out this form to request an on-site seminar tailored to your team's needs and schedule. Free only when the seminar takes in the Greater Seattle area; otherwise, travel expense will be charged."
    >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormError error={error} />
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

          <LoadingButton 
            type="submit" 
            className="w-full" 
            size="lg"
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Submit Request
          </LoadingButton>

          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will not share your information. For any questions, 
            please contact us at info@koreatous.com
          </p>
        </form>
    </FormCard>
  )
} 