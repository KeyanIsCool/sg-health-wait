/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  // Keep Prisma out of the webpack bundle so the native engine is loaded at
  // runtime from node_modules — not inlined and lost by tracing.
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    outputFileTracingIncludes: {
      '/*': [
        './node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
        './node_modules/.prisma/client/schema.prisma',
      ],
    },
  },
};
export default nextConfig;
