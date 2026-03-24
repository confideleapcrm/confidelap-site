import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getAllPosts as getAllForRelated } from "../../../lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const catMeta: Record<string, { bg: string; color: string; border: string; rgb: string }> = {
  "investor-relations": { bg: "rgba(14,165,198,0.1)",  color: "#0ea5c6", border: "rgba(14,165,198,0.3)",  rgb: "14,165,198" },
  "digital-marketing":  { bg: "rgba(108,71,255,0.1)",  color: "#8b5cf6", border: "rgba(108,71,255,0.3)",  rgb: "108,71,255" },
  "advisor-insight":    { bg: "rgba(16,185,129,0.1)",  color: "#10b981", border: "rgba(16,185,129,0.3)",  rgb: "16,185,129" },
  uncategorized:        { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b", border: "rgba(245,158,11,0.3)",  rgb: "245,158,11" },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllForRelated()]);
  if (!post) notFound();

  const c = catMeta[post.category] ?? catMeta.uncategorized;
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const moreFromBlog = related.length < 2
    ? allPosts.filter((p) => p.slug !== slug && p.featured).slice(0, 3)
    : related;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${c.rgb},0.18) 0%, transparent 70%)` }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-25%", left: "-8%", width: "42vw", height: "42vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${c.rgb},0.12) 0%, transparent 72%)` }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "10%", right: "10%", width: "280px", height: "280px", borderRadius: "50%", border: `1px solid rgba(${c.rgb},0.14)` }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav
            className="anim-fade-up"
            style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.8rem", color: "rgba(180,215,228,0.55)", marginBottom: "32px" }}
          >
            <Link href="/" style={{ color: "rgba(180,215,228,0.55)", transition: "color 0.2s" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog" style={{ color: "rgba(180,215,228,0.55)", transition: "color 0.2s" }}>Blog</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "rgba(180,215,228,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "280px" }}>{post.title}</span>
          </nav>

          {/* Category + Date */}
          <div className="anim-fade-up delay-100" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: "5px 14px", borderRadius: "100px" }}>
              {post.categoryLabel}
            </span>
            <span style={{ fontSize: "0.8rem", color: "rgba(180,215,228,0.55)" }}>
              {new Date(post.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <h1
            className="anim-fade-up delay-200"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#f0f8fa", maxWidth: "820px" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── Article Body ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr min(340px, 32%)", gap: "52px", alignItems: "start" }}>

            {/* Main content */}
            <article>
              {/* Accent line */}
              <div style={{ height: "3px", background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: "2px", marginBottom: "36px" }} />

              {/* Excerpt / lead paragraph */}
              <blockquote
                style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: "24px", marginBottom: "36px" }}
              >
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.05rem, 1.8vw, 1.22rem)", lineHeight: 1.8, color: "#2e4a54", fontWeight: 500, fontStyle: "italic" }}>
                  {post.excerpt}
                </p>
              </blockquote>

              {/* Full content placeholder */}
              <div
                style={{ padding: "40px 36px", background: "#ffffff", border: `1px solid rgba(${c.rgb},0.18)`, borderRadius: "20px", textAlign: "center" }}
              >
                <div
                  style={{ width: "56px", height: "56px", borderRadius: "16px", background: `rgba(${c.rgb},0.1)`, border: `1px solid rgba(${c.rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0e2530", marginBottom: "10px" }}>Full article coming soon</p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#567079", maxWidth: "380px", margin: "0 auto 24px" }}>
                  This article is currently being migrated to our platform. Read the full version on our main site.
                </p>
                <a
                  href="https://www.confideleap.com/blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "10px", background: `linear-gradient(135deg, ${c.color}, rgba(${c.rgb},0.7))`, color: "#ffffff", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", boxShadow: `0 6px 20px rgba(${c.rgb},0.28)` }}
                >
                  Read on ConfideLeap.com
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              </div>

              {/* Back link */}
              <div style={{ marginTop: "40px" }}>
                <Link
                  href="/blog"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: c.color, fontSize: "0.88rem", fontWeight: 700, textDecoration: "none", transition: "gap 0.2s ease" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back to Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: "sticky", top: "96px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* CTA */}
              <div
                style={{ padding: "28px", borderRadius: "20px", background: "#ffffff", border: `1px solid rgba(${c.rgb},0.2)`, overflow: "hidden", position: "relative" }}
              >
                <div aria-hidden style={{ position: "absolute", top: "-30%", right: "-20%", width: "160px", height: "160px", borderRadius: "50%", background: `radial-gradient(circle, rgba(${c.rgb},0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.05rem", marginBottom: "10px", color: "#0e2530", position: "relative" }}>
                  Get Expert IR Advice
                </h3>
                <p style={{ color: "#567079", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "20px", position: "relative" }}>
                  Talk to our team about building your investor relations strategy today.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.88rem", padding: "11px 18px", background: `linear-gradient(135deg, ${c.color}, rgba(${c.rgb},0.75))`, boxShadow: `0 6px 20px rgba(${c.rgb},0.25)`, position: "relative" }}
                >
                  Contact Us
                </Link>
              </div>

              {/* Related articles */}
              {moreFromBlog.length > 0 && (
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid var(--border-light)" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7a9099", marginBottom: "16px" }}>
                    {related.length > 0 ? "Related Articles" : "More Articles"}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {moreFromBlog.map((p) => {
                      const rc = catMeta[p.category] ?? catMeta.uncategorized;
                      return (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          style={{ display: "block", padding: "14px", borderRadius: "12px", background: "#f5f7f8", border: "1px solid rgba(18,52,63,0.08)", textDecoration: "none", transition: "all 0.2s ease" }}
                        >
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: rc.color, background: rc.bg, border: `1px solid ${rc.border}`, padding: "2px 8px", borderRadius: "100px", display: "inline-block", marginBottom: "8px" }}>
                            {p.categoryLabel}
                          </span>
                          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#0e2530", lineHeight: 1.5 }}>
                            {p.title}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Services shortcut */}
              <div style={{ padding: "20px 24px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(14,165,198,0.08), rgba(8,127,158,0.06))", border: "1px solid rgba(14,165,198,0.2)" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#0e2530", marginBottom: "8px" }}>Explore Our Services</p>
                <p style={{ fontSize: "0.78rem", color: "#567079", lineHeight: 1.6, marginBottom: "14px" }}>IR Advisory, PR, Digital Marketing, Annual Reports & Podcasts.</p>
                <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 700, color: "#0ea5c6", textDecoration: "none" }}>
                  View all services
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
