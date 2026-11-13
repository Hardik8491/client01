import Link from "next/link";
import { MessageSquare, Eye, MessageCircle, Phone, Mail, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { initialInquiries } from "@/lib/seed-data";
import { formatDateTime } from "@/lib/utils";
import ExportInquiriesButton from "@/components/admin/ExportInquiriesButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inquiries & Leads | Admin CMS" };

const BADGE_COLORS: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-700 border-orange-200",
  IN_REVIEW: "bg-blue-100 text-blue-700 border-blue-200",
  CONTACTED: "bg-purple-100 text-purple-700 border-purple-200",
  QUOTED: "bg-green-100 text-green-700 border-green-200",
  CLOSED: "bg-gray-100 text-gray-500 border-gray-200",
};

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminInquiriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params.status || "";

  let dbInquiries: any[] = [];
  try {
    dbInquiries = await prisma.inquiry.findMany({
      where: statusFilter ? { status: statusFilter as any } : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("Could not query DB for inquiries, using fallback:", err);
  }

  // If DB returned inquiries, use them. Otherwise fallback to seed data.
  const rawList = dbInquiries.length > 0 ? dbInquiries : initialInquiries;
  const inquiries = statusFilter
    ? rawList.filter((i) => i.status === statusFilter)
    : rawList;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
            B2B Commercial Leads & RFQs
          </span>
          <h1 className="text-2xl font-bold text-gray-950">Inquiries & Quotation Requests</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {inquiries.length} total customer leads across Gujarat and inter-state trade
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportInquiriesButton inquiries={inquiries} />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "", label: "All Statuses" },
          { key: "NEW", label: "New Leads" },
          { key: "IN_REVIEW", label: "In Review" },
          { key: "CONTACTED", label: "Contacted" },
          { key: "QUOTED", label: "Quotation Sent" },
          { key: "CLOSED", label: "Closed" },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/inquiries${tab.key ? `?status=${tab.key}` : ""}`}
            className={`px-4 py-2 text-xs sm:text-sm rounded-xl font-semibold transition-all ${
              statusFilter === tab.key
                ? "bg-blue-900 text-white shadow-sm ring-2 ring-blue-900/20"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-xs font-semibold text-gray-600 px-6 py-4 uppercase tracking-wider">
                  Client & Firm
                </th>
                <th className="text-xs font-semibold text-gray-600 px-6 py-4 uppercase tracking-wider">
                  Product Requirement
                </th>
                <th className="text-xs font-semibold text-gray-600 px-6 py-4 uppercase tracking-wider">
                  Volume / Qty
                </th>
                <th className="text-xs font-semibold text-gray-600 px-6 py-4 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-xs font-semibold text-gray-600 px-6 py-4 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right text-xs font-semibold text-gray-600 px-6 py-4 uppercase tracking-wider">
                  Quick Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inq) => {
                const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, "") : "";
                const waMessage = encodeURIComponent(
                  `Hello ${inq.name}, thank you for your requirement regarding ${
                    inq.productName || "our commercial lighting/SMPS supply"
                  }. - Samarth Electronics Hub (Dahod)`
                );

                return (
                  <tr key={inq.id} className="hover:bg-gray-50/75 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-950 text-sm">{inq.name}</div>
                      {inq.companyName && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                          <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{inq.companyName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:${inq.phone}`}
                          className="text-xs font-medium text-blue-700 hover:underline"
                        >
                          {inq.phone}
                        </a>
                        <span className="text-gray-300">•</span>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-gray-500 hover:text-gray-700 truncate max-w-[160px]"
                        >
                          {inq.email}
                        </a>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 max-w-[240px]">
                      <div className="font-medium text-gray-900 line-clamp-1">
                        {inq.productName || "General Trade Inquiry"}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{inq.message}</p>
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-gray-700 whitespace-nowrap">
                      {inq.quantity ? (
                        <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">
                          {inq.quantity}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          BADGE_COLORS[inq.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inq.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {formatDateTime(inq.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${waMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={`tel:${inq.phone}`}
                          title="Call Client"
                          className="p-1.5 rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/inquiries/${inq.id}`}
                          className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {inquiries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30 text-gray-500" />
            <p className="text-base font-semibold text-gray-700">No inquiries found</p>
            <p className="text-xs text-gray-500 mt-1">
              New customer inquiries from the website and RFQ cart will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
