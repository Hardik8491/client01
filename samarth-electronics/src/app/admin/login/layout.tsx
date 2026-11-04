import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Login", template: "%s | Samarth Admin" },
  robots: { index: false, follow: false },
};

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
