import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone, Mail, Building2, Package, Hash } from "lucide-react";
import { initialInquiries } from "@/lib/seed-data";
import { formatDateTime } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inquiry Details" };

const BADGE: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-700",
  IN_REVIEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-purple-100 text-purple-700",
  QUOTED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
};

interface Props { params: Promise<{ id: string }>; }

export default async function InquiryDetailPage({ params }: Props) {
  const { id } = await params;
  const inquiry = initialInquiries.find((i) => i.id === id);
  if (!inquiry) notFound();

  const whatsappMsg = `Hello ${inquiry.name}, thank you for your inquiry about *${inquiry.productName || "our products"}*. We are reviewing your requirement and will get back to you shortly. - Samarth Electronics`;

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/inquiries" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Inquiries
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{inquiry.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Received {formatDateTime(inquiry.createdAt)}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${BADGE[inquiry.status]}`}>
          {inquiry.status.replace("_", " ")}
        </span>
      </div>

      {/* Client Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-5">Client Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-3 items-start">
            <div className="bg-blue-50 p-2.5 rounded-lg"><Building2 className="w-4 h-4 text-blue-700" /></div>
            <div>
              <div className="text-xs text-gray-500">Company</div>
              <div className="font-medium text-sm text-gray-900">{inquiry.companyName || "Not provided"}</div>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-blue-50 p-2.5 rounded-lg"><Mail className="w-4 h-4 text-blue-700" /></div>
            <div>
              <div className="text-xs text-gray-500">Email</div>
              <a href={`mailto:${inquiry.email}`} className="font-medium text-sm text-blue-700 hover:underline">{inquiry.email}</a>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-blue-50 p-2.5 rounded-lg"><Phone className="w-4 h-4 text-blue-700" /></div>
            <div>
              <div className="text-xs text-gray-500">Phone</div>
              <a href={`tel:${inquiry.phone}`} className="font-medium text-sm text-blue-700 hover:underline">{inquiry.phone}</a>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-blue-50 p-2.5 rounded-lg"><Package className="w-4 h-4 text-blue-700" /></div>
            <div>
              <div className="text-xs text-gray-500">Product Interest</div>
              <div className="font-medium text-sm text-gray-900">{inquiry.productName || "General Inquiry"}</div>
            </div>
          </div>
          {inquiry.quantity && (
            <div className="flex gap-3 items-start">
              <div className="bg-blue-50 p-2.5 rounded-lg"><Hash className="w-4 h-4 text-blue-700" /></div>
              <div>
                <div className="text-xs text-gray-500">Quantity Required</div>
                <div className="font-medium text-sm text-gray-900">{inquiry.quantity}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Inquiry Message</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-4 text-sm">
          {inquiry.message}
        </p>
      </div>

      {/* Internal Notes */}
      {inquiry.internalNotes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-yellow-800 mb-3">Internal Notes</h2>
          <p className="text-yellow-700 text-sm">{inquiry.internalNotes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Response Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Reply via WhatsApp
          </a>
          <a
            href={`mailto:${inquiry.email}?subject=Re: Your Inquiry - Samarth Electronics&body=Dear ${inquiry.name},%0A%0AThank you for your inquiry about ${inquiry.productName || "our products"}.%0A%0A`}
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" /> Reply via Email
          </a>
          <a
            href={`tel:${inquiry.phone}`}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Client
          </a>
        </div>

        {/* Status Update */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="font-medium text-gray-700 mb-3 text-sm">Update Status</h3>
          <div className="flex flex-wrap gap-2">
            {["NEW", "IN_REVIEW", "CONTACTED", "QUOTED", "CLOSED"].map((s) => (
              <button
                key={s}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors border ${inquiry.status === s ? "bg-blue-800 text-white border-blue-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

