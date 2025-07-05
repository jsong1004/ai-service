import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Strategic AI Consulting Services",
  description:
    "Navigate the AI revolution with expert guidance. We offer strategic AI planning, readiness assessments, technology selection, and implementation support.",
}

export default function ConsultingPage() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Consulting: Strategic AI Transformation</h1>
            <div className="h-1 w-16 bg-indigo-500 rounded mb-6 mx-auto" />
            <p className="text-center text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto">
              Navigate the AI Revolution with Expert Guidance
            </p>
            <p className="text-center text-lg text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
              The AI landscape is complex and rapidly evolving. Make informed decisions about your automation strategy with expert guidance that's grounded in real-world implementation experience across dozens of industries.
            </p>
          </section>

          {/* Strategic AI Planning */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Strategic AI Planning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">📊</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Business Process Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Comprehensive audit of your current operations to identify automation opportunities with the highest ROI potential.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🔍</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI Readiness Assessment</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Evaluation of your data infrastructure, team capabilities, and organizational readiness for AI implementation.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🗺️</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Custom AI Strategy Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Creation of a phased implementation roadmap that aligns with your business goals and resource constraints.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">⚖️</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Technology Selection Guidance</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Unbiased recommendations on AI tools and platforms that best fit your specific use cases and budget.</p>
              </div>
            </div>
          </section>

          {/* Implementation Support */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Implementation Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🏆</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Vendor Evaluation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Assessment of AI solution providers to ensure you choose partners who can deliver on their promises.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🎓</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Team Training Strategy</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Development of training programs that prepare your workforce for AI integration and change management.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🧪</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Pilot Program Design</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Creation of low-risk proof-of-concept projects that demonstrate value before full-scale implementation.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🔄</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Change Management Planning</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Strategies for smooth adoption that minimize disruption and maximize employee buy-in.</p>
              </div>
            </div>
          </section>

          {/* Our Consulting Services */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Consulting Services</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">AI Strategy Workshop (2-day intensive)</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Current state assessment</li>
                  <li>• Opportunity identification and prioritization</li>
                  <li>• Implementation roadmap development</li>
                  <li>• Resource requirement planning</li>
                  <li>• Risk assessment and mitigation strategies</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Executive AI Briefing (Half-day session)</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• AI landscape overview for leadership teams</li>
                  <li>• Industry-specific AI applications and case studies</li>
                  <li>• Investment considerations and ROI projections</li>
                  <li>• Competitive analysis and market positioning</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Process Optimization Consulting (Ongoing engagement)</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Deep-dive analysis of specific business processes</li>
                  <li>• Automation opportunity identification</li>
                  <li>• Solution design and vendor selection</li>
                  <li>• Implementation planning and project management</li>
                  <li>• Performance monitoring and optimization</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">AI Governance & Ethics Consulting</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Development of AI usage policies and guidelines</li>
                  <li>• Risk management frameworks</li>
                  <li>• Compliance and regulatory considerations</li>
                  <li>• Ethical AI implementation practices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Industry Expertise */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Industry Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Professional Services</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Law firms, accounting practices, consulting companies</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Healthcare</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Medical practices, hospitals, healthcare administration</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🏦</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Financial Services</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Banking, insurance, investment management</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🏭</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Manufacturing</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Production optimization, quality control, supply chain</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Real Estate</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Property management, transaction processing, market analysis</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🛒</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">E-commerce</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Customer service, inventory management, personalization</p>
              </div>
            </div>
          </section>

          {/* Consulting Methodology */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Consulting Methodology</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">1️⃣</div>
                  <h3 className="font-semibold mb-2">Assessment Phase</h3>
                  <p className="text-sm opacity-90">Comprehensive analysis of your current state and future objectives</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">2️⃣</div>
                  <h3 className="font-semibold mb-2">Strategy Development</h3>
                  <p className="text-sm opacity-90">Creation of detailed implementation plans with clear milestones</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">3️⃣</div>
                  <h3 className="font-semibold mb-2">Implementation Support</h3>
                  <p className="text-sm opacity-90">Hands-on guidance through execution phases</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">4️⃣</div>
                  <h3 className="font-semibold mb-2">Optimization</h3>
                  <p className="text-sm opacity-90">Ongoing refinement based on performance data and changing needs</p>
                </div>
              </div>
            </div>
          </section>

          {/* Expected Outcomes */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Expected Outcomes</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">🎯</span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Clear Direction:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Well-defined AI strategy aligned with business objectives</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">🛡️</span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Risk Mitigation:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Identification and planning for potential implementation challenges</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">⚡</span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Resource Optimization:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Efficient allocation of time, money, and personnel</span>
                    </div>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">🚀</span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Competitive Advantage:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Faster, more effective AI adoption than competitors</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">📈</span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Measurable Results:</span>
                      <span className="text-gray-700 dark:text-gray-300"> Concrete improvements in efficiency, cost reduction, and revenue growth</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Consulting Packages */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Consulting Packages</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">AI Strategy Sprint</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">(2 weeks)</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Rapid assessment and high-level strategy development. Perfect for businesses ready to move quickly.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Deliverables:</strong> Strategy document, implementation roadmap, vendor recommendations
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg p-6 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">POPULAR</span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Comprehensive AI Planning</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">(6-8 weeks)</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Detailed analysis and planning for complex organizations. Includes stakeholder interviews and detailed process mapping.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Deliverables:</strong> Full strategic plan, pilot program design, training curriculum
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Ongoing Strategic Partnership</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">(Monthly retainer)</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Continuous guidance as you implement and scale AI solutions. Regular strategy reviews and course corrections.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Benefits:</strong> Priority access to our expertise as your needs evolve
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Transform Your Business with Strategic AI Consulting?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Navigate the AI revolution with confidence. Our expert guidance will help you make informed decisions 
                and achieve successful AI transformation aligned with your business goals.
              </p>
              <a 
                href="mailto:info@koreatous.com" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Your AI Strategy
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 