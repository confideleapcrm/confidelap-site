import type { Metadata } from "next";
import Link from "next/link";
import siteData from "../../content/site.json";

export const metadata: Metadata = {
  title: "Career – Join the ConfideLeap Team | ConfideLeap",
  description:
    "The perfect candidate possesses an innate sense of curiosity and engages in ongoing self-improvement. Explore open roles at ConfideLeap Partners.",
};

const openings = [
  {
    id: "manager-investor-relations",
    title: "Manager – Investor Relation",
    type: "Full-time",
    exp: "2–5 years",
    location: "Mumbai, India",
    color: { rgb: "14,165,198", hex: "#0ea5c6", dark: "#0b7f9f" },
    description:
      "Lead investor relations strategies for listed companies, manage client relationships, and drive impactful IR campaigns. You will serve as the primary point of contact between the company and its investor community.",
    requirements: [
      "2–5 years of experience in IR or capital markets",
      "Strong understanding of SEBI regulations and disclosure norms",
      "Excellent written and verbal communication skills",
      "MBA in Finance preferred",
    ],
  },
  {
    id: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    type: "Full-time",
    exp: "1–3 years",
    location: "Mumbai, India",
    color: { rgb: "108,71,255", hex: "#6c47ff", dark: "#5535e0" },
    description:
      "Plan and execute digital marketing campaigns across SEO, social media, email, and paid channels for our diverse client base. You will play a key role in building the digital presence of listed companies.",
    requirements: [
      "1–3 years of digital marketing experience",
      "Proficiency in Google Analytics, Meta Ads Manager, and SEO tools",
      "Strong content writing and strategy skills",
      "Familiarity with B2B marketing preferred",
    ],
  },
];

const values = [
  {
    title: "Curiosity",
    desc: "We encourage asking why, exploring ideas, and constantly learning. Dive into books, podcasts, and conversations that push your thinking forward.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="11" /><line x1="11" y1="14" x2="11.01" y2="14" />
      </svg>
    ),
  },
  {
    title: "Adaptability",
    desc: "Markets move fast. We move faster — nimble, responsive, and proactive. We keep abreast of shifts in culture, consumer habits, and media advancements.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    desc: "We hold ourselves to the highest standards in everything we deliver. Connecting with key players and delivering results with precision is our baseline.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    desc: "Great results come from working together — with teammates and clients alike. We build relationships that create long-term impact.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-dark grid-lines" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-22%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.14) 0%, transparent 72%)" }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "8%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(108,71,255,0.14)" }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "5%", right: "7%", width: "380px", height: "380px", borderRadius: "50%", border: "1px dashed rgba(108,71,255,0.08)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(108,71,255,0.12)", border: "1px solid rgba(108,71,255,0.28)", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8b5cf6" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c4b5fd" }}>Career</span>
          </div>

          <h1 className="anim-fade-up delay-100" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "22px", color: "#f0f8fa" }}>
            Discover the Right<br />
            <span className="shimmer-text">Career Opportunity</span>
          </h1>

          <p className="anim-fade-up delay-200" style={{ fontSize: "clamp(1rem, 1.9vw, 1.15rem)", color: "rgba(210,235,242,0.7)", maxWidth: "600px", lineHeight: 1.8, marginBottom: "40px" }}>
            The perfect candidate will possess an innate sense of curiosity and engage in ongoing
            self-improvement by diving into books and podcasts, connecting with key players, and
            keeping abreast of shifts in culture, consumer habits, and media advancements.
          </p>

          <div className="anim-fade-up delay-300" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#openings" className="btn-primary" style={{ padding: "13px 26px" }}>
              View Open Roles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </a>
            <a href={`mailto:${siteData.email}?subject=Career Inquiry – ConfideLeap`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(200,235,242,0.8)", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.25s ease" }}>
              Send Open Application
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Work Here ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "10px" }}>Culture</span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
              Why Work at ConfideLeap?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bento-card reveal"
                style={i === 0 ? { background: "linear-gradient(145deg, #071218, #0d2532)", color: "#ffffff", borderColor: "transparent" } : {}}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: i === 0 ? "rgba(255,255,255,0.1)" : "rgba(14,165,198,0.1)", border: i === 0 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(14,165,198,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", color: i === 0 ? "#7dd9ee" : "#0ea5c6" }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.1rem", marginBottom: "10px", color: i === 0 ? "#f0f8fa" : "#0e2530" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: i === 0 ? "rgba(200,230,240,0.78)" : "#567079" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Openings ─────────────────────────────────────────────── */}
      <section id="openings" className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#567079" }}>Current Jobs</span>
            <span style={{ flex: 1, height: "1px", background: "rgba(18,52,63,0.12)" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#7a9099" }}>{openings.length} open roles</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {openings.map((job) => (
              <article key={job.id} className="svc-row reveal">
                {/* Left accent strip */}
                <div className="svc-row-accent" style={{ background: `linear-gradient(180deg, ${job.color.hex} 0%, transparent 100%)` }} />

                {/* Watermark number */}
                <div aria-hidden style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(5rem, 9vw, 8rem)", color: `rgba(${job.color.rgb}, 0.06)`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
                  {openings.indexOf(job) === 0 ? "01" : "02"}
                </div>

                <div style={{ padding: "36px 40px 36px 48px", position: "relative", zIndex: 1 }}>
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "18px", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", letterSpacing: "-0.02em", color: "#0e2530", marginBottom: "10px" }}>
                        {job.title}
                      </h3>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ padding: "4px 12px", borderRadius: "100px", background: `rgba(${job.color.rgb},0.1)`, border: `1px solid rgba(${job.color.rgb},0.25)`, fontSize: "0.75rem", fontWeight: 700, color: job.color.hex }}>
                          {job.type}
                        </span>
                        <span style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(18,52,63,0.06)", border: "1px solid rgba(18,52,63,0.12)", fontSize: "0.75rem", fontWeight: 600, color: "#3e5963", display: "flex", alignItems: "center", gap: "4px" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {job.location}
                        </span>
                        <span style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(18,52,63,0.06)", border: "1px solid rgba(18,52,63,0.12)", fontSize: "0.75rem", fontWeight: 600, color: "#3e5963" }}>
                          {job.exp} exp.
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{ color: "#4a6370", lineHeight: 1.75, fontSize: "0.95rem", maxWidth: "720px", marginBottom: "24px" }}>
                    {job.description}
                  </p>

                  {/* Requirements */}
                  <div style={{ marginBottom: "28px" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", marginBottom: "12px" }}>Requirements</p>
                    <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "8px" }}>
                      {job.requirements.map((req) => (
                        <li key={req} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: `rgba(${job.color.rgb},0.12)`, border: `1px solid rgba(${job.color.rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke={job.color.hex} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span style={{ fontSize: "0.875rem", color: "#3e5963", lineHeight: 1.55 }}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer row */}
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", paddingTop: "24px", borderTop: "1px solid rgba(18,52,63,0.08)" }}>
                    <Link
                      href="/contact"
                      className="btn-primary"
                      style={{ background: `linear-gradient(135deg, ${job.color.hex} 0%, ${job.color.dark} 100%)`, boxShadow: `0 6px 20px rgba(${job.color.rgb},0.28)`, padding: "11px 24px", fontSize: "0.9rem" }}
                    >
                      Apply Now
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <p style={{ fontSize: "0.82rem", color: "#7a9099" }}>
                      Or email your CV to{" "}
                      <a href={`mailto:${siteData.email}?subject=Application – ${job.title}`} style={{ color: job.color.hex, fontWeight: 600, textDecoration: "none" }}>
                        {siteData.email}
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Application CTA ─────────────────────────────────────────── */}
      <section className="section-dark" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-50%", right: "-5%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.14) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-40%", left: "-8%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.1) 0%, transparent 72%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(108,71,255,0.1)", border: "1px solid rgba(108,71,255,0.24)", marginBottom: "24px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c4b5fd" }}>Open Application</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f8fa", marginBottom: "16px" }}>
            Don&apos;t see the right role?
          </h2>
          <p className="reveal" style={{ color: "rgba(200,230,240,0.68)", fontSize: "1.05rem", maxWidth: "460px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            We&apos;re always looking for curious, talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <div className="reveal" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`mailto:${siteData.email}?subject=Open Application – ConfideLeap`} className="btn-primary" style={{ padding: "14px 28px" }}>
              Send Open Application
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(200,235,242,0.8)", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.25s ease" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
