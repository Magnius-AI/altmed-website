/** @type {import('next').NextConfig} */
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname)
    };

    return config;
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/health-blogs", permanent: true },
      { source: "/blogs", destination: "/health-blogs", permanent: true },
      { source: "/blogs/:slug", destination: "/health-blogs/:slug", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/book", destination: "/appointment", permanent: true },
      { source: "/announcements", destination: "/updates", permanent: true },
      { source: "/telehealth", destination: "/telehealth-manassas", permanent: true },
      {
        source: "/services/addiction",
        destination: "/services/suboxone-treatment-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/dot-physical",
        destination: "/services/dot-physical-manassas-va",
        permanent: true
      },
      {
        source: "/services/occupational-health/drug-and-alcohol-test",
        destination: "/services/occupational-health/drug-alcohol-testing-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/lab-tests",
        destination: "/services/occupational-health/lab-testing-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/breadth-alcohol-testing",
        destination: "/services/occupational-health/breath-alcohol-test-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/vaccinations",
        destination: "/services/occupational-health/vaccinations-immunizations-manassas-va",
        permanent: true
      },
      {
        source: "/services/occupational-health/workers-compensation",
        destination: "/services/occupational-health/workers-compensation-injury-care-manassas",
        permanent: true
      },
      {
        source: "/services/third-party-administration-service",
        destination: "/services/third-party-administrator-service-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health",
        destination: "/services/occupational-health-clinic-manassas",
        permanent: true
      },
      {
        source: "/services/medical-review-officer",
        destination: "/services/mro-services-manassas",
        permanent: true
      },
      {
        source: "/services/corporate-wellness-and-health-fairs",
        destination: "/services/corporate-wellness-programs-manassas",
        permanent: true
      },
      {
        source: "/services/weight_management",
        destination: "/services/medical-weight-loss-manassas",
        permanent: true
      },
      {
        source: "/services/functional-medicine",
        destination: "/services/functional-medicine-manassas",
        permanent: true
      }
    ];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.google.com https://www.gstatic.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "frame-src https://www.google.com https://www.google.com/maps",
      "connect-src 'self' http://localhost:3001 https://altmedfirst.com ws: wss:"
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
