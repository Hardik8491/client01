import Link from "next/link";
import { MessageSquare, Eye } from "lucide-react";
import { initialInquiries } from "@/lib/seed-data";
import { formatDateTime } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inquiries" };

const BADGE_COLORS: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-700",
  IN_REVIEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-purple-100 text-purple-700",
  QUOTED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
};

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminInquiriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params.status || "";
  const inquiries = statusFilter
    ? initialInquiries.filter((i) => i.status === statusFilter)
    : initialInquiries;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500 text-sm mt-1">{inquiries.length} inquiries</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["", "NEW", "IN_REVIEW", "CONTACTED", "QUOTED", "CLOSED"].map((s) => (
          <Link
            key={s}
            href={`/admin/inquiries${s ? `?status=${s}` : ""}`}
            className={`px-4 py-2 text-sm rounded-xl font-medium transition-colors ${statusFilter === s ? "bg-blue-800 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {s ? s.replace("_", " ") : "All Statuses"}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Client</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Product Interest</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Quantity</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Received</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 text-sm">{inq.name}</div>
                    <div className="text-xs text-gray-500">{inq.companyName}</div>
                    <div className="text-xs text-gray-400">{inq.email}</div>
                    <div className="text-xs text-blue-600 font-medium">{inq.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-[200px]">
                    <div className="line-clamp-2">{inq.productName || "General Inquiry"}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inq.quantity || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[inq.status]}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{formatDateTime(inq.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/inquiries/${inq.id}`} className="inline-flex items-center gap-1 text-blue-700 text-xs font-medium hover:text-blue-900">
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {inquiries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No inquiries found</p>
          </div>
        )}
      </div>
    </div>
  );
}
