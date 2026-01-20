import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;

// Initialize for dev only - this runs after export to avoid build issues
if (process.env.NODE_ENV === 'development') {
  import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  }).catch(() => {
    // Ignore - Miniflare may crash on Windows
  });
}
