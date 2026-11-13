"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layout,
  Info,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { defaultPageContents } from "@/lib/page-content-defaults";
import {
  getAllPagesData,
  savePageSection,
  resetPageSection,
} from "@/actions/page-actions";

type TabKey = "home" | "about" | "contact";

export default function AdminPagesCMS() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [contents, setContents] = useState<any>(defaultPageContents);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getAllPagesData();
      if (res.success && res.data) {
        setContents(res.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const updateSectionField = (
    page: TabKey,
    section: string,
    field: string,
    value: any
  ) => {
    setContents((prev: any) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...prev[page]?.[section],
          [field]: value,
        },
      },
    }));
  };

  const handleSaveSection = async (page: TabKey, section: string) => {
    const key = `${page}.${section}`;
    setSavingKey(key);
    const dataToSave = contents[page]?.[section] || {};
    const res = await savePageSection(page, section, dataToSave);
    setSavingKey(null);

    if (res.success) {
      showStatus("success", `✅ ${section.toUpperCase()} content saved and published live!`);
    } else {
      showStatus("error", `❌ Failed to save: ${res.error || "Unknown error"}`);
    }
  };

  const handleResetSection = async (page: TabKey, section: string) => {
    if (!confirm(`Reset ${section} to factory default copy?`)) return;

    const key = `${page}.${section}`;
    setSavingKey(key);
    const res = await resetPageSection(page, section);
    setSavingKey(null);

    if (res.success) {
      setContents((prev: any) => ({
        ...prev,
        [page]: {
          ...prev[page],
          [section]: (defaultPageContents as any)[page]?.[section],
        },
      }));
      showStatus("success", `Restored ${section} to original defaults.`);
    } else {
      showStatus("error", `Failed to reset: ${res.error}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <div className="w-10 h-10 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-gray-600">Loading website content editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Page Title & Live Preview Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2.5">
            <Layout className="w-7 h-7 text-blue-900" />
            Website Page Content CMS
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Edit text, headings, partner bios, and highlights across the public website in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3.5 py-2 rounded-xl transition"
          >
            <span>Preview Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Global Status Banner */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between animate-in fade-in duration-200 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs font-bold underline ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8 space-x-2 sm:space-x-4 overflow-x-auto">
        {[
          { key: "home" as TabKey, label: "Homepage", icon: Layout },
          { key: "about" as TabKey, label: "About Us Page", icon: Info },
          { key: "contact" as TabKey, label: "Contact & Depot", icon: MapPin },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 py-3.5 px-5 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-blue-900 text-blue-900 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-900" : "text-gray-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: HOMEPAGE CMS ──────────────────────────────────────────────── */}
      {activeTab === "home" && (
        <div className="space-y-8">
          {/* Section: Hero Banner */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  Above-the-Fold
                </span>
                <h3 className="text-lg font-bold text-gray-900">Hero Section</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleResetSection("home", "hero")}
                  disabled={savingKey === "home.hero"}
                  className="p-2 text-gray-400 hover:text-gray-700 transition"
                  title="Reset to factory default copy"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSection("home", "hero")}
                  disabled={savingKey === "home.hero"}
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
                >
                  {savingKey === "home.hero" ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Hero
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Location Pill Badge Text
                </label>
                <input
                  type="text"
                  value={contents.home?.hero?.badgeText || ""}
                  onChange={(e) =>
                    updateSectionField("home", "hero", "badgeText", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={contents.home?.hero?.title || ""}
                    onChange={(e) =>
                      updateSectionField("home", "hero", "title", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Headline Highlight (Orange)
                  </label>
                  <input
                    type="text"
                    value={contents.home?.hero?.titleHighlight || ""}
                    onChange={(e) =>
                      updateSectionField("home", "hero", "titleHighlight", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={contents.home?.hero?.subtitle || ""}
                  onChange={(e) =>
                    updateSectionField("home", "hero", "subtitle", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Stats Bar */}
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Hero Metric Counters (4 Stats)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(contents.home?.hero?.stats || []).map((st: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...contents.home.hero.stats];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          updateSectionField("home", "hero", "stats", updated);
                        }}
                        className="w-full font-bold text-orange-600 text-sm mb-1 bg-white border border-gray-300 rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...contents.home.hero.stats];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          updateSectionField("home", "hero", "stats", updated);
                        }}
                        className="w-full text-xs text-gray-600 bg-white border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  Enterprise Overview
                </span>
                <h3 className="text-lg font-bold text-gray-900">About the Hub Section</h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveSection("home", "overview")}
                disabled={savingKey === "home.overview"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "home.overview" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Overview
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={contents.home?.overview?.tagline || ""}
                    onChange={(e) =>
                      updateSectionField("home", "overview", "tagline", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={contents.home?.overview?.title || ""}
                    onChange={(e) =>
                      updateSectionField("home", "overview", "title", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Paragraph 1 (Founders & Hub Focus)
                </label>
                <textarea
                  rows={3}
                  value={contents.home?.overview?.description1 || ""}
                  onChange={(e) =>
                    updateSectionField("home", "overview", "description1", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Paragraph 2 (GST & Udyam Credentials)
                </label>
                <textarea
                  rows={3}
                  value={contents.home?.overview?.description2 || ""}
                  onChange={(e) =>
                    updateSectionField("home", "overview", "description2", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section: CTA Banner */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  Conversion Banner
                </span>
                <h3 className="text-lg font-bold text-gray-900">Bottom CTA Banner</h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveSection("home", "cta")}
                disabled={savingKey === "home.cta"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "home.cta" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save CTA
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Banner Heading
                </label>
                <input
                  type="text"
                  value={contents.home?.cta?.title || ""}
                  onChange={(e) =>
                    updateSectionField("home", "cta", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Banner Subtext
                </label>
                <input
                  type="text"
                  value={contents.home?.cta?.subtitle || ""}
                  onChange={(e) =>
                    updateSectionField("home", "cta", "subtitle", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ABOUT US CMS ──────────────────────────────────────────────── */}
      {activeTab === "about" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  About Page Banner
                </span>
                <h3 className="text-lg font-bold text-gray-900">Header Section</h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveSection("about", "header")}
                disabled={savingKey === "about.header"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "about.header" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Header
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={contents.about?.header?.tagline || ""}
                  onChange={(e) =>
                    updateSectionField("about", "header", "tagline", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={contents.about?.header?.title || ""}
                  onChange={(e) =>
                    updateSectionField("about", "header", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subtitle
                </label>
                <textarea
                  rows={2}
                  value={contents.about?.header?.subtitle || ""}
                  onChange={(e) =>
                    updateSectionField("about", "header", "subtitle", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Story & Background */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  Corporate Story
                </span>
                <h3 className="text-lg font-bold text-gray-900">Enterprise Story & Foundation</h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveSection("about", "story")}
                disabled={savingKey === "about.story"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "about.story" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Story
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  value={contents.about?.story?.title || ""}
                  onChange={(e) =>
                    updateSectionField("about", "story", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inception & Registration (p1)
                </label>
                <textarea
                  rows={2}
                  value={contents.about?.story?.p1 || ""}
                  onChange={(e) =>
                    updateSectionField("about", "story", "p1", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Udyam & GST Certification (p2)
                </label>
                <textarea
                  rows={2}
                  value={contents.about?.story?.p2 || ""}
                  onChange={(e) =>
                    updateSectionField("about", "story", "p2", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Quality Testing & Dispatch (p3)
                </label>
                <textarea
                  rows={2}
                  value={contents.about?.story?.p3 || ""}
                  onChange={(e) =>
                    updateSectionField("about", "story", "p3", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: CONTACT & DEPOT CMS ────────────────────────────────────────── */}
      {activeTab === "contact" && (
        <div className="space-y-8">
          {/* Contact Header */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  Contact Page
                </span>
                <h3 className="text-lg font-bold text-gray-900">Header Information</h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveSection("contact", "header")}
                disabled={savingKey === "contact.header"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "contact.header" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Header
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={contents.contact?.header?.title || ""}
                  onChange={(e) =>
                    updateSectionField("contact", "header", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Intro Subtitle
                </label>
                <textarea
                  rows={2}
                  value={contents.contact?.header?.subtitle || ""}
                  onChange={(e) =>
                    updateSectionField("contact", "header", "subtitle", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Physical Depot Card Info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                  Limdi Depot Details
                </span>
                <h3 className="text-lg font-bold text-gray-900">Map & Physical Location Card</h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveSection("contact", "depot")}
                disabled={savingKey === "contact.depot"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "contact.depot" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Depot Info
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Registered Street Address
                </label>
                <input
                  type="text"
                  value={contents.contact?.depot?.fullAddress || ""}
                  onChange={(e) =>
                    updateSectionField("contact", "depot", "fullAddress", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Logistics & Transport Landmark Note
                </label>
                <input
                  type="text"
                  value={contents.contact?.depot?.landmark || ""}
                  onChange={(e) =>
                    updateSectionField("contact", "depot", "landmark", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Working Hours / Depot Timings
                </label>
                <input
                  type="text"
                  value={contents.contact?.depot?.timings || ""}
                  onChange={(e) =>
                    updateSectionField("contact", "depot", "timings", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
