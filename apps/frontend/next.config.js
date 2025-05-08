/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sandrvvubucket.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
