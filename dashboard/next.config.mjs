/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY, // pulls from .env file
      },
    images: {
        domains: ['maps.googleapis.com'],
    },
};

export default nextConfig;
