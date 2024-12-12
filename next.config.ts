import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "description-images.s3.sa-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_URL_API: process.env.NEXT_URL_API,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
