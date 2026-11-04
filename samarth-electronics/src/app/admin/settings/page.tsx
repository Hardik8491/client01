"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { initialCompanySettings } from "@/lib/seed-data";
import { updateCompanySettings } from "@/actions/auth-actions";

export default function AdminSettingsPage() {
  const settings = initialCompanySettings;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await updateCompanySettings(fd);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Failed to save settings");
    }
    setLoading(false);
  }

  const field = (label: string, name: string, type = "text", defaultValue?: string, required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && " *"}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? (settings as Record<string, unknown>)[name] as string ?? ""}
        required={required}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Update company information displayed across the website.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Company Details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {field("Company Name", "companyName", "text", undefined, true)}
            {field("Owner Name", "ownerName", "text", undefined, true)}
            <div className="sm:col-span-2">
              {field("Tagline / Motto", "tagline", "text", undefined, true)}
            </div>
            {field("GST Number", "gstNumber")}
            {field("Working Hours", "workingHours", "text", undefined, true)}
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">About Summary</label>
            <textarea
              name="aboutSummary"
              defaultValue={settings.aboutSummary || ""}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {field("Contact Email", "email", "email", undefined, true)}
            {field("Phone Number", "phone", "text", undefined, true)}
            {field("WhatsApp Number (with country code)", "whatsapp", "text", undefined, true)}
            {field("Google Maps URL", "googleMapsUrl", "url")}
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Office Address</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">{field("Street Address", "address", "text", undefined, true)}</div>
            {field("City", "city", "text", undefined, true)}
            {field("State", "state", "text", undefined, true)}
            {field("Pincode", "pincode", "text", undefined, true)}
            {field("Country", "country")}
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl text-sm font-medium">
            ✅ Settings saved successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">{error}</div>
        )}

        <div className="flex justify-end pb-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

