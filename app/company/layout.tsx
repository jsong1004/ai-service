import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About Our Company | Startup Consulting Inc.",
  description: "Founded in 2018, Startup Consulting Inc. specializes in helping Korean startups succeed in the North American market while developing cutting-edge AI solutions.",
  keywords: "startup consulting, AI solutions, Korean startups, market entry, business development, global internship",
  openGraph: {
    title: "About Startup Consulting Inc.",
    description: "Learn about our premier consulting firm helping Korean startups navigate the North American market",
    url: "https://koreatous.com",
    type: "website",
    images: [
      {
        url: "/images/company-og.jpg",
        width: 1200,
        height: 630,
        alt: "Startup Consulting Inc."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Startup Consulting Inc.",
    description: "Premier consulting firm for AI solutions and market entry",
    images: ["/images/company-twitter.jpg"]
  },
  alternates: {
    canonical: "https://koreatous.com/company"
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

// Structured data for organization page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Startup Consulting Inc.",
  "url": "https://koreatous.com",
  "logo": "https://koreatous.com/logo.png",
  "description": "Premier consulting firm helping Korean startups navigate and succeed in the North American market.",
  "foundingDate": "2018",
  "foundingLocation": "Seattle, WA",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "10-50"
  },
  "sameAs": [
    "https://www.facebook.com/usa.startup.consulting",
    "https://www.linkedin.com/company/75661993/",
    "https://x.com/JaeheeSong1004",
    "https://www.instagram.com/knft82/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@koreatous.com",
    "availableLanguage": ["English", "Korean"]
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Market Entry Strategy",
        "description": "Comprehensive consulting for US market entry, from initial research to full implementation"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "AI Solution Development",
        "description": "Custom AI-powered services using latest technologies"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Global Internship Programs",
        "description": "Structured internship programs connecting university students with real-world projects"
      }
    }
  ]
}

export default function CompanyLayout({
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
              <li className="text-gray-900 font-medium">About Company</li>
            </ol>
          </div>
        </nav>
        <main role="main" itemScope itemType="https://schema.org/AboutPage">
          <div itemProp="mainEntity" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="Startup Consulting Inc." />
            <meta itemProp="foundingDate" content="2018" />
            {children}
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}