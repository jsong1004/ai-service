import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Why Business Automation with AI | Transform Your Business Operations",
  description: "Discover how AI-powered business automation can transform your organization with increased efficiency, reduced costs, and smarter decision-making.",
  keywords: "business automation, AI automation, digital transformation, operational efficiency, business intelligence, machine learning",
  openGraph: {
    title: "Why AI Business Automation is Essential in Today's Digital Landscape",
    description: "Learn how AI automation can give your business a competitive edge with increased efficiency and innovation",
    url: "https://koreatous.com/why_business_automation",
    type: "article",
    images: [
      {
        url: "/images/why-automation-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI Business Automation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Business Automation with AI Matters",
    description: "Transform your business with AI automation",
    images: ["/images/why-automation-twitter.jpg"]
  },
  alternates: {
    canonical: "https://koreatous.com/why_business_automation"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

// Structured data for article page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Why Business Automation Using AI is Essential in Today's Digital Landscape",
  "description": "Discover how AI-powered business automation can transform your organization with increased efficiency, reduced costs, and smarter decision-making.",
  "image": "https://koreatous.com/images/why-automation-og.jpg",
  "datePublished": "2025-05-22",
  "dateModified": "2025-05-22",
  "author": {
    "@type": "Organization",
    "name": "Startup Consulting Inc.",
    "url": "https://koreatous.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Startup Consulting Inc.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://koreatous.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://koreatous.com/why_business_automation"
  },
  "keywords": "business automation, AI automation, digital transformation, operational efficiency, business intelligence, machine learning"
}

export default function WhyBusinessAutomationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <Header />
        <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </a>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium">Why Business Automation</li>
            </ol>
          </div>
        </nav>
        <main role="main">
          <article itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content="Why Business Automation Using AI is Essential in Today's Digital Landscape" />
            <meta itemProp="datePublished" content="2025-05-22" />
            <meta itemProp="dateModified" content="2025-05-22" />
            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Startup Consulting Inc." />
              <meta itemProp="url" content="https://koreatous.com" />
            </div>
            {children}
          </article>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}