import { Save } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Content" };

const PAGES = [
  {
    pageKey: "home",
    label: "Homepage",
    sections: [
      { key: "hero_heading", label: "Hero Heading", type: "text", default: "High-Precision Electronics Manufacturing" },
      { key: "hero_subtext", label: "Hero Subtext", type: "textarea", default: "Trusted by 250+ manufacturers across India..." },
      { key: "overview_heading", label: "Company Overview Heading", type: "text", default: "India's Trusted Industrial Electronics Manufacturing Partner" },
      { key: "overview_body", label: "Company Overview Body", type: "textarea", default: "" },
    ],
  },
  {
    pageKey: "about",
    label: "About Us Page",
    sections: [
      { key: "hero_heading", label: "Page Heading", type: "text", default: "Powering India's Industrial Revolution" },
      { key: "founder_bio", label: "Founder Bio", type: "textarea", default: "" },
    ],
  },
  {
    pageKey: "quality",
    label: "Quality & Certifications",
    sections: [
      { key: "quality_heading", label: "Quality Section Heading", type: "text", default: "Zero-Defect Manufacturing Philosophy" },
      { key: "quality_body", label: "Quality Body Text", type: "textarea", default: "" },
    ],
  },
];

export default function AdminPagesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
        <p className="text-gray-500 text-sm mt-1">Edit text content for public website pages.</p>
      </div>

      <div className="space-y-6">
        {PAGES.map((page) => (
          <form key={page.pageKey} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">{page.label}</h2>
              <span className="text-xs text-gray-400 font-mono">{page.pageKey}</span>
            </div>
            <div className="p-6 space-y-5">
              {page.sections.map((section) => (
                <div key={section.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{section.label}</label>
                  {section.type === "textarea" ? (
                    <textarea
                      name={section.key}
                      defaultValue={section.default}
                      rows={4}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <input
                      name={section.key}
                      type="text"
                      defaultValue={section.default}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Save className="w-4 h-4" /> Save {page.label}
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
