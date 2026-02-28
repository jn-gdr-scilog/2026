import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/2026",
  assetPrefix: "/2026/",
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
