/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/:path*`,
        },
        {
          source: '/socket.io/:path*',
          destination: `${process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}/socket.io/:path*`,
        },
      ],
    }
  },
}

export default nextConfig
