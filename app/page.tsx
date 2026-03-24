import type { Metadata } from "next";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FiBarChart2, FiFileText, FiMic, FiTarget, FiTrendingUp } from "react-icons/fi";
import { getAllServices, getFeaturedPosts, getAllClients } from "../lib/content";
import siteData from "../content/site.json";
import { GetStartedButton } from "../components/ui/get-started-button";

export const metadata: Metadata = {
  title: "Top Investor Relations Advisor | ConfideLeap",
  description:
    "ConfideLeap specializes in Investor Relations, Digital Marketing & Public Relations, helping businesses enhance their market presence and build strong investor confidence.",
};

const socialLinks = [
  { href: siteData.social.facebook, label: "Facebook", iconClass: "e-fab-facebook-f", Icon: FaFacebookF },
  { href: siteData.social.twitter, label: "Twitter", iconClass: "e-fab-x-twitter", Icon: FaXTwitter },
  { href: siteData.social.instagram, label: "Instagram", iconClass: "e-fab-instagram", Icon: FaInstagram },
  { href: "https://www.linkedin.com", label: "LinkedIn", iconClass: "e-fab-linkedin-in", Icon: FaLinkedinIn },
  { href: "mailto:info@confideleap.com", label: "Email", iconClass: "e-fas-envelope", Icon: MdEmail },
  { href: "https://www.youtube.com", label: "YouTube", iconClass: "e-fab-youtube", Icon: FaYoutube },
];

function SocialIcon({ Icon, iconClass }: Readonly<{ Icon: IconType; iconClass: string }>) {
  return <Icon aria-hidden="true" className={`e-font-icon-svg ${iconClass}`} size={14} />;
}

const serviceIconBySlug: Record<string, IconType> = {
  "investor-relations": FiTrendingUp,
  "digital-marketing": FiTarget,
  "public-relations": FiBarChart2,
  "annual-report": FiFileText,
  podcast: FiMic,
};

export default async function HomePage() {
  const [services, featuredPosts, clients] = await Promise.all([
    getAllServices(),
    getFeaturedPosts(),
    getAllClients(),
  ]);

  return (
    <>
      <section className="homepage-grid" style={{ minHeight: "88vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "var(--bg-primary)" }}>
        <div className="hero-bg-layer" aria-hidden>
          <span className="hero-bg-orb hero-bg-orb-a" />
          <span className="hero-bg-orb hero-bg-orb-b" />
          <span className="hero-bg-orb hero-bg-orb-c" />
          <span className="hero-bg-sweep" />
        </div>

        <aside className="social-rail" aria-label="Social links">
          <span className="social-rail-line" />
          <ul className="social-rail-list">
            {socialLinks.map((social) => (
              <li key={social.label} className="social-rail-item">
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  title={social.label}
                >
                  <span className="elementor-screen-only">{social.label}</span>
                  <SocialIcon Icon={social.Icon} iconClass={social.iconClass} />
                </a>
              </li>
            ))}
          </ul>
          <span className="social-rail-line" />
        </aside>

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "64px", paddingBottom: "64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
            <div>
              <p style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", fontWeight: 700, fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "#1a2a2f" }}>
                <span style={{ width: "42px", height: "2px", background: "#12abc9", display: "inline-block" }} />
                Smart choice for {" "}<span style={{ color: "#12abc9" }}>Brighter Future</span>
              </p>

              <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "22px", maxWidth: "680px" }}>
                Your Partner in
                <br />
                <span style={{ color: "#0d7f9f" }}>Growth and Success</span>
              </h1>

              <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", color: "#294148", maxWidth: "620px", lineHeight: 1.65, marginBottom: "30px" }}>
                We specialise in Investor relations advisor services, Public relations advisory,
                Digital marketing advisory services, Annual report preparation services, and
                Podcast production services tailored to elevate your financial potential.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0e7c97", fontWeight: 700 }}
                >
                  <span
                    style={{
                      width: "31px",
                      height: "31px",
                      borderRadius: "999px",
                      border: "2px solid #0ea5c6",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                    }}
                  >
                    ▶
                  </span>{" "}
                  Watch Video
                </a>
                <GetStartedButton href="/contact" label="Talk to an Expert" />
              </div>
            </div>

            <div style={{ justifySelf: "center", width: "100%", maxWidth: "640px" }}>
              <div className="hero-art" aria-hidden>
                <div
                  style={{
                    position: "absolute",
                    inset: "20% 18%",
                    zIndex: 3,
                    borderRadius: "22px",
                    background: "rgba(255, 255, 255, 0.86)",
                    border: "1px solid rgba(14, 165, 198, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px",
                    color: "#1d3d46",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    lineHeight: 1.4,
                  }}
                >
                  Investor Confidence
                  <br />
                  Public Presence
                  <br />
                  Digital Growth
                </div>
                <span className="hero-ring" />
                <span className="hero-ring-shadow" />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "34px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {[
              "Investor Relations Advisory",
              "Public Relations Advisory",
              "Digital Marketing Advisory",
              "Annual Report Preparation",
              "Podcast Production",
            ].map((item) => (
              <span
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(18, 52, 63, 0.16)",
                  background: "rgba(255, 255, 255, 0.82)",
                  fontSize: "0.8rem",
                  color: "#3e5963",
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            ))}
          </div>

        </div>
      </section>

      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="badge" style={{ margin: "0 auto 16px" }}>What We Do</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "16px" }}>
              Advisory Services That Help You <span className="gradient-text">Grow With Confidence</span>
            </h2>
            <p style={{ color: "#435f68", fontSize: "1.05rem", maxWidth: "640px", margin: "0 auto" }}>
              Investor relations, public relations, digital marketing, annual reports, and podcast solutions delivered with one strategic voice.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card-hover"
                style={{
                  display: "block",
                  background: "#fbfefe",
                  border: "1px solid rgba(18, 52, 63, 0.14)",
                  borderRadius: "14px",
                  padding: "22px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14, 165, 198, 0.24)",
                    background: "rgba(14, 165, 198, 0.1)",
                    color: "#0b7f9f",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                >
                  {(() => {
                    const Icon = serviceIconBySlug[service.slug] ?? FiTrendingUp;
                    return <Icon size={18} aria-hidden="true" />;
                  })()}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1.04rem", marginBottom: "8px", color: "#163841" }}>{service.title}</h3>
                <p style={{ color: "#547079", fontSize: "0.92rem", lineHeight: 1.6 }}>{service.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#f6fafb" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "54px", alignItems: "center" }}>
            <div>
              <div className="badge" style={{ marginBottom: "16px" }}>Why ConfideLeap</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "20px" }}>
                Expert Partners in Investor Relations, Public Relations & <span className="gradient-text">Digital Growth</span>
              </h2>
              <p style={{ color: "#405b63", lineHeight: 1.8, marginBottom: "32px" }}>
                Great investor relations isn&apos;t just about reporting numbers — it&apos;s about crafting a compelling story, building lasting relationships, and positioning your company for long-term success.
              </p>
              <Link href="/about" className="btn-primary">Learn More About Us</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Investor Relations Advisory", desc: "Build trust with investors through strategic messaging and consistent disclosures." },
                { title: "Public Relations Advisory", desc: "Strengthen media visibility and shape a credible, influential brand narrative." },
                { title: "Digital Marketing Advisory", desc: "Translate your market story into measurable campaigns and digital momentum." },
                { title: "Annual Report & Podcast Solutions", desc: "Deliver polished reports and audio content that improve communication depth." },
              ].map((item) => (
                <div key={item.title} className="card-hover-border" style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "18px", borderRadius: "12px", background: "#ffffff", border: "1px solid rgba(18, 52, 63, 0.12)" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "999px", marginTop: "9px", background: "#11a9c7", flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: "5px", fontSize: "0.98rem", color: "#15363f" }}>{item.title}</h4>
                    <p style={{ color: "#597079", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "#ffffff", overflow: "hidden" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="badge" style={{ margin: "0 auto 16px" }}>Our Clientele</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: "12px" }}>
            Trusted by <span className="gradient-text">{clients.length}+ Companies</span>
          </h2>
          <p style={{ color: "#46616a" }}>Across pharmaceuticals, infrastructure, energy, fintech, and more.</p>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "16px", animation: "marquee 30s linear infinite", width: "max-content" }}>
            {[...clients, ...clients].map((client, i) => (
              <div key={`${client.slug}-${i}`} style={{ padding: "12px 20px", background: "#f6fbfc", border: "1px solid rgba(18, 52, 63, 0.12)", borderRadius: "100px", whiteSpace: "nowrap", fontSize: "0.85rem", fontWeight: 500, color: "#49636c" }}>
                {client.name}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(90deg, #ffffff, transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(-90deg, #ffffff, transparent)", pointerEvents: "none" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/clients" className="btn-outline">View All Clients</Link>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>

      <section className="section" style={{ background: "#f5f9fa" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="badge" style={{ marginBottom: "12px" }}>Latest Insights</div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800 }}>From the <span className="gradient-text">ConfideLeap Blog</span></h2>
            </div>
            <Link href="/blog" className="btn-outline">View All Articles</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-hover"
                style={{ display: "flex", flexDirection: "column", background: "#ffffff", border: "1px solid rgba(18, 52, 63, 0.12)", borderRadius: "16px", overflow: "hidden", textDecoration: "none" }}
              >
                <div style={{ height: "4px", background: "var(--accent-gradient)" }} />
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#087f9e", background: "rgba(14,165,198,0.1)", padding: "4px 10px", borderRadius: "100px" }}>{post.categoryLabel}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.4, marginBottom: "12px", color: "#163a43", flex: 1 }}>{post.title}</h3>
                  <p style={{ color: "#5a757d", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "20px" }}>{post.excerpt.slice(0, 120)}...</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "#657d85" }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#0a839f", display: "flex", alignItems: "center", gap: "4px" }}>
                      Read More <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "#ffffff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "16px" }}>
            Ready to <span className="gradient-text">Elevate Your Financial Potential?</span>
          </h2>
          <p style={{ color: "#4c656d", maxWidth: "540px", margin: "0 auto 32px", lineHeight: 1.75 }}>
            Reach out today and let&apos;s build a strategy tailored to your business goals.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${siteData.phone}`} className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12 19.79 19.79 0 0 1 1 3.17 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              {siteData.phone}
            </a>
            <Link href="/contact" className="btn-primary">Send Us a Message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
