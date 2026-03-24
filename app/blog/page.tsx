import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "../../lib/content";
import { GetStartedButton } from "../../components/ui/get-started-button";

export const metadata: Metadata = {
  title: "Blog – Finance Insights, Updates & Trends | ConfideLeap",
  description:
    "Explore ConfideLeap's blog for the latest insights, trends, and expert advice on investor relations, digital marketing, public relations and much more.",
};

const catMeta: Record<string, { bg: string; color: string; border: string }> = {
  "investor-relations": { bg: "rgba(14,165,198,0.1)",  color: "#0ea5c6", border: "rgba(14,165,198,0.25)" },
  "digital-marketing":  { bg: "rgba(108,71,255,0.1)",  color: "#8b5cf6", border: "rgba(108,71,255,0.25)" },
  "advisor-insight":    { bg: "rgba(16,185,129,0.1)",  color: "#10b981", border: "rgba(16,185,129,0.25)" },
  uncategorized:        { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
};

const categoryLabels: Record<string, string> = {
  "investor-relations": "Investor Relations",
  "digital-marketing":  "Digital Marketing",
  "advisor-insight":    "Advisor Insight",
  uncategorized:        "General",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  const allCategories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-20%", left: "-8%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.14) 0%, transparent 72%)" }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "8%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(108,71,255,0.14)" }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "5%", right: "7%", width: "370px", height: "370px", borderRadius: "50%", border: "1px dashed rgba(108,71,255,0.08)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="anim-fade-up"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(108,71,255,0.12)", border: "1px solid rgba(108,71,255,0.28)", marginBottom: "28px" }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8b5cf6" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c4b5fd" }}>Our Blog</span>
          </div>

          <h1
            className="anim-fade-up delay-100"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "22px", color: "#f0f8fa" }}
          >
            Finance Insights,<br />
            <span className="shimmer-text">Updates & Trends</span>
          </h1>

          <p
            className="anim-fade-up delay-200"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(210,235,242,0.7)", maxWidth: "520px", lineHeight: 1.8, marginBottom: "40px" }}
          >
            Expert perspectives on investor relations, digital marketing, and public
            relations from the ConfideLeap team.
          </p>

          {/* Category pills */}
          <div className="anim-fade-up delay-300" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {allCategories.map((cat) => {
              const c = catMeta[cat] ?? catMeta.uncategorized;
              return (
                <span
                  key={cat}
                  style={{ padding: "6px 14px", borderRadius: "100px", background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: "0.78rem", fontWeight: 600 }}
                >
                  {categoryLabels[cat] ?? cat}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Articles ─────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6" }}>Featured</span>
              <span style={{ flex: 1, height: "1px", background: "rgba(14,165,198,0.2)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {featured.map((post, i) => {
                const c = catMeta[post.category] ?? catMeta.uncategorized;
                const isBig = i === 0 && featured.length > 1;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="reveal"
                    style={{ display: "flex", flexDirection: "column", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border-light)", background: "#ffffff", textDecoration: "none", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease", gridColumn: isBig ? "span 2" : undefined }}
                  >
                    {/* Color bar */}
                    <div style={{ height: "4px", background: `linear-gradient(90deg, ${c.color}, transparent)` }} />

                    {/* Card body */}
                    <div style={{ padding: isBig ? "36px" : "28px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: "4px 12px", borderRadius: "100px" }}>
                          {post.categoryLabel}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#7a9099" }}>
                          {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <h2
                        style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: isBig ? "clamp(1.2rem, 2.2vw, 1.55rem)" : "1.1rem", lineHeight: 1.35, color: "#0e2530", marginBottom: "14px", flex: 1, letterSpacing: "-0.02em" }}
                      >
                        {post.title}
                      </h2>

                      <p style={{ color: "#567079", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "24px" }}>
                        {post.excerpt.slice(0, isBig ? 180 : 120)}…
                      </p>

                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 700, color: c.color }}>
                        Read Article
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── All Articles ──────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="section" style={{ background: "#f5f7f8" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#567079" }}>All Articles</span>
              <span style={{ flex: 1, height: "1px", background: "rgba(18,52,63,0.12)" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#7a9099" }}>{rest.length} articles</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {rest.map((post) => {
                const c = catMeta[post.category] ?? catMeta.uncategorized;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bento-card reveal"
                    style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: "100px" }}>
                        {post.categoryLabel}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#7a9099" }}>
                        {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", lineHeight: 1.45, color: "#0e2530", marginBottom: "12px", letterSpacing: "-0.01em", flex: 1 }}>
                      {post.title}
                    </h3>

                    <p style={{ color: "#567079", fontSize: "0.825rem", lineHeight: 1.65, marginBottom: "20px" }}>
                      {post.excerpt.slice(0, 100)}…
                    </p>

                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.8rem", fontWeight: 700, color: c.color, marginTop: "auto" }}>
                      Read More
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-50%", right: "-5%", width: "56vw", height: "56vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.12) 0%, transparent 70%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 className="reveal" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f0f8fa", marginBottom: "16px" }}>
            Ready to Elevate Your<br />
            <span className="shimmer-text">Investor Relations Strategy?</span>
          </h2>
          <p className="reveal" style={{ color: "rgba(200,230,240,0.68)", maxWidth: "460px", margin: "0 auto 32px", lineHeight: 1.75 }}>
            Talk to our team and get a custom strategy tailored to your business goals.
          </p>
          <div className="reveal" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <GetStartedButton href="/contact" label="Talk to an Expert" />
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(200,235,242,0.8)", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.25s ease" }}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
