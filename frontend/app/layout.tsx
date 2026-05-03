import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://stage.altmedfirst.com"),
  title: {
    default: "Altmed Medical Center | Walk-In Clinic Manassas VA",
    template: "%s | Altmed Medical Center"
  },
  description:
    "Altmed Medical Center in Manassas, VA offers urgent care, primary care, occupational health, weight loss, DOT physicals, telehealth, and employer services.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Altmed Medical Center | Walk-In Clinic Manassas VA",
    description:
      "Walk-in urgent care, primary care, DOT physicals, telehealth, occupational health, and weight loss services in Manassas, Virginia.",
    url: "https://stage.altmedfirst.com",
    siteName: "Altmed Medical Center",
    locale: "en_US",
    type: "website",
    images: ["/legacy-assets/homepage/top.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Altmed Medical Center | Walk-In Clinic Manassas VA",
    description:
      "Walk-in urgent care, primary care, DOT physicals, telehealth, occupational health, and weight loss services in Manassas, Virginia.",
    images: ["/legacy-assets/homepage/top.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-secondary)] antialiased">{children}</body>
    </html>
  );
}
