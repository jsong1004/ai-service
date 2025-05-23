import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Privacy Policy | Startup Consulting Inc. - Data Protection & Privacy",
  description: "Learn how Startup Consulting Inc. protects your personal information. Our comprehensive privacy policy explains data collection, usage, and your rights.",
  keywords: "privacy policy, data protection, GDPR compliance, personal information, data security",
  openGraph: {
    title: "Privacy Policy - Startup Consulting Inc.",
    description: "Our commitment to protecting your personal data and privacy rights",
    url: "https://www.ai-biz.app/privacy-policy",
    type: "website"
  },
  alternates: {
    canonical: "https://www.ai-biz.app/privacy-policy"
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
  }
}

// Structured data for legal page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "Privacy policy for Startup Consulting Inc.",
  "url": "https://www.ai-biz.app/privacy-policy",
  "dateModified": "2025-05-22",
  "datePublished": "2025-05-22",
  "author": {
    "@type": "Organization",
    "name": "Startup Consulting Inc.",
    "url": "https://www.ai-biz.app"
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
        "name": "Privacy Policy",
        "item": "https://www.ai-biz.app/privacy-policy"
      }
    ]
  },
  "mainEntity": {
    "@type": "Article",
    "headline": "Privacy Policy",
    "dateModified": "2025-05-22",
    "datePublished": "2025-05-22",
    "author": {
      "@type": "Organization",
      "name": "Startup Consulting Inc."
    }
  }
}

export default function PrivacyPolicyLayout({
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
              <li className="text-gray-900 font-medium">Privacy Policy</li>
            </ol>
          </div>
        </nav>
        <main role="main">
          <article itemScope itemType="https://schema.org/Article">
            <meta itemProp="dateModified" content="2025-05-22" />
            <meta itemProp="datePublished" content="2025-05-22" />
            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Startup Consulting Inc." />
            </div>
            {children}
          </article>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}