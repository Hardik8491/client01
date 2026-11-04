import Image from "next/image";
import Link from "next/link";
import { Search, Filter, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { initialProducts, initialCategories } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description: "Browse 500+ industrial electronic products from Samarth Electronics — Controllers, SMPS, IoT Gateways, Motor Drives, and more.",
};

interface Props {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categoryFilter = params.category || "";
  const searchQuery = (params.search || "").toLowerCase();
  const page = Number(params.page || 1);
  const PER_PAGE = 12;

  let filtered = initialProducts.filter((p) => p.status === "PUBLISHED");
  if (categoryFilter) filtered = filtered.filter((p) => p.category?.slug === categoryFilter || initialCategories.find((c) => c.slug === categoryFilter && c.id === p.categoryId));
  if (searchQuery) filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery) || p.sku.toLowerCase().includes(searchQuery) || p.shortDescription?.toLowerCase().includes(searchQuery));

  const total = filtered.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Our Products</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Industrial Electronics Catalogue</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Browse our complete range of industrial-grade electronics manufactured in Rajkot, Gujarat.
          </p>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <form className="relative flex-1" method="GET">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="search"
                defaultValue={searchQuery}
                placeholder="Search by product name, SKU..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
            </form>

            <div className="flex gap-2 items-center flex-wrap">
              <Filter className="w-5 h-5 text-gray-500 shrink-0" />
              <Link
                href="/products"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!categoryFilter ? "bg-blue-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                All
              </Link>
              {initialCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${categoryFilter === cat.slug ? "bg-blue-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{paginated.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{total}</span> products
          </div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-xl mb-4">No products found</p>
              <Link href="/products" className="text-blue-700 font-semibold hover:underline">Clear filters</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginated.map((product) => {
                const img = product.images.find((i) => i.isPrimary) || product.images[0];
                const cat = initialCategories.find((c) => c.id === product.categoryId);
                return (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-gray-100">
                    <div className="relative h-48 bg-gray-50">
                      {img && (
                        <Image
                          src={img.imageUrl}
                          alt={img.altText || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      )}
                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-blue-600 font-medium mb-1">{cat?.name}</div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">SKU: {product.sku}</p>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-4">{product.shortDescription}</p>
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 text-center border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/contact?productName=${encodeURIComponent(product.name)}`}
                          className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                        >
                          Inquire
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/products?page=${p}${categoryFilter ? `&category=${categoryFilter}` : ""}${searchQuery ? `&search=${searchQuery}` : ""}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${p === page ? "bg-blue-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
