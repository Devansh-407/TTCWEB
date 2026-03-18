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
  },
}

export default nextConfig
