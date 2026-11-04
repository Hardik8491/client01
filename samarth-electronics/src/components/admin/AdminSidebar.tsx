"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, Tags, Wrench, FileText,
  MessageSquare, Settings, LogOut, Menu, X, Zap, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminLogout } from "@/actions/auth-actions";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/pages", label: "Page Content", icon: FileText },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await adminLogout();
    router.push("/admin/login");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="bg-blue-800 rounded-lg p-2">
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <div className="font-bold text-blue-900 text-sm leading-none">Samarth</div>
            <div className="text-orange-500 text-xs font-semibold">ADMIN PANEL</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-blue-800 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6 border-t border-gray-100 pt-4">
        <div className="text-xs text-gray-400 px-3 mb-3">Signed in as Admin</div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {loggingOut ? "Signing out..." : "Sign Out"}
        </button>
        <div className="mt-4 text-center">
          <Link href="/" target="_blank" className="text-xs text-blue-600 hover:underline">
            View Public Website ↗
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md p-2.5 rounded-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside className={cn(
        "lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-2xl transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
