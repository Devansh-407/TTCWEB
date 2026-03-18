/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization
    unoptimized: false,
    // Configure external image domains
    domains: ['i.imghippo.com'],
    // Mobile-specific optimizations
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Set default quality (lower for mobile)
    quality: 60,
    // Minimum cache TTL for optimized images
    minimumCacheTTL: 60,
  },
  // Enable compression for better mobile performance
  compress: true,
  // Optimize for mobile
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
