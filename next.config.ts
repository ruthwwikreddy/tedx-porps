import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    return [
      {
        source: '/pitchdesk',
        destination: '/pitchdesk.html',
      },
      {
        source: '/pitchdeck',
        destination: '/pitchdesk.html',
      },
      {
        source: '/pitch-desk',
        destination: '/pitchdesk.html',
      },
      {
        source: '/sponsorship-deck',
        destination: '/pitchdesk.html',
      },
    ];
  },
};

export default nextConfig;
