import type { Metadata } from "next";
import Link from "next/link";
import siteData from "../../content/site.json";
import TeamPhoto from "../../components/TeamPhoto";

export const metadata: Metadata = {
  title: "About Us | Best Investor Relations Advisory Firm | ConfideLeap",
  description:
    "ConfideLeap offers expert-driven investor relations advisor services, public relations consulting, annual report preparation, digital marketing advisory, and podcast production to enhance visibility and attract positive investor engagement.",
};

const stats = siteData.stats;

const pillars = [
  {
    title: "Expert Team of Advisors",
    desc: "A dedicated team with deep financial markets and corporate communication expertise, serving as your trusted investor relation advisor.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Transparent Communication",
    desc: "We prioritize clear, consistent communication to build trust and confidence with investors at every stage of the engagement.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Comprehensive Service Offering",
    desc: "From IPO advisory to financial reporting, we provide end-to-end investor relations support across every channel and touchpoint.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Investor Outreach",
    desc: "Our network of top funds, consultants, insurers, and wealth managers enables targeted marketing as your expert investor relation advisor.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const industries = [
  "Automotive", "Banking & Financial Services", "Building Materials", "Chemicals",
  "Conglomerates", "Consumer Products & Services", "Real Estate",
  "Infrastructure & Transportation", "Manufacturing", "Media & Telecommunications",
  "Metals & Mining", "Oil & Gas", "Retail", "Technology, e-Commerce", "Utilities",
];

const faqs = [
  {
    q: "What does ConfideLeap Partners specialize in?",
    a: "ConfideLeap Partners is recognized as one of the Top Investor Relations Advisory Firms, specializing in strategic investor advisory solutions, including investor relations advisory, digital marketing, IPO communication, collateral development, and quarterly earnings activities.",
  },
  {
    q: "How can I contact ConfideLeap Partners?",
    a: `You can reach us via phone at ${siteData.phone} or email at ${siteData.email}. Our Mumbai office is located at ${siteData.address}`,
  },
  {
    q: "What industries do you serve?",
    a: "We serve companies across diverse industries including pharmaceuticals, infrastructure, energy, manufacturing, FMCG, chemicals, fintech, and more. If your company is publicly listed or planning to go public, we can help.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-dark grid-lines" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.2) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-22%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(8,127,158,0.16) 0%, transparent 72%)" }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "8%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.14)" }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "5%", right: "7%", width: "380px", height: "380px", borderRadius: "50%", border: "1px dashed rgba(14,165,198,0.08)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.12)", border: "1px solid rgba(14,165,198,0.28)", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12abc9" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>About Us</span>
          </div>

          <h1 className="anim-fade-up delay-100" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "22px", color: "#f0f8fa", maxWidth: "820px" }}>
            Partnering with you to Grow<br />
            <span className="shimmer-text">Trust & Investor Bonds</span>
          </h1>

          <p className="anim-fade-up delay-200" style={{ fontSize: "clamp(1rem, 1.9vw, 1.15rem)", color: "rgba(210,235,242,0.7)", maxWidth: "620px", lineHeight: 1.8, marginBottom: "40px" }}>
            We offer expert-driven investor relations advisor services, public relations consulting,
            annual report preparation, digital marketing advisory, and podcast production services
            to enhance visibility and attract positive investor engagement.
          </p>

          <div className="anim-fade-up delay-300" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ padding: "13px 26px" }}>
              Talk to Our Experts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(200,235,242,0.8)", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.25s ease" }}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section style={{ background: "#0b1e28", borderBottom: "1px solid rgba(14,165,198,0.15)", padding: "0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal"
                style={{ padding: "32px 24px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(14,165,198,0.12)" : "none" }}
              >
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#12abc9", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "6px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(180,215,228,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About the Company ────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            <div className="reveal-left">
              <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "12px" }}>About Our Company</span>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530", marginBottom: "20px", lineHeight: 1.15 }}>
                Your Trusted Advisor for<br />Investor Relations Success
              </h2>
              <p style={{ color: "#567079", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "28px" }}>
                We develop a comprehensive investor relations and public relations strategy to enhance
                visibility, elicit favorable responses, and maximize market valuation.
              </p>
              <p style={{ color: "#567079", lineHeight: 1.85, fontSize: "0.97rem" }}>
                As a trusted firm offering IR advisory, PR advisor services, digital marketing support,
                annual report writing services, and podcast marketing services, our goal is to make your
                company&apos;s story connect with investors and deliver measurable outcomes.
              </p>
            </div>

            {/* Mission & Vision cards */}
            <div className="reveal-right" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "28px", borderRadius: "18px", background: "linear-gradient(145deg, #071218, #0d2532)", border: "1px solid rgba(14,165,198,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(14,165,198,0.15)", border: "1px solid rgba(14,165,198,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12abc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#12abc9" }}>Our Mission</span>
                </div>
                <p style={{ color: "rgba(210,235,242,0.82)", lineHeight: 1.75, fontSize: "0.95rem" }}>
                  To bridge the gap between companies and investors by fostering transparency, trust, and long-term growth.
                </p>
              </div>

              <div style={{ padding: "28px", borderRadius: "18px", background: "#f5f7f8", border: "1px solid rgba(14,165,198,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  </div>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0ea5c6" }}>Our Vision</span>
                </div>
                <p style={{ color: "#567079", lineHeight: 1.75, fontSize: "0.95rem" }}>
                  To be the leading partner in empowering businesses with investor engagement strategies that drive sustainable success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "10px" }}>Why Choose Us</span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
              Your Trusted Advisor for<br />Investor Relations Success
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="bento-card reveal"
                style={i === 0 ? { background: "linear-gradient(145deg, #071218, #0d2532)", borderColor: "transparent" } : {}}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: i === 0 ? "rgba(14,165,198,0.15)" : "rgba(14,165,198,0.1)", border: i === 0 ? "1px solid rgba(14,165,198,0.3)" : "1px solid rgba(14,165,198,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", color: i === 0 ? "#7dd9ee" : "#0ea5c6" }}>
                  {p.icon}
                </div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.05rem", marginBottom: "10px", color: i === 0 ? "#f0f8fa" : "#0e2530" }}>{p.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: i === 0 ? "rgba(200,230,240,0.78)" : "#567079" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Experience ───────────────────────────────────────────── */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "52px", alignItems: "center" }}>
            <div className="reveal-left">
              <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "12px" }}>Our History</span>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530", marginBottom: "20px", lineHeight: 1.15 }}>
                Industry Experience
              </h2>
              <p style={{ color: "#567079", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "32px" }}>
                For two decades, we&apos;ve worked as executives, analysts, and financial journalists.
                We quickly immerse ourselves in your competitive landscape for each client engagement.
              </p>
              <Link href="/contact" className="btn-primary">
                Work With Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <div className="reveal-right">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {industries.map((ind, i) => (
                  <span
                    key={ind}
                    className="reveal-scale"
                    style={{ padding: "7px 15px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600, background: i % 3 === 0 ? "rgba(14,165,198,0.12)" : i % 3 === 1 ? "rgba(8,127,158,0.08)" : "#f5f7f8", border: i % 3 === 0 ? "1px solid rgba(14,165,198,0.28)" : i % 3 === 1 ? "1px solid rgba(8,127,158,0.2)" : "1px solid rgba(18,52,63,0.1)", color: i % 3 === 0 ? "#0b7f9f" : "#3e5963" }}
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "10px" }}>Our Team</span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
              Meet Our Team
            </h2>
          </div>

          {/* Founder card */}
          <div className="reveal" style={{ maxWidth: "900px", margin: "0 auto", background: "#ffffff", borderRadius: "24px", border: "1px solid rgba(14,165,198,0.15)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr auto" }}>
            {/* Left accent strip */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "linear-gradient(180deg, #0ea5c6 0%, transparent 100%)" }} />

            <div style={{ padding: "44px 44px 44px 52px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#0e2530", letterSpacing: "-0.02em" }}>
                  Hemanshu Shukla
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0ea5c6" }}>Founder and CEO</span>
                <span style={{ flex: "0 0 60px", height: "2px", background: "linear-gradient(90deg, #0ea5c6, transparent)" }} />
              </div>

              <p style={{ color: "#4a6370", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "16px" }}>
                With more than 25 years of multi-expertise as an information, process, and financial
                consultant to Fortune 200 companies like UBS, Nomura Securities, Accenture, Puma Energy,
                and GEP worldwide.
              </p>
              <p style={{ color: "#4a6370", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "28px" }}>
                Played a pivotal role in change management and strategic insight on growth with cost
                optimization propelling the core business growth metrics. Engaged in various initiatives
                with differing degrees of complexity. Devised innovative strategies to meet customer
                success with forward-thinking leadership.
              </p>

              {/* Highlights */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["25+ Years Experience", "Fortune 200 Consultant", "IR & Capital Markets", "Change Management"].map((tag) => (
                  <span key={tag} style={{ padding: "5px 13px", borderRadius: "100px", background: "rgba(14,165,198,0.08)", border: "1px solid rgba(14,165,198,0.2)", fontSize: "0.75rem", fontWeight: 600, color: "#0b7f9f" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div style={{ width: "260px", minHeight: "320px", background: "linear-gradient(145deg, rgba(14,165,198,0.12), rgba(8,127,158,0.08))", position: "relative", flexShrink: 0 }}>
              <TeamPhoto
                src="/assets/team-hemanshu-shukla.png"
                alt="Hemanshu Shukla – Founder and CEO"
              />
              {/* Decorative corner */}
              <div aria-hidden style={{ position: "absolute", bottom: "0", right: "0", width: "80px", height: "80px", background: "linear-gradient(135deg, transparent 50%, rgba(14,165,198,0.3) 50%)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "10px" }}>FAQ</span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
              About ConfideLeap Partners
            </h2>
          </div>

          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="reveal"
                style={{ padding: "28px 32px", borderRadius: "18px", background: "#f5f7f8", border: "1px solid rgba(18,52,63,0.08)", borderLeft: i === 0 ? "4px solid #0ea5c6" : "4px solid transparent" }}
              >
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.02rem", marginBottom: "12px", color: "#0e2530" }}>{faq.q}</h3>
                <p style={{ color: "#567079", fontSize: "0.9rem", lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ paddingTop: "88px", paddingBottom: "88px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-50%", right: "-5%", width: "56vw", height: "56vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.14) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-40%", left: "-8%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(8,127,158,0.1) 0%, transparent 72%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.24)", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12abc9" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>Get Started</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f8fa", marginBottom: "16px" }}>
            Build, Thrive, and Achieve with<br />
            <span className="shimmer-text">Our Proven IR Solutions.</span>
          </h2>
          <p className="reveal" style={{ color: "rgba(200,230,240,0.68)", fontSize: "1.05rem", maxWidth: "460px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Partner with ConfideLeap Partners to turn potential into progress.
          </p>
          <div className="reveal" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ padding: "14px 30px" }}>
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", border: "1px solid rgba(14,165,198,0.3)", color: "#9ee6f4", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.25s ease" }}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
