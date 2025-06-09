import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Business Automation Consulting | Startup Consulting Inc.',
  description: 'Transform your business with AI automation. Expert workshops, custom builds, and managed services. Get started with a free consultation.',
  keywords: 'AI automation, business consulting, machine learning, process automation',
  openGraph: {
    title: 'AI Business Automation Consulting',
    description: 'Transform your business with AI automation solutions',
    url: 'https://www.ai-biz.app',
    images: ['/images/logo-wo-text.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
