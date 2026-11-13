"use client";

import React, { useState } from "react";
import { Download, Check, FileSpreadsheet } from "lucide-react";

interface InquiryData {
  id: string;
  name: string;
  companyName?: string | null;
  email: string;
  phone: string;
  productName?: string | null;
  quantity?: string | null;
  message: string;
  status: string;
  createdAt: string | Date;
}

interface Props {
  inquiries: InquiryData[];
}

export default function ExportInquiriesButton({ inquiries }: Props) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    if (!inquiries || inquiries.length === 0) {
      alert("No inquiry records to export.");
      return;
    }

    const headers = [
      "Inquiry ID",
      "Date (IST)",
      "Client Name",
      "Company / Firm",
      "Phone Number",
      "Email Address",
      "Product Required",
      "Quantity / Volume",
      "Status",
      "Requirement / Message",
    ];

    const escapeCsv = (str: string | null | undefined) => {
      if (!str) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = inquiries.map((i) => [
      escapeCsv(i.id),
      escapeCsv(new Date(i.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })),
      escapeCsv(i.name),
      escapeCsv(i.companyName || "N/A"),
      escapeCsv(i.phone),
      escapeCsv(i.email),
      escapeCsv(i.productName || "General Inquiry"),
      escapeCsv(i.quantity || "N/A"),
      escapeCsv(i.status),
      escapeCsv(i.message),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute("download", `Samarth-Leads-${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      onClick={handleExport}
      type="button"
      className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-gray-900 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95"
      title="Download Leads Spreadsheet"
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-700">CSV Downloaded</span>
        </>
      ) : (
        <>
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Export Leads (CSV)</span>
        </>
      )}
    </button>
  );
}
