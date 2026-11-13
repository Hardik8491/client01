import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { initialServices, initialCompanySettings } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Lighting Supply & B2B Solutions | Samarth Electronics Hub",
  description: "Wholesale LED lighting supply, solid-state SMPS driver distribution, and bulk trade support for contractors and retailers.",
};

export default function ServicesPage() {
  const whatsappNumber = initialCompanySettings.whatsapp.replace(/\D/g, "");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">Services & Solutions</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Wholesale lighting supply, project consultation, and solid-state LED driver distribution based in Limdi, Dahod District, Gujarat.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {initialServices.map((service, idx) => (
            <div
              key={service.id}
              className={`grid lg:grid-cols-2 gap-14 items-center ${idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                  Service 0{idx + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-5">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-700 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  style={{ color: "#ffffff" }}
                >
                  <span style={{ color: "#ffffff" }}>Enquire About This Service</span>
                  <ArrowRight className="w-4 h-4 text-white" style={{ color: "#ffffff" }} />
                </Link>
              </div>
              <div className={`rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative ${idx % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <Image
                  src={service.imageUrl || "/images/products/led-panel-slim.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Lighting or Wholesale Quote?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Tell us about your project or bulk stock requirement. We&apos;ll provide a competitive trade quotation and technical guidance within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors shadow-md"
              style={{ color: "#0f172a", backgroundColor: "#ffffff" }}
            >
              <span style={{ color: "#0f172a" }}>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5" style={{ color: "#0f172a" }} />
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Samarth%20Electronics%20Hub%2C%20I%20would%20like%20to%20request%20a%20free%20quote%20for%20LED%20lighting%20fixtures.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md"
              style={{ color: "#ffffff", backgroundColor: "#047857" }}
            >
              <MessageCircle className="w-5 h-5" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }}>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

