/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['www.ai-biz.app'],
  },
  // Add proper handling for dynamic routes
  async redirects() {
    return []
  },
  async rewrites() {
    return []
  }
};

export default nextConfig;
