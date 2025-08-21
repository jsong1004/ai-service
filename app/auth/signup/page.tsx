'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Building2, ArrowRight, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join Our Platform</h1>
          <p className="text-muted-foreground">Choose how you'd like to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Affiliate Sign Up Card */}
          <Card className="relative hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/auth/signup/affiliate')}>
            <div className="absolute top-4 right-4">
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Earn Commissions
              </div>
            </div>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Sign up as Affiliate</CardTitle>
              <CardDescription className="mt-2">
                Partner with us and earn commissions by referring clients to our AI automation services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm">Earn competitive commission rates</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm">Access to marketing materials</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm">Real-time performance tracking</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-sm">Dedicated affiliate support</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group">
                Get Started as Affiliate
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>

          {/* Client Sign Up Card */}
          <Card className="relative hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/auth/signup/client')}>
            <div className="absolute top-4 right-4">
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Transform Your Business
              </div>
            </div>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Sign up as Client</CardTitle>
              <CardDescription className="mt-2">
                Access cutting-edge AI automation services to transform your business operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm">Custom AI solutions for your business</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm">Expert consultation and support</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm">Comprehensive training programs</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm">Ongoing maintenance and updates</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group" variant="default">
                Get Started as Client
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}