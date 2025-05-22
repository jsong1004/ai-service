import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

// Structured metadata for case studies
export const metadata: Metadata = {
  title: "AI Automation Case Studies | Real Results & Success Stories",
  description: "Explore real-world examples of successful AI automation implementations. See how businesses transformed operations with our AI solutions and achieved measurable results.",
  keywords: "AI case studies, automation success stories, business transformation, AI implementation results, machine learning examples",
  openGraph: {
    title: "AI Automation Case Studies - Real Results",
    description: "Discover how businesses transformed with AI automation. View detailed case studies showing ROI, efficiency gains, and success metrics.",
    url: "https://koreatous.com/case-studies",
    type: "website",
    images: [
      {
        url: "/images/case-studies-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI Automation Case Studies"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Case Studies - Real Results",
    description: "Discover how businesses transformed with AI automation solutions",
    images: ["/images/case-studies-twitter.jpg"]
  },
  alternates: {
    canonical: "https://koreatous.com/case-studies"
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

// Structured data for case studies page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "AI Automation Case Studies",
  "description": "Real-world examples of successful AI automation implementations",
  "url": "https://koreatous.com/case-studies",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Article",
        "position": 1,
        "name": "Intelligent Customer Support",
        "description": "65% reduction in routine support tickets with AI-powered customer support"
      },
      {
        "@type": "Article", 
        "position": 2,
        "name": "Automated News & Trend Analysis",
        "description": "85% reduction in research time with AI-powered news analysis"
      }
      // Add more case studies as needed
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://koreatous.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": "https://koreatous.com/case-studies"
      }
    ]
  }
}

export default function CaseStudiesLayout({
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
              <li className="text-gray-900 font-medium">Case Studies</li>
            </ol>
          </div>
        </nav>
        <main role="main">
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}