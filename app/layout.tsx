import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

const siteConfig = {
  name: "Startup Consulting Inc.",
  url: "https://www.ai-biz.app",
  ogImage: "https://www.ai-biz.app/og-image.png",
  description:
    "Transform your business with AI. We offer expert workshops, custom automation solutions, and managed AI services to streamline your operations and drive growth.",
  links: {
    twitter: "https://x.com/JaeheeSong1004",
    linkedin: "https://www.linkedin.com/company/75661993/admin/dashboard/",
    facebook: "https://www.facebook.com/usa.startup.consulting",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI Business Automation",
    "AI Consulting",
    "AI Workshops",
    "Custom AI Solutions",
    "Managed AI Services",
    "Business Process Automation",
    "Machine Learning",
    "Startup Consulting",
  ],
  authors: [
    {
      name: "Jaehee Song",
      url: siteConfig.url,
    },
  ],
  creator: "Jaehee Song",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@JaeheeSong1004",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Startup Consulting Inc.",
            "url": "https://www.ai-biz.app",
            "logo": "https://www.ai-biz.app/images/logo-wo-text.jpg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-555-5555",
              "contactType": "Customer Service",
              "email": "info@koreatous.com"
            },
            "sameAs": [
              "https://www.facebook.com/usa.startup.consulting",
              "https://x.com/JaeheeSong1004",
              "https://www.linkedin.com/company/75661993/"
            ]
          })}}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
