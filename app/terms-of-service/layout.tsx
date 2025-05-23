import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Terms of Service | Startup Consulting Inc. - Legal Terms & Conditions",
  description: "Read our terms of service governing the use of Startup Consulting Inc. AI automation services. Understand your rights and obligations as our client.",
  keywords: "terms of service, legal terms, conditions of use, service agreement, AI consulting terms",
  openGraph: {
    title: "Terms of Service - Startup Consulting Inc.",
    description: "Legal terms and conditions for using our AI automation consulting services",
    url: "https://www.ai-biz.app/terms-of-service",
    type: "website"
  },
  alternates: {
    canonical: "https://www.ai-biz.app/terms-of-service"
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
  }
}

// Structured data for terms of service
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service",
  "description": "Terms of service for Startup Consulting Inc. AI automation services",
  "url": "https://www.ai-biz.app/terms-of-service",
  "dateModified": "2025-05-22",
  "datePublished": "2025-05-22",
  "author": {
    "@type": "Organization",
    "name": "Startup Consulting Inc.",
    "url": "https://www.ai-biz.app",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@koreatous.com",
      "contactType": "Legal"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Startup Consulting Inc.",
    "url": "https://www.ai-biz.app"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ai-biz.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Terms of Service",
        "item": "https://www.ai-biz.app/terms-of-service"
      }
    ]
  },
  "mainEntity": {
    "@type": "TermsOfService",
    "name": "Terms of Service",
    "dateModified": "2025-05-22",
    "datePublished": "2025-05-22",
    "provider": {
      "@type": "Organization",
      "name": "Startup Consulting Inc.",
      "url": "https://www.ai-biz.app"
    }
  }
}

export default function TermsOfServiceLayout({
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
              <li className="text-gray-900 font-medium">Terms of Service</li>
            </ol>
          </div>
        </nav>
        <main role="main">
          <article itemScope itemType="https://schema.org/TermsOfService">
            <meta itemProp="dateModified" content="2025-05-22" />
            <meta itemProp="datePublished" content="2025-05-22" />
            <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Startup Consulting Inc." />
              <meta itemProp="url" content="https://www.ai-biz.app" />
            </div>
            {children}
          </article>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}