/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'ywdfvbklrcneunbhlekj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i.discogs.com',
      },
      {
        protocol: 'https',
        hostname: 'st.discogs.com',
      },
    ],
  },
};

module.exports = nextConfig;
