"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, Suspense } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react";

function InquiryForm() {
  const params = useSearchParams();
  const productName = params.get("productName") || "";
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<{ success?: boolean; error?: string; loading?: boolean }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ loading: true });
    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) {
        setState({ success: true });
        formRef.current?.reset();
      } else {
        setState({ error: json.error || "Submission failed. Please try again." });
      }
    } catch {
      setState({ error: "Network error. Please try again." });
    }
  }

  if (state.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you! We have received your inquiry and will contact you within 24 business hours.
          For urgent requirements, WhatsApp us directly.
        </p>
        <a
          href="https://wa.me/919876543210?text=Hello%20Samarth%20Electronics%2C%20I%20just%20submitted%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> Follow Up on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
          <input name="name" required className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Rajesh Patel" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
          <input name="companyName" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Gujarat Automation Systems" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Email *</label>
          <input name="email" type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="rajesh@company.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone / WhatsApp *</label>
          <input name="phone" required className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+91 98765 43210" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product / Service of Interest</label>
          <input name="productName" defaultValue={productName} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. Industrial PID Controller" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Required</label>
          <input name="quantity" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. 200 units/month, Prototype batch" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Requirement / Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Please describe your requirement — product specifications, quantities, timeline, any customization needs..."
        />
      </div>
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {state.error}
        </div>
      )}
      <button
        type="submit"
        disabled={state.loading}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors"
      >
        {state.loading ? (
          <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            <Send className="w-5 h-5" /> Send Business Inquiry
          </>
        )}
      </button>
      <p className="text-xs text-gray-500 text-center">
        We respond to all inquiries within 24 business hours. Your information is kept confidential.
      </p>
    </form>
  );
}

const CONTACT_INFO = [
  { icon: Phone, label: "Phone / Call", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
  { icon: Mail, label: "Email", value: "contact@samarthelectronics.in", href: "mailto:contact@samarthelectronics.in" },
  { icon: MapPin, label: "Address", value: "Plot No. 42, GIDC Industrial Estate, Rajkot, Gujarat 360003" },
  { icon: Clock, label: "Working Hours", value: "Monday – Saturday: 9:00 AM – 7:00 PM IST" },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-5">Request a Business Inquiry</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Whether you need a product quotation, custom manufacturing, or prototype development —
              reach out and our team will respond within 24 hours.
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
                          <a href={info.href} className="text-sm font-medium text-gray-900 hover:text-blue-700 transition-colors" target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
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
                <h3 className="font-bold text-lg mb-2">Prefer WhatsApp?</h3>
                <p className="text-green-100 text-sm mb-5">
                  Chat directly with Gopal Bhammar for faster response on urgent requirements.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Gopal%2C%20I%20have%20a%20business%20inquiry%20for%20Samarth%20Electronics."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Open WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-7">Send Us Your Requirement</h2>
              <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

