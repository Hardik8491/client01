"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Truck, Receipt, Wrench, PackageCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const FAQS: FAQItem[] = [
  {
    icon: PackageCheck,
    tag: "Orders & MOQ",
    question: "What is the Minimum Order Quantity (MOQ) for wholesale or dealer pricing?",
    answer:
      "We cater to both commercial lighting contractors and regional electrical retail shops. For standard lines like LED panels, downlights, and regular bulbs, orders can start from single master cartons (typically 10 to 50 pieces per carton depending on the fixture). We also support flexible mixed-carton trial orders for contractors fitting out specific architectural or site requirements.",
  },
  {
    icon: ShieldCheck,
    tag: "Warranty & Replacement",
    question: "What warranty and replacement guarantees are provided on LED fixtures and SMPS drivers?",
    answer:
      "We stand firmly behind our build quality. Fixtures and solid-state SMPS drivers carry standard 1-year to 2+ years (up to 27 months on select premium panel, cob spotlight, and floodlight series) replacement guarantee. For verified electrical or driver defects, we provide fast, direct piece-to-piece replacement from our Limdi, Dahod depot.",
  },
  {
    icon: Truck,
    tag: "Logistics & Transport",
    question: "How are orders dispatched and delivered across Gujarat, MP, Rajasthan, and pan-India?",
    answer:
      "Located strategically in Limdi (Dahod district, close to the Gujarat-MP-Rajasthan transit corridor), we dispatch daily through leading road transport partners including V-Trans, TCI Freight, Maruti, and trusted regional parcel carriers. Bilty / LR tracking details are shared immediately on WhatsApp once the shipment leaves our depot.",
  },
  {
    icon: Receipt,
    tag: "GST & Invoicing",
    question: "Do you supply official GST Tax Invoices for Input Tax Credit (ITC)?",
    answer:
      "Yes, 100%. SAMARTH ELECTRONICS HUB is an officially registered partnership startup holding active GST registration (GSTIN: 24AGBFS1171R1ZM) and MSME Udyam registration (UDYAM-GJ-07-0040753). Every commercial supply is accompanied by an authentic tax invoice with accurate HSN codes (9405 / 8504) for full ITC claims.",
  },
  {
    icon: Wrench,
    tag: "Custom Technical Specs",
    question: "Can we request custom wattages, color temperatures (CCT), or specialized SMPS ratings?",
    answer:
      "Yes. In addition to standard 6500K (Cool Day Light), we supply 3000K (Warm White), 4000K (Neutral White), and 3-in-1 multi-colour toggle panel lights. For SMPS power supplies, we offer ratings from 2A up to 33A in perforated metal, waterproof IP67, sleek pencil, and eco rainproof variants suitable for LED strips, signage, and automation.",
  },
  {
    icon: HelpCircle,
    tag: "Trade Price Lists",
    question: "Why are prices not listed publicly and how do I receive the wholesale rate list?",
    answer:
      "As a B2B supplier, our quotations depend on order volumes, delivery location, and custom technical specifications. To protect our retail partners and project contractors, trade discounts are shared directly via WhatsApp or official quotation. Simply click 'Inquire on WhatsApp' or build your list using our 'Add to Inquiry' tool for instant partner rates.",
  },
];

export default function FAQSection({ className = "" }: { className?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={`py-16 sm:py-20 bg-gray-50/70 border-t border-gray-100 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100/70 text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Trade & Wholesale FAQ
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            Everything electrical contractors, retailers, and architects need to know about
            ordering, warranty claims, GST billing, and logistics from Samarth Electronics Hub.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const Icon = faq.icon;

            return (
              <div
                key={faq.question}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-blue-400/80 shadow-md ring-1 ring-blue-500/10"
                    : "border-gray-200 hover:border-gray-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-blue-900 text-white" : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
                        {faq.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-50 text-blue-900" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                    <div className="pl-12 sm:pl-12.5 pr-2">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Footer */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Have a project with custom requirements?</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Talk directly with founder Gopalbhai Bhammar for tailored lighting schedules & quotes.
            </p>
          </div>
          <a
            href="https://wa.me/919624234603?text=Hello%20Samarth%20Electronics%20Hub%2C%20I%20have%20a%20specific%20lighting%20project%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs shrink-0"
            style={{ color: "#ffffff", backgroundColor: "#047857" }}
          >
            Chat with Director on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
