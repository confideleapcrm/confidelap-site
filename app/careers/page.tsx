import type { Metadata } from "next";
import Link from "next/link";
import siteData from "../../content/site.json";
import { RippleButton } from "../../components/ui/multi-type-ripple-buttons";
import { getAllJobs } from "../../lib/content";
import { CareersOpenings } from "../../components/careers/CareersOpenings";

const darkRippleClass = "rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent font-semibold leading-[1.2]";

export const metadata: Metadata = {
  title: "Career – Join the ConfideLeap Team | ConfideLeap",
  description:
    "The perfect candidate possesses an innate sense of curiosity and engages in ongoing self-improvement. Explore open roles at ConfideLeap Partners.",
};

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

export default async function CareersPage() {
  const jobs = await getAllJobs();
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
            <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className={darkRippleClass}>
              <a href={`mailto:${siteData.email}?subject=Career Inquiry – ConfideLeap`} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(200,235,242,0.8)", textDecoration: "none", padding: "12px 24px" }}>
                Send Open Application
              </a>
            </RippleButton>
          </div>
        </div>
      </section>

      <CareersOpenings jobs={jobs} />

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
            <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className={darkRippleClass}>
              <Link href="/contact" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(200,235,242,0.8)", textDecoration: "none", padding: "13px 28px" }}>
                Contact Us
              </Link>
            </RippleButton>
          </div>
        </div>
      </section>
    </>
  );
}
