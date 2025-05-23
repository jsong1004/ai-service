import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About Our Founder | Jaehee Song - Startup Consulting Inc.",
  description: "Learn about Jaehee Song, founder of Startup Consulting Inc. With 20+ years in data platform architecture and AI solutions, he helps Korean startups enter the US market.",
  keywords: "Jaehee Song, startup consultant, AI developer, data architect, Korean startups, US market entry",
  openGraph: {
    title: "Jaehee Song - Founder of Startup Consulting Inc.",
    description: "Meet our founder with 20+ years experience in data architecture and AI development",
    url: "https://www.ai-biz.app/founder",
    type: "profile",
    images: [
      {
        url: "/images/founder.jpg",
        width: 1200,
        height: 630,
        alt: "Jaehee Song"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Founder | Jaehee Song",
    description: "Learn about the visionary behind Startup Consulting Inc.",
    images: ["/images/founder-twitter.jpg"]
  },
  alternates: {
    canonical: "https://www.ai-biz.app/founder"
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

// Structured data for person/founder page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jaehee Song",
  "jobTitle": "Founder & CEO",
  "worksFor": {
    "@type": "Organization",
    "name": "Startup Consulting Inc.",
    "url": "https://www.ai-biz.app"
  },
  "description": "Data Platform Architect & AI Solution Developer with over 20 years of experience",
  "knowsAbout": [
    "AI Solution Development",
    "Data Platform Architecture", 
    "Startup Acceleration",
    "Cross-Cultural Leadership"
  ],
  "alumniOf": "Visa",
  "sameAs": [
    "https://www.linkedin.com/company/75661993/",
    "https://x.com/JaeheeSong1004"
  ]
}

export default function FounderLayout({
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
              <li className="text-gray-900 font-medium">About Founder</li>
            </ol>
          </div>
        </nav>
        <main role="main" itemScope itemType="https://schema.org/ProfilePage">
          <div itemProp="mainEntity" itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content="Jaehee Song" />
            <meta itemProp="jobTitle" content="Founder & CEO" />
            {children}
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}