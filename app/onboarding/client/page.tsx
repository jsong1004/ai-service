'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ClientOnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    company: '',
    department: '',
    title: '',
    phone: '',
    companyWebsite: '',
    linkedIn: '',
    industry: '',
    companySize: '',
    businessChallenges: '',
    aiExperience: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Redirect if not authenticated or profile already complete
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.profileComplete) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate required fields for clients
    if (!formData.company || !formData.title || !formData.phone) {
      setError('Please fill in all required fields (Company Name, Job Title, and Phone Number).')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'client',
          company: formData.company,
          department: formData.department,
          title: formData.title,
          phone: formData.phone,
          companyWebsite: formData.companyWebsite,
          linkedIn: formData.linkedIn,
          industry: formData.industry,
          companySize: formData.companySize,
          businessChallenges: formData.businessChallenges,
          aiExperience: formData.aiExperience,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete profile')
      }

      // Redirect to client dashboard
      router.push('/dashboard/client')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/onboarding')}
              className="hover:bg-transparent pl-0"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Welcome, Business Client!</CardTitle>
              <CardDescription>
                Complete your business profile to access AI automation services
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Benefits Section */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              What you'll get as a client:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Custom AI solutions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Expert consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Training programs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Ongoing support</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Required Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Business Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., CTO, Director, Manager"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g., IT, Marketing, Operations"
                    value={formData.department}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    placeholder="https://yourcompany.com"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Business Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Input
                    id="linkedIn"
                    name="linkedIn"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Additional Business Context */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Details <span className="text-sm font-normal text-muted-foreground">(Optional but helpful)</span></h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={handleSelectChange('industry')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="legal">Legal Services</SelectItem>
                      <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={handleSelectChange('companySize')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                      <SelectItem value="1000+">1,000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessChallenges">Current Business Challenges</Label>
                <Textarea
                  id="businessChallenges"
                  name="businessChallenges"
                  placeholder="What specific business challenges are you looking to solve with AI automation? (e.g., manual processes, data analysis, customer service)"
                  value={formData.businessChallenges}
                  onChange={handleInputChange}
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aiExperience">AI/Automation Experience</Label>
                <Textarea
                  id="aiExperience"
                  name="aiExperience"
                  placeholder="Do you currently use any AI tools or automation in your business? What's your experience level?"
                  value={formData.aiExperience}
                  onChange={handleInputChange}
                  rows={2}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Setting up your client account...' : 'Complete Client Setup'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions?{' '}
              <a href="/contact" className="text-primary hover:underline">
                Contact our client success team
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}