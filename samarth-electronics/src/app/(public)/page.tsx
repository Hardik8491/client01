import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Shield, Cpu, Zap, Users, Award, Factory,
  CheckCircle, Phone, MessageCircle, ChevronRight
} from "lucide-react";
import { initialProducts, initialCategories, initialServices } from "@/lib/seed-data";

const STATS = [
  { label: "Years of Experience", value: "12+" },
  { label: "Products Manufactured", value: "500+" },
  { label: "B2B Clients Served", value: "250+" },
  { label: "Units Shipped / Year", value: "50K+" },
];

const WHY_CHOOSE = [
  { icon: Shield, title: "Proven Reliability", desc: "Every board undergoes 100% testing and 48-hour burn-in validation before dispatch." },
  { icon: Cpu, title: "Deep Technical Expertise", desc: "In-house design, firmware, and manufacturing under one roof for faster iterations." },
  { icon: Zap, title: "Rapid Turnaround", desc: "Prototypes in 10–14 days. Volume orders dispatched on schedule, every time." },
  { icon: Users, title: "Dedicated Account Manager", desc: "Direct communication with Gopal Bhammar for key account partnerships." },
  { icon: Award, title: "Quality Certified", desc: "IPC-A-610 Class 2/3 workmanship. Conformal coating and RoHS-compliant processes." },
  { icon: Factory, title: "Scalable Volumes", desc: "From 50-unit prototypes to 50,000-unit production runs — we scale with you." },
];

export default function HomePage() {
  const featuredProducts = initialProducts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-6">
              <Zap className="w-4 h-4" /> Rajkot, Gujarat • B2B Electronics OEM Partner
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              High-Precision
              <span className="text-orange-400 block">Electronics</span>
              Manufacturing
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-xl leading-relaxed">
              Trusted by 250+ manufacturers across India for industrial controllers,
              SMPS power supplies, IoT gateways, and custom PCBA — engineered for the
              harshest industrial environments.
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
                Browse Products <ChevronRight className="w-5 h-5" />
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
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                India&apos;s Trusted Industrial Electronics Manufacturing Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Samarth Electronics is a premier B2B electronics manufacturing enterprise led by{" "}
                <strong>Gopal Bhammar</strong>. For over 12 years, we have engineered rugged, industrial-grade
                controllers, power supplies, IoT gateways, and custom PCBA assemblies that power factories,
                energy systems, and OEM products across India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We are not a retail electronics vendor — we are your design-to-manufacture partner. From
                circuit schematic to functional tested finished product, every step happens in our Rajkot facility.
              </p>
              <ul className="space-y-3">
                {[
                  "Full-service PCBA: SMT + THT assembly with AOI inspection",
                  "Custom hardware design and embedded firmware development",
                  "Turnkey box-build assembly with branding and packaging",
                  "ISO-aligned quality processes with full unit traceability",
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
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
                alt="Samarth Electronics Manufacturing Facility"
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
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">What We Make</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Product Categories</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From precision controllers to ruggedized IoT hardware — our catalogue covers every industrial electronics need.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={cat.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=70"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{cat.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-blue-600 text-sm font-medium">
                    View Products <ChevronRight className="w-4 h-4" />
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
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Featured</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Popular Products</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
              return (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
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
                  <div className="p-5">
                    <div className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-wide">
                      {product.category?.name || "Electronics"}
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 text-center border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/contact?product=${product.slug}&productName=${encodeURIComponent(product.name)}`}
                        className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                      >
                        Inquire Now
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
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">Manufacturing Capabilities</h2>
            <p className="text-blue-200 mt-3 max-w-xl mx-auto">
              End-to-end electronics manufacturing from design to packaged product delivery.
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
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Why Samarth</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Why Manufacturers Choose Us</h2>
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
            Ready to Start Your Electronics Project?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Talk to our engineering team. Get a no-obligation technical discussion and quotation within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <Phone className="w-5 h-5" /> Request a Quote
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Samarth%20Electronics%2C%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

