/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLIENT_COOKIE_ACCESS_TOKEN: process.env.CLIENT_COOKIE_ACCESS_TOKEN,
  }
}

module.exports = nextConfig
