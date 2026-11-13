import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FileDown, MessageCircle, ShieldCheck, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { initialCompanySettings } from "@/lib/seed-data";
import FAQSection from "@/components/common/FAQSection";

export const metadata: Metadata = {
  title: "Download Official Trade Catalogue (PDF)",
  description:
    "Download the official B2B trade product catalogue & technical specification brochure of Samarth Electronics Hub. Commercial LED panels, floodlights, street lights, and SMPS power drivers.",
};

export default function CataloguePage() {
  const whatsappNumber = initialCompanySettings.whatsapp.replace(/\D/g, "");
  const whatsappCatalogueMsg = encodeURIComponent(
    "Hello Samarth Electronics Hub, please share your latest wholesale trade price list and PDF catalogue on WhatsApp."
  );

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
              Official Literature & Specs
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">
              Trade Product Catalogue (PDF)
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Download our complete technical catalogue for commercial & architectural LED lighting fixtures,
              heavy-duty SMPS drivers, surge ratings, and warranty coverage details.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue Card Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-gray-100 grid md:grid-cols-12 gap-8 items-center">
            {/* Visual Cover Preview */}
            <div className="md:col-span-5 bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              <div className="relative z-10">
                <div className="inline-block bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  2026 Edition
                </div>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/logo-white.png"
                    alt="SAMARTH Logo"
                    width={150}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">
                  B2B Trade Product Catalogue
                </h3>
                <p className="text-xs text-blue-200 mt-2">
                  LED Panels • COBs • Downlights • Floodlights • Streetlights • SMPS
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/20 text-left text-xs text-blue-200 space-y-1">
                <div>GST: {initialCompanySettings.gstNumber}</div>
                <div>Udyam: {initialCompanySettings.udyamNumber}</div>
                <div>Dahod, Gujarat • Limdi Depot</div>
              </div>
            </div>

            {/* Content & Actions */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
                  Ready for Download
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Comprehensive 3-Page Trade Brochure
                </h2>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Includes full technical specifications, available wattage options, lumen outputs,
                  cutout dimensions, surge withstand ratings, and driver warranties up to 27 months.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  "Complete 30+ product lines with standard SKU numbers",
                  "Regulated SMPS drivers (2A – 33A in metal mesh, IP67 & pencil)",
                  "Official enterprise credentials (GSTIN, MSME Udyam, Class 9 TM)",
                  "Clear MOQ guidelines and India-wide road transport terms",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <a
                  href="/catalogue/samarth-electronics-catalogue.pdf"
                  download="Samarth-Electronics-Catalogue.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md text-sm"
                  style={{ color: "#ffffff" }}
                >
                  <FileDown className="w-5 h-5" /> Download PDF Now
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappCatalogueMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md text-sm"
                  style={{ color: "#ffffff", backgroundColor: "#047857" }}
                >
                  <MessageCircle className="w-5 h-5 text-white" /> Request on WhatsApp
                </a>
              </div>

              <p className="text-[11px] text-gray-500">
                Format: Clean Vector PDF (18 KB) • Mobile & Desktop Friendly • Print-Ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />
    </>
  );
}

