"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { CalendarDays, Clock } from "lucide-react"

interface SeminarRegistrationFormProps {
  onSuccess?: () => void
}

export default function SeminarRegistrationForm({ onSuccess }: SeminarRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
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
    
    try {
      const response = await fetch('/api/seminar-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

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
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        }
      }, 3000)
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Registration failed. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state UI
  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Thank you for registering for our free AI seminar. Please check your email for the confirmation and calendar invitation.
            </p>
            <p className="text-sm text-gray-500">Closing this form in 3 seconds...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Regular form UI
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register for Our Free Seminar on AI!</CardTitle>
        <CardDescription className="space-y-4">
          <p>
            Join us for an insightful session where you'll learn about AI overview, current applications, 
            future trends, and practical implementation strategies. Whether you're new to AI or looking to 
            expand your knowledge, this seminar is for you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>June 16, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>11:00 AM Pacific Time</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
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

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Now"}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will not share your information. For any questions, 
            please contact us at info@koreatous.com
          </p>
        </form>
      </CardContent>
    </Card>
  )
} 