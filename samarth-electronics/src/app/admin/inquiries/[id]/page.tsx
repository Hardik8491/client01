import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone, Mail, Building2, Package, Hash, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { initialInquiries } from "@/lib/seed-data";
import { formatDateTime } from "@/lib/utils";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inquiry Details | Admin CMS" };

const BADGE: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-700 border-orange-200",
  IN_REVIEW: "bg-blue-100 text-blue-700 border-blue-200",
  CONTACTED: "bg-purple-100 text-purple-700 border-purple-200",
  QUOTED: "bg-green-100 text-green-700 border-green-200",
  CLOSED: "bg-gray-100 text-gray-700 border-gray-200",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: Props) {
  const { id } = await params;

  let inquiry: any = null;
  try {
    inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { product: true },
    });
  } catch (err) {
    console.warn("Could not fetch inquiry from DB, checking fallback:", err);
  }

  if (!inquiry) {
    inquiry = initialInquiries.find((i) => i.id === id);
  }

  if (!inquiry) notFound();

  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
  const whatsappMsg = `Hello ${inquiry.name}, thank you for your inquiry about *${
    inquiry.productName || "our commercial lighting/SMPS supply"
  }*. We are reviewing your requirement and will provide an itemized B2B quotation. - Samarth Electronics Hub (Dahod)`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <Link
        href="/admin/inquiries"
        className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Inquiries & Leads
      </Link>

      {/* Header card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
            Commercial Lead Record
          </span>
          <h1 className="text-2xl font-bold text-gray-950">{inquiry.name}</h1>
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            Received on {formatDateTime(inquiry.createdAt)}
          </p>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold border ${
              BADGE[inquiry.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {inquiry.status.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Client Info Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
          Client & Enterprise Profile
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex gap-3 items-start">
            <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
              <Building2 className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Firm / Company Name</div>
              <div className="font-semibold text-sm text-gray-900 mt-0.5">
                {inquiry.companyName || "Proprietorship / Individual Contractor"}
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <Phone className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Direct Phone / WhatsApp</div>
              <a
                href={`tel:${inquiry.phone}`}
                className="font-semibold text-sm text-blue-700 hover:underline mt-0.5 block"
              >
                {inquiry.phone}
              </a>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100">
              <Mail className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Official Email</div>
              <a
                href={`mailto:${inquiry.email}`}
                className="font-semibold text-sm text-blue-700 hover:underline mt-0.5 block"
              >
                {inquiry.email}
              </a>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-orange-50 p-2.5 rounded-xl border border-orange-100">
              <Package className="w-5 h-5 text-orange-700" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Product Line of Interest</div>
              <div className="font-semibold text-sm text-gray-900 mt-0.5">
                {inquiry.productName || "General Catalogue / Turnkey Supply"}
              </div>
            </div>
          </div>

          {inquiry.quantity && (
            <div className="flex gap-3 items-start sm:col-span-2">
              <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100">
                <Hash className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Target Volume / Quantity</div>
                <div className="font-semibold text-sm text-gray-900 mt-0.5">
                  {inquiry.quantity}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Requirement Message */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Customer Requirement Message
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono sm:font-sans">
          {inquiry.message}
        </div>
      </div>

      {/* Response Action Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
            Quick Customer Communication
          </h2>
          <div className="flex flex-wrap gap-3">
            {cleanPhone && (
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> Reply on WhatsApp
              </a>
            )}
            <a
              href={`mailto:${inquiry.email}?subject=Quotation: Samarth Electronics Hub&body=Dear ${inquiry.name},%0A%0AThank you for contacting Samarth Electronics Hub regarding ${inquiry.productName || "your requirements"}.%0A%0A`}
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              <Mail className="w-4 h-4" /> Send Email Quote
            </a>
            <a
              href={`tel:${inquiry.phone}`}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
            >
              <Phone className="w-4 h-4" /> Direct Phone Call
            </a>
          </div>
        </div>

        {/* Live Status & Notes Editor */}
        <div className="pt-6 border-t border-gray-100">
          <InquiryStatusSelect
            inquiryId={inquiry.id}
            currentStatus={inquiry.status}
            initialNotes={inquiry.internalNotes}
          />
        </div>
      </div>
    </div>
  );
}
