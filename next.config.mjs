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
    // Set default image quality
    quality: 75,
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
