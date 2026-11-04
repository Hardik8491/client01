"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";
import { createCategory } from "@/actions/product-actions";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  function handleNameChange(val: string) {
    setName(val);
    setSlug(generateSlug(val));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await createCategory(fd);
    if (result.success) {
      router.push("/admin/categories");
    } else {
      setError(result.error || "Failed to create category");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/categories" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Category</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Name *</label>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Industrial Automation Modules"
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Brief description of the electronics category..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
          <input
            name="image"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={0}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" name="isActive" value="true" id="isActive" defaultChecked className="w-4 h-4 accent-blue-700" />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Category Active & Visible</label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
        )}

        <div className="flex justify-end gap-3 pt-3">
          <Link href="/admin/categories" className="px-6 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-semibold rounded-xl text-sm"
          >
            {loading ? "Saving..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}

