import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Shereif-Portfolio",

  poweredByHeader: false,
  productionBrowserSourceMaps: true,

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
