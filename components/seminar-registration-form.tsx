"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CalendarDays, Clock } from "lucide-react"
import { SuccessMessage } from "@/components/ui/success-message"
import { FormCard } from "@/components/ui/form-card"
import { LoadingButton } from "@/components/ui/loading-button"
import { FormError } from "@/components/ui/form-error"
import { apiRequest } from "@/lib/api-utils"
import { ApiResponse, SeminarRegistrationFormData, FormProps } from "@/types"

export default function SeminarRegistrationForm({ onSuccess }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<SeminarRegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    experienceLevel: "",
    currentTools: "",
    learningGoals: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      await apiRequest<SeminarRegistrationFormData, ApiResponse>('/api/seminar-registration', 'POST', formData)

      // Set success state
      setIsSuccess(true)
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        experienceLevel: "",
        currentTools: "",
        learningGoals: ""
      })
      
      // Close the form after a delay to show success message
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state UI
  if (isSuccess) {
    return (
      <SuccessMessage
        title="Registration Successful!"
        message="Thank you for registering for our free AI seminar. Please check your email for the confirmation and calendar invitation."
        showClosingMessage={true}
      />
    )
  }

  // Regular form UI
  return (
    <FormCard 
      title="Register for Our Free Seminar on AI!"
      description={
        <>
          <p>
            Join us for an insightful session where you'll learn about AI overview, current applications, 
            future trends, and practical implementation strategies. Whether you're new to AI or looking to 
            expand your knowledge, this seminar is for you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>June 25, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>7:00 PM Pacific Time</span>
            </div>
          </div>
        </>
      }
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
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tell Us About Your AI Journey</h3>
            <div className="space-y-2">
              <Label>What is your current level of experience with AI?</Label>
              <RadioGroup
                value={formData.experienceLevel}
                onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner (Learning the basics)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate (Have some experience, used some tools)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced (Proficient with multiple tools/concepts)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentTools">
                Which AI tools or platforms, if any, do you currently use?
              </Label>
              <Textarea
                id="currentTools"
                placeholder="e.g., ChatGPT, Google Gemini, specific industry software, etc."
                value={formData.currentTools}
                onChange={(e) => setFormData({ ...formData, currentTools: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningGoals">What are you hoping to learn or achieve from this seminar?</Label>
              <Textarea
                id="learningGoals"
                value={formData.learningGoals}
                onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
              />
            </div>
          </div>

          <LoadingButton 
            type="submit" 
            className="w-full" 
            size="lg"
            isLoading={isSubmitting}
            loadingText="Registering..."
          >
            Register Now
          </LoadingButton>

          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will not share your information. For any questions, 
            please contact us at info@koreatous.com
          </p>
        </form>
    </FormCard>
  )
} 