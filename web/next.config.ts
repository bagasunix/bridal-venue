import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_PROXY_URL ?? "http://127.0.0.1:8001"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
