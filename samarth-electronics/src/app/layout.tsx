import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Samarth Electronics | B2B Electronics Manufacturing", template: "%s | Samarth Electronics" },
  description:
    "Samarth Electronics — High-precision B2B electronics manufacturing in Rajkot, Gujarat. PCBA, Industrial Controllers, SMPS, IoT Gateways, Motor Drives.",
  keywords: ["electronics manufacturing", "PCBA", "industrial controller", "SMPS", "IoT gateway", "Rajkot", "Gujarat"],
  authors: [{ name: "Samarth Electronics" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://samarthelectronics.in",
    siteName: "Samarth Electronics",
    title: "Samarth Electronics | B2B Electronics Manufacturing",
    description: "High-precision electronics manufacturing & turnkey solutions from Rajkot, Gujarat.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
