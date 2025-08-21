'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SignInButton } from "@/components/auth/signin-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // User is already signed in, redirect them appropriately
      if (session.user.profileComplete) {
        // Profile is complete, redirect to role-specific dashboard
        if (session.user.role === 'affiliate') {
          router.push('/dashboard/affiliate')
        } else if (session.user.role === 'client') {
          router.push('/dashboard/client')
        } else {
          router.push('/dashboard')
        }
      } else {
        // Profile is not complete, redirect to onboarding
        router.push('/onboarding')
      }
    }
  }, [session, status, router])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, show a different message while redirecting
  if (status === 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show sign-in form for unauthenticated users
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInButton />
          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
