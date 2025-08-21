'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'affiliate' | 'client'>('affiliate')
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Redirect to role-specific onboarding pages
      if (selectedRole === 'affiliate') {
        router.push('/onboarding/affiliate')
      } else {
        router.push('/onboarding/client')
      }
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
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>
            Welcome, {session?.user?.name}! Please provide a few more details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>I want to join as...</Label>
              <RadioGroup 
                value={selectedRole} 
                onValueChange={(value: any) => setSelectedRole(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="affiliate" id="affiliate" />
                  <Label htmlFor="affiliate" className="font-normal cursor-pointer">
                    <div>
                      <div className="font-medium">Affiliate Partner</div>
                      <div className="text-sm text-muted-foreground">
                        Earn 10% commission by referring clients to our AI services
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <RadioGroupItem value="client" id="client" />
                  <Label htmlFor="client" className="font-normal cursor-pointer">
                    <div>
                      <div className="font-medium">Client Company</div>
                      <div className="text-sm text-muted-foreground">
                        Access AI automation services for your business
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                After clicking "Continue", you'll be taken to a detailed form where you can provide more information about yourself and your {selectedRole === 'affiliate' ? 'marketing background' : 'business needs'}.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Redirecting...' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}