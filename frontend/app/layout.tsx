import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://altmedfirst.com"),
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
    url: "https://altmedfirst.com",
    siteName: "Altmed Medical Center",
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-canvas)] text-neutral-700 antialiased">{children}</body>
    </html>
  );
}
