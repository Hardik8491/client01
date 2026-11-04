"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);

  function handleTitleChange(val: string) {
    setTitle(val);
    setSlug(generateSlug(val));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Redirect to services list
    router.push("/admin/services");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/services" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Manufacturing Service</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Title *</label>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. SMT PCB Assembly"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Slug *</label>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Summary *</label>
          <input
            name="shortDesc"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="One-line summary for cards..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description *</label>
          <textarea
            name="description"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Comprehensive description of equipment, capabilities, tolerances..."
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Service Capabilities / Features</label>
            <button type="button" onClick={() => setFeatures([...features, ""])} className="text-blue-700 text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={f}
                  onChange={(e) => setFeatures(features.map((v, idx) => (idx === i ? e.target.value : v)))}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 0201 chip placement accuracy"
                />
                {features.length > 1 && (
                  <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="p-2 text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
          <input
            name="imageUrl"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <Link href="/admin/services" className="px-6 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-semibold rounded-xl text-sm"
          >
            {loading ? "Saving..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
