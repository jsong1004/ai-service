import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ManagedServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Managed Services: We Run Your AI Operations</h1>
            <div className="h-1 w-16 bg-indigo-500 rounded mb-6 mx-auto" />
            <p className="text-center text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto">
              Focus on Your Business While We Handle the Technology
            </p>
            <p className="text-center text-lg text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
              Your automation systems are working hard for your business. Let us work hard for your automation systems. Our managed services ensure your AI operations run smoothly, efficiently, and securely 24/7.
            </p>
          </section>

          {/* Complete Operational Management */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Complete Operational Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">📊</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Daily Operations Monitoring</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Real-time system health checks, performance optimization, and proactive issue resolution before they impact your business.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🔄</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Continuous Improvement</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Regular analysis of system performance with recommendations and implementation of enhancements to increase efficiency and capability.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🔒</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Security & Compliance</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Ongoing security updates, compliance monitoring, and data protection measures to keep your systems safe and regulation-compliant.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">📈</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Capacity Planning</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Monitoring usage patterns and scaling resources to ensure optimal performance as your business grows.</p>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">What's Included</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">24/7 System Monitoring</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Real-time performance tracking</li>
                  <li>• Automated alert systems</li>
                  <li>• Immediate response to critical issues</li>
                  <li>• Detailed uptime and performance reporting</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Regular Maintenance</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Software updates and patches</li>
                  <li>• Security improvements</li>
                  <li>• Performance tuning</li>
                  <li>• Database optimization</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Bug Fixes & Troubleshooting</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Rapid response to system issues</li>
                  <li>• Root cause analysis</li>
                  <li>• Permanent fixes, not just patches</li>
                  <li>• User support for system-related questions</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Feature Enhancement</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Monthly capability reviews</li>
                  <li>• New feature development based on your evolving needs</li>
                  <li>• Integration with new tools and platforms</li>
                  <li>• Workflow optimization recommendations</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900 dark:to-amber-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Comprehensive Reporting</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Monthly performance reports</li>
                  <li>• Usage analytics and insights</li>
                  <li>• Cost optimization recommendations</li>
                  <li>• ROI tracking and analysis</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Levels */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Service Levels</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Essential</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Core monitoring and maintenance for stable, established systems</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Business hours support (8am-6pm, Mon-Fri)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Monthly performance reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Standard maintenance and updates</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg p-6 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">POPULAR</span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Professional</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Enhanced support for mission-critical systems</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Extended support hours (6am-10pm, Mon-Fri)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Priority response times</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Bi-weekly optimization reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Quarterly strategy consultations</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Enterprise</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Premium support for complex, high-volume operations</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>24/7 support and monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Weekly performance reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Monthly strategy sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>Custom integrations and features</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Client Success Stories */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Client Success Stories</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white shadow-lg">
              <p className="text-center text-lg mb-8">Our managed services clients typically see:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-sm opacity-90">System Uptime</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">40%</div>
                  <div className="text-sm opacity-90">Improvement in Process Efficiency</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">60%</div>
                  <div className="text-sm opacity-90">Reduction in Manual Intervention</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">200%</div>
                  <div className="text-sm opacity-90">ROI on Managed Services</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Let Us Manage Your AI Operations?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Focus on growing your business while we ensure your AI systems run flawlessly. 
                Contact us to discuss which service level is right for your operations.
              </p>
              <a 
                href="mailto:info@koreatous.com" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Managed Services
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 