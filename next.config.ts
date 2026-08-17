import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath removed for custom domain forexwizard.online
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
