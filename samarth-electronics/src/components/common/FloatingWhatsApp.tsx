"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { initialCompanySettings } from "@/lib/seed-data";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const formattedPhone = initialCompanySettings.whatsapp.replace(/\D/g, "");
  const defaultMessage = encodeURIComponent(
    "Hello Samarth Electronics Hub, I would like to inquire about wholesale LED lighting fixtures and SMPS drivers."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Helpful Quick Prompt Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-gray-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-gray-900">Need immediate trade rates?</span>
          <span className="text-gray-500">Chat directly on WhatsApp</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${formattedPhone}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Samarth Electronics Hub on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Animated pulse ring */}
        <span
          className="absolute -inset-1 rounded-full opacity-75 animate-ping -z-10"
          style={{ backgroundColor: "#25D366" }}
        />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />

        {/* Small badge */}
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
          1
        </span>
      </a>
    </div>
  );
}

