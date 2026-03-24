import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllServices, getServiceBySlug } from "../../../lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

// ── Per-service theme ────────────────────────────────────────────────────────
const svcMeta: Record<string, { rgb: string; hex: string; darkHex: string }> = {
  "investor-relations": { rgb: "14,165,198",  hex: "#0ea5c6", darkHex: "#0b7f9f" },
  "digital-marketing":  { rgb: "108,71,255",  hex: "#6c47ff", darkHex: "#5535e0" },
  "public-relations":   { rgb: "16,185,129",  hex: "#10b981", darkHex: "#0d9669" },
  "annual-report":      { rgb: "245,158,11",  hex: "#f59e0b", darkHex: "#d97706" },
  podcast:              { rgb: "239,68,68",   hex: "#ef4444", darkHex: "#dc2626" },
};

const iconPaths: Record<string, string> = {
  "investor-relations": "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 1 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z",
  "digital-marketing":  "M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
  "public-relations":   "M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  "annual-report":      "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 1 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  podcast:              "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4m-4 0h8",
};

// ── Investor Relations ───────────────────────────────────────────────────────
const investorExpertiseCards = [
  { title: "IR Strategy Development", description: "We develop strategic roadmaps with actionable steps and KPIs to attract long-term investors and boost valuation against industry competitors." },
  { title: "Investor Targeting and Surveillance", description: "Using cutting-edge technology, market insights, and analytical tools, we match companies with 'best fit' investors based on their unique investment attributes." },
  { title: "Strategic Positioning", description: "We craft communications that clarify a company's strategic direction and growth potential, answering the key question: 'Why invest in this company?'" },
  { title: "Quarterly Earnings Preparation", description: "We develop unified, strategic communications for quarterly earnings announcements, presentations, conference calls, and Q&A sessions." },
  { title: "Market Intelligence", description: "We monitor industry news to assess the impact of market events on equity valuation and their influence on investment decisions." },
];
const marketIntelligenceCards = [
  { title: "Market Trends Analysis", description: "Continuous tracking, analysis, and interpretation of market trends provide business leaders with actionable insights to make informed strategic and tactical decisions." },
  { title: "Sector Research", description: "Comprehensive insights into industry trends, key drivers, and challenges help businesses effectively target sectors and make data-backed investment decisions." },
  { title: "Competitive Insights", description: "In-depth competitor intelligence to analyze offerings, marketing strategies, and positioning, helping businesses stay ahead in a dynamic market landscape." },
];
const shareholderCards = [
  { title: "Key Shareholder Analysis", description: "Identify major investors and analyze their impact on your business. Understanding shareholder influence helps refine investor relations strategies and build stronger engagement." },
  { title: "Shareholding Behavior", description: "Track investor activity, detect buying and selling patterns, and anticipate shifts in market sentiment. Monitoring shareholder movements allows businesses to stay ahead of potential risks and opportunities." },
  { title: "Shareholder Identification", description: "Recognize key stakeholders and potential investors to enhance outreach, personalize communication, and effectively prepare for investor roadshows." },
  { title: "Peer Benchmarking", description: "Compare your shareholder structure with industry competitors to identify trends and areas of improvement. This insight helps refine investment strategies and attract the right investors." },
];

// ── Digital Marketing ────────────────────────────────────────────────────────
const dmWhyCards = [
  { title: "Support Brand Value", description: "Digital marketing helps expand your reach and make your brand stand out in a competitive market." },
  { title: "Maximize ROI", description: "We optimize campaigns in real-time to maximize conversions and ensure higher returns for your business." },
  { title: "Drive More Traffic", description: "We leverage cross-channel strategies to enhance user experience and maximize business opportunities." },
  { title: "Stay on Top", description: "Use multiple marketing channels with a seamless funnel to maintain strong connectivity and engagement." },
  { title: "Increase Competition", description: "Digital marketing empowers small and mid-sized businesses to compete with global enterprises." },
  { title: "Improve Conversion Rates", description: "Attract quality leads, boost conversions, and drive growth for your brand's products and services." },
];

// ── Public Relations ─────────────────────────────────────────────────────────
const prDifferentiators = [
  { title: "Diverse PR Services", description: "From online PR distribution to digital solutions, we ensure your message reaches the right audience effectively." },
  { title: "Extensive Media Network", description: "We connect your brand with the right media channels like online, digital, and traditional." },
  { title: "Crisis-Ready Approach", description: "When challenges arise, we provide swift and effective communication solutions to protect your reputation." },
  { title: "Proven Expertise", description: "Our strategies are designed to deliver measurable outcomes, from increased visibility to enhanced credibility." },
];
const prBenefits = [
  { title: "Increased Brand Visibility", description: "Build strong relationships with the media to secure positive coverage and brand mentions." },
  { title: "Enhanced Credibility", description: "Establish your brand as an authoritative and trustworthy voice in your industry." },
  { title: "Targeted Audience Reach", description: "Deliver your message to the right audience for maximum impact and engagement." },
  { title: "Lead Generation", description: "Improve your website's search rankings with online press releases and media mentions." },
];

// ── Annual Report ────────────────────────────────────────────────────────────
const arWhyCards = [
  { title: "Expert Storytellers", description: "We transform complex data into clear, compelling narratives." },
  { title: "Creative Designs", description: "Our designs are visually engaging and aligned with your brand's identity." },
  { title: "Comprehensive Solutions", description: "From content to critical report insights, we handle it all under one roof." },
  { title: "Timely Delivery", description: "We ensure your reports are completed and filed on time, every time." },
];
const arPortfolio = [
  "Indian Emulsifiers Ltd 2025",
  "Resgen Ltd 2025",
  "Aztec Fluids & Machinery Ltd 2025",
  "Kings Infra Ventures Ltd 2025",
  "Stallion India Fluorochemicals Ltd 2025",
];

// ── Podcast ───────────────────────────────────────────────────────────────────
const podcastBenefits = [
  { title: "Online & Offline Formats", description: "We offer both remote and in-person podcast recording setups." },
  { title: "Turn Videos into Content", description: "Turn raw footage into high-quality branded content for digital use." },
  { title: "Establish Authority", description: "Position yourself as an expert with valuable insights and consistent content." },
  { title: "Expand Your Reach", description: "Tap into new audiences across platforms and boost brand visibility." },
  { title: "Boost SEO & Discoverability", description: "Podcast transcripts, titles, and backlinks help your brand show up in searches." },
  { title: "Repurpose with Ease", description: "Turn one podcast into blogs, reels, quotes, and social posts." },
];
const podcastWhyCards = [
  { title: "Online & Offline Podcast", description: "Record from anywhere, or use our in-house production team for studio shoots." },
  { title: "Custom Video Editing", description: "High-quality audio & video editing with branded intros, outros, and social-ready clips." },
  { title: "Full-Service Execution", description: "From planning and scripting to shooting, editing, and publishing — end to end." },
  { title: "SEO & Analytics", description: "Insights on audience engagement, drop-off, platform performance, and SEO rankings." },
  { title: "Cross-Platform Publishing", description: "We publish and optimize episodes on all top podcast and video platforms." },
  { title: "Content Repurposing", description: "Turn every episode into multi-format content across email, LinkedIn, Instagram, and blogs." },
];

// ── Component ────────────────────────────────────────────────────────────────
export default async function ServiceDetailPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const m = svcMeta[service.slug] ?? { rgb: "14,165,198", hex: "#0ea5c6", darkHex: "#0b7f9f" };
  const iconPath = iconPaths[service.slug];

  const isInvestorRelations = service.slug === "investor-relations";
  const isDigitalMarketing  = service.slug === "digital-marketing";
  const isPublicRelations   = service.slug === "public-relations";
  const isAnnualReport      = service.slug === "annual-report";
  const isPodcast           = service.slug === "podcast";

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "90px", paddingBottom: "90px", position: "relative" }}
      >
        {/* Animated gradient orbs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-20%", right: "-5%", width: "56vw", height: "56vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${m.rgb},0.2) 0%, transparent 68%)` }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-30%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${m.rgb},0.14) 0%, transparent 72%)` }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "5%", right: "6%", width: "260px", height: "260px", borderRadius: "50%", border: `1px solid rgba(${m.rgb},0.18)` }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "2%", right: "3%", width: "330px", height: "330px", borderRadius: "50%", border: `1px dashed rgba(${m.rgb},0.1)` }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav
            className="anim-fade-up"
            style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.8rem", color: "rgba(180,215,228,0.6)", marginBottom: "36px" }}
          >
            <Link href="/" style={{ color: "rgba(180,215,228,0.6)", transition: "color 0.2s" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/services" style={{ color: "rgba(180,215,228,0.6)", transition: "color 0.2s" }}>Services</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "rgba(180,215,228,0.9)" }}>{service.title}</span>
          </nav>

          {/* Icon */}
          <div
            className="anim-fade-up delay-100"
            style={{ width: "72px", height: "72px", borderRadius: "20px", background: `rgba(${m.rgb},0.15)`, border: `1px solid rgba(${m.rgb},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", boxShadow: `0 0 40px rgba(${m.rgb},0.2)` }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={m.hex} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d={iconPath} />
            </svg>
          </div>

          <h1
            className="anim-fade-up delay-200"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.04, marginBottom: "18px", color: "#f0f8fa", maxWidth: "780px" }}
          >
            {service.title}
          </h1>

          <p
            className="anim-fade-up delay-300"
            style={{ fontSize: "clamp(1rem, 1.9vw, 1.2rem)", color: "rgba(210,235,242,0.72)", maxWidth: "620px", lineHeight: 1.75, marginBottom: "36px" }}
          >
            {service.subtitle}
          </p>

          <div className="anim-fade-up delay-400">
            <Link
              href="/contact"
              className="btn-primary"
              style={{ background: `linear-gradient(135deg, ${m.hex} 0%, ${m.darkHex} 100%)`, boxShadow: `0 8px 32px rgba(${m.rgb},0.35)`, padding: "14px 28px" }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── What's Included (Bento) ────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "44px" }}>
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "8px" }}>
                What&apos;s Included
              </span>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0e2530" }}>
                Core Services
              </h2>
            </div>
          </div>

          {/* Feature bento grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "16px" }}>
            {service.features.map((f, i) => (
              <div
                key={f.title}
                className={`bento-card reveal ${i === 0 ? "reveal-left" : ""}`}
                style={
                  i === 0
                    ? { background: `linear-gradient(135deg, ${m.hex} 0%, ${m.darkHex} 100%)`, borderColor: "transparent", color: "#ffffff" }
                    : {}
                }
              >
                <div
                  style={{ width: "10px", height: "10px", borderRadius: "50%", marginBottom: "16px", background: i === 0 ? "rgba(255,255,255,0.6)" : m.hex, boxShadow: i === 0 ? "none" : `0 0 14px rgba(${m.rgb},0.5)` }}
                />
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: i === 0 ? "#ffffff" : "#0e2530" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: i === 0 ? "rgba(255,255,255,0.85)" : "#567079" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ────────────────────────────────────────────────────── */}
      {service.highlights.length > 0 && (
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "8px" }}>
              Key Highlights
            </span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "44px", color: "#0e2530" }}>
              Why It Works
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {service.highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="callout-card reveal"
                  style={{ background: `linear-gradient(145deg, rgba(${m.rgb},0.08) 0%, rgba(${m.rgb},0.03) 100%)`, border: `1px solid rgba(${m.rgb},0.18)` }}
                >
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "3rem", lineHeight: 1, color: m.hex, opacity: 0.2, marginBottom: "16px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "10px", color: "#0e2530" }}>{h.title}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#567079" }}>{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ INVESTOR RELATIONS SECTIONS ════════════════════════════════════ */}
      {isInvestorRelations && (
        <>
          {/* Expertise cards */}
          <section className="section" style={{ background: "#f5f7f8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "52px" }}>
                <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Expertise</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", marginBottom: "14px", color: "#0e2530" }}>
                  Investor Relations Advisory
                </h2>
                <p style={{ color: "#567079", maxWidth: "680px", margin: "0 auto", lineHeight: 1.75 }}>
                  We bring deep expertise in investor relations advisory, taking the time to understand your unique business and competitive landscape for each client engagement.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                {investorExpertiseCards.map((card, i) => (
                  <div
                    key={card.title}
                    className="bento-card reveal"
                    style={i === 0 ? { gridColumn: "span 2", background: `linear-gradient(135deg, rgba(${m.rgb},0.07) 0%, rgba(${m.rgb},0.03) 100%)`, borderColor: `rgba(${m.rgb},0.2)` } : {}}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.hex, flexShrink: 0, boxShadow: `0 0 10px rgba(${m.rgb},0.5)` }} />
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0e2530" }}>{card.title}</h3>
                    </div>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#567079" }}>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Market Intelligence */}
          <section className="section" style={{ background: "#ffffff" }}>
            <div className="container">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center", marginBottom: "48px" }}>
                <div className="reveal-left">
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Market Intelligence</span>
                  <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em", marginBottom: "16px", color: "#0e2530" }}>
                    Stay Ahead with Data-Driven Insights
                  </h2>
                  <p style={{ color: "#567079", lineHeight: 1.8 }}>
                    Our market intelligence services provide data-driven insights on market trends and industry dynamics, helping you optimize strategies and stay ahead in a rapidly evolving business landscape.
                  </p>
                </div>
                <div className="reveal-right" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {marketIntelligenceCards.map((card) => (
                    <div key={card.title} style={{ display: "flex", gap: "16px", padding: "20px", borderRadius: "14px", background: "#f5f7f8", border: "1px solid rgba(18,52,63,0.08)", transition: "all 0.25s ease" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `rgba(${m.rgb},0.1)`, border: `1px solid rgba(${m.rgb},0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={m.hex} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "6px", color: "#0e2530" }}>{card.title}</h3>
                        <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#567079" }}>{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Shareholder Analysis */}
          <section className="section" style={{ background: "#f5f7f8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Shareholder Analysis</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em", marginBottom: "14px", color: "#0e2530" }}>
                  The Key To A More Successful IR Strategy
                </h2>
                <p style={{ color: "#567079", maxWidth: "720px", margin: "0 auto", lineHeight: 1.75 }}>
                  Gain a deeper understanding of your shareholder base with a data-driven analysis that offers a clear and dynamic view of your capital structure.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
                {shareholderCards.map((card, i) => (
                  <div
                    key={card.title}
                    className="callout-card reveal"
                    style={
                      i === 0
                        ? { background: `linear-gradient(145deg, ${m.hex} 0%, ${m.darkHex} 100%)`, color: "#ffffff", border: "none" }
                        : { background: "#ffffff", border: "1px solid rgba(18,52,63,0.1)" }
                    }
                  >
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: i === 0 ? "#ffffff" : "#0e2530" }}>{card.title}</h3>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: i === 0 ? "rgba(255,255,255,0.85)" : "#567079" }}>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Communication channels */}
          <section className="section-dark section-sm">
            <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
              <span className="anim-float" style={{ position: "absolute", top: "-50%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${m.rgb},0.14) 0%, transparent 70%)` }} />
            </div>
            <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", color: "#f0f8fa", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "32px", letterSpacing: "-0.02em" }}>
                Targeted &amp; Holistic Communication
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "12px", maxWidth: "820px", margin: "0 auto" }}>
                {["Investor Presentation", "Press Release", "Earnings Call", "Annual Report & AGM"].map((item) => (
                  <div key={item} className="glass-dark" style={{ padding: "20px 14px", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#c8e9f0", lineHeight: 1.3, textAlign: "center", transition: "all 0.25s ease" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Value-added services */}
          <section className="section" style={{ background: "#ffffff" }}>
            <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div className="reveal-left">
                <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Additional Services</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em", marginBottom: "16px", color: "#0e2530" }}>
                  Value-Added Support for Every Touchpoint
                </h2>
                <p style={{ color: "#567079", lineHeight: 1.8, marginBottom: "28px" }}>
                  Beyond core IR advisory, we provide complementary strategic support that improves message clarity, investor confidence, and execution quality across every stakeholder touchpoint.
                </p>
                <Link href="/contact" className="btn-primary" style={{ background: `linear-gradient(135deg, ${m.hex} 0%, ${m.darkHex} 100%)`, boxShadow: `0 8px 28px rgba(${m.rgb},0.3)` }}>
                  Explore Further
                </Link>
              </div>
              <div className="reveal-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {["Optimal Business Valuation", "Compliance Guidepost", "Issue & Crisis Management", "Investor Perception Analysis", "Expand Research & Coverage", "Facilitate Capital Raising"].map((item) => (
                  <div key={item} style={{ padding: "16px", borderRadius: "12px", background: `rgba(${m.rgb},0.06)`, border: `1px solid rgba(${m.rgb},0.15)`, fontSize: "0.82rem", fontWeight: 600, color: "#3e5963", lineHeight: 1.4 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══ DIGITAL MARKETING SECTIONS ═════════════════════════════════════ */}
      {isDigitalMarketing && (
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Why It Matters</span>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", marginBottom: "14px", color: "#0e2530" }}>
                Why Your Business Needs Digital Marketing
              </h2>
              <p style={{ color: "#567079", maxWidth: "600px", margin: "0 auto", lineHeight: 1.75 }}>
                From visibility to conversions — digital marketing is the engine behind sustainable business growth in today&apos;s landscape.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "16px" }}>
              {dmWhyCards.map((card, i) => (
                <div key={card.title} className="bento-card reveal">
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2.8rem", lineHeight: 1, color: m.hex, opacity: 0.15, marginBottom: "14px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: "#0e2530" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#567079" }}>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ PUBLIC RELATIONS SECTIONS ══════════════════════════════════════ */}
      {isPublicRelations && (
        <>
          <section className="section" style={{ background: "#ffffff" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "52px" }}>
                <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Why ConfideLeap</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", marginBottom: "14px", color: "#0e2530" }}>
                  All Your PR Needs, Under One Roof
                </h2>
                <p style={{ color: "#567079", maxWidth: "600px", margin: "0 auto", lineHeight: 1.75 }}>
                  Proven PR &amp; Branding Expertise Across Industries
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
                {prDifferentiators.map((card) => (
                  <div key={card.title} className="bento-card reveal" style={{ border: `1px solid rgba(${m.rgb},0.18)` }}>
                    <span style={{ display: "block", width: "10px", height: "10px", borderRadius: "50%", background: m.hex, marginBottom: "16px", boxShadow: `0 0 14px rgba(${m.rgb},0.5)` }} />
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: "#0e2530" }}>{card.title}</h3>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#567079" }}>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" style={{ background: "#f5f7f8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "52px" }}>
                <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Benefits of PR</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
                  Why PR Matters for Your Business
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px", maxWidth: "920px", margin: "0 auto" }}>
                {prBenefits.map((item, i) => (
                  <div key={item.title} className="callout-card reveal" style={{ background: "#ffffff", border: `1px solid rgba(${m.rgb},0.14)` }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "3rem", lineHeight: 1, color: m.hex, opacity: 0.18, marginBottom: "14px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: "#0e2530" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#567079" }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══ ANNUAL REPORT SECTIONS ═════════════════════════════════════════ */}
      {isAnnualReport && (
        <>
          <section className="section" style={{ background: "#ffffff" }}>
            <div className="container">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
                <div className="reveal-left">
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Why Choose Us</span>
                  <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", marginBottom: "16px", color: "#0e2530" }}>
                    What Sets Our Reports Apart
                  </h2>
                  <p style={{ color: "#567079", lineHeight: 1.8 }}>
                    Every annual report we create goes beyond compliance — it&apos;s a strategic communication tool that builds investor confidence and tells your brand&apos;s true story.
                  </p>
                </div>
                <div className="reveal-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {arWhyCards.map((card) => (
                    <div key={card.title} style={{ padding: "20px", borderRadius: "14px", background: `rgba(${m.rgb},0.06)`, border: `1px solid rgba(${m.rgb},0.15)` }}>
                      <span style={{ display: "block", width: "8px", height: "8px", borderRadius: "50%", background: m.hex, marginBottom: "12px", boxShadow: `0 0 10px rgba(${m.rgb},0.5)` }} />
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: "7px", color: "#0e2530" }}>{card.title}</h3>
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#567079" }}>{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section" style={{ background: "#f5f7f8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Portfolio</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
                  Annual Reports We&apos;ve Crafted
                </h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                {arPortfolio.map((item) => (
                  <div
                    key={item}
                    className="reveal-scale"
                    style={{ padding: "14px 24px", borderRadius: "12px", background: `linear-gradient(135deg, rgba(${m.rgb},0.1) 0%, rgba(${m.rgb},0.05) 100%)`, border: `1px solid rgba(${m.rgb},0.22)`, fontSize: "0.875rem", fontWeight: 600, color: "#2e4a54" }}
                  >
                    {item} — Annual Report
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══ PODCAST SECTIONS ═══════════════════════════════════════════════ */}
      {isPodcast && (
        <>
          <section className="section" style={{ background: "#ffffff" }}>
            <div className="container">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "52px", alignItems: "center" }}>
                <div className="reveal-left">
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Why Podcast</span>
                  <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", marginBottom: "16px", color: "#0e2530" }}>
                    Why Your Brand Needs A Podcast
                  </h2>
                  <p style={{ color: "#567079", lineHeight: 1.8 }}>
                    Podcasting isn&apos;t just trendy — it&apos;s strategic. Whether you&apos;re a startup founder, IR head, or CXO, your voice matters.
                  </p>
                </div>
                <div className="reveal-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {podcastBenefits.map((card, i) => (
                    <div key={card.title} style={{ padding: "18px", borderRadius: "12px", background: `rgba(${m.rgb},0.06)`, border: `1px solid rgba(${m.rgb},0.14)` }}>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: m.hex, opacity: 0.35, lineHeight: 1, marginBottom: "8px" }}>{String(i + 1).padStart(2, "0")}</div>
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.88rem", marginBottom: "7px", color: "#0e2530" }}>{card.title}</h3>
                      <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "#567079" }}>{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section" style={{ background: "#f5f7f8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "52px" }}>
                <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>Our Advantage</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
                  Why Choose ConfideLeap for Podcasting
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                {podcastWhyCards.map((card, i) => (
                  <div key={card.title} className="bento-card reveal" style={i === 0 ? { background: `linear-gradient(135deg, ${m.hex} 0%, ${m.darkHex} 100%)`, borderColor: "transparent" } : {}}>
                    <span style={{ display: "block", width: "10px", height: "10px", borderRadius: "50%", background: i === 0 ? "rgba(255,255,255,0.6)" : m.hex, marginBottom: "16px", boxShadow: i === 0 ? "none" : `0 0 12px rgba(${m.rgb},0.5)` }} />
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: i === 0 ? "#ffffff" : "#0e2530" }}>{card.title}</h3>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: i === 0 ? "rgba(255,255,255,0.85)" : "#567079" }}>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Process ───────────────────────────────────────────────────────── */}
      {service.process && (
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: m.hex, marginBottom: "10px" }}>How We Work</span>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0e2530" }}>
                Our Process
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", maxWidth: "680px", margin: "0 auto" }}>
              {service.process.map((step, i) => (
                <div key={step.step} className="process-step reveal" style={{ paddingBottom: i < service.process!.length - 1 ? "28px" : "0" }}>
                  {/* Number circle */}
                  <div
                    style={{ width: "46px", height: "46px", borderRadius: "50%", background: `linear-gradient(135deg, ${m.hex} 0%, ${m.darkHex} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#ffffff", boxShadow: `0 6px 20px rgba(${m.rgb},0.3)`, position: "relative", zIndex: 1 }}
                  >
                    {step.step}
                  </div>
                  {/* Content */}
                  <div style={{ padding: "10px 0 0 4px" }}>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "8px", color: "#0e2530" }}>{step.title}</h4>
                    <p style={{ color: "#567079", fontSize: "0.88rem", lineHeight: 1.7 }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="section-dark"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-40%", left: "-10%", width: "62vw", height: "62vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${m.rgb},0.16) 0%, transparent 70%)` }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-30%", right: "-5%", width: "46vw", height: "46vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${m.rgb},0.1) 0%, transparent 72%)` }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: `rgba(${m.rgb},0.12)`, border: `1px solid rgba(${m.rgb},0.26)`, marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: m.hex }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(200,235,242,0.8)" }}>Get Started</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f8fa", marginBottom: "18px" }}>
            Ready to get started with {service.title}?
          </h2>
          <p className="reveal" style={{ color: "rgba(200,230,240,0.68)", fontSize: "1.05rem", maxWidth: "440px", margin: "0 auto 36px", lineHeight: 1.75 }}>
            Contact us today for a personalized strategy session tailored to your business goals.
          </p>
          <div className="reveal" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ background: `linear-gradient(135deg, ${m.hex} 0%, ${m.darkHex} 100%)`, boxShadow: `0 8px 32px rgba(${m.rgb},0.35)`, padding: "14px 30px" }}
            >
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(200,235,242,0.8)", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.25s ease", textDecoration: "none" }}>
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
