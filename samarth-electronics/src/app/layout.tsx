import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Samarth Electronics Hub | LED Lighting & SMPS Solutions",
    template: "%s | Samarth Electronics Hub",
  },
  description:
    "Samarth Electronics Hub — Reliable B2B commercial & residential LED lighting fixtures and solid-state SMPS drivers in Limdi, Dahod District, Gujarat.",
  keywords: [
    "Samarth Electronics Hub",
    "LED Lighting",
    "LED Bulbs",
    "LED Panels",
    "COB Spotlights",
    "Flood Lights",
    "Street Lights",
    "SMPS Drivers",
    "Dahod",
    "Gujarat",
  ],
  authors: [{ name: "Samarth Electronics Hub" }],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://samarthelectronics.in",
    siteName: "Samarth Electronics Hub",
    title: "Samarth Electronics Hub | LED Lighting & SMPS Solutions",
    description: "Reliable B2B LED lighting fixtures and solid-state SMPS drivers based in Limdi, Dahod, Gujarat.",
    images: [{ url: "/images/logo.jpg", width: 805, height: 281, alt: "SAMARTH Logo" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col antialiased bg-white text-gray-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
