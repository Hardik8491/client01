"use client";

import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useInquiryCart } from "@/context/InquiryCartContext";

export default function FloatingInquiryBadge() {
  const { itemCount, totalQuantity, openDrawer } = useInquiryCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={openDrawer}
        className="flex items-center gap-3 bg-blue-900 hover:bg-blue-950 text-white py-3 px-4 sm:px-5 rounded-full shadow-2xl border border-blue-700/50 transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        style={{ color: "#ffffff", backgroundColor: "#1e3a8a" }}
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-orange-400" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-blue-900">
            {itemCount}
          </span>
        </div>

        <div className="text-left text-xs">
          <div className="font-bold text-white flex items-center gap-1.5 leading-none">
            Inquiry List
            <span className="text-orange-400 font-semibold">({totalQuantity} pcs)</span>
          </div>
          <div className="text-[10px] text-blue-200 leading-tight mt-0.5">
            Click to view & quote
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}

