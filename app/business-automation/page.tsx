import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BusinessAutomationPage() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Business Automation: Your Business, Automated</h1>
            <div className="h-1 w-16 bg-indigo-500 rounded mb-6 mx-auto" />
            <p className="text-center text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto">
              We Build the Future of Your Operations
            </p>
            <p className="text-center text-lg text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
              Every business is unique. Your automation solutions should be too. Our custom automation service delivers bespoke AI-powered systems that transform how you work, think, and grow.
            </p>
          </section>

          {/* Our Development Process */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Discovery & Strategy</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">We dive deep into your current processes, pain points, and growth objectives to identify the highest-impact automation opportunities.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-4">🏗️</div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Custom Architecture</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">No cookie-cutter solutions. We design automation workflows specifically for your business logic, data structures, and operational requirements.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Iterative Development</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">We build in phases, getting your feedback at each stage to ensure the final solution exceeds your expectations.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Comprehensive Training</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Your team learns not just how to use the system, but how to maintain, troubleshoot, and evolve it as your business grows.</p>
              </div>
            </div>
          </section>

          {/* What We Build */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">What We Build</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">📄</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Intelligent Document Processing</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Automatically extract, categorize, and route information from contracts, invoices, applications, and other business documents.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🤖</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Customer Service Automation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">AI-powered chatbots and support systems that handle routine inquiries while escalating complex issues to human agents.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">💼</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Sales Process Optimization</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Lead qualification, follow-up automation, and proposal generation systems that keep your pipeline flowing.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">⚙️</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Operations Management</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Inventory tracking, supply chain optimization, and quality control systems that reduce manual oversight.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">💰</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Financial Process Automation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Expense processing, financial reporting, and compliance monitoring systems that ensure accuracy and save time.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">📊</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Data Analysis & Reporting</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Automated insights generation that turns your business data into actionable intelligence.</p>
              </div>
            </div>
          </section>

          {/* Our Technology Stack */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Technology Stack</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">🧠</span>
                    <span className="text-gray-700 dark:text-gray-300">Advanced AI models (GPT-4, Claude, custom models)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">🔗</span>
                    <span className="text-gray-700 dark:text-gray-300">Integration APIs for popular business tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">☁️</span>
                    <span className="text-gray-700 dark:text-gray-300">Cloud-based deployment with enterprise security</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">📈</span>
                    <span className="text-gray-700 dark:text-gray-300">Real-time monitoring and performance optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">🚀</span>
                    <span className="text-gray-700 dark:text-gray-300">Scalable architecture that grows with your business</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Training & Knowledge Transfer */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Training & Knowledge Transfer</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-semibold mb-2">System Documentation</h3>
                  <p className="text-sm opacity-90">Comprehensive guides for all features</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎥</div>
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm opacity-90">Step-by-step training for all user roles</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="font-semibold mb-2">Hands-on Training</h3>
                  <p className="text-sm opacity-90">Interactive sessions for your team</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔧</div>
                  <h3 className="font-semibold mb-2">Admin Training</h3>
                  <p className="text-sm opacity-90">System management and maintenance</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <h3 className="font-semibold mb-2">Best Practices</h3>
                  <p className="text-sm opacity-90">Ongoing optimization guide</p>
                </div>
              </div>
            </div>
          </section>

          {/* 90-Day Success Guarantee */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl p-8 text-center shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">90-Day Success Guarantee</h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                We're so confident in our solutions that we guarantee measurable improvement in your targeted processes within 90 days, or we'll continue working at no additional cost until you achieve your goals.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Automate Your Business Operations?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Transform your business with custom AI automation solutions designed specifically for your needs. 
                Contact us today to discuss your automation opportunities.
              </p>
              <a 
                href="mailto:info@koreatous.com" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Your Automation Journey
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 