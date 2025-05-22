import React from "react"

export default function FounderPage() {
  return (
    <main className="bg-background text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 mb-12">
            {/* Profile Circle */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 w-40 h-40 flex items-center justify-center text-white text-5xl font-bold shadow-lg mb-4">
                JS
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Jaehee Song</h2>
              <p className="text-center text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-1">Data Platform Architect & AI Solution Developer</p>
            </div>
            {/* Bio */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center md:text-left text-gray-900 dark:text-white">Our Founder</h1>
              <div className="h-1 w-16 bg-indigo-500 rounded mb-6 mx-auto md:mx-0" />
              <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                With over 20 years of experience in data platform architecture and AI solution development, Jaehee Song is a visionary leader bridging technology and business across international markets. As the founder of Startup Consulting Inc. and Executive Director at Seattle Partners, he has dedicated his career to helping Korean startups successfully enter the US market.
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-200">
                Jaehee's extensive background includes designing and operating enterprise-level data systems at Visa, where he led critical infrastructure projects and innovations. His expertise spans from real-time analytics platforms using Apache Druid to comprehensive database management systems that have saved organizations thousands of hours annually.
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Beyond his technical achievements, Jaehee is passionate about developing next-generation talent through global internship programs and has authored "This Is How We Came," sharing employment stories of Korean professionals who successfully transitioned to US tech companies.
              </p>
            </div>
          </section>
          {/* Key Expertise Areas */}
          <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Key Expertise Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🚀</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Startup Acceleration</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Led accelerator programs supporting 50+ startups entering the US market with comprehensive consulting from market research to implementation.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🤖</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Developed multiple AI-powered services including RAG-based chat systems, lead generators, and career guidance platforms using cutting-edge technologies.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow flex flex-col items-start">
                <span className="text-2xl mb-2">🏛️</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Enterprise Architecture</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Designed and implemented large-scale data platforms at Visa, achieving 90% reduction in deployment times and significant cost savings.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow flex flex-col items-start md:col-span-1">
                <span className="text-2xl mb-2">🌐</span>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Cross-Cultural Leadership</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Successfully bridged Korean and American business environments, establishing partnerships and facilitating international market entry.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
  )
} 