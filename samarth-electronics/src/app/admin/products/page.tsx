import Link from "next/link";
import { Plus, Eye, EyeOff, Pencil, Trash2, Search, Package } from "lucide-react";
import { initialProducts, initialCategories } from "@/lib/seed-data";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

interface Props {
  searchParams: Promise<{ search?: string; status?: string; category?: string }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = (params.search || "").toLowerCase();
  const statusFilter = params.status || "";
  const categoryFilter = params.category || "";

  let products = initialProducts;
  if (search) products = products.filter((p) => p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search));
  if (statusFilter) products = products.filter((p) => p.status === statusFilter);
  if (categoryFilter) products = products.filter((p) => p.categoryId === categoryFilter);

  const BADGE: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-700",
    DRAFT: "bg-yellow-100 text-yellow-700",
    ARCHIVED: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <form className="relative flex-1" method="GET">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search product name or SKU..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        <div className="flex gap-2">
          {["", "PUBLISHED", "DRAFT", "ARCHIVED"].map((s) => (
            <Link
              key={s}
              href={`/admin/products${s ? `?status=${s}` : ""}`}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${statusFilter === s ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {s || "All"}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Product</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">SKU</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => {
                const img = product.images.find((i) => i.isPrimary) || product.images[0];
                const cat = initialCategories.find((c) => c.id === product.categoryId);
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {img && (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            <Image src={img.imageUrl} alt={product.name} fill className="object-cover" sizes="48px" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 text-sm line-clamp-1 max-w-[220px]">{product.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cat?.name || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE[product.status]}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.featured ? (
                        <span className="text-orange-500 text-xs font-semibold">⭐ Yes</span>
                      ) : (
                        <span className="text-gray-400 text-xs">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View public page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No products found</p>
            <Link href="/admin/products/new" className="mt-4 inline-flex items-center gap-1 text-blue-700 text-sm font-medium hover:underline">
              <Plus className="w-4 h-4" /> Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

