"use client";

import { useState } from "react";
import type { ClientDocument } from "../lib/content";
import { RippleButton } from "./ui/multi-type-ripple-buttons";

// ── Document type metadata ────────────────────────────────────────────────────

const docMeta: Record<string, {
  label: string;
  purpose: string;
  color: string;
  rgb: string;
  icon: React.ReactNode;
}> = {
  "annual-report": {
    label: "Annual Report",
    purpose: "Yearly performance overview",
    color: "#8b5cf6",
    rgb: "139,92,246",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  "earnings-transcript": {
    label: "Earnings Transcript",
    purpose: "What leaders said in results call",
    color: "#10b981",
    rgb: "16,185,129",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 9h8M8 13h6M9 21H6a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2h-3" />
        <polyline points="17 17 19 19 23 15" />
      </svg>
    ),
  },
  "concall-detail": {
    label: "Concall Detail",
    purpose: "How to join the earnings call",
    color: "#0ea5c6",
    rgb: "14,165,198",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
  "investor-ppt": {
    label: "Investor PPT",
    purpose: "Investor pitch presentation",
    color: "#3b82f6",
    rgb: "59,130,246",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="7 10 12 7 17 10" />
        <line x1="12" y1="7" x2="12" y2="14" />
      </svg>
    ),
  },
  "fax-sheet": {
    label: "Fax Sheet",
    purpose: "Fax cover page",
    color: "#f59e0b",
    rgb: "245,158,11",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="15 17 22 17 22 10" />
      </svg>
    ),
  },
  "strategic-report": {
    label: "Strategic Report",
    purpose: "Long-term strategic outlook",
    color: "#ef4444",
    rgb: "239,68,68",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
  },
  "audit-report": {
    label: "Audit Report",
    purpose: "Independent audit findings",
    color: "#0ea5c6",
    rgb: "14,165,198",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  "financial-statement": {
    label: "Financial Statement",
    purpose: "Detailed financial results",
    color: "#22c55e",
    rgb: "34,197,94",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  "compliance": {
    label: "Compliance",
    purpose: "Regulatory compliance filing",
    color: "#f59e0b",
    rgb: "245,158,11",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  "other": {
    label: "Document",
    purpose: "Reference document",
    color: "#6b7280",
    rgb: "107,114,128",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
};

function getMeta(type: string) {
  return docMeta[type] ?? docMeta.other;
}

// ── Document Card ─────────────────────────────────────────────────────────────

function DocCard({ doc }: Readonly<{ doc: ClientDocument }>) {
  const meta = getMeta(doc.type);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        border: `1px solid rgba(${meta.rgb},0.15)`,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 16px rgba(8,28,38,0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      className="doc-card"
    >
      {/* Top accent */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, ${meta.color}, transparent)`, flexShrink: 0 }} />

      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Icon + badge row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "11px",
            background: `rgba(${meta.rgb},0.1)`, border: `1px solid rgba(${meta.rgb},0.25)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: meta.color, flexShrink: 0,
          }}>
            {meta.icon}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: meta.color }}>
              {meta.label}
            </p>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "#7a9099", marginTop: "1px" }}>
              {meta.purpose}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0e2530", lineHeight: 1.4, marginBottom: "6px", flex: 1 }}>
          {doc.title}
        </h3>

        {/* Date */}
        {doc.date && (
          <p style={{ fontSize: "0.75rem", color: "#7a9099", marginBottom: doc.description ? "6px" : "14px" }}>
            {new Date(doc.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}

        {/* Description */}
        {doc.description && (
          <p style={{ fontSize: "0.8rem", color: "#567079", lineHeight: 1.6, marginBottom: "14px" }}>
            {doc.description}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto", paddingTop: "14px", borderTop: `1px solid rgba(${meta.rgb},0.1)` }}>
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
              padding: "9px 14px", borderRadius: "9px",
              background: `linear-gradient(135deg, ${meta.color}, rgba(${meta.rgb},0.75))`,
              color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
              boxShadow: `0 3px 10px rgba(${meta.rgb},0.22)`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            View
          </a>
          <RippleButton
            variant="hover"
            hoverRippleColor={`rgba(${meta.rgb},0.35)`}
            className={`rounded-[9px] border border-[rgba(${meta.rgb},0.3)] bg-transparent font-semibold leading-[1.2] flex-1`}
          >
            <a
              href={`${doc.fileUrl}?dl=${encodeURIComponent(doc.title)}.pdf`}
              download
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: meta.color, textDecoration: "none", padding: "9px 14px", fontSize: "0.78rem", width: "100%" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function ClientDocuments({ docs }: Readonly<{ docs: ClientDocument[] }>) {
  // Build sorted unique year list (desc)
  const years = Array.from(
    new Set(docs.map((d) => d.year).filter((y): y is number => typeof y === "number"))
  ).sort((a, b) => b - a);

  const [activeYear, setActiveYear] = useState<number | "all">(years[0] ?? "all");

  const filtered = activeYear === "all"
    ? docs
    : docs.filter((d) => d.year === activeYear);

  // Group filtered docs by year (for the "All" view)
  const groupedByYear: Record<number | string, ClientDocument[]> = {};
  if (activeYear === "all") {
    // Group: docs with year go into their year bucket, undated into "other"
    for (const doc of docs) {
      const key = doc.year ?? "undated";
      if (!groupedByYear[key]) groupedByYear[key] = [];
      groupedByYear[key].push(doc);
    }
  }

  if (docs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 40px", background: "#ffffff", borderRadius: "20px", border: "1px solid rgba(14,165,198,0.12)" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(14,165,198,0.08)", border: "1px solid rgba(14,165,198,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5c6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#0e2530", marginBottom: "8px" }}>No documents uploaded yet</p>
        <p style={{ fontSize: "0.875rem", color: "#567079" }}>Documents will appear here once uploaded in the CMS.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`.doc-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(8,28,38,0.1) !important; }`}</style>

      {/* Year navigation */}
      {years.length > 0 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px", alignItems: "center" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", marginRight: "4px" }}>
            Fiscal Year
          </span>
          {years.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setActiveYear(yr)}
              style={{
                padding: "6px 16px",
                borderRadius: "100px",
                border: activeYear === yr ? "1px solid #0ea5c6" : "1px solid rgba(14,165,198,0.2)",
                background: activeYear === yr ? "#0ea5c6" : "rgba(14,165,198,0.05)",
                color: activeYear === yr ? "#ffffff" : "#3e5963",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
            >
              FY {yr}–{String(yr + 1).slice(-2)}
            </button>
          ))}
          {years.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveYear("all")}
              style={{
                padding: "6px 16px",
                borderRadius: "100px",
                border: activeYear === "all" ? "1px solid #0ea5c6" : "1px solid rgba(14,165,198,0.2)",
                background: activeYear === "all" ? "#0ea5c6" : "rgba(14,165,198,0.05)",
                color: activeYear === "all" ? "#ffffff" : "#3e5963",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
            >
              All Years
            </button>
          )}
        </div>
      )}

      {/* Documents grid */}
      {activeYear === "all" ? (
        // Show grouped by year sections
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {Object.entries(groupedByYear)
            .sort(([a], [b]) => {
              if (a === "undated") return 1;
              if (b === "undated") return -1;
              return Number(b) - Number(a);
            })
            .map(([yr, yearDocs]) => (
              <div key={yr}>
                {/* Year section header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ padding: "4px 14px", borderRadius: "100px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.25)" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0ea5c6" }}>
                      {yr === "undated" ? "Undated" : `FY ${yr}–${String(Number(yr) + 1).slice(-2)}`}
                    </span>
                  </div>
                  <span style={{ flex: 1, height: "1px", background: "rgba(14,165,198,0.15)" }} />
                  <span style={{ fontSize: "0.72rem", color: "#7a9099", fontWeight: 600 }}>
                    {yearDocs.length} document{yearDocs.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {yearDocs.map((doc, i) => <DocCard key={`${yr}-${i}`} doc={doc} />)}
                </div>
              </div>
            ))}
        </div>
      ) : (
        // Single year grid
        <div>
          {/* Year header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ padding: "4px 14px", borderRadius: "100px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.25)" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0ea5c6" }}>
                FY {activeYear}–{String(Number(activeYear) + 1).slice(-2)}
              </span>
            </div>
            <span style={{ flex: 1, height: "1px", background: "rgba(14,165,198,0.15)" }} />
            <span style={{ fontSize: "0.72rem", color: "#7a9099", fontWeight: 600 }}>
              {filtered.length} document{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Document type reference legend */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px", padding: "12px 16px", background: "#f8fbfc", borderRadius: "12px", border: "1px solid rgba(14,165,198,0.1)" }}>
            {Array.from(new Set(filtered.map((d) => d.type))).map((type) => {
              const m = getMeta(type);
              return (
                <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.7rem", fontWeight: 600, color: "#3e5963" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                  {m.label}
                </span>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {filtered.map((doc, i) => <DocCard key={i} doc={doc} />)}
          </div>
        </div>
      )}
    </>
  );
}
