import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Award, Users, Factory, ArrowRight, MessageCircle, Phone, Mail, MapPin, FileText, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { initialCompanySettings } from "@/lib/seed-data";
import { getPageSection } from "@/actions/page-actions";
import TestimonialsSection from "@/components/common/TestimonialsSection";
import { TestimonialItem } from "@/lib/page-content-defaults";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SAMARTH ELECTRONICS HUB — Dahod, Gujarat partnership enterprise dealing in LED lighting, electrical products, and drivers. Meet our founders Gopalbhai Bhammar and Lokeshkumar Solanki.",
};

const PARTNERS = [
  {
    name: "Bhammar Gopalbhai Rambhai",
    role: "Managing Partner",
    phone: "+91 96242 34603",
    email: "bhammargopal3@gmail.com",
    focus: "Technical oversight, product catalogue selection, OEM supplier relations, and key trade accounts.",
    bio: "Driving the operational and product vision for Samarth Electronics Hub. Gopalbhai oversees quality assurance, driver compatibility testing, and wholesale dispatch operations.",
  },
  {
    name: "Solanki Lokesh Kumar Rameshbhai",
    role: "Partner",
    officialRecordNote: "Recorded as SOLAKI LOKESHKUMAR RAMESHBHAI in GST records",
    phone: "+91 93130 62650",
    email: "smarthelectronicshub9@gmail.com",
    focus: "Client partnerships, regional trade distribution, customer inquiries, and commercial logistics.",
    bio: "Focusing on market expansion, trade relationships with electrical retailers and contractors across Gujarat, and streamlined order fulfillment.",
  },
];

const MILESTONES = [
  {
    date: "31 August 2026",
    title: "Commencement of Business",
    detail: "Official inception and operational commencement of SAMARTH ELECTRONICS HUB in Limdi, Dahod District, Gujarat.",
  },
  {
    date: "11 September 2026",
    title: "MSME Udyam Micro Enterprise Registration",
    detail: "Formally registered under Udyam (UDYAM-GJ-07-0040753) under Major Activity 'Manufacturing' and NIC 47594 for retail electrical & lighting goods.",
  },
  {
    date: "12 September 2026",
    title: "Trademark Application Class 9",
    detail: "Computer Generated TM application (App No. 7993579) filed for brand protection of 'SAMARTH ELECTRONICS HUB' across Class 9 apparatus.",
  },
  {
    date: "07 October 2026",
    title: "Regular GST Registration Approved",
    detail: "Form GST REG-06 issued by Government of India approving regular partnership registration under GSTIN 24AGBFS1171R1ZM.",
  },
  {
    date: "Present",
    title: "Catalogue & Wholesale Supply",
    detail: "Active distribution of 32+ product families spanning LED panels, downlights, COBs, streetlights, floodlights, and SMPS power supplies.",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Genuine Guarantees",
    desc: "We stand behind our products with up to 27 months driver and PC replacement coverage on eligible series.",
  },
  {
    icon: Users,
    title: "Direct Trade Relationship",
    desc: "Direct communication with the business partners — ensuring fast quotation, transparent pricing, and zero middleman friction.",
  },
  {
    icon: Factory,
    title: "Wide Product Availability",
    desc: "Comprehensive selection from residential 3W spot fixtures to 600W industrial floodlights and 33A waterproof SMPS units.",
  },
];

export default async function AboutPage() {
  const header = await getPageSection("about", "header");
  const story = await getPageSection("about", "story");
  const testimonials = await getPageSection<TestimonialItem[]>("global", "testimonials");

  return (
    <>
      {/* ── HEADER ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
              {header.tagline || "Company Profile"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">
              {header.title || "About SAMARTH ELECTRONICS HUB"}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              {header.subtitle ||
                "Based in Limdi, Dahod District, Gujarat, SAMARTH ELECTRONICS HUB is dedicated to providing dependable LED illumination and solid-state electrical drivers for homes, commercial establishments, and industrial projects."}
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPANY BACKGROUND & STORY ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                {story.tagline || "Our Enterprise"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                {story.title || "Illumination Engineering & Quality Electrical Distribution"}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                {story.p1 || "SAMARTH ELECTRONICS HUB was established on 31 August 2026 as a partnership firm in Dahod district, Gujarat. Built on the core principle of delivering reliable lighting hardware backed by manufacturer warranties, we bridge the gap between quality manufacturing and on-ground electrical project needs."}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {story.p2 || "Our portfolio spans architectural slim panels, deep recessed and mini downlights, high-CRI COB spotlights, heavy-duty industrial floodlights, public street luminaires, and continuous-duty SMPS power supplies (2A to 33.3A). Every order is supplied with genuine GST tax invoices and tested component standards."}
              </p>
              {story.p3 && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {story.p3}
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  "Firm Type: Partnership",
                  "Major Activity: Manufacturing & Trade",
                  "Location: Limdi, Dahod, Gujarat",
                  "Class 9 TM Application: 7993579",
                  "Government GST Approved",
                  "Ministry of MSME Registered",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative bg-gray-100 border border-gray-200">
              <Image
                src="/images/products/led-panel-slim.jpg"
                alt="Samarth Electronics Hub Lighting Solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDERS & PARTNERS SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Meet the Partners</h2>
            <p className="text-gray-600 text-sm mt-3">
              Direct access to our business owners for bulk quotations, trade pricing, and project support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1">
                        {partner.role}
                      </span>
                      {partner.officialRecordNote && (
                        <p className="text-xs text-gray-400 mt-1 italic">{partner.officialRecordNote}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{partner.bio}</p>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                      Key Responsibilities
                    </span>
                    <p className="text-sm text-gray-700">{partner.focus}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100 text-sm">
                  <a
                    href={`tel:${partner.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{partner.phone}</span>
                  </a>
                  <a
                    href={`mailto:${partner.email}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{partner.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Commitment</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICIAL REGISTRATIONS & TIMELINE ─────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Verification & Compliance</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Official Registrations</h2>
            <p className="text-gray-500 text-sm mt-2">
              Every detail verified against our statutory government certificates and filings.
            </p>
          </div>

          <div className="space-y-6">
            {MILESTONES.map((m) => (
              <div
                key={m.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <h3 className="font-bold text-gray-900 text-base">{m.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{m.detail}</p>
                </div>
                <span className="shrink-0 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {m.date}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 mb-6 border-b border-gray-100">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="SAMARTH Registered Trademark Logo"
                  width={200}
                  height={66}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-1">
                  Registered Brand Identity (Class 9)
                </span>
                <h4 className="text-lg font-bold text-gray-900">Official SAMARTH™ Brand Mark</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Application No. 7993579 • Proprietary logo mark representing Samarth Electronics Hub lighting and solid-state driver solutions.
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider text-center sm:text-left">
              Official Registered Details
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold block text-gray-800 mb-1">GST Registration:</span>
                GSTIN: 24AGBFS1171R1ZM • Regular • Issue Date: 07/10/2026
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold block text-gray-800 mb-1">MSME Udyam:</span>
                UDYAM-GJ-07-0040753 • Micro Enterprise • DIC: Dahod
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold block text-gray-800 mb-1">Principal Place of Business:</span>
                Ambli Faliyu, Karamba Road, Jhalod, Limdi, Dahod, Gujarat — 389180
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold block text-gray-800 mb-1">Trademark Search:</span>
                Application No: 7993579 • Class 9 • Status: Send To Vienna Codification
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT & CONTRACTOR FEEDBACK ──────────────────────────────────── */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ── CALL TO ACTION ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner with Samarth Electronics Hub</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Connect directly with partners Gopalbhai Bhammar and Lokeshkumar Solanki for wholesale rates, bulk orders, and trade quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
              style={{ color: "#ffffff", backgroundColor: "#f97316" }}
            >
              <span style={{ color: "#ffffff" }}>Contact Us</span>
              <ArrowRight className="w-5 h-5 text-white" style={{ color: "#ffffff" }} />
            </Link>
            <a
              href={`https://wa.me/${initialCompanySettings.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
              style={{ color: "#ffffff", backgroundColor: "#047857" }}
            >
              <MessageCircle className="w-5 h-5" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }}>WhatsApp Desk ({initialCompanySettings.phone})</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
