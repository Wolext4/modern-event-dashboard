/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force clean builds
  generateBuildId: () => 'build-' + Date.now(),
}

export default nextConfig
