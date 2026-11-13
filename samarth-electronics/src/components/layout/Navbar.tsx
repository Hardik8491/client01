"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, FileDown, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { initialCompanySettings } from "@/lib/seed-data";
import { useInquiryCart } from "@/context/InquiryCartContext";

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
  const { itemCount, totalQuantity, openDrawer } = useInquiryCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar (Hidden on mobile for clean responsive layout, visible on desktop) */}
      <div className="hidden md:block bg-blue-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-medium tracking-wide">
            💡 LED Lighting & Electrical Solutions — Dahod, Gujarat
          </span>
          <div className="flex items-center gap-6">
            <a
              href="/catalogue/samarth-electronics-catalogue.pdf"
              download="Samarth-Electronics-Catalogue.pdf"
              className="flex items-center gap-1 text-orange-300 hover:text-white transition font-medium text-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              Download Trade Catalogue (PDF)
            </a>
            <a
              href={`tel:${initialCompanySettings.phone}`}
              className="flex items-center gap-1.5 text-blue-100 hover:text-orange-300 transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              {initialCompanySettings.phone}
            </a>
          </div>
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
        <ul className="hidden lg:flex items-center gap-6">
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* PDF Catalogue Button */}
          <a
            href="/catalogue/samarth-electronics-catalogue.pdf"
            download="Samarth-Electronics-Catalogue.pdf"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3.5 py-2.5 rounded-lg transition-colors"
            title="Download Official PDF Catalogue"
          >
            <FileDown className="w-4 h-4 text-blue-700" />
            PDF Catalogue
          </a>

          {/* Inquiry Basket Trigger */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative flex items-center gap-2 text-xs font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200/80 px-3.5 py-2.5 rounded-lg transition-all cursor-pointer border border-gray-200"
            aria-label="Open Trade Inquiry Basket"
          >
            <ShoppingBag className="w-4 h-4 text-orange-500" />
            <span>Inquiry List</span>
            {itemCount > 0 ? (
              <span className="bg-orange-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {itemCount}
              </span>
            ) : (
              <span className="text-gray-400 text-[11px] font-normal">(0)</span>
            )}
          </button>

          {/* Primary CTA */}
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors inline-block shadow-xs"
            style={{ color: "#ffffff" }}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile action bar */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Inquiry Cart Icon */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative p-2.5 rounded-lg text-gray-700 bg-gray-50 border border-gray-200 active:bg-gray-100"
            aria-label="Open Inquiry List"
          >
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-5 pt-2 animate-in fade-in duration-150">
          <ul className="space-y-1">
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

            {/* Mobile Trade Actions */}
            <li className="pt-2 border-t border-gray-100 mt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openDrawer();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-blue-50/80 text-blue-900 border border-blue-100"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  <span>View Inquiry List</span>
                </div>
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </button>

              <a
                href="/catalogue/samarth-electronics-catalogue.pdf"
                download="Samarth-Electronics-Catalogue.pdf"
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
              >
                <FileDown className="w-4 h-4 text-blue-700" />
                Download Trade Catalogue (PDF)
              </a>
            </li>

            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block bg-orange-500 text-white text-center py-2.5 rounded-lg font-semibold text-sm shadow-xs"
                style={{ color: "#ffffff" }}
              >
                Get a Quote
              </Link>
            </li>
            <li className="pt-1">
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
