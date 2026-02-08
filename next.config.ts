import type { NextConfig } from "next";

/**
 * Static export: generates static HTML/CSS/JS to the `out` directory.
 * Compatible only with static data (no getServerSideProps, ISR, edge, or API routes).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
