const BUILD_TIMESTAMP = 'v1-stable';

// Hard artifact separation:
//   next dev   -> .next-dev     (dev server owns this, never touched by builds)
//   next build -> .next         (production output)
//   npm run verify -> .next-verify (safe to run while dev is live)
// NEXT_DIST_DIR wins when explicitly set.
const defaultDistDir =
  process.env.NODE_ENV === 'development' ? '.next-dev' : '.next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || defaultDistDir,
  trailingSlash: true,
  reactStrictMode: true,
  generateBuildId: async () => BUILD_TIMESTAMP,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
};

module.exports = nextConfig;
