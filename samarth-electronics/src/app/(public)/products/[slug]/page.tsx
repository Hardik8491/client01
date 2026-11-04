import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Download, CheckCircle, ArrowRight } from "lucide-react";
import { initialProducts, initialCategories } from "@/lib/seed-data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription || product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug && p.status === "PUBLISHED");
  if (!product) notFound();

  const category = initialCategories.find((c) => c.id === product.categoryId);
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
  const otherImages = product.images.filter((i) => !i.isPrimary);
  const relatedProducts = initialProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id && p.status === "PUBLISHED")
    .slice(0, 3);

  const whatsappMessage = `Hello Samarth Electronics, I am interested in *${product.name}* (SKU: ${product.sku}). Please share pricing and availability.`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/products" className="hover:text-blue-700 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Products
          </Link>
          <span>/</span>
          <Link href={`/products?category=${category?.slug}`} className="hover:text-blue-700">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
              {primaryImage && (
                <Image
                  src={primaryImage.imageUrl}
                  alt={primaryImage.altText || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            {otherImages.length > 0 && (
              <div className="flex gap-3">
                {otherImages.map((img) => (
                  <div key={img.id} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-100 bg-gray-50">
                    <Image
                      src={img.imageUrl}
                      alt={img.altText || product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-sm text-blue-600 font-medium mb-2">{category?.name}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="text-sm text-gray-500 mb-5">SKU: <span className="font-mono font-semibold text-gray-700">{product.sku}</span></div>
            <p className="text-gray-600 leading-relaxed mb-6">{product.shortDescription || product.description}</p>

            {/* Key features */}
            {product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-700 font-medium">💼 B2B Pricing Available on Inquiry</p>
              <p className="text-xs text-blue-600 mt-1">Pricing depends on quantity, customization, and delivery terms. Contact us for a detailed quotation.</p>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                href={`/contact?productName=${encodeURIComponent(product.name)}&productId=${product.id}`}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                Request Inquiry / Quotation
              </Link>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp This Product
              </a>
              {product.datasheetUrl && product.datasheetUrl !== "#" && (
                <a
                  href={product.datasheetUrl}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors"
                >
                  <Download className="w-5 h-5" /> Download Datasheet (PDF)
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(product.specifications as Record<string, string>).map(([key, val]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="py-3 pr-8 font-medium text-gray-700 whitespace-nowrap w-1/3">{key}</td>
                      <td className="py-3 text-gray-600">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Full Description */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Product Description</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>

        {/* Applications */}
        {product.applications.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Applications & Industries</h2>
            <div className="flex flex-wrap gap-3">
              {product.applications.map((app) => (
                <span key={app} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100">
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
              <Link href={`/products?category=${category?.slug}`} className="text-blue-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => {
                const img = rel.images.find((i) => i.isPrimary) || rel.images[0];
                return (
                  <Link key={rel.id} href={`/products/${rel.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-gray-100">
                    <div className="relative h-44 bg-gray-50">
                      {img && <Image src={img.imageUrl} alt={img.altText || rel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{rel.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">SKU: {rel.sku}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
