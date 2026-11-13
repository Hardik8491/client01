import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, ShieldCheck, Truck, RefreshCw, AlertCircle, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { initialCompanySettings } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Terms & Trade Conditions | Samarth Electronics Hub",
  description:
    "Commercial wholesale trade terms, replacement warranty criteria, and supply conditions of SAMARTH ELECTRONICS HUB (Dahod, Gujarat).",
};

export default function TermsPage() {
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
            <Scale className="w-4 h-4 text-orange-400" />
            <span>Wholesale Supply & Commercial Policies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms of Trade & Warranty Conditions
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Standard business supply regulations for SAMARTH ELECTRONICS HUB • Registered under GSTIN 24AGBFS1171R1ZM
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 sm:p-10 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              1. Commercial B2B Scope
            </h2>
            <p>
              SAMARTH ELECTRONICS HUB is an electrical manufacturing and wholesale distribution partnership firm based in Limdi, Dahod District, Gujarat. The products displayed on this digital portal are intended for commercial electrical contractors, regional retailers, infrastructure builders, and industrial procurement agents.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              2. Quotations, Pricing & GST Invoicing
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                <strong>Price Estimates:</strong> As raw material costs (aluminum extrusion, LED chipsets, copper windings) fluctuate, formal quotation rates provided via WhatsApp or email remain valid for 15 calendar days from the date of issuance.
              </li>
              <li>
                <strong>Goods & Services Tax (GST):</strong> All wholesale orders are billed under regular GST (applicable rate of 18% on LED luminaires and electronic power supplies) with computerized Tax Invoices generated under GSTIN <strong>24AGBFS1171R1ZM</strong>.
              </li>
              <li>
                <strong>Minimum Order Quantities (MOQ):</strong> Master carton packaging sizes apply to trade bulk rates (typically 10 to 50 pieces per carton depending on product size). Sample pieces are provided on request for contractor approval.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              3. Dispatch, Transport & Delivery (Bilty)
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                Orders are dispatched from our central Limdi/Dahod depot via trusted surface transport operators across Gujarat, Rajasthan, and Madhya Pradesh borders.
              </li>
              <li>
                A scanned copy of the <strong>Transport Bilty / Consignment Receipt</strong> is shared immediately with the client via WhatsApp upon handover to the logistics partner.
              </li>
              <li>
                Freight charges are typically &quot;To-Pay&quot; at the destination delivery branch unless explicitly agreed otherwise in writing.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              4. Warranty & Driver Replacement Guidelines
            </h2>
            <p className="mb-3">
              We stand behind our manufacturing and driver testing standards with dedicated replacement coverage:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Covered Under Warranty</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-blue-800 text-xs">
                  <li>Driver component failure or high voltage surge breakdown within warranty period (up to 27 months on eligible lines).</li>
                  <li>Lumen output drop or LED chip failure under normal operating parameters.</li>
                  <li>Factory solder or internal circuit defects.</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 font-bold text-red-900 mb-1">
                  <AlertCircle className="w-4 h-4 text-red-700" />
                  <span>Excluded from Coverage</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-red-800 text-xs">
                  <li>Physical breakage or cracked housing resulting from rough site handling.</li>
                  <li>Direct water immersion on non-waterproof (IP20) indoor indoor fixtures.</li>
                  <li>Tampered circuit boards or unauthorized external wiring modifications.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              5. Governing Law and Legal Jurisdiction
            </h2>
            <p>
              All trade contracts, quotation agreements, and invoice disputes arising out of business transactions with SAMARTH ELECTRONICS HUB shall be governed exclusively by the laws of India and fall under the exclusive jurisdiction of the civil courts in <strong>Dahod, Gujarat</strong>.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-gray-900">Partner Helpdesk & Trade Coordination</div>
            <p className="text-gray-600">
              For any clarification regarding warranty claims, bilty verification, or dealer terms:
            </p>
            <div className="flex flex-wrap gap-4 pt-1 font-medium text-blue-900">
              <span>Gopalbhai Bhammar: +91 96242 34603</span>
              <span>•</span>
              <span>Lokeshkumar Solanki: +91 93130 62650</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
