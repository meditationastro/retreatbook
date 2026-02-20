/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

/**
 * GitHub Pages serves sites from a sub-path: https://<user>.github.io/<repo>/
 * Set NEXT_PUBLIC_BASE_PATH to "/<repo>" in your GitHub Actions workflow.
 */
const basePath = isGithubPages ? (process.env.NEXT_PUBLIC_BASE_PATH || "") : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,

  // next/image needs to be unoptimized for static export
  images: {
    unoptimized: true,
    domains: [
      "pub-4e45315c538e47b780a62420f838d5bb.r2.dev",
      "lh3.googleusercontent.com",
      "pub-f4fdbbb171c94d718b10049bea9697ee.r2.dev",
    ],
  },

  basePath,
  assetPrefix: basePath,

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
