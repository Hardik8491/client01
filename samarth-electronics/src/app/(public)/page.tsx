import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Shield, Zap, Award,
  CheckCircle, Phone, MessageCircle, ChevronRight, Lightbulb
} from "lucide-react";
import { initialProducts, initialCategories, initialServices, initialCompanySettings } from "@/lib/seed-data";

const STATS = [
  { label: "Product Lines", value: "30+" },
  { label: "Wattage Options", value: "3W – 600W" },
  { label: "Power Ratings", value: "2A – 33A" },
  { label: "Driver Warranty", value: "Up to 27 Mo" },
];

const WHY_CHOOSE = [
  { icon: Shield, title: "Tested Reliability", desc: "Select product families supported by up to 27 months driver and replacement guarantee." },
  { icon: Lightbulb, title: "Broad Catalogue", desc: "Covers architectural slim panels, downlights, COBs, high-power floodlights, and street lights." },
  { icon: Zap, title: "Regulated Drivers", desc: "Heavy-duty metal, waterproof IP67, sleek pencil, and eco SMPS drivers built for continuous use." },
  { icon: Award, title: "Transparent Billing", desc: "Fully registered enterprise supplying official commercial tax invoices on all trade orders." },
  { icon: MessageCircle, title: "Fast Trade Inquiries", desc: "Direct response on WhatsApp for quick bill of materials estimation and volume discounts." },
  { icon: CheckCircle, title: "Wholesale Delivery", desc: "Competitive trade pricing for electrical retailers, contractors, and project builders." },
];

export default function HomePage() {
  const featuredProducts = initialProducts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-6">
              <Zap className="w-4 h-4" /> Limdi, Dahod, Gujarat • Commercial & Architectural LED Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Lighting Up Every Space with
              <span className="text-orange-400 block">Smart Electrical</span>
              Solutions
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-xl leading-relaxed">
              Explore high-performance LED panel lights, COBs, downlights, heavy-duty floodlights,
              streetlights, and dependable SMPS power drivers engineered for residential, commercial,
              and industrial demands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                Browse Catalogue <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-blue-950/60 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-orange-400">{s.value}</div>
                <div className="text-blue-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY OVERVIEW ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Commercial & Residential Lighting</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Engineered for High Efficacy, Longevity & Value
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                We supply an extensive range of solid-state LED fixtures and power drivers designed for architects, electrical contractors, interior designers, and commercial builders.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From precision anti-glare downlights and colour-tunable slim panels to ruggedized 600W outdoor floodlights and IP67 waterproof drivers, our products deliver consistent lumens and proven thermal reliability.
              </p>
              <ul className="space-y-3">
                {[
                  "Architectural fixtures: Panels, Downlights, COBs, and Linear Track Lights",
                  "Heavy-duty outdoor series: IP-rated Floodlights, High-Bays, and Streetlights",
                  "Regulated power electronics: Eco, Heavy, Waterproof, and Slim Pencil SMPS",
                  "Direct wholesale quotations and immediate dispatch assistance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-blue-700 font-semibold hover:text-blue-900 transition-colors"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=900&q=80"
                alt="Samarth Electronics Hub Lighting Products"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Product Categories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Explore Our Product Range</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Engineered lighting fixtures and power electronics tailored for residences, corporate offices, outdoor environments, and industrial facilities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={cat.image || "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=70"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{cat.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-blue-600 text-sm font-medium">
                    View Range <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Browse Full Catalogue <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Top Picks</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Popular Models</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
              return (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-52 bg-gray-50">
                      {primaryImage && (
                        <Image
                          src={primaryImage.imageUrl}
                          alt={primaryImage.altText || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        Featured
                      </div>
                    </div>
                    <div className="p-5 pb-0">
                      <div className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-wide">
                        SKU: {product.sku}
                      </div>
                      <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 text-center border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/contact?product=${product.slug}&productName=${encodeURIComponent(product.name)}`}
                        className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Business Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">Services & Wholesale Supply</h2>
            <p className="text-blue-200 mt-3 max-w-xl mx-auto">
              Supplying high-efficiency lighting and electrical distribution solutions across Western India.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialServices.map((serv) => (
              <div key={serv.id} className="bg-blue-900/50 border border-blue-800 rounded-xl p-6 hover:bg-blue-800/50 transition-colors">
                <div className="bg-orange-500 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 leading-snug">{serv.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{serv.shortDesc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Built for Performance & Value</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className="bg-blue-50 rounded-xl p-3 h-fit">
                  <item.icon className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Looking for Bulk or Trade Inquiries?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Get in touch with Samarth Electronics Hub today. Contact Gopalbhai Bhammar for instant trade quotations and technical specifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors shadow-sm"
              style={{ color: "#ea580c" }}
            >
              <Phone className="w-5 h-5 text-orange-600" style={{ color: "#ea580c" }} /> Request a Quote
            </Link>
            <a
              href={`https://wa.me/${initialCompanySettings.whatsapp.replace(/\+/g, "")}?text=Hello%20Samarth%20Electronics%20Hub%2C%20I%20want%20to%20inquire%20about%20your%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp: {initialCompanySettings.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
