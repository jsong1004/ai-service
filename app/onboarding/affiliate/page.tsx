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
import { Users, ArrowLeft, CheckCircle } from 'lucide-react'

export default function AffiliateOnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    company: '',
    phone: '',
    expertise: '',
    linkedIn: '',
    marketingExperience: '',
    targetIndustries: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    website: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'affiliate',
          company: formData.company,
          phone: formData.phone,
          expertise: formData.expertise,
          linkedIn: formData.linkedIn,
          marketingExperience: formData.marketingExperience,
          targetIndustries: formData.targetIndustries,
          twitter: formData.twitter,
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube,
          tiktok: formData.tiktok,
          website: formData.website,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete profile')
      }

      // Redirect to affiliate dashboard
      router.push('/dashboard/affiliate')
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
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Welcome, Affiliate Partner!</CardTitle>
              <CardDescription>
                Complete your affiliate profile to start earning commissions
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Benefits Section */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              What you'll get as an affiliate partner:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">10% commission on all referrals</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">Marketing materials & resources</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">Real-time performance tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">Dedicated affiliate support</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your company or personal brand"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertise">Your Background & Expertise <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Textarea
                id="expertise"
                name="expertise"
                placeholder="Tell us about your professional background, network, and areas of expertise that would help you succeed as an affiliate..."
                value={formData.expertise}
                onChange={handleInputChange}
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetIndustries">Target Industries <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Textarea
                id="targetIndustries"
                name="targetIndustries"
                placeholder="Which industries or types of businesses do you have the best connections with? (e.g., healthcare, finance, e-commerce, manufacturing)"
                value={formData.targetIndustries}
                onChange={handleInputChange}
                rows={2}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketingExperience">Marketing Experience <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Textarea
                id="marketingExperience"
                name="marketingExperience"
                placeholder="Do you have experience with digital marketing, sales, or business development? Any relevant skills or tools you use?"
                value={formData.marketingExperience}
                onChange={handleInputChange}
                rows={2}
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
              <p className="text-xs text-muted-foreground">
                Help us understand your professional network
              </p>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label className="text-base font-semibold">Social Media Profiles</Label>
                <span className="text-muted-foreground text-xs">(Optional)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your social media profiles to help us understand your reach and audience
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Personal/Business Website</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter/X Profile</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    placeholder="https://twitter.com/yourusername"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook Profile/Page</Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    placeholder="https://facebook.com/yourprofile"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Profile</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    placeholder="https://instagram.com/yourusername"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube Channel</Label>
                  <Input
                    id="youtube"
                    name="youtube"
                    placeholder="https://youtube.com/@yourchannel"
                    value={formData.youtube}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok Profile</Label>
                  <Input
                    id="tiktok"
                    name="tiktok"
                    placeholder="https://tiktok.com/@yourusername"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Setting up your affiliate account...' : 'Complete Affiliate Setup'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions?{' '}
              <a href="/contact" className="text-primary hover:underline">
                Contact our affiliate team
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}