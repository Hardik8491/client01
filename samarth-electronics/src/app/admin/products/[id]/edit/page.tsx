"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { initialCategories, initialProducts } from "@/lib/seed-data";
import { updateProduct } from "@/actions/product-actions";

interface SpecEntry { key: string; value: string; }

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const product = initialProducts.find((p) => p.id === id) || initialProducts[0];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const initialSpecsArray: SpecEntry[] = product?.specifications
    ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
    : [{ key: "", value: "" }];

  const [specs, setSpecs] = useState<SpecEntry[]>(initialSpecsArray);
  const [applications, setApplications] = useState<string[]>(product?.applications || [""]);
  const [features, setFeatures] = useState<string[]>(product?.features || [""]);
  const [images, setImages] = useState<string[]>(
    product?.images.map((i) => i.imageUrl) || [""]
  );

  function addSpec() { setSpecs([...specs, { key: "", value: "" }]); }
  function removeSpec(i: number) { setSpecs(specs.filter((_, idx) => idx !== i)); }
  function updateSpec(i: number, field: "key" | "value", val: string) {
    setSpecs(specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const specsObj = specs.reduce((acc, s) => { if (s.key) acc[s.key] = s.value; return acc; }, {} as Record<string, string>);
    fd.set("specifications", JSON.stringify(specsObj));
    fd.set("applications", JSON.stringify(applications.filter(Boolean)));
    fd.set("features", JSON.stringify(features.filter(Boolean)));
    fd.set("images", JSON.stringify(images.filter(Boolean)));
    
    const result = await updateProduct(product.id, fd);
    if (result.success) {
      router.push("/admin/products");
    } else {
      setError(result.error || "Failed to update product");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-7">
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product: {product.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Product Information</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
              <input name="name" required defaultValue={product.name}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Slug *</label>
              <input name="slug" required defaultValue={product.slug}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">SKU / Product Code *</label>
              <input name="sku" required defaultValue={product.sku}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select name="categoryId" required defaultValue={product.categoryId} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {initialCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select name="status" defaultValue={product.status} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
              <input name="shortDescription" defaultValue={product.shortDescription || ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description *</label>
              <textarea name="description" required defaultValue={product.description} rows={6} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Datasheet URL</label>
              <input name="datasheetUrl" type="url" defaultValue={product.datasheetUrl || ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="featured" value="true" id="featured" defaultChecked={product.featured} className="w-4 h-4 accent-blue-700" />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as Featured Product</label>
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-gray-900">Product Images</h2>
            <button type="button" onClick={() => setImages([...images, ""])} className="text-blue-700 text-sm font-medium flex items-center gap-1 hover:text-blue-900">
              <Plus className="w-4 h-4" /> Add Image URL
            </button>
          </div>
          <div className="space-y-3">
            {images.map((img, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={img}
                  onChange={e => setImages(images.map((v, idx) => idx === i ? e.target.value : v))}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={i === 0 ? "Primary image URL" : "Additional image URL"}
                />
                {images.length > 1 && (
                  <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-gray-900">Technical Specifications</h2>
            <button type="button" onClick={addSpec} className="text-blue-700 text-sm font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Row
            </button>
          </div>
          <div className="space-y-3">
            {specs.map((spec, i) => (
              <div key={i} className="flex gap-3">
                <input value={spec.key} onChange={e => updateSpec(i, "key", e.target.value)}
                  className="w-2/5 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Input Voltage" />
                <input value={spec.value} onChange={e => updateSpec(i, "value", e.target.value)}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 24V DC" />
                {specs.length > 1 && (
                  <button type="button" onClick={() => removeSpec(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">{error}</div>
        )}

        <div className="flex gap-4 justify-end pb-6">
          <Link href="/admin/products" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

