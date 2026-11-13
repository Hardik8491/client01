import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin, Lock, FileText } from "lucide-react";
import type { Metadata } from "next";
import { initialCompanySettings } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Privacy Policy | Samarth Electronics Hub",
  description:
    "Privacy Policy and Data Protection standards of SAMARTH ELECTRONICS HUB, Dahod, Gujarat. Learn how we handle customer trade inquiries and commercial information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-blue-900 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white rounded-3xl p-8 sm:p-10 shadow-lg mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-700/50 text-blue-200 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>Commercial Trust & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy & Trade Data Policy
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Effective Date: September 2026 • SAMARTH ELECTRONICS HUB (Limdi, Dahod District, Gujarat — 389180)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 sm:p-10 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              1. Overview and Scope
            </h2>
            <p>
              This Privacy Policy explains how <strong>SAMARTH ELECTRONICS HUB</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a partnership enterprise registered under GSTIN <strong>24AGBFS1171R1ZM</strong> and Udyam <strong>UDYAM-GJ-07-0040753</strong>, collects, processes, and safeguards business and personal information when electrical retailers, contractors, distributors, and site engineers interact with our official website, digital product catalogue, and RFQ inquiry channels.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information necessary to process commercial wholesale inquiries, generate itemized quotations, and fulfill dispatches:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                <strong>Contact Details:</strong> Full name, firm/company name, direct mobile/WhatsApp number, delivery city/district, and business email address.
              </li>
              <li>
                <strong>Trade & RFQ Specifications:</strong> Required product models (LED panels, COBs, streetlights, SMPS drivers), wattages, color temperatures, volume estimates, and site requirements.
              </li>
              <li>
                <strong>Commercial Tax Information:</strong> Client GSTIN (for computerized B2B Tax Invoicing, E-way bill generation, and transport bilty coordination upon order confirmation).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              3. How We Use Your Information
            </h2>
            <p className="mb-2">We use your submitted data exclusively for legitimate B2B trade purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm">
              <li>Preparing accurate wholesale price quotations and bulk batch discounts.</li>
              <li>Direct WhatsApp or phone consultation to confirm driver compatibility and warranty terms.</li>
              <li>Managing transport dispatch and sharing live consignment tracking / bilty copies.</li>
              <li>Maintaining statutory GST and accountancy compliance as per Indian commercial laws.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              4. Zero Third-Party Selling or Broker Spam
            </h2>
            <p>
              We maintain strict commercial confidentiality. We do not sell, rent, lease, or monetize customer contact lists or RFQ data to marketing networks, brokers, or data brokers. All customer leads remain exclusively within the direct control of Samarth Electronics Hub and its authorized managing partners.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              5. Data Security and Retention
            </h2>
            <p>
              We employ SSL/TLS encryption for all website communications. Administrative access to customer inquiry databases is restricted via encrypted role-based authentication. Transactional records and tax invoices are retained in accordance with the Indian GST and Companies Act statutory requirements.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              6. Grievance and Contact Desk
            </h2>
            <p className="mb-4">
              If you have any questions regarding your data or wish to update your commercial contact records, please contact our managing partners:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-gray-900">SAMARTH ELECTRONICS HUB</div>
              <div className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{initialCompanySettings.address}, {initialCompanySettings.city}, Gujarat — {initialCompanySettings.pincode}</span>
              </div>
              <div className="text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{initialCompanySettings.phone} (Gopalbhai Bhammar / Lokeshkumar Solanki)</span>
              </div>
              <div className="text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{initialCompanySettings.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
