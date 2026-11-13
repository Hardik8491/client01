import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { initialCompanySettings, initialCategories } from "@/lib/seed-data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo-white.png"
                  alt="SAMARTH Logo"
                  width={160}
                  height={50}
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">
                  ELECTRONICS HUB
                </span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-400 text-xs">Dahod, Gujarat</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your dependable source for energy-efficient commercial LED lighting, architectural fixtures, and heavy-duty SMPS drivers.
            </p>
            <a
              href={`https://wa.me/${initialCompanySettings.whatsapp.replace(/\+/g, "")}?text=Hello%20Samarth%20Electronics%20Hub%2C%20I%20have%20a%20business%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg transition font-medium shadow-sm"
              style={{ color: "#ffffff", backgroundColor: "#047857" }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }}>WhatsApp Us</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Product Catalogue" },
                { href: "/services", label: "Capabilities & Supply" },
                { href: "/contact", label: "Get a Quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="/catalogue/samarth-electronics-catalogue.pdf"
                  download="Samarth-Electronics-Catalogue.pdf"
                  className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  <span>Download PDF Catalogue</span>
                  <span className="text-xs bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded">PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product Families</h3>
            <ul className="space-y-2 text-sm">
              {initialCategories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.slug}`} className="hover:text-orange-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>{initialCompanySettings.address}, {initialCompanySettings.city}, Gujarat — {initialCompanySettings.pincode}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${initialCompanySettings.phone}`} className="hover:text-orange-400 transition-colors">
                  {initialCompanySettings.phone}
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`mailto:${initialCompanySettings.email}`} className="hover:text-orange-400 transition-colors">
                  {initialCompanySettings.email}
                </a>
              </li>
              <li className="text-xs text-gray-500 mt-2">{initialCompanySettings.workingHours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {initialCompanySettings.companyName}. All rights reserved.</p>
          <p>Dahod, Gujarat • Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
