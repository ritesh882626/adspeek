import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/website-development",
        destination: "/services/web-development",
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
