"use client";

import React, { useState } from "react";
import { Plus, Check, ShoppingBag } from "lucide-react";
import { useInquiryCart } from "@/context/InquiryCartContext";

interface Props {
  productId: string;
  productName: string;
  sku: string;
  categoryName?: string;
  variantLabel?: string;
  image?: string;
  className?: string;
  variant?: "compact" | "full" | "icon";
}

export default function AddToInquiryButton({
  productId,
  productName,
  sku,
  categoryName,
  variantLabel,
  image,
  className = "",
  variant = "full",
}: Props) {
  const { addItem } = useInquiryCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${productId}-${variantLabel || "std"}`,
      productId,
      productName,
      sku,
      categoryName,
      variantLabel,
      image,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`p-2 rounded-xl transition-all ${
          added
            ? "bg-emerald-600 text-white"
            : "bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200"
        } ${className}`}
        title="Add to Inquiry List"
        aria-label="Add to Inquiry List"
      >
        {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
          added
            ? "bg-emerald-600 text-white"
            : "bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200"
        } ${className}`}
      >
        {added ? (
          <>
            <Check className="w-3.5 h-3.5" /> Added
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5 text-blue-700" /> Add to List
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-sm ${
        added
          ? "bg-emerald-600 text-white ring-2 ring-emerald-500/20"
          : "bg-blue-900 hover:bg-blue-950 text-white"
      } ${className}`}
      style={{
        color: "#ffffff",
        backgroundColor: added ? "#059669" : "#1e3a8a",
      }}
    >
      {added ? (
        <>
          <Check className="w-4 h-4 text-white" />
          <span>Added to Inquiry Basket!</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4 text-orange-400" />
          <span>Add to Trade Inquiry List</span>
        </>
      )}
    </button>
  );
}
