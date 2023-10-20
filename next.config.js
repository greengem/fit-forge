const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: false,
    // ... you can add other configurations as needed
  };
  
  module.exports = withBundleAnalyzer(nextConfig);
  