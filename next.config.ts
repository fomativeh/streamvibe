import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname with https
      },
      {
        protocol: "http",
        hostname: "**", // Allow any hostname with http (if needed)
      },
    ],
  },
};

export default nextConfig;
