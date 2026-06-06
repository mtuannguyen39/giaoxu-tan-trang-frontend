/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "kdovtygzzqzlpynvqujo.supabase.co" },
    ],
  },
  // Enable standalone for Docker
  // output: 'standalone',
};

export default nextConfig;
