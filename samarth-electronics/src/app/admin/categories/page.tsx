import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { initialCategories, initialProducts } from "@/lib/seed-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Categories" };

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">{initialCategories.length} categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Category</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Slug</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Products</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {initialCategories.map((cat) => {
              const productCount = initialProducts.filter((p) => p.categoryId === cat.id).length;
              return (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {cat.image && (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="48px" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{cat.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-[200px]">{cat.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{cat.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{productCount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {cat.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {cat.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/categories/${cat.id}/edit`} className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
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
    </div>
  );
}

