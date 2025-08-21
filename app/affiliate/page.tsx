import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, DollarSign, Users, TrendingUp, ArrowRight, Star, Target, Zap } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Affiliate Program | AI Business Automation',
  description: 'Join our affiliate program and earn commissions by referring clients to our AI business automation services. Start earning today!',
  keywords: ['affiliate program', 'AI consulting', 'commission', 'referral program', 'business automation'],
}

export default function AffiliatePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                <Star className="w-3 h-3 mr-1" />
                Join Our Affiliate Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Earn Commissions by Referring
                <span className="block text-blue-200">AI Business Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Help businesses transform with AI automation and earn up to <span className="font-bold text-yellow-300">10% commission</span> on every successful referral
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                  <Link href="/auth/signup?role=affiliate">
                    <Users className="w-4 h-4 mr-2" />
                    Become an Affiliate
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm" asChild>
                  <Link href="/auth/signin">
                    Sign In to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Affiliate Program Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple 4-step process to start earning commissions with our AI business automation services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">1. Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Create your affiliate account and get your unique referral link and tracking tools
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">2. Find Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Identify businesses that could benefit from AI automation and introduce our services
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">3. Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monitor your leads through our dashboard and track conversion progress
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl">4. Earn Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get paid when your referrals become clients and complete projects
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Commission Structure Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Commission Structure</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Earn competitive commissions on all our AI business automation services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">AI Workshops</CardTitle>
                  <CardDescription>$200/hour sessions</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10% Commission</div>
                  <p className="text-gray-600 mb-4">$20 per hour earned</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Hands-on AI implementation</li>
                    <li>• Business process optimization</li>
                    <li>• Team training sessions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg border-blue-200">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">AI Automation Build</CardTitle>
                  <CardDescription>$300/hour development</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">10% Commission</div>
                  <p className="text-gray-600 mb-4">$30 per hour earned</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Custom AI solutions</li>
                    <li>• Workflow automation</li>
                    <li>• System integration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Managed Services</CardTitle>
                  <CardDescription>$1000/project</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10% Commission</div>
                  <p className="text-gray-600 mb-4">$100 per project earned</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• End-to-end project management</li>
                    <li>• Ongoing support</li>
                    <li>• Performance monitoring</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join Our Affiliate Program?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">High Commission Rates</h3>
                      <p className="text-gray-600">Earn 10% commission on all successful referrals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Recurring Income</h3>
                      <p className="text-gray-600">Earn commissions on ongoing managed services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Professional Support</h3>
                      <p className="text-gray-600">Get marketing materials and sales support</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Real-time Tracking</h3>
                      <p className="text-gray-600">Monitor your leads and earnings in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Flexible Payment</h3>
                      <p className="text-gray-600">Get paid via bank transfer, PayPal, or check</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Perfect For:</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Business consultants and advisors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>IT professionals and agencies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Digital marketers and sales professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Business owners with industry connections</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Anyone with business network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get Started Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Get Started</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start earning commissions in just a few simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 1: Sign Up</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Create your affiliate account by clicking the sign-up button below. Choose "Affiliate Partner" as your role during registration.
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/auth/signup?role=affiliate">
                        <Users className="w-4 h-4 mr-2" />
                        Sign Up as Affiliate
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 2: Complete Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Fill out your profile with company details and payment information. This helps us process your commissions efficiently.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/onboarding">
                        Complete Profile
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 3: Find Leads</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Identify businesses in your network that could benefit from AI automation. Look for companies struggling with manual processes.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/negotiations">
                        Add New Lead
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 4: Track & Earn</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Monitor your leads through the dashboard and track conversions. Earn commissions when your referrals become clients.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard">
                        View Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join our affiliate program today and start earning commissions by helping businesses transform with AI automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/auth/signup?role=affiliate">
                  <Users className="w-4 h-4 mr-2" />
                  Become an Affiliate
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm" asChild>
                <Link href="/auth/signin">
                  Sign In to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
