/** @type {import('next').NextConfig} */
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
const connectSrc = ["'self'", "https:", "ws:", "wss:"];

if (isDev) {
  connectSrc.splice(1, 0, "http://localhost:3001", "http://127.0.0.1:3001");
}

const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
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
      { source: "/dashboard", destination: "/admin/dashboard", permanent: false },
      { source: "/dashboard/treatment-plans", destination: "/admin/treatment-plans", permanent: false },
      { source: "/admin/services-pages", destination: "/admin/dashboard", permanent: false },
      { source: "/admin/services-pages/:path*", destination: "/admin/dashboard", permanent: false },
      { source: "/admin/seo-settings", destination: "/admin/dashboard", permanent: false },
      {
        source: "/dashboard/treatment-plans/enrollments",
        destination: "/admin/treatment-plans/enrollments",
        permanent: false
      },
      {
        source: "/dashboard/settings/payments",
        destination: "/admin/treatment-plans/payments",
        permanent: false
      },
      { source: "/blog", destination: "/health-blogs", permanent: true },
      { source: "/blog/:slug", destination: "/health-blogs/:slug", permanent: true },
      { source: "/blogs", destination: "/health-blogs", permanent: true },
      { source: "/blogs/:slug", destination: "/health-blogs/:slug", permanent: true },
      { source: "/altmed-blogs", destination: "/health-blogs", permanent: true },
      { source: "/current-news", destination: "/health-blogs", permanent: true },
      { source: "/index.php/current-news", destination: "/health-blogs", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/book", destination: "/appointment", permanent: true },
      { source: "/announcements", destination: "/updates", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/telehealth", destination: "/telehealth-manassas", permanent: true },
      {
        source: "/telehealth-consent-forms",
        destination: "/telehealth-manassas#telehealth-consent",
        permanent: true
      },
      {
        source: "/telehealth-consent-forms-minor",
        destination: "/telehealth-manassas#telehealth-consent",
        permanent: true
      },
      {
        source: "/services/primary-care",
        destination: "/services/primary-care-manassas-va",
        permanent: true
      },
      {
        source: "/services/urgent-care",
        destination: "/services/urgent-care-manassas-va",
        permanent: true
      },
      {
        source: "/services/addiction",
        destination: "/services/suboxone-treatment-manassas",
        permanent: true
      },
      {
        source: "/index.php/services/suboxone-treatment-manassas",
        destination: "/services/suboxone-treatment-manassas",
        permanent: true
      },
      {
        source: "/index.php/services/occupational-health-clinic-manassas",
        destination: "/services/occupational-health-clinic-manassas",
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
        destination: "/services/occupational-health/drug-alcohol-testing-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/breath-alcohol-testing",
        destination: "/services/occupational-health/drug-alcohol-testing-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/breath-alcohol-test-manassas",
        destination: "/services/occupational-health/drug-alcohol-testing-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/x-ray-service",
        destination: "/services/occupational-health/xray-service",
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
        source: "/services/weight-management/semaglutide-weight-loss-manassas",
        destination: "/services/semaglutide-weight-loss-manassas",
        permanent: true
      },
      {
        source: "/services/occupational-health/pre-employment-physical",
        destination: "/services/pre-employment-physical-drug-test-manassas",
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
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "frame-src https://www.google.com https://www.google.com/maps https://form.jotform.com https://hipaa.jotform.com https://www.jotform.com",
      `connect-src ${connectSrc.join(" ")}`
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
