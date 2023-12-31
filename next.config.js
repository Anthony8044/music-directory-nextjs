/** @type {import('next').NextConfig} */

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "is2-ssl.mzstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "is3-ssl.mzstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "is4-ssl.mzstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "is5-ssl.mzstatic.com",
        port: "",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
