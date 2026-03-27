import type { Metadata } from "next";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { getAllServices, getFeaturedPosts, getAllClients, getTestimonials } from "../lib/content";
import siteData from "../content/site.json";
import { GetStartedButton } from "../components/ui/get-started-button";
import { RippleButton } from "../components/ui/multi-type-ripple-buttons";
import { ServiceCard } from "../components/ServiceCard";
import { Testimonials } from "../components/Testimonials";

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

const serviceIconBySlug: Record<string, string> = {
  "investor-relations": "trending-up",
  "digital-marketing": "target",
  "public-relations": "bar-chart-2",
  "annual-report": "file-text",
  podcast: "mic",
};

const serviceColorBySlug: Record<string, { bg: string; accent: string; accentLight: string; text: string; border: string }> = {
  "investor-relations": {
    bg: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #4f46e5 100%)",
    accent: "#60a5fa",
    accentLight: "#93c5fd",
    text: "#ffffff",
    border: "rgba(96,165,250,0.3)"
  },
  "digital-marketing": {
    bg: "linear-gradient(135deg, #7c2d12 0%, #a855f7 50%, #ec4899 100%)",
    accent: "#f472b6",
    accentLight: "#fbcfe8",
    text: "#ffffff",
    border: "rgba(244,114,182,0.3)"
  },
  "public-relations": {
    bg: "linear-gradient(135deg, #065f46 0%, #10b981 50%, #14b8a6 100%)",
    accent: "#6ee7b7",
    accentLight: "#a7f3d0",
    text: "#ffffff",
    border: "rgba(110,231,183,0.3)"
  },
  "annual-report": {
    bg: "linear-gradient(135deg, #92400e 0%, #f59e0b 50%, #f97316 100%)",
    accent: "#fbbf24",
    accentLight: "#fde68a",
    text: "#ffffff",
    border: "rgba(251,191,36,0.3)"
  },
  podcast: {
    bg: "linear-gradient(135deg, #0e7490 0%, #06b6d4 50%, #0891b2 100%)",
    accent: "#22d3ee",
    accentLight: "#cffafe",
    text: "#ffffff",
    border: "rgba(34,211,238,0.3)"
  }
};

const whiteRippleButtonClass =
  "rounded-full border border-[rgba(14,165,198,0.35)] bg-white text-[#0e5d74] text-[0.95rem] font-semibold leading-[1.2] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0a3f4f]";

export default async function HomePage() {
  const [services, featuredPosts, clients, testimonials] = await Promise.all([
    getAllServices(),
    getFeaturedPosts(),
    getAllClients(),
    getTestimonials(),
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

        </div>
      </section>

      <section className="section" style={{ background: "#0a1f2e" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="badge" style={{ margin: "0 auto 16px" }}>What We Do</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "16px", color: "#ffffff" }}>
              Advisory Services That Help You <span className="gradient-text">Grow With Confidence</span>
            </h2>
            <p style={{ color: "#a8c5d1", fontSize: "1.05rem", maxWidth: "640px", margin: "0 auto" }}>
              Investor relations, public relations, digital marketing, annual reports, and podcast solutions delivered with one strategic voice.
            </p>
          </div>
          <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%", paddingLeft: "2rem", paddingRight: "2rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                alignItems: "stretch",
              }}
            >
              {services.map((service) => {
                const iconName = serviceIconBySlug[service.slug] ?? "trending-up";
                const colors = serviceColorBySlug[service.slug] || serviceColorBySlug["investor-relations"];

                return (
                  <ServiceCard
                    key={service.slug}
                    slug={service.slug}
                    title={service.title}
                    subtitle={service.subtitle}
                    description={service.description}
                    iconName={iconName}
                    colors={colors}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <RippleButton variant="hover" hoverRippleColor="#0ea5c6" className={whiteRippleButtonClass}>
              <Link href="/services" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit", padding: "10px 20px" }}>
                View All Services
              </Link>
            </RippleButton>
          </div>
        </div>
      </section>

      <Testimonials testimonials={testimonials} />

      <section className="section-sm" style={{ background: "#051319", overflow: "hidden" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="badge" style={{ margin: "0 auto 16px" }}>Our Clientele</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: "12px", color: "#ffffff" }}>
            Trusted by <span className="gradient-text">{clients.length}+ Companies</span>
          </h2>
          <p style={{ color: "#a8c5d1" }}>Across pharmaceuticals, infrastructure, energy, fintech, and more.</p>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "16px", animation: "marquee 30s linear infinite", width: "max-content" }}>
            {[...clients, ...clients].map((client, i) => (
              <div key={`${client.slug}-${i}`} style={{ padding: "12px 20px", background: "rgba(30, 70, 85, 0.4)", border: "1px solid rgba(14, 165, 198, 0.2)", borderRadius: "100px", whiteSpace: "nowrap", fontSize: "0.85rem", fontWeight: 500, color: "#a8c5d1" }}>
                {client.name}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(90deg, #051319, transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(-90deg, #051319, transparent)", pointerEvents: "none" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <RippleButton variant="hover" hoverRippleColor="#0ea5c6" className={whiteRippleButtonClass}>
            <Link href="/clients" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit", padding: "10px 20px", lineHeight: 1.2 }}>
              View All Clients
            </Link>
          </RippleButton>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>

      <section className="section" style={{ background: "#0a1f2e" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="badge" style={{ marginBottom: "12px" }}>Latest Insights</div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#ffffff" }}>From the <span className="gradient-text">ConfideLeap Blog</span></h2>
            </div>
            <RippleButton variant="hover" hoverRippleColor="#0ea5c6" className={whiteRippleButtonClass}>
              <Link href="/blog" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit", padding: "10px 20px", lineHeight: 1.2 }}>
                View All Articles
              </Link>
            </RippleButton>
          </div>

          <div className="blog-home-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }}>
            {featuredPosts.slice(0, 3).map((post, i) => {
              const fallbackBlogImages = [
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
              ];
              const imgUrl = post.coverImageUrl ?? fallbackBlogImages[i % 3];
              const accentColor = post.categoryColor || "#0ea5c6";
              const accentRgb = post.categoryRgb || "14,165,198";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card-hover"
                  style={{ display: "flex", flexDirection: "column", background: "rgba(18, 45, 58, 0.6)", border: "1px solid rgba(14,165,198,0.15)", borderRadius: "18px", overflow: "hidden", textDecoration: "none" }}
                >
                  {/* Cover image */}
                  <div style={{ height: "170px", overflow: "hidden", background: "#0a2030", position: "relative", flexShrink: 0 }}>
                    <img src={imgUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(5,19,25,0.7))" }} />
                    <span style={{ position: "absolute", bottom: "10px", left: "12px", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", background: `rgba(${accentRgb},0.85)`, padding: "3px 10px", borderRadius: "100px", backdropFilter: "blur(4px)" }}>
                      {post.categoryLabel}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px 22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "0.97rem", lineHeight: 1.45, marginBottom: "10px", color: "#f0f8fa", flex: 1 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: "#7a9fb0", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid rgba(14,165,198,0.12)" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#9ac5d2" }}>{post.author ?? "ConfideLeap Team"}</span>
                        <span style={{ fontSize: "0.7rem", color: "#567079" }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: accentColor, display: "flex", alignItems: "center", gap: "4px" }}>
                        Read <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .blog-home-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .blog-home-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      <section className="section-sm" style={{ background: "#0a1f2e" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "16px", color: "#ffffff" }}>
            Ready to <span className="gradient-text">Elevate Your Financial Potential?</span>
          </h2>
          <p style={{ color: "#a8c5d1", maxWidth: "540px", margin: "0 auto 32px", lineHeight: 1.75 }}>
            Reach out today and let&apos;s build a strategy tailored to your business goals.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <RippleButton variant="hover" hoverRippleColor="#0ea5c6" className={whiteRippleButtonClass}>
              <a href={`tel:${siteData.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit", padding: "10px 20px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12 19.79 19.79 0 0 1 1 3.17 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {siteData.phone}
              </a>
            </RippleButton>
            <Link href="/contact" className="btn-primary">Send Us a Message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
