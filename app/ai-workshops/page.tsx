import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AIWorkshopsPage() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">AI Workshops: Build Real Business Solutions</h1>
            <div className="h-1 w-16 bg-indigo-500 rounded mb-6 mx-auto" />
            <p className="text-center text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto">
              Transform Your Team with Hands-On AI Implementation
            </p>
            <p className="text-center text-lg text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
              Unlike traditional workshops that focus on theory and demos, our AI workshops are designed to deliver immediate, practical value. Your team will walk away with actual business automation solutions they've built themselves.
            </p>
          </section>

          {/* What Makes Our Workshops Different */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">What Makes Our Workshops Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🎯</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Real Business Impact</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">We don't waste time on toy projects. Every exercise is designed around your actual business processes and challenges.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🔧</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Build While You Learn</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Each participant creates functional AI automation tools that can be deployed immediately in your workflow.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">👨‍🏫</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Expert Guidance</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Our experienced practitioners provide real-time coaching as you build, ensuring you avoid common pitfalls and implement best practices.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🧠</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Lasting Knowledge</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">You'll understand not just how to use AI tools, but how to think strategically about automation opportunities in your business.</p>
              </div>
            </div>
          </section>

          {/* Workshop Formats */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Workshop Formats</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Intensive 2-Day Bootcamp</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">Deep dive into building complete automation workflows</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li><strong>Day 1:</strong> AI fundamentals and process mapping</li>
                  <li><strong>Day 2:</strong> Building and testing your custom automation solution</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Weekly 4-Session Program</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">Spread learning over a month for better retention</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li><strong>Session 1:</strong> AI strategy and opportunity identification</li>
                  <li><strong>Session 2:</strong> Tool selection and setup</li>
                  <li><strong>Session 3:</strong> Building your first automation</li>
                  <li><strong>Session 4:</strong> Testing, refinement, and deployment planning</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Custom Corporate Training</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">Tailored program for your specific industry and use cases</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Designed specifically around your business needs, team size, and industry requirements.</p>
              </div>
            </div>
          </section>

          {/* You'll Learn To */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">You'll Learn To:</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Identify high-impact automation opportunities in your business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Select the right AI tools for your specific needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Build robust automation workflows that handle real-world scenarios</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Implement proper testing and quality assurance processes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Create documentation and handoff procedures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Scale your automation initiatives across departments</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Post-Workshop Support */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Post-Workshop Support</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📞</div>
                  <h3 className="font-semibold mb-2">30-Day Support</h3>
                  <p className="text-sm opacity-90">Implementation support via email and video calls</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="font-semibold mb-2">Private Community</h3>
                  <p className="text-sm opacity-90">Access to our community of AI practitioners</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold mb-2">Monthly Q&A</h3>
                  <p className="text-sm opacity-90">Sessions with our experts</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-semibold mb-2">Resource Library</h3>
                  <p className="text-sm opacity-90">Templates and best practices</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Transform Your Business with AI?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Join hundreds of professionals who have already built real AI solutions for their businesses. 
                Contact us to discuss which workshop format is right for your team.
              </p>
              <a 
                href="mailto:info@koreatous.com" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 