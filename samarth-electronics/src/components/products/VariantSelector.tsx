"use client";

import { useState } from "react";
import { MessageCircle, Shield, Battery, CheckCircle, Tag } from "lucide-react";
import { ProductVariant } from "@/lib/types";

interface Props {
  productName: string;
  sku: string;
  whatsappPhone: string;
  variants: ProductVariant[];
}

export default function VariantSelector({ productName, sku, whatsappPhone, variants }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!variants || variants.length === 0) return null;

  const current = variants[selectedIdx] || variants[0];
  const formattedPhone = whatsappPhone.replace(/\D/g, "");

  const variantDetailsText = [
    current.wattage ? `${current.wattage}W` : null,
    current.ampere ? current.ampere : null,
    current.size ? current.size : null,
    current.colour ? current.colour : null,
    current.model ? current.model : null,
  ]
    .filter(Boolean)
    .join(" - ");

  const whatsappMsg = `Hello Samarth Electronics Hub, I want to inquire about *${productName}*.\n- Selected Rating / Model: ${variantDetailsText || current.sku || "Standard"}\n${current.warrantyMonths ? `- Warranty: ${current.warrantyMonths} Months\n` : ""}${current.batteryBackupHours ? `- Backup: ${current.batteryBackupHours} Hours\n` : ""}- SKU: ${current.sku || sku}\nPlease share the trade price, bulk discount, and delivery terms.`;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
      {/* B2B Quotation Notice (Prices Hidden) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
            Pricing Availability
          </span>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-blue-900">
              Wholesale / Trade Price on Inquiry
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium block mt-0.5">
            Rates depend on order quantity & technical specs
          </span>
        </div>

        <div className="self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Trade Supply Available
          </span>
        </div>
      </div>

      {/* Selectable Rating / Wattage Badges (No Prices Shown) */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
          Select Rating / Wattage Option:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {variants.map((v, i) => {
            const isSelected = i === selectedIdx;
            const label = v.wattage
              ? `${v.wattage}W`
              : v.ampere
              ? v.ampere
              : v.size
              ? v.size
              : v.model || `Option ${i + 1}`;

            return (
              <button
                key={v.id || i}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className={`flex items-center justify-center py-3 px-4 rounded-xl border text-center transition-all ${
                  isSelected
                    ? "bg-blue-900 border-blue-900 text-white shadow-md ring-2 ring-blue-900/20 font-bold"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50 font-medium"
                }`}
              >
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Variant Specifications Summary */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-gray-600">
          <span className="font-medium text-gray-500">Selected Option:</span>
          <span className="font-bold text-gray-900 text-sm">{variantDetailsText || "Standard Specification"}</span>
        </div>
        {current.sku && (
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium text-gray-500">Variant SKU:</span>
            <span className="font-mono font-semibold text-gray-800">{current.sku}</span>
          </div>
        )}
        {current.warrantyMonths && (
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium text-gray-500 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-600" /> Guarantee:
            </span>
            <span className="font-semibold text-emerald-700">{current.warrantyMonths} Months Guarantee</span>
          </div>
        )}
        {current.batteryBackupHours && (
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium text-gray-500 flex items-center gap-1">
              <Battery className="w-3.5 h-3.5 text-amber-600" /> Battery Backup:
            </span>
            <span className="font-semibold text-amber-700">{current.batteryBackupHours} Hours Emergency Backup</span>
          </div>
        )}
      </div>

      {/* Direct WhatsApp Action without Price */}
      <a
        href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md text-sm"
        style={{ color: "#ffffff", backgroundColor: "#047857" }}
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span>Request Price for {variantDetailsText || "Selected"} on WhatsApp</span>
      </a>
    </div>
  );
}
