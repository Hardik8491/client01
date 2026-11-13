"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  FileText,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { initialCompanySettings } from "@/lib/seed-data";

export default function InquiryDrawer() {
  const {
    items,
    itemCount,
    totalQuantity,
    isOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
  } = useInquiryCart();

  // Prevent background body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedWhatsAppNumber = initialCompanySettings.whatsapp.replace(/\D/g, "");

  const generateWhatsAppMessage = () => {
    let msg = `*OFFICIAL TRADE INQUIRY — SAMARTH ELECTRONICS HUB*\n`;
    msg += `----------------------------------------\n`;
    msg += `Hello Gopalbhai / Lokeshbhai,\n`;
    msg += `I am requesting wholesale rates, stock availability, and delivery schedule for the following requirement:\n\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.productName}*\n`;
      if (item.variantLabel) {
        msg += `   • Specification: ${item.variantLabel}\n`;
      }
      if (item.sku) {
        msg += `   • SKU: ${item.sku}\n`;
      }
      msg += `   • Quantity: *${item.quantity} units*\n\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `*Total Requirement:* ${totalQuantity} units (${itemCount} unique items)\n`;
    msg += `*Dispatch / Site City:* [Please fill your city/site]\n`;
    msg += `*Company / GST (optional):* [If applicable]\n\n`;
    msg += `Please share your best B2B pricing and estimated transport timeline. Thank you!`;

    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${formattedWhatsAppNumber}?text=${generateWhatsAppMessage()}`;

  // Link to contact page prefilled with inquiry list
  const inquiryItemsSummary = items
    .map((i) => `${i.productName} (${i.variantLabel || i.sku || "Std"}) x ${i.quantity}`)
    .join(", ");

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="inquiry-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col transform transition ease-in-out duration-300">
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950 to-blue-900 text-white flex items-center justify-between border-b border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 id="inquiry-drawer-title" className="text-lg font-bold flex items-center gap-2">
                  Trade Inquiry List
                  {itemCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      {itemCount}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-blue-200 mt-0.5">
                  Multi-item B2B Bill of Quantities (BOQ)
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Your Inquiry List is Empty
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
                  Browse our LED panels, downlights, floodlights, or SMPS drivers. Add required
                  models and quantities here to request a unified wholesale quote.
                </p>
                <Link
                  href="/products"
                  onClick={closeDrawer}
                  className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                  style={{ color: "#ffffff" }}
                >
                  Browse Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs text-gray-500">
                  <span>Selected Fixtures & Drivers ({itemCount})</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 hover:border-blue-200 transition-colors"
                    >
                      {item.image && (
                        <div className="relative w-18 h-18 sm:w-20 sm:h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-gray-900 leading-snug truncate">
                            {item.productName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.variantLabel && (
                          <div className="inline-block bg-blue-100/70 text-blue-900 text-[11px] font-semibold px-2 py-0.5 rounded-md mt-1">
                            {item.variantLabel}
                          </div>
                        )}

                        <div className="text-[11px] text-gray-500 mt-1">
                          SKU: <span className="font-mono text-gray-700">{item.sku}</span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/60">
                          <span className="text-xs font-semibold text-gray-600">Quantity:</span>
                          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="9999"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) updateQuantity(item.id, val);
                              }}
                              className="w-12 text-center text-xs font-bold text-gray-900 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* B2B Assurance Note */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    Wholesale B2B Quotation Guarantee
                  </div>
                  <p className="text-blue-800/80 leading-relaxed text-[11px]">
                    Direct partner quotes provided by Bhammar Gopalbhai & Solanki Lokeshkumar with
                    official GST billing (24AGBFS1171R1ZM) and pan-India transport dispatch.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Total Quantity:</span>
                <span className="font-bold text-gray-900 text-base">
                  {totalQuantity} Units ({itemCount} Lines)
                </span>
              </div>

              {/* Primary Action: Send on WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-[0.99] text-sm"
                style={{ backgroundColor: "#047857", color: "#ffffff" }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span style={{ color: "#ffffff" }}>Send Itemized Inquiry on WhatsApp</span>
              </a>

              {/* Secondary Action: Submit via Contact Page */}
              <Link
                href={`/contact?productName=${encodeURIComponent(inquiryItemsSummary)}`}
                onClick={closeDrawer}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-gray-700 hover:text-blue-900 bg-white border border-gray-300 hover:border-gray-400 text-xs transition-colors"
              >
                <FileText className="w-4 h-4 text-gray-500" />
                Or Submit via Online Inquiry Form
              </Link>

              <p className="text-[11px] text-gray-500 text-center">
                Instant response from Limdi, Dahod depot • Monday – Saturday
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

