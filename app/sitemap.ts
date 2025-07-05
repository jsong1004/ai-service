import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ai-biz.app'

  const pages = [
    '',
    '/ai-workshops',
    '/business-automation',
    '/consulting',
    '/managed-services',
    '/company',
    '/founder',
    '/case-studies',
    '/privacy-policy',
    '/terms-of-service',
  ]

  const pageUrls = pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  const staticUrls = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Filter out duplicates that are handled in staticUrls
  const dynamicPageUrls = pageUrls.filter(
    (page) =>
      page.url !== `${baseUrl}/privacy-policy` &&
      page.url !== `${baseUrl}/terms-of-service`
  )

  return [...dynamicPageUrls, ...staticUrls]
} 