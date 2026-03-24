import type { Metadata } from "next";
import Link from "next/link";
import { getAllClients } from "../../lib/content";

export const metadata: Metadata = {
  title: "Our Clients | ConfideLeap",
  description:
    "We work closely with every client as a true partner — supporting their growth, earning their trust, and sharing in their success. 18+ companies across diverse industries.",
};

const industryMeta: Record<string, { color: string; rgb: string }> = {
  Chemicals:      { color: "#3b82f6", rgb: "59,130,246" },
  Infrastructure: { color: "#8b5cf6", rgb: "139,92,246" },
  Healthcare:     { color: "#10b981", rgb: "16,185,129" },
  Manufacturing:  { color: "#f59e0b", rgb: "245,158,11" },
  Aquaculture:    { color: "#06b6d4", rgb: "6,182,212" },
  Environment:    { color: "#22c55e", rgb: "34,197,94" },
  Energy:         { color: "#fbbf24", rgb: "251,191,36" },
  "Oil & Gas":    { color: "#ef4444", rgb: "239,68,68" },
  FMCG:           { color: "#a855f7", rgb: "168,85,247" },
  Jewellery:      { color: "#f59e0b", rgb: "245,158,11" },
  Fintech:        { color: "#0ea5c6", rgb: "14,165,198" },
};

const fallback = { color: "#0ea5c6", rgb: "14,165,198" };

export default async function ClientsPage() {
  const clients = await getAllClients();
  const industries = Array.from(new Set(clients.map((c) => c.industry))).sort();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "100px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}
      >
        {/* Floating orbs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span
            className="anim-float"
            style={{ position: "absolute", top: "-20%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.16) 0%, transparent 68%)" }}
          />
          <span
            className="anim-float-2"
            style={{ position: "absolute", bottom: "-30%", left: "-12%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.12) 0%, transparent 70%)" }}
          />
          <span
            className="anim-spin-slow"
            style={{ position: "absolute", top: "12%", right: "12%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.15)" }}
          />
          <span
            className="anim-spin-slow-rev"
            style={{ position: "absolute", bottom: "8%", left: "8%", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(108,71,255,0.12)" }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Badge */}
          <div
            className="anim-fade-up"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.25)", marginBottom: "28px" }}
          >
            <span className="ping-dot" style={{ background: "#0ea5c6" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0ea5c6" }}>Our Clientele</span>
          </div>

          <h1
            className="anim-fade-up delay-100 shimmer-text"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: "22px" }}
          >
            Trusted by {clients.length}+ Companies<br />Across India
          </h1>

          <p
            className="anim-fade-up delay-200"
            style={{ color: "rgba(180,215,228,0.7)", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", maxWidth: "580px", margin: "0 auto 44px", lineHeight: 1.8 }}
          >
            We work closely with every client as a true partner — supporting their growth,
            earning their trust, and sharing in their success across diverse industries.
          </p>

          {/* Stats row */}
          <div
            className="anim-fade-up delay-300"
            style={{ display: "inline-flex", gap: "48px", padding: "20px 44px", borderRadius: "20px", background: "rgba(14,165,198,0.06)", border: "1px solid rgba(14,165,198,0.18)", flexWrap: "wrap", justifyContent: "center" }}
          >
            {[
              { val: `${clients.length}+`, label: "Clients" },
              { val: `${industries.length}+`, label: "Industries" },
              { val: "100%", label: "Satisfaction" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#f0f8fa", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(180,215,228,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Filter Pills ───────────────────────────────────────── */}
      <section style={{ background: "#0b1e28", borderTop: "1px solid rgba(14,165,198,0.1)", borderBottom: "1px solid rgba(14,165,198,0.1)", padding: "24px 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(180,215,228,0.4)", marginRight: "4px" }}>Industries</span>
            {industries.map((ind) => {
              const m = industryMeta[ind] ?? fallback;
              return (
                <span
                  key={ind}
                  style={{ padding: "5px 14px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600, background: `rgba(${m.rgb},0.1)`, color: m.color, border: `1px solid rgba(${m.rgb},0.25)` }}
                >
                  {ind}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Client Cards ───────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div
            className="reveal"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "20px" }}
          >
            {clients.map((client, i) => {
              const m = industryMeta[client.industry] ?? fallback;
              const isFirst = i === 0;
              const hasDocuments = client.documents && client.documents.length > 0;
              return (
                <Link
                  key={client.slug}
                  href={`/clients/${client.slug}`}
                  className="reveal"
                  style={{
                    display: "block",
                    padding: "28px",
                    borderRadius: "20px",
                    background: isFirst ? `linear-gradient(135deg, #0e2530, #0b1e28)` : "#ffffff",
                    border: `1px solid rgba(${m.rgb},${isFirst ? "0.3" : "0.15"})`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${m.color}, transparent)` }} />

                  {/* Watermark initial */}
                  <div
                    aria-hidden
                    style={{ position: "absolute", bottom: "-16px", right: "-12px", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "6rem", color: isFirst ? `rgba(${m.rgb},0.06)` : `rgba(${m.rgb},0.05)`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}
                  >
                    {client.name.charAt(0)}
                  </div>

                  {/* Icon avatar */}
                  <div
                    style={{ width: "52px", height: "52px", borderRadius: "14px", background: `rgba(${m.rgb},${isFirst ? "0.2" : "0.1"})`, border: `1px solid rgba(${m.rgb},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "1.3rem", color: m.color }}
                  >
                    {client.name.charAt(0)}
                  </div>

                  {/* Industry badge */}
                  <span
                    style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: m.color, background: `rgba(${m.rgb},${isFirst ? "0.15" : "0.08"})`, border: `1px solid rgba(${m.rgb},0.25)`, padding: "3px 10px", borderRadius: "100px", marginBottom: "12px" }}
                  >
                    {client.industry}
                  </span>

                  <h3
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.97rem", color: isFirst ? "#f0f8fa" : "#0e2530", marginBottom: "10px", lineHeight: 1.35 }}
                  >
                    {client.name}
                  </h3>
                  <p
                    style={{ fontSize: "0.82rem", color: isFirst ? "rgba(180,215,228,0.65)" : "#567079", lineHeight: 1.7, marginBottom: "16px" }}
                  >
                    {client.description}
                  </p>

                  {/* Document count + view arrow */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {hasDocuments ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", fontWeight: 700, color: m.color, background: `rgba(${m.rgb},0.08)`, border: `1px solid rgba(${m.rgb},0.2)`, padding: "3px 10px", borderRadius: "100px" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        {client.documents!.length} doc{client.documents!.length > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.72rem", color: isFirst ? "rgba(180,215,228,0.35)" : "rgba(18,52,63,0.3)" }}>No documents</span>
                    )}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isFirst ? "rgba(180,215,228,0.5)" : m.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section
        className="section-dark"
        style={{ textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.12) 0%, transparent 68%)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h2
            className="shimmer-text"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "16px" }}
          >
            Want to Join Our Growing List of Clients?
          </h2>
          <p style={{ color: "rgba(180,215,228,0.65)", maxWidth: "480px", margin: "0 auto 36px", fontSize: "1rem", lineHeight: 1.75 }}>
            Let&apos;s discuss how ConfideLeap can help your business build investor confidence and drive sustainable growth.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ padding: "14px 32px", fontSize: "0.95rem", boxShadow: "0 8px 32px rgba(14,165,198,0.35)" }}
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "12px", border: "1px solid rgba(14,165,198,0.3)", color: "rgba(180,215,228,0.85)", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease" }}
            >
              Explore Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
