import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/web-development",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/services/seo-content",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/services/application-development",
        destination: "/services/app-development",
        permanent: true,
      },
      {
        source: "/book-a-call",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
