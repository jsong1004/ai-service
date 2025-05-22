"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Case study data
const caseStudies = [
  {
    id: "intelligent-customer-support",
    title: "Intelligent Customer Support",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Intelligent Customer Support</h2>
        <p>
          Our AI-powered customer support solutions have transformed how businesses interact with their customers, providing
          24/7 assistance without the need for a large support team.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          A medium-sized e-commerce company was struggling with customer support response times, especially during peak
          seasons and after hours. Their support team was overwhelmed, leading to customer dissatisfaction and lost sales.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We implemented an AI chatbot system that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Instantly answer common questions about products, shipping, and returns</li>
          <li>Guide users through troubleshooting steps for common issues</li>
          <li>Collect necessary information before escalating to human agents</li>
          <li>Learn from interactions to continuously improve responses</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">65%</p>
            <p className="text-sm">Reduction in routine support tickets</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">24/7</p>
            <p className="text-sm">Customer support availability</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">92%</p>
            <p className="text-sm">Customer satisfaction rate</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "automated-news-analysis",
    title: "Automated News & Trend Analysis",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Automated News & Trend Analysis</h2>
        <p>
          Staying ahead of industry trends and competitor movements is critical for business success. Our AI-powered news 
          and trend analysis solution provides real-time business intelligence without the manual effort.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          A financial services firm needed to stay informed about market shifts, regulatory changes, and competitor strategies.
          Their analysts were spending hours each day manually scanning news sources, resulting in delayed insights and missed opportunities.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We developed an AI system that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Continuously scan thousands of news sources, social media, and industry publications</li>
          <li>Identify and categorize relevant information based on customized criteria</li>
          <li>Generate daily summaries of important developments</li>
          <li>Highlight emerging trends and potential market shifts</li>
          <li>Deliver real-time alerts for critical information</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">85%</p>
            <p className="text-sm">Reduction in research time</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">3x</p>
            <p className="text-sm">More sources analyzed</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">15%</p>
            <p className="text-sm">Increase in strategic decision quality</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "lead-generation-scoring",
    title: "Smarter Lead Generation & Scoring",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Smarter Lead Generation & Scoring</h2>
        <p>
          Identifying and qualifying high-potential leads is crucial for sales efficiency. Our AI lead generation and scoring
          system helps sales teams focus their efforts where they'll have the greatest impact.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          A B2B software company was struggling with lead qualification. Their sales team was spending too much time on 
          low-potential prospects, while missing opportunities with high-value potential customers.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We implemented an AI lead scoring system that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Analyze customer interaction data across websites, emails, and social media</li>
          <li>Identify behavioral patterns that indicate purchase readiness</li>
          <li>Score leads based on customized criteria and historical conversion data</li>
          <li>Automatically route high-potential leads to the appropriate sales representatives</li>
          <li>Provide insights on the best approach for each lead based on their interests and behavior</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">42%</p>
            <p className="text-sm">Increase in conversion rate</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">30%</p>
            <p className="text-sm">Reduction in sales cycle length</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">25%</p>
            <p className="text-sm">Increase in average deal size</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "content-creation",
    title: "AI-Assisted Content Creation",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">AI-Assisted Content Creation</h2>
        <p>
          Creating high-quality content at scale is a challenge for many marketing teams. Our AI content assistance
          tools help streamline the content creation process without sacrificing quality.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          A digital marketing agency was struggling to produce enough content for their clients across multiple industries.
          Their creative team was overworked, and content production was becoming a bottleneck.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We implemented AI content creation tools that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Generate initial drafts for blog posts, social media updates, and email campaigns</li>
          <li>Create content variations for A/B testing</li>
          <li>Optimize content for SEO and readability</li>
          <li>Analyze top-performing content to inform future content strategy</li>
          <li>Maintain brand voice and style guidelines across all content</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">3x</p>
            <p className="text-sm">Increase in content production</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">40%</p>
            <p className="text-sm">Reduction in content creation time</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">20%</p>
            <p className="text-sm">Improvement in content engagement</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "email-management",
    title: "Automated Email Management",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Automated Email Management</h2>
        <p>
          Email overload is a major productivity drain for many professionals. Our AI email management solution helps 
          prioritize, categorize, and respond to emails efficiently.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          An executive team at a mid-sized company was spending hours each day managing their inboxes, 
          taking valuable time away from strategic activities. Important emails were sometimes missed, and response times were inconsistent.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We deployed an AI email management system that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Automatically categorize emails by priority and type</li>
          <li>Generate draft responses for common inquiries</li>
          <li>Filter out low-priority and spam messages</li>
          <li>Identify action items and deadline-sensitive communications</li>
          <li>Schedule follow-ups for unanswered important emails</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">70%</p>
            <p className="text-sm">Reduction in email processing time</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">90%</p>
            <p className="text-sm">Response rate for important emails</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">2hrs</p>
            <p className="text-sm">Daily time saved per executive</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis from Customer Feedback",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Sentiment Analysis from Customer Feedback</h2>
        <p>
          Understanding customer sentiment at scale is critical for improving products and services. Our AI sentiment analysis
          solution turns unstructured feedback into actionable insights.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          A hospitality chain was receiving thousands of customer reviews and social media mentions each week. Their team couldn't
          manually analyze all the feedback, making it difficult to identify patterns and prioritize improvements.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We implemented an AI sentiment analysis system that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Analyze reviews, social media comments, and survey responses</li>
          <li>Categorize feedback by topic and sentiment (positive, negative, neutral)</li>
          <li>Identify trending issues and recurring complaints</li>
          <li>Track sentiment changes over time and across locations</li>
          <li>Generate actionable reports for different departments</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">100%</p>
            <p className="text-sm">Of feedback analyzed (vs. 15% previously)</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">18%</p>
            <p className="text-sm">Increase in customer satisfaction score</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm">Critical issues identified and addressed</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "financial-processing",
    title: "Automated Financial Processing",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Automated Financial Processing</h2>
        <p>
          Financial operations require accuracy, speed, and compliance. Our AI financial processing solution streamlines 
          invoice handling, expense management, and fraud detection.
        </p>
        <h3 className="text-xl font-semibold mt-6">The Challenge</h3>
        <p>
          A growing manufacturing company was struggling with financial process inefficiencies. Invoice processing was slow,
          expense approvals were causing delays, and their manual fraud detection processes were inadequate.
        </p>
        <h3 className="text-xl font-semibold mt-6">Our Solution</h3>
        <p>
          We implemented an AI financial processing system that could:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Extract and validate data from invoices in various formats</li>
          <li>Match invoices with purchase orders and receiving documents</li>
          <li>Automatically route approvals based on company policies</li>
          <li>Flag unusual transactions and potential fraud indicators</li>
          <li>Generate audit-ready documentation and reports</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">The Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">80%</p>
            <p className="text-sm">Reduction in invoice processing time</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">60%</p>
            <p className="text-sm">Fewer payment delays</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">35%</p>
            <p className="text-sm">Increase in detected irregular transactions</p>
          </div>
        </div>
      </div>
    )
  }
]

export default function CaseStudiesPage() {
  const [activeCase, setActiveCase] = useState(caseStudies[0].id)

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">AI Business Automation Case Studies</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore real-world examples of how our AI solutions have transformed businesses across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar - Case study navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 overflow-hidden">
              <div className="bg-blue-600 text-white py-4 px-6">
                <h2 className="text-lg font-semibold">Case Studies</h2>
              </div>
              <div className="py-2">
                {caseStudies.map((study) => (
                  <Button
                    key={study.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left px-6 py-3 rounded-none",
                      activeCase === study.id 
                        ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setActiveCase(study.id)}
                  >
                    {study.title}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right content area - Case study details */}
          <div className="lg:col-span-3">
            <Card className="p-6 lg:p-8">
              {caseStudies.find(study => study.id === activeCase)?.content}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}