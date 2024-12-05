import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_URL_API: process.env.NEXT_URL_API,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
