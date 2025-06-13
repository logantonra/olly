/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // TODO Fix the type errors and remove this line
  },
};

module.exports = nextConfig;
