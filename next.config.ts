import type { NextConfig } from "next";

// Cloudflare D1 bindings only work in production or with working Miniflare
// Disable in dev due to Windows Miniflare crash (access violation bug)
// The API routes have fallback logic for local development
if (process.env.NODE_ENV !== 'development') {
  import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  }).catch(() => {
    // Ignore errors during import
  });
}

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;
