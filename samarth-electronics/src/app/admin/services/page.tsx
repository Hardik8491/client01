import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import Image from "next/image";
import { initialServices } from "@/lib/seed-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function AdminServicesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 text-sm mt-1">{initialServices.length} manufacturing services</p>
        </div>
        <Link href="/admin/services/new" className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </Link>
      </div>

      <div className="space-y-4">
        {initialServices.map((service, idx) => (
          <div key={service.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-6 items-start">
            {service.imageUrl && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image src={service.imageUrl} alt={service.title} fill className="object-cover" sizes="96px" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Service {String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="font-semibold text-gray-900 mt-0.5">{service.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{service.shortDesc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {service.features.map((f) => (
                      <span key={f} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full line-clamp-1 max-w-[200px]">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${service.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {service.status}
                  </span>
                  <Link href={`/admin/services/${service.id}/edit`} className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

