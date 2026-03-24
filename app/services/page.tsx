import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "../../lib/content";
import { GetStartedButton } from "../../components/ui/get-started-button";

export const metadata: Metadata = {
  title: "Services We Provide | ConfideLeap",
  description:
    "ConfideLeap offers Investor Relations Advisory, Digital Marketing, Public Relations, Annual Report, and Podcast Solutions — all under one strategic roof.",
};

const svcMeta: Record<string, { rgb: string; hex: string; label: string; number: string }> = {
  "investor-relations": { rgb: "14,165,198",   hex: "#0ea5c6", label: "IR",  number: "01" },
  "digital-marketing":  { rgb: "108,71,255",   hex: "#6c47ff", label: "DM",  number: "02" },
  "public-relations":   { rgb: "16,185,129",   hex: "#10b981", label: "PR",  number: "03" },
  "annual-report":      { rgb: "245,158,11",   hex: "#f59e0b", label: "AR",  number: "04" },
  podcast:              { rgb: "239,68,68",    hex: "#ef4444", label: "POD", number: "05" },
};

const iconPaths: Record<string, string> = {
  "investor-relations": "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 1 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z",
  "digital-marketing":  "M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
  "public-relations":   "M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  "annual-report":      "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 1 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  podcast:              "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4m-4 0h8",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        {/* Animated orbs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.18) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(8,127,158,0.2) 0%, transparent 72%)" }} />
          <span className="anim-float-3" style={{ position: "absolute", top: "35%", left: "42%", width: "26vw", height: "26vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(52,189,214,0.12) 0%, transparent 76%)" }} />
          {/* Decorative ring */}
          <span className="anim-spin-slow" style={{ position: "absolute", top: "10%", right: "12%", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.14)" }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "8%", right: "10%", width: "380px", height: "380px", borderRadius: "50%", border: "1px dashed rgba(14,165,198,0.08)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            className="anim-fade-up"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.12)", border: "1px solid rgba(14,165,198,0.28)", marginBottom: "28px" }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12abc9" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>Our Services</span>
          </div>

          <h1
            className="anim-fade-up delay-100"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "24px", color: "#f0f8fa" }}
          >
            Services{" "}
            <span className="shimmer-text">We Provide</span>
          </h1>

          <p
            className="anim-fade-up delay-200"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(210,235,242,0.72)", maxWidth: "600px", lineHeight: 1.75, marginBottom: "48px" }}
          >
            Investor relations, public relations, digital marketing, annual reports,
            and podcast solutions — all delivered with one unified strategic voice.
          </p>

          {/* Service count indicators */}
          <div className="anim-fade-up delay-300" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {services.map((s) => {
              const m = svcMeta[s.slug];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", background: `rgba(${m?.rgb ?? "14,165,198"}, 0.1)`, border: `1px solid rgba(${m?.rgb ?? "14,165,198"}, 0.22)`, color: "#cce9f0", fontSize: "0.8rem", fontWeight: 600, transition: "all 0.2s ease" }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: m?.hex ?? "#0ea5c6", flexShrink: 0 }} />
                  {s.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service Showcases ────────────────────────────────────────────── */}
      <section style={{ background: "#f5f7f8", padding: "80px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {services.map((service) => {
            const m = svcMeta[service.slug] ?? { rgb: "14,165,198", hex: "#0ea5c6", label: "SVC", number: "01" };
            const iconPath = iconPaths[service.slug];

            return (
              <article key={service.slug} className="svc-row reveal">
                {/* Left accent strip */}
                <div
                  className="svc-row-accent"
                  style={{ background: `linear-gradient(180deg, ${m.hex} 0%, transparent 100%)` }}
                />

                {/* Watermark number */}
                <div
                  aria-hidden
                  style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(6rem, 10vw, 9rem)", color: `rgba(${m.rgb}, 0.06)`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}
                >
                  {m.number}
                </div>

                <div style={{ padding: "36px 40px 36px 48px", display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "start", position: "relative", zIndex: 1 }}>
                  {/* Left content */}
                  <div>
                    {/* Icon + number row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                      <div
                        style={{ width: "52px", height: "52px", borderRadius: "14px", background: `rgba(${m.rgb}, 0.12)`, border: `1px solid rgba(${m.rgb}, 0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={m.hex} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d={iconPath} />
                        </svg>
                      </div>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: m.hex }}>
                        {m.number} — {m.label}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 2rem)", letterSpacing: "-0.02em", marginBottom: "10px", color: "#0e2530" }}>
                      {service.title}
                    </h2>
                    <p style={{ fontWeight: 600, fontSize: "0.92rem", color: m.hex, marginBottom: "12px" }}>
                      {service.subtitle}
                    </p>
                    <p style={{ color: "#4a6370", lineHeight: 1.75, fontSize: "0.95rem", maxWidth: "680px", marginBottom: "24px" }}>
                      {service.description}
                    </p>

                    {/* Feature chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {service.features.slice(0, 6).map((f) => (
                        <span
                          key={f.title}
                          className="chip"
                          style={{ background: `rgba(${m.rgb}, 0.08)`, border: `1px solid rgba(${m.rgb}, 0.2)`, color: "#3e5963" }}
                        >
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke={m.hex} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {f.title}
                        </span>
                      ))}
                      {service.features.length > 6 && (
                        <span className="chip" style={{ background: `rgba(${m.rgb}, 0.06)`, border: `1px solid rgba(${m.rgb}, 0.15)`, color: "#7a9099" }}>
                          +{service.features.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right CTA */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
                    <Link
                      href={`/services/${service.slug}`}
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", borderRadius: "10px", background: `linear-gradient(135deg, ${m.hex} 0%, rgba(${m.rgb},0.75) 100%)`, color: "#ffffff", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.88rem", boxShadow: `0 8px 24px rgba(${m.rgb},0.28)`, transition: "all 0.25s ease", textDecoration: "none", whiteSpace: "nowrap" }}
                    >
                      Explore Service
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section
        className="section-dark"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-40%", left: "-8%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.12) 0%, transparent 70%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.22)", marginBottom: "24px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>Unsure where to start?</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f8fa", marginBottom: "18px" }}>
            Not sure which service is right for you?
          </h2>
          <p className="reveal" style={{ color: "rgba(200,230,240,0.68)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Talk to our experts and get a custom strategy built around your business goals.
          </p>
          <div className="reveal" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <GetStartedButton href="/contact" label="Talk to an Expert" />
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", border: "1px solid rgba(14,165,198,0.3)", color: "#9ee6f4", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.25s ease", textDecoration: "none" }}>
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
