/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/lime-companion",
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
