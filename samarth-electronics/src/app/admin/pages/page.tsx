"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  ExternalLink,
  Layout,
  Info,
  MapPin,
  HelpCircle,
  Megaphone,
  Globe,
  Plus,
  Trash2,
  Users,
  Calendar,
  Check,
} from "lucide-react";
import { defaultPageContents, FAQItemData, PartnerData, MilestoneData } from "@/lib/page-content-defaults";
import {
  getAllPagesData,
  savePageSection,
  resetPageSection,
} from "@/actions/page-actions";

type TabKey = "home" | "about" | "contact" | "faqs" | "announcement" | "seo";

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
    page: string,
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

  const handleSaveSection = async (page: string, section: string) => {
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

  const handleResetSection = async (page: string, section: string) => {
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

  const faqsList: FAQItemData[] = Array.isArray(contents.global?.faqs)
    ? contents.global.faqs
    : defaultPageContents.global.faqs;

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
            Professional CMS to customize hero banners, FAQs, partner bios, announcements, and SEO.
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
      <div className="flex border-b border-gray-200 mb-8 space-x-1 sm:space-x-3 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: "home" as TabKey, label: "Homepage", icon: Layout },
          { key: "about" as TabKey, label: "About Us", icon: Info },
          { key: "contact" as TabKey, label: "Contact & Depot", icon: MapPin },
          { key: "faqs" as TabKey, label: "FAQ Manager", icon: HelpCircle },
          { key: "announcement" as TabKey, label: "Top Notice Bar", icon: Megaphone },
          { key: "seo" as TabKey, label: "SEO & Meta", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap rounded-t-lg ${
                isActive
                  ? "border-blue-900 text-blue-900 bg-blue-50/50 font-bold"
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={contents.home?.overview?.tagline || ""}
                    onChange={(e) => updateSectionField("home", "overview", "tagline", e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={contents.home?.overview?.title || ""}
                    onChange={(e) => updateSectionField("home", "overview", "title", e.target.value)}
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
                  onChange={(e) => updateSectionField("home", "overview", "description1", e.target.value)}
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
                  onChange={(e) => updateSectionField("home", "overview", "description2", e.target.value)}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Heading</label>
                <input
                  type="text"
                  value={contents.home?.cta?.title || ""}
                  onChange={(e) => updateSectionField("home", "cta", "title", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Subtext</label>
                <input
                  type="text"
                  value={contents.home?.cta?.subtitle || ""}
                  onChange={(e) => updateSectionField("home", "cta", "subtitle", e.target.value)}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={contents.about?.header?.tagline || ""}
                  onChange={(e) => updateSectionField("about", "header", "tagline", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={contents.about?.header?.title || ""}
                  onChange={(e) => updateSectionField("about", "header", "title", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={contents.about?.header?.subtitle || ""}
                  onChange={(e) => updateSectionField("about", "header", "subtitle", e.target.value)}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Story Title</label>
                <input
                  type="text"
                  value={contents.about?.story?.title || ""}
                  onChange={(e) => updateSectionField("about", "story", "title", e.target.value)}
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
                  onChange={(e) => updateSectionField("about", "story", "p1", e.target.value)}
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
                  onChange={(e) => updateSectionField("about", "story", "p2", e.target.value)}
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
                  onChange={(e) => updateSectionField("about", "story", "p3", e.target.value)}
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={contents.contact?.header?.title || ""}
                  onChange={(e) => updateSectionField("contact", "header", "title", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Intro Subtitle</label>
                <textarea
                  rows={2}
                  value={contents.contact?.header?.subtitle || ""}
                  onChange={(e) => updateSectionField("contact", "header", "subtitle", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

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
                  onChange={(e) => updateSectionField("contact", "depot", "fullAddress", e.target.value)}
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
                  onChange={(e) => updateSectionField("contact", "depot", "landmark", e.target.value)}
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
                  onChange={(e) => updateSectionField("contact", "depot", "timings", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: FAQ MANAGER CMS ───────────────────────────────────────────── */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                B2B Trade Questions
              </span>
              <h3 className="text-lg font-bold text-gray-900">Interactive FAQ Accordion Manager</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage the questions & answers displayed on the Homepage, Contact, and Catalogue pages.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const updated = [
                    ...faqsList,
                    {
                      tag: "General Inquiry",
                      question: "New Trade Question?",
                      answer: "Provide answers regarding wholesale terms, shipping, or warranty.",
                      isActive: true,
                    },
                  ];
                  setContents((p: any) => ({
                    ...p,
                    global: { ...p.global, faqs: updated },
                  }));
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>

              <button
                type="button"
                onClick={() => handleSaveSection("global", "faqs")}
                disabled={savingKey === "global.faqs"}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                {savingKey === "global.faqs" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save All FAQs
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-bold text-gray-400 font-mono">#{idx + 1}</span>
                    <input
                      type="text"
                      value={faq.tag}
                      placeholder="Category Tag (e.g. Orders & MOQ)"
                      onChange={(e) => {
                        const updated = [...faqsList];
                        updated[idx] = { ...updated[idx], tag: e.target.value };
                        setContents((p: any) => ({ ...p, global: { ...p.global, faqs: updated } }));
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50/60 border border-orange-200/60 rounded px-2.5 py-1 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={faq.isActive !== false}
                        onChange={(e) => {
                          const updated = [...faqsList];
                          updated[idx] = { ...updated[idx], isActive: e.target.checked };
                          setContents((p: any) => ({ ...p, global: { ...p.global, faqs: updated } }));
                        }}
                        className="rounded text-blue-900"
                      />
                      Active
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (!confirm("Delete this FAQ item?")) return;
                        const updated = faqsList.filter((_, i) => i !== idx);
                        setContents((p: any) => ({ ...p, global: { ...p.global, faqs: updated } }));
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 transition"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqsList];
                      updated[idx] = { ...updated[idx], question: e.target.value };
                      setContents((p: any) => ({ ...p, global: { ...p.global, faqs: updated } }));
                    }}
                    className="w-full font-bold text-gray-900 text-sm border border-gray-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqsList];
                      updated[idx] = { ...updated[idx], answer: e.target.value };
                      setContents((p: any) => ({ ...p, global: { ...p.global, faqs: updated } }));
                    }}
                    className="w-full text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: TOP ANNOUNCEMENT BAR ───────────────────────────────────────── */}
      {activeTab === "announcement" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                Top Announcement Bar
              </span>
              <h3 className="text-lg font-bold text-gray-900">Website Header Notice Bar</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Controls the top header notice strip on desktop and trade highlights.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSaveSection("global", "announcement")}
              disabled={savingKey === "global.announcement"}
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
            >
              {savingKey === "global.announcement" ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Notice Bar
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="ann-enabled"
                checked={contents.global?.announcement?.enabled !== false}
                onChange={(e) =>
                  updateSectionField("global", "announcement", "enabled", e.target.checked)
                }
                className="w-4 h-4 text-blue-900 rounded"
              />
              <label htmlFor="ann-enabled" className="text-sm font-bold text-gray-900 cursor-pointer">
                Enable Top Header Notice Strip
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Notice Text (with optional emoji)
              </label>
              <input
                type="text"
                value={contents.global?.announcement?.text || ""}
                onChange={(e) =>
                  updateSectionField("global", "announcement", "text", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Action Link Text
                </label>
                <input
                  type="text"
                  value={contents.global?.announcement?.actionText || ""}
                  onChange={(e) =>
                    updateSectionField("global", "announcement", "actionText", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Action Destination Link
                </label>
                <input
                  type="text"
                  value={contents.global?.announcement?.actionUrl || ""}
                  onChange={(e) =>
                    updateSectionField("global", "announcement", "actionUrl", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 6: SEO & META TAGS CMS ────────────────────────────────────────── */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-0.5">
                Search Engine Optimization
              </span>
              <h3 className="text-lg font-bold text-gray-900">SEO & Metadata Settings</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Customize titles and descriptions shown in Google Search and social media sharing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSaveSection("global", "seo")}
              disabled={savingKey === "global.seo"}
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
            >
              {savingKey === "global.seo" ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save SEO
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Default Meta Title (Browser Tab & Google Headline)
              </label>
              <input
                type="text"
                value={contents.global?.seo?.siteTitle || ""}
                onChange={(e) => updateSectionField("global", "seo", "siteTitle", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Default Meta Description (Google Search Snippet)
              </label>
              <textarea
                rows={3}
                value={contents.global?.seo?.siteDescription || ""}
                onChange={(e) =>
                  updateSectionField("global", "seo", "siteDescription", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                SEO Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={contents.global?.seo?.keywords || ""}
                onChange={(e) => updateSectionField("global", "seo", "keywords", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Google Search Snippet Simulation */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mt-4 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Google Search Snippet Preview
              </span>
              <div className="text-xs text-emerald-700">https://samarthelectronics.in</div>
              <div className="text-base font-medium text-blue-800 hover:underline cursor-pointer">
                {contents.global?.seo?.siteTitle || "Samarth Electronics Hub"}
              </div>
              <div className="text-xs text-gray-600 line-clamp-2">
                {contents.global?.seo?.siteDescription ||
                  "Wholesale manufacturer & B2B distributor of architectural LED panels..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
