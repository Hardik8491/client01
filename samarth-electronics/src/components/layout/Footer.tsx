import Link from "next/link";
import { Zap, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-800 rounded-lg p-2">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <span className="font-bold text-white text-lg block leading-none">Samarth</span>
                <span className="text-orange-400 text-xs font-semibold tracking-widest">ELECTRONICS</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              B2B electronics manufacturing and PCBA assembly enterprise led by{" "}
              <span className="text-white">Gopal Bhammar</span>. Based in Rajkot, Gujarat, delivering
              industrial-grade electronics to manufacturers across India.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20Samarth%20Electronics%2C%20I%20have%20a%20business%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
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
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Get a Quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Industrial Electronic Controllers",
                "SMPS & Power Supplies",
                "IoT Sensor Nodes & Gateways",
                "Motor Drivers & Speed Regulators",
                "Relay Modules & SSR",
              ].map((cat) => (
                <li key={cat}>
                  <Link href="/products" className="hover:text-orange-400 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Plot No. 42, GIDC Industrial Estate, Rajkot, Gujarat — 360003</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:contact@samarthelectronics.in" className="hover:text-orange-400 transition-colors">
                  contact@samarthelectronics.in
                </a>
              </li>
              <li className="text-xs text-gray-500 mt-2">Mon – Sat: 9:00 AM – 7:00 PM (IST)</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Samarth Electronics. All rights reserved.</p>
          <p>GST: 24AABCS1234F1Z5 | Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
