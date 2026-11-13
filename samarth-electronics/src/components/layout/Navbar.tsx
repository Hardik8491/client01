"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { initialCompanySettings } from "@/lib/seed-data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar (Hidden on mobile for clean responsive layout, visible on desktop) */}
      <div className="hidden md:block bg-blue-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-medium tracking-wide">
            💡 LED Lighting & Electrical Solutions — Dahod, Gujarat
          </span>
          <a
            href={`tel:${initialCompanySettings.phone}`}
            className="flex items-center gap-1.5 text-blue-100 hover:text-orange-300 transition font-semibold"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            {initialCompanySettings.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 group py-1 shrink-0">
          <Image
            src="/images/logo.png"
            alt="SAMARTH Logo"
            width={180}
            height={63}
            className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
          <div className="border-l border-gray-200 pl-3 hidden sm:flex flex-col justify-center">
            <span className="text-orange-500 text-xs font-bold tracking-wider uppercase leading-tight">
              ELECTRONICS HUB
            </span>
            <span className="text-gray-400 text-[10px] font-medium tracking-normal mt-0.5 leading-tight">
              Dahod · Gujarat
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-blue-700"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors inline-block"
            style={{ color: "#ffffff" }}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul className="space-y-1 mt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-lg text-sm font-medium transition",
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block mt-2 bg-orange-500 text-white text-center py-2.5 rounded-lg font-semibold text-sm"
                style={{ color: "#ffffff" }}
              >
                Get a Quote
              </Link>
            </li>
            <li className="pt-2 border-t border-gray-100 mt-2">
              <a
                href={`tel:${initialCompanySettings.phone}`}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-900 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                Call {initialCompanySettings.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
