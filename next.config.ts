import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/services-public-relations", destination: "/services/public-relations", permanent: true },
      { source: "/services-public-relations/", destination: "/services/public-relations", permanent: true },
      { source: "/investor-relation-advisory", destination: "/services/investor-relations", permanent: true },
      { source: "/investor-relation-advisory/", destination: "/services/investor-relations", permanent: true },
      { source: "/digital-marketing", destination: "/services/digital-marketing", permanent: true },
      { source: "/digital-marketing/", destination: "/services/digital-marketing", permanent: true },
      { source: "/annual-report", destination: "/services/annual-report", permanent: true },
      { source: "/annual-report/", destination: "/services/annual-report", permanent: true },
      { source: "/podcast", destination: "/services/podcast", permanent: true },
      { source: "/podcast/", destination: "/services/podcast", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/", destination: "/blog", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/career", destination: "/careers", permanent: true },
      { source: "/career/", destination: "/careers", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.confideleap.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;

