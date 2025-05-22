import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Startup Consulting Inc.</h1>
            <div className="h-1 w-16 bg-indigo-500 rounded mb-6 mx-auto" />
            <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-4 max-w-3xl mx-auto">
              Founded in 2018, Startup Consulting Inc. is a premier consulting firm specializing in helping Korean startups navigate and succeed in the North American market. We combine deep technical expertise with strategic business insights to provide comprehensive solutions that drive growth and innovation.
            </p>
            <p className="text-center text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
              Our mission is to bridge the gap between innovative Korean startups and the vast opportunities in the North American market, while simultaneously developing cutting-edge AI solutions that transform how businesses operate and grow.
            </p>
          </section>
          {/* Stats */}
          <section className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white text-center font-bold text-2xl md:text-3xl shadow">
              <div>
                <div>50+</div>
                <div className="text-sm font-medium mt-1 opacity-80">Startups Accelerated</div>
              </div>
              <div>
                <div>7+</div>
                <div className="text-sm font-medium mt-1 opacity-80">Years of Excellence</div>
              </div>
              <div>
                <div>Multiple</div>
                <div className="text-sm font-medium mt-1 opacity-80">AI Solutions Deployed</div>
              </div>
              <div>
                <div>Global</div>
                <div className="text-sm font-medium mt-1 opacity-80">Internship Programs</div>
              </div>
            </div>
          </section>
          {/* Service Areas */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🎯</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Market Entry Strategy</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Comprehensive consulting for US market entry, from initial research to full implementation, with customized GTM playbooks and strategic partnerships.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🤖</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI Solution Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Custom AI-powered services including chatbots, lead generation tools, content creation platforms, and career guidance systems using latest technologies.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🌍</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Global Internship Programs</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Structured internship programs connecting university students with real-world projects in data analysis, AI development, and software engineering.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">📈</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Business Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">End-to-end support for startups including product development guidance, marketing strategy, business planning, and investor networking.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🔗</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Partnership Building</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Establishing strategic partnerships with major technology companies, universities, and investors across the Greater Seattle area and Silicon Valley.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🎓</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Training & Education</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Professional workshops and lectures on data analysis, AI technologies, and startup strategies for corporations and educational institutions.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 