'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Home, LogIn } from 'lucide-react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please contact support.'
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.'
      case 'Verification':
        return 'The verification token has expired or has already been used.'
      case 'OAuthSignin':
        return 'Error occurred while constructing an authorization URL.'
      case 'OAuthCallback':
        return 'Error occurred while handling the OAuth callback.'
      case 'OAuthCreateAccount':
        return 'Could not create OAuth provider user in the database.'
      case 'EmailCreateAccount':
        return 'Could not create email provider user in the database.'
      case 'Callback':
        return 'Error occurred in the OAuth callback handler route.'
      case 'OAuthAccountNotLinked':
        return 'An account with this email already exists. Please sign in with your original method.'
      case 'EmailSignin':
        return 'The email could not be sent.'
      case 'CredentialsSignin':
        return 'Invalid email or password. Please check your credentials and try again.'
      case 'SessionRequired':
        return 'Please sign in to access this page.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>
            We encountered an issue while signing you in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {getErrorMessage(error)}
            </AlertDescription>
          </Alert>
          
          {error === 'OAuthAccountNotLinked' && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Tip:</strong> If you previously signed up with email and password, 
                please use those credentials to sign in. If you signed up with Google, 
                please continue using Google sign-in.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" />
              Try Again
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <p className="text-sm text-center text-muted-foreground mt-4">
            Need help?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}