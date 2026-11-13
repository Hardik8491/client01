"use client";

import React, { useState } from "react";
import { updateInquiryStatus } from "@/actions/inquiry-actions";
import { Check, Loader2, Save } from "lucide-react";

interface Props {
  inquiryId: string;
  currentStatus: string;
  initialNotes?: string | null;
}

const STATUSES: { value: "NEW" | "IN_REVIEW" | "CONTACTED" | "QUOTED" | "CLOSED"; label: string; color: string }[] = [
  { value: "NEW", label: "New", color: "hover:bg-orange-50 border-orange-200 text-orange-700" },
  { value: "IN_REVIEW", label: "In Review", color: "hover:bg-blue-50 border-blue-200 text-blue-700" },
  { value: "CONTACTED", label: "Contacted", color: "hover:bg-purple-50 border-purple-200 text-purple-700" },
  { value: "QUOTED", label: "Quoted", color: "hover:bg-green-50 border-green-200 text-green-700" },
  { value: "CLOSED", label: "Closed", color: "hover:bg-gray-100 border-gray-300 text-gray-700" },
];

export default function InquiryStatusSelect({ inquiryId, currentStatus, initialNotes }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(initialNotes || "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);

  const handleStatusChange = async (newStatus: "NEW" | "IN_REVIEW" | "CONTACTED" | "QUOTED" | "CLOSED") => {
    setSavingStatus(true);
    setStatusSuccess(false);
    try {
      const res = await updateInquiryStatus(inquiryId, newStatus);
      if (res.success) {
        setStatus(newStatus);
        setStatusSuccess(true);
        setTimeout(() => setStatusSuccess(false), 2500);
      } else {
        alert(res.error || "Failed to update status");
      }
    } catch {
      alert("Error updating status");
    } finally {
      setSavingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    setNotesSuccess(false);
    try {
      const res = await updateInquiryStatus(inquiryId, status as any, notes);
      if (res.success) {
        setNotesSuccess(true);
        setTimeout(() => setNotesSuccess(false), 2500);
      } else {
        alert(res.error || "Failed to save notes");
      }
    } catch {
      alert("Error saving notes");
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Buttons */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Inquiry Workflow Status
          </label>
          {savingStatus && (
            <span className="text-xs text-blue-600 inline-flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Updating...
            </span>
          )}
          {statusSuccess && (
            <span className="text-xs text-green-600 inline-flex items-center gap-1 font-medium">
              <Check className="w-3.5 h-3.5" /> Updated!
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => {
            const isSelected = status === s.value;
            return (
              <button
                key={s.value}
                type="button"
                disabled={savingStatus}
                onClick={() => handleStatusChange(s.value)}
                className={`px-3.5 py-2 text-xs sm:text-sm rounded-xl font-medium transition-all border ${
                  isSelected
                    ? "bg-blue-800 text-white border-blue-800 shadow-sm ring-2 ring-blue-800/20"
                    : `bg-white ${s.color}`
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Notes Section */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Internal Sales Notes / Follow-up Log
          </label>
          {notesSuccess && (
            <span className="text-xs text-green-600 inline-flex items-center gap-1 font-medium">
              <Check className="w-3.5 h-3.5" /> Notes Saved!
            </span>
          )}
        </div>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Quoted ₹185/unit for 200pcs 20W Battens with 2-year warranty via WhatsApp on 13th Nov."
          className="w-full text-xs sm:text-sm text-gray-800 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            disabled={savingNotes}
            onClick={handleSaveNotes}
            className="inline-flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition"
          >
            {savingNotes ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Internal Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
