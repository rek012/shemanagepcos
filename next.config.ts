import type { NextConfig } from "next";

// Initialize Cloudflare dev context before config export
// This enables D1 database access in development
if (process.env.NODE_ENV === "development") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
    initOpenNextCloudflareForDev();
  } catch (e) {
    console.warn("Failed to initialize Cloudflare dev context:", e);
  }
}

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;
