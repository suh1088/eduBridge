import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/eduBridge",
  images: { unoptimized: true },
};

export default nextConfig;
