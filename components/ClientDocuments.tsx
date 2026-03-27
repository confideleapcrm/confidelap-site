"use client";

import type { ClientDocument } from "../lib/content";

// ── Concall grouping helpers ─────────────────────────────────────────────────

type ConcallBadge = "Transcript" | "AI Summary" | "PPT" | "REC";

const concallDocTypeMap: Record<string, ConcallBadge> = {
  "earnings-transcript": "Transcript",
  "ai-summary": "AI Summary",
  "investor-ppt": "PPT",
  "recording": "REC",
};

const badgeOrder: ConcallBadge[] = ["Transcript", "AI Summary", "PPT", "REC"];

interface ConcallRow {
  label: string;
  sortKey: string;
  badges: Record<ConcallBadge, string | null>;
}

function groupConcallDocs(docs: ClientDocument[]): ConcallRow[] {
  const groups: Record<string, Record<ConcallBadge, string | null>> = {};
  const labelMap: Record<string, string> = {};

  for (const doc of docs) {
    const badge = concallDocTypeMap[doc.type];
    if (!badge) continue;

    let key: string;
    let label: string;

    if (doc.date) {
      const d = new Date(doc.date);
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const year = d.getFullYear();
      // Group by exact date so same-day docs merge, different days stay separate
      key = `${year}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      label = `${month} ${year}`;
    } else if (doc.year) {
      key = `${doc.year}-00-00`;
      label = `FY ${doc.year}`;
    } else {
      key = "undated";
      label = "Undated";
    }

    if (!groups[key]) {
      groups[key] = { Transcript: null, "AI Summary": null, PPT: null, REC: null };
    }
    labelMap[key] = label;
    groups[key][badge] = doc.fileUrl;
  }

  return Object.entries(groups)
    .map(([key, badges]) => ({ label: labelMap[key], sortKey: key, badges }))
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

// ── Accent colour ────────────────────────────────────────────────────────────

const ACCENT = "#6366f1"; // indigo to match screenshot

// ── Main Component ───────────────────────────────────────────────────────────

export function ClientDocuments({ docs }: Readonly<{ docs: ClientDocument[] }>) {
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

  // ── Categorise docs ──────────────────────────────────────────────────────

  const annualReports = docs
    .filter((d) => d.type === "annual-report")
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const creditRatings = docs
    .filter((d) => d.type === "credit-rating")
    .sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      return (b.year ?? 0) - (a.year ?? 0);
    });

  const concallTypeSet = new Set(["earnings-transcript", "ai-summary", "investor-ppt", "recording", "concall-detail"]);
  const concallDocs = docs.filter((d) => concallTypeSet.has(d.type));
  const concallRows = groupConcallDocs(concallDocs);

  // Anything that doesn't fit the 3 main columns
  const handledTypes = new Set(["annual-report", "credit-rating", "earnings-transcript", "ai-summary", "investor-ppt", "recording", "concall-detail"]);
  const otherDocs = docs.filter((d) => !handledTypes.has(d.type));

  const hasMainContent = annualReports.length > 0 || creditRatings.length > 0 || concallRows.length > 0;

  if (!hasMainContent && otherDocs.length === 0) {
    return null;
  }

  // ── Shared card style ────────────────────────────────────────────────────

  const columnCard: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid rgba(18,52,63,0.1)",
    borderLeft: `3px solid ${ACCENT}`,
    padding: "28px 24px",
    height: "100%",
  };

  const columnHeader: React.CSSProperties = {
    fontFamily: "Outfit, sans-serif",
    fontWeight: 800,
    fontSize: "1.05rem",
    color: "#0e2530",
    marginBottom: "24px",
    paddingBottom: "14px",
    borderBottom: "1px solid rgba(18,52,63,0.08)",
  };

  return (
    <>
      <style>{`
        .doc-link { color: ${ACCENT}; text-decoration: none; transition: opacity 0.15s; }
        .doc-link:hover { opacity: 0.75; }
      `}</style>

      {/* ── 3-Column Grid ────────────────────────────────────────────── */}
      {hasMainContent && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1.6fr",
            gap: "20px",
            alignItems: "start",
          }}
          className="doc-columns"
        >
          {/* ── Column 1: Annual Reports ─────────────────────────────── */}
          <div style={columnCard}>
            <h3 style={columnHeader}>Annual reports</h3>
            {annualReports.length === 0 ? (
              <p style={{ fontSize: "0.82rem", color: "#9ab0b8" }}>No annual reports yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {annualReports.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-link"
                    style={{ display: "block" }}
                  >
                    <span style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.4 }}>
                      Financial Year {doc.year}
                    </span>
                    {doc.description && (
                      <span style={{ display: "block", fontSize: "0.75rem", color: "#9ab0b8", marginTop: "2px" }}>
                        {doc.description}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Column 2: Credit Ratings ─────────────────────────────── */}
          <div style={columnCard}>
            <h3 style={columnHeader}>Credit ratings</h3>
            {creditRatings.length === 0 ? (
              <p style={{ fontSize: "0.82rem", color: "#9ab0b8" }}>No credit ratings yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {creditRatings.map((doc, i) => {
                  const dateStr = doc.date
                    ? new Date(doc.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                    : null;
                  const sub = [dateStr, doc.description].filter(Boolean).join(" ");
                  return (
                    <a
                      key={i}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-link"
                      style={{ display: "block" }}
                    >
                      <span style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.4 }}>
                        {doc.title}
                      </span>
                      {sub && (
                        <span style={{ display: "block", fontSize: "0.75rem", color: "#9ab0b8", marginTop: "2px" }}>
                          {sub}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Column 3: Concalls ────────────────────────────────────── */}
          <div style={columnCard}>
            <h3 style={columnHeader}>Concalls</h3>
            {concallRows.length === 0 ? (
              <p style={{ fontSize: "0.82rem", color: "#9ab0b8" }}>No concall documents yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {concallRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#0e2530", minWidth: "75px", flexShrink: 0 }}>
                      {row.label}
                    </span>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {badgeOrder.map((badge) => {
                        const url = row.badges[badge];
                        const active = url !== null;
                        const style: React.CSSProperties = {
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 12px",
                          borderRadius: "100px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                          transition: "all 0.15s",
                          border: active ? `1px solid ${ACCENT}` : "1px solid rgba(18,52,63,0.12)",
                          color: active ? ACCENT : "rgba(18,52,63,0.25)",
                          background: active ? `${ACCENT}0a` : "transparent",
                          cursor: active ? "pointer" : "default",
                        };
                        return active ? (
                          <a
                            key={badge}
                            href={url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={style}
                          >
                            {badge}
                          </a>
                        ) : (
                          <span key={badge} style={style}>
                            {badge}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Other Documents (fallback list) ──────────────────────────── */}
      {otherDocs.length > 0 && (
        <div style={{ marginTop: hasMainContent ? "32px" : 0 }}>
          <div style={columnCard}>
            <h3 style={columnHeader}>Other documents</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {otherDocs.map((doc, i) => {
                const dateStr = doc.date
                  ? new Date(doc.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                  : null;
                return (
                  <a
                    key={i}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-link"
                    style={{ display: "block" }}
                  >
                    <span style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.4 }}>
                      {doc.title}
                    </span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#9ab0b8", marginTop: "2px" }}>
                      {[dateStr, doc.description].filter(Boolean).join(" · ") || "View document"}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive override ──────────────────────────────────────── */}
      <style>{`
        @media (max-width: 960px) {
          .doc-columns {
            grid-template-columns: 1fr 1fr !important;
          }
          .doc-columns > div:nth-child(3) {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          .doc-columns {
            grid-template-columns: 1fr !important;
          }
          .doc-columns > div:nth-child(3) {
            grid-column: auto;
          }
        }
      `}</style>
    </>
  );
}
