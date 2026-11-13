"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { initialCompanySettings } from "@/lib/seed-data";

export default function InquiryForm() {
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
          Thank you! We have received your inquiry and will contact you promptly.
          For urgent requirements, WhatsApp us directly.
        </p>
        <a
          href={`https://wa.me/${initialCompanySettings.whatsapp.replace(/\+/g, "")}?text=Hello%20Samarth%20Electronics%20Hub%2C%20I%20just%20submitted%20an%20inquiry.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          style={{ color: "#ffffff" }}
        >
          <MessageCircle className="w-5 h-5 text-white" /> Follow Up on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
          <input
            name="name"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Ramesh Patel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company / Shop Name</label>
          <input
            name="companyName"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Patel Electricals"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ramesh@company.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone / WhatsApp Number *</label>
          <input
            name="phone"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+91 96242 34603"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product of Interest</label>
          <input
            name="productName"
            defaultValue={productName}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Slim Panel 15W, Grace COB"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Required</label>
          <input
            name="quantity"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 50 pcs, 200 units"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Requirement / Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Please describe your requirements — model names, colour preference (white/warm white/3-in-1), driver types, and delivery location..."
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
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
        style={{ color: "#ffffff", backgroundColor: "#f97316" }}
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
        We respond to all trade inquiries promptly. Your contact details remain confidential.
      </p>
    </form>
  );
}
