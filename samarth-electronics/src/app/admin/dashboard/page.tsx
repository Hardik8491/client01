import Link from "next/link";
import { Package, Tags, MessageSquare, TrendingUp, Clock, Eye, Plus, ArrowRight } from "lucide-react";
import { initialProducts, initialCategories, initialInquiries } from "@/lib/seed-data";
import { formatDateTime } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  const publishedProducts = initialProducts.filter((p) => p.status === "PUBLISHED").length;
  const draftProducts = initialProducts.filter((p) => p.status === "DRAFT").length;
  const newInquiries = initialInquiries.filter((i) => i.status === "NEW").length;
  const recentInquiries = initialInquiries.slice(0, 5);

  const STATS = [
    { label: "Total Products", value: initialProducts.length, icon: Package, color: "blue", href: "/admin/products" },
    { label: "Published", value: publishedProducts, icon: Eye, color: "green", href: "/admin/products" },
    { label: "Drafts", value: draftProducts, icon: Clock, color: "yellow", href: "/admin/products" },
    { label: "Total Inquiries", value: initialInquiries.length, icon: MessageSquare, color: "purple", href: "/admin/inquiries" },
    { label: "New Inquiries", value: newInquiries, icon: TrendingUp, color: "orange", href: "/admin/inquiries" },
    { label: "Categories", value: initialCategories.length, icon: Tags, color: "indigo", href: "/admin/categories" },
  ];

  const BADGE_COLORS: Record<string, string> = {
    NEW: "bg-orange-100 text-orange-700",
    IN_REVIEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-purple-100 text-purple-700",
    QUOTED: "bg-green-100 text-green-700",
    CLOSED: "bg-gray-100 text-gray-600",
  };

  const STAT_COLORS: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Gopal. Here&apos;s your business overview.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${STAT_COLORS[stat.color]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-blue-700 text-sm font-medium hover:text-blue-900">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-3 uppercase tracking-wider">Client</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-3 uppercase tracking-wider">Product</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-3 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-3 uppercase tracking-wider">Received</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 text-sm">{inq.name}</div>
                    <div className="text-xs text-gray-500">{inq.companyName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                    {inq.productName || "General Inquiry"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[inq.status]}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{formatDateTime(inq.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/inquiries/${inq.id}`} className="text-blue-700 text-xs font-medium hover:underline">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid sm:grid-cols-3 gap-5">
        {[
          { href: "/admin/products/new", label: "Add New Product", icon: Package, color: "bg-blue-800" },
          { href: "/admin/categories", label: "Manage Categories", icon: Tags, color: "bg-indigo-700" },
          { href: "/admin/settings", label: "Company Settings", icon: Tags, color: "bg-gray-700" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`${action.color} text-white rounded-2xl p-5 flex items-center gap-4 hover:opacity-90 transition-opacity`}
          >
            <action.icon className="w-7 h-7 opacity-80" />
            <span className="font-semibold">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
