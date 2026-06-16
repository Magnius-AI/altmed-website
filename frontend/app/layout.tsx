import type { Metadata } from "next";
import { getConfiguredSiteOrigin } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getConfiguredSiteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Walk-In Clinic Manassas VA | Altmed Medical Center",
    template: "%s | Altmed Medical Center"
  },
  description:
    "Altmed Medical Center in Manassas, VA offers urgent care, primary care, occupational health, weight loss, DOT physicals, telehealth, and employer services.",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Altmed Medical Center | Walk-In Clinic Manassas VA",
    description:
      "Walk-in urgent care, primary care, DOT physicals, telehealth, occupational health, and weight loss services in Manassas, Virginia.",
    url: siteUrl,
    siteName: "Altmed Medical Center",
    locale: "en_US",
    type: "website",
    images: ["/assets/img/logo.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Altmed Medical Center | Walk-In Clinic Manassas VA",
    description:
      "Walk-in urgent care, primary care, DOT physicals, telehealth, occupational health, and weight loss services in Manassas, Virginia.",
    images: ["/assets/img/logo.png"]
  },
  other: {
    "geo.region": "US-VA",
    "geo.placename": "Manassas, Virginia",
    "geo.position": "38.771256819960136;-77.50167231304229",
    ICBM: "38.771256819960136, -77.50167231304229"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-secondary)] antialiased">{children}</body>
    </html>
  );
}
