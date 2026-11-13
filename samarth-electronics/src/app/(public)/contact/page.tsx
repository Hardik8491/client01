import { Suspense } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Navigation } from "lucide-react";
import type { Metadata } from "next";
import { initialCompanySettings } from "@/lib/seed-data";
import FAQSection from "@/components/common/FAQSection";
import InquiryForm from "@/components/contact/InquiryForm";
import { getPageSection } from "@/actions/page-actions";
import { FAQItemData } from "@/lib/page-content-defaults";

export const metadata: Metadata = {
  title: "Contact & Factory Depot",
  description:
    "Connect with Samarth Electronics Hub in Limdi, Dahod, Gujarat. Direct wholesale trade quotations for commercial LED fixtures and SMPS power supplies.",
};

const CONTACT_INFO = [
  { icon: Phone, label: "Partner 1: Bhammar Gopalbhai Rambhai", value: "+91 96242 34603", href: "tel:+919624234603" },
  { icon: Phone, label: "Partner 2: Solanki Lokesh Kumar Rameshbhai", value: "+91 93130 62650", href: "tel:+919313062650" },
  { icon: MessageCircle, label: "WhatsApp Desk", value: "+91 96242 34603", href: "https://wa.me/919624234603" },
  { icon: Mail, label: "Business Email (Shared)", value: "smarthelectronicshub9@gmail.com", href: "mailto:smarthelectronicshub9@gmail.com" },
  { icon: Mail, label: "Registered Email (Udyam)", value: "bhammargopal3@gmail.com", href: "mailto:bhammargopal3@gmail.com" },
  { icon: MapPin, label: "Registered Principal Place of Business", value: "Ambli Faliyu, Karamba Road, Jhalod, Limdi / Limadi, Dahod, Gujarat — 389180" },
  { icon: Clock, label: "Working Hours", value: "Monday – Saturday: 10:00 AM – 7:00 PM IST" },
];

export default async function ContactPage() {
  const header = await getPageSection("contact", "header");
  const depot = await getPageSection("contact", "depot");
  const faqs = await getPageSection<FAQItemData[]>("global", "faqs");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
              {header.tagline || "Get in Touch"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">
              {header.title || "Connect with Samarth Electronics Hub"}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              {header.subtitle ||
                "Reach out directly to Gopalbhai Bhammar or Lokeshkumar Solanki for product quotations, wholesale trade orders, or lighting inquiries."}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <ul className="space-y-5">
                  {CONTACT_INFO.map((info) => (
                    <li key={info.label} className="flex gap-4 items-start">
                      <div className="bg-blue-50 rounded-lg p-2.5 shrink-0">
                        <info.icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm font-medium text-gray-900 hover:text-blue-700 transition-colors"
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{info.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick WhatsApp */}
              <div className="bg-green-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Prefer Instant WhatsApp?</h3>
                <p className="text-green-100 text-sm mb-5">
                  Chat directly with our team for quickest rates, stock inquiries, and catalogue photos.
                </p>
                <a
                  href={`https://wa.me/${initialCompanySettings.whatsapp.replace(/\+/g, "")}?text=Hello%20Samarth%20Electronics%20Hub%2C%20I%20have%20an%20inquiry%20regarding%20LED%20lighting.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-md border border-white/20"
                  style={{ color: "#ffffff", backgroundColor: "#047857" }}
                >
                  <MessageCircle className="w-5 h-5 text-white" style={{ color: "#ffffff" }} />
                  <span style={{ color: "#ffffff" }}>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-7">Send Us Your Product Requirement</h2>
              <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP & PHYSICAL LOCATION ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Location Details Card */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-orange-400 font-bold text-xs uppercase tracking-widest">
                  {depot.tagline || "Physical Depot Location"}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-4">
                  {depot.title || "Visit Our Limdi Hub"}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-6">
                  {depot.desc ||
                    "Our operational depot and registered place of business is located in Limdi, Dahod district, conveniently accessible from the Karamba-Jhalod road."}
                </p>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Full Address:</span>
                      <span className="text-blue-100">
                        {depot.fullAddress ||
                          "Ambli Faliyu, Karamba Road, Jhalod, Limdi / Limadi, Dahod, Gujarat — 389180"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Logistics Landmark:</span>
                      <span className="text-blue-100">
                        {depot.landmark ||
                          "Karamba Road Junction • Direct transport dispatch to MP & Rajasthan border corridors"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Depot Timings:</span>
                      <span className="text-blue-100">
                        {depot.timings || "Monday – Saturday: 10:00 AM – 7:00 PM (IST)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-blue-800/80 mt-6">
                <a
                  href="https://maps.google.com/?q=Limdi+Dahod+Gujarat+389180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-3 px-5 rounded-xl transition-colors shadow-sm"
                  style={{ color: "#ffffff" }}
                >
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Google Maps Responsive Embed */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-sm border border-gray-200 min-h-[380px] sm:min-h-[440px] relative bg-gray-100">
              <iframe
                title="Samarth Electronics Hub Location Map"
                src="https://maps.google.com/maps?q=Limdi,+Dahod,+Gujarat+389180&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px] sm:min-h-[440px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B FAQ ─────────────────────────────────────────────────────────── */}
      <FAQSection faqs={faqs} />
    </>
  );
}
