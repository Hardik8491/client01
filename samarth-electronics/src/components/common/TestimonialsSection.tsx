"use client";

import React from "react";
import { Star, Quote, CheckCircle2, MessageSquareText } from "lucide-react";
import { defaultPageContents, TestimonialItem } from "@/lib/page-content-defaults";

export default function TestimonialsSection({
  className = "",
  testimonials,
}: {
  className?: string;
  testimonials?: TestimonialItem[];
}) {
  const listToRender = (
    testimonials && testimonials.length > 0
      ? testimonials
      : defaultPageContents.global.testimonials
  ).filter((t) => t.isActive !== false);

  if (listToRender.length === 0) return null;

  return (
    <section className={`py-16 sm:py-20 bg-white border-t border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/60 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <MessageSquareText className="w-4 h-4 text-orange-600" />
            Verified Trade Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Client & Contractor Feedback
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            Read what electrical contractors, project engineers, and retail stockists across
            Gujarat, Rajasthan, and MP say about our driver reliability and dispatch support.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listToRender.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200/80 hover:border-blue-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product Focus */}
              <div className="pt-4 border-t border-gray-200/60">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-gray-900 text-sm leading-snug">{t.clientName}</h4>
                  <span title="Verified Trade Client" className="inline-flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{t.companyOrCity}</div>
                {t.projectOrProduct && (
                  <div className="inline-block mt-2 bg-blue-100/60 text-blue-900 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {t.projectOrProduct}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
