import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Award, Users, Factory, ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { initialCompanySettings } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Samarth Electronics Hub — Gujarat's reliable LED lighting and electrical products enterprise led by Gopalbhai Bhammar and Lokeshkumar Solaki.",
};

const MILESTONES = [
  { year: "2026", event: "Official Partnership incorporation of SAMARTH ELECTRONICS HUB in Dahod, Gujarat" },
  { year: "2026", event: "Udyam MSME Micro-Enterprise Registration (UDYAM-GJ-07-0040753) for manufacturing & electrical trade" },
  { year: "2026", event: "GST Registration Form GST REG-06 approved under GSTIN 24AGBFS1171R1ZM" },
  { year: "2026", event: "Applied for Trademark registration for SAMARTH ELECTRONICS HUB under Class 9" },
  { year: "2026", event: "Rolled out comprehensive 100+ product OEM lighting catalogue & SMPS driver distribution" },
];

const VALUES = [
  { icon: Award, title: "Product Reliability", desc: "Offering industry-backed products with up to 27 months driver and PC-to-PC guarantees." },
  { icon: Users, title: "Long-term Trade Partnerships", desc: "Serving retail partners, electrical contractors, and commercial builders with honest trade terms." },
  { icon: Factory, title: "Wide Supply Network", desc: "Panels, COBs, streetlights, floodlights, and SMPS power supplies readily available for distribution." },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">
              Illuminating Spaces Across Gujarat & India
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              We are <strong>SAMARTH ELECTRONICS HUB</strong> — an established electrical and LED lighting
              firm headquartered in Limdi, Dahod District, Gujarat, dedicated to delivering dependable lighting
              fixtures and solid-state drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=900&q=80"
                alt="Samarth Electronics Hub Leadership"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Enterprise Leadership</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Partnership Dedicated to Quality & Transparency
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                SAMARTH ELECTRONICS HUB is constituted as a partnership enterprise authorized and actively managed by{" "}
                <strong>Bhammar Gopalbhai Rambhai</strong> and <strong>Solaki Lokeshkumar Rameshbhai</strong>.
                Based out of Dahod district, Gujarat, our vision is to simplify access to premium LED illumination
                technologies for builders, electrical contractors, and retail shops.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our portfolio spans architectural slim panels, deep and mini downlights, precision COBs, heavy-duty
                floodlights, streetlights, and robust SMPS power supplies. Every customer transaction is backed by
                genuine GST invoices and transparent warranty terms.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With verified micro-enterprise registration with the Ministry of MSME and full GST statutory compliance,
                we strive to build enduring relationships founded on fair pricing, swift delivery, and consistent product quality.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "GSTIN: 24AGBFS1171R1ZM",
                  "Udyam Reg: UDYAM-GJ-07-0040753",
                  "Registered in Dahod, Gujarat",
                  "Trademark Application Class 9 Filed",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Principles</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Enterprise Journey</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Milestones & Certifications</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
            <div className="space-y-8">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  <div className="relative z-10 w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {m.year}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 flex-1 shadow-sm border border-gray-100">
                    <p className="text-gray-700 font-medium">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Discuss Your Electrical & Lighting Project</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Connect with Gopalbhai Bhammar or our sales desk for wholesale quotes, bulk shipments, and catalog inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${initialCompanySettings.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us ({initialCompanySettings.phone})
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
