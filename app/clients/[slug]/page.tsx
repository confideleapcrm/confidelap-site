import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllClients, getClientBySlug } from "../../../lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const clients = await getAllClients();
  return clients.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) return {};
  return {
    title: `${client.name} | ConfideLeap`,
    description: client.description,
  };
}

const docTypeMeta: Record<string, { label: string; color: string; rgb: string; icon: string }> = {
  "audit-report":           { label: "Audit Report",           color: "#0ea5c6", rgb: "14,165,198",  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  "annual-report":          { label: "Annual Report",          color: "#8b5cf6", rgb: "139,92,246",  icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  "financial-statement":    { label: "Financial Statement",    color: "#10b981", rgb: "16,185,129",  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  "compliance":             { label: "Compliance Document",    color: "#f59e0b", rgb: "245,158,11",  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  "investor-presentation":  { label: "Investor Presentation",  color: "#3b82f6", rgb: "59,130,246",  icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
  "other":                  { label: "Document",               color: "#6b7280", rgb: "107,114,128", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
};

const industryColor: Record<string, string> = {
  Chemicals: "#3b82f6", Infrastructure: "#8b5cf6", Healthcare: "#10b981",
  Pharmaceuticals: "#10b981", Manufacturing: "#f59e0b", Aquaculture: "#06b6d4",
  Environment: "#22c55e", Energy: "#fbbf24", "Renewable Energy": "#fbbf24",
  "Oil & Gas": "#ef4444", FMCG: "#a855f7", Jewellery: "#f59e0b",
  Fintech: "#0ea5c6", "Industrial Equipment": "#64748b",
};

export default async function ClientDetailPage({ params }: Props) {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) notFound();

  const iColor = industryColor[client.industry] ?? "#0ea5c6";
  const docs = client.documents ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "90px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-20%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(14,165,198,0.14) 0%, transparent 68%)` }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-25%", left: "-8%", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(108,71,255,0.1) 0%, transparent 70%)` }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.8rem", color: "rgba(180,215,228,0.5)", marginBottom: "32px" }}>
            <Link href="/" style={{ color: "rgba(180,215,228,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/clients" style={{ color: "rgba(180,215,228,0.5)", textDecoration: "none" }}>Clients</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "rgba(180,215,228,0.85)" }}>{client.name}</span>
          </nav>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "28px", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: `${iColor}22`, border: `1px solid ${iColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2rem", color: iColor, flexShrink: 0 }}>
              {client.name.charAt(0)}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: iColor, background: `${iColor}1a`, border: `1px solid ${iColor}33`, padding: "4px 12px", borderRadius: "100px", display: "inline-block", marginBottom: "14px" }}>
                {client.industry}
              </span>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f0f8fa", lineHeight: 1.1, marginBottom: "14px" }}>
                {client.name}
              </h1>
              <p style={{ color: "rgba(180,215,228,0.65)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "680px" }}>
                {client.description}
              </p>

              {/* Services used */}
              {client.services && client.services.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
                  {client.services.map((s) => (
                    <span key={s} style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(180,215,228,0.7)", background: "rgba(14,165,198,0.08)", border: "1px solid rgba(14,165,198,0.2)", padding: "4px 12px", borderRadius: "100px" }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Website link */}
            {client.website && (
              <a href={client.website} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px", border: "1px solid rgba(14,165,198,0.3)", color: "#0ea5c6", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Visit Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Documents ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ marginBottom: "40px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "10px" }}>
              Client Documents
            </span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
              {docs.length > 0 ? `${docs.length} Document${docs.length > 1 ? "s" : ""} Available` : "No Documents Yet"}
            </h2>
          </div>

          {docs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "#ffffff", borderRadius: "20px", border: "1px solid rgba(14,165,198,0.12)" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(14,165,198,0.08)", border: "1px solid rgba(14,165,198,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5c6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#0e2530", marginBottom: "8px" }}>No documents uploaded yet</p>
              <p style={{ fontSize: "0.875rem", color: "#567079" }}>Documents will appear here once uploaded in the CMS.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
              {docs.map((doc, i) => {
                const meta = docTypeMeta[doc.type] ?? docTypeMeta.other;
                return (
                  <div
                    key={i}
                    className="reveal"
                    style={{ background: "#ffffff", borderRadius: "20px", border: `1px solid rgba(${meta.rgb},0.15)`, overflow: "hidden", position: "relative" }}
                  >
                    {/* Top accent */}
                    <div style={{ height: "3px", background: `linear-gradient(90deg, ${meta.color}, transparent)` }} />

                    <div style={{ padding: "24px" }}>
                      {/* Icon + type badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `rgba(${meta.rgb},0.1)`, border: `1px solid rgba(${meta.rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d={meta.icon} />
                          </svg>
                        </div>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: meta.color, background: `rgba(${meta.rgb},0.08)`, border: `1px solid rgba(${meta.rgb},0.2)`, padding: "3px 10px", borderRadius: "100px" }}>
                          {meta.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0e2530", lineHeight: 1.4, marginBottom: "8px" }}>
                        {doc.title}
                      </h3>

                      {/* Date */}
                      {doc.date && (
                        <p style={{ fontSize: "0.78rem", color: "#7a9099", marginBottom: "8px" }}>
                          {new Date(doc.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      )}

                      {/* Description */}
                      {doc.description && (
                        <p style={{ fontSize: "0.82rem", color: "#567079", lineHeight: 1.65, marginBottom: "16px" }}>
                          {doc.description}
                        </p>
                      )}

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "10px 16px", borderRadius: "10px", background: `linear-gradient(135deg, ${meta.color}, rgba(${meta.rgb},0.75))`, color: "#ffffff", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 14px rgba(${meta.rgb},0.25)` }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          View PDF
                        </a>
                        <a
                          href={`${doc.fileUrl}?dl=${encodeURIComponent(doc.title)}.pdf`}
                          download
                          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "10px 16px", borderRadius: "10px", border: `1px solid rgba(${meta.rgb},0.3)`, color: meta.color, fontSize: "0.82rem", fontWeight: 700, textDecoration: "none" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Back ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#f5f7f8", paddingBottom: "60px" }}>
        <div className="container">
          <Link href="/clients" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0ea5c6", fontSize: "0.88rem", fontWeight: 700, textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Clients
          </Link>
        </div>
      </section>
    </>
  );
}
