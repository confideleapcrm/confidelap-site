import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";

import { getAllPosts, getPostBySlug } from "../../../lib/content";
import { ArticleBody } from "../../../components/ui/portable-text";
import { sanityClient } from "../../../lib/sanity";

type Props = { params: Promise<{ slug: string }> };

const builder = createImageUrlBuilder(sanityClient);

const catMeta: Record<string, { bg: string; color: string; border: string; rgb: string }> = {
  "investor-relations": { bg: "rgba(14,165,198,0.1)",  color: "#0ea5c6", border: "rgba(14,165,198,0.3)",  rgb: "14,165,198" },
  "digital-marketing":  { bg: "rgba(108,71,255,0.1)",  color: "#8b5cf6", border: "rgba(108,71,255,0.3)",  rgb: "108,71,255" },
  "advisor-insight":    { bg: "rgba(16,185,129,0.1)",  color: "#10b981", border: "rgba(16,185,129,0.3)",  rgb: "16,185,129" },
  "public-relations":   { bg: "rgba(244,114,182,0.1)", color: "#ec4899", border: "rgba(244,114,182,0.3)", rgb: "244,114,182" },
  uncategorized:        { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b", border: "rgba(245,158,11,0.3)",  rgb: "245,158,11" },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    openGraph: post.coverImageUrl
      ? { images: [{ url: post.coverImageUrl }] }
      : undefined,
  };
}

function estimateReadTime(body: unknown[], excerpt: string): number {
  let words = excerpt.trim().split(/\s+/).length;
  for (const block of body) {
    if (block && typeof block === "object" && "children" in block) {
      const children = (block as { children: Array<{ text?: string }> }).children;
      for (const child of children) {
        if (child.text) words += child.text.split(/\s+/).length;
      }
    }
  }
  return Math.max(3, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  if (!post) notFound();

  const c = catMeta[post.category] ?? catMeta.uncategorized;
  const body = Array.isArray(post.body) ? post.body : [];
  const readTime = estimateReadTime(body, post.excerpt);

  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = allPosts
    .filter((p) => p.slug !== slug && p.featured)
    .slice(0, 3);
  const sidebarPosts = related.length >= 2 ? related : fallbackRelated;

  const coverUrl = post.coverImageUrl
    ?? (post.coverImage ? builder.image(post.coverImage).width(1400).height(560).fit("crop").url() : null);

  return (
    <>
      {/* ── Cover image banner ───────────────────────────────────────────── */}
      {coverUrl && (
        <div style={{ width: "100%", height: "clamp(260px, 38vw, 480px)", position: "relative", overflow: "hidden", background: "#0a1f2e" }}>
          <img
            src={coverUrl}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.7 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,19,25,0.3) 0%, rgba(5,19,25,0.75) 100%)" }} />
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="section-dark"
        style={{ paddingTop: coverUrl ? "40px" : "80px", paddingBottom: "56px" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(${c.rgb},0.15) 0%, transparent 70%)` }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.78rem", color: "rgba(180,215,228,0.5)", marginBottom: "28px", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(180,215,228,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog" style={{ color: "rgba(180,215,228,0.5)", textDecoration: "none" }}>Blog</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "rgba(180,215,228,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "280px" }}>{post.title}</span>
          </nav>

          {/* Category + meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: "5px 14px", borderRadius: "100px" }}>
              {post.categoryLabel}
            </span>
            <span style={{ fontSize: "0.78rem", color: "rgba(180,215,228,0.5)" }}>
              {new Date(post.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span style={{ fontSize: "0.78rem", color: "rgba(180,215,228,0.5)" }}>· {readTime} min read</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#f0f8fa", marginBottom: "28px" }}>
            {post.title}
          </h1>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={post.authorPhoto ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author ?? "CL")}&background=0d6779&color=fff&size=80`}
              alt={post.author ?? "Author"}
              style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(${c.rgb},0.4)` }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e0f2f8" }}>
                {post.author ?? "ConfideLeap Team"}
              </div>
              {post.authorRole && (
                <div style={{ fontSize: "0.76rem", color: "rgba(180,215,228,0.55)" }}>{post.authorRole}</div>
              )}
            </div>
            {post.authorLinkedin && (
              <a
                href={post.authorLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "4px", color: "rgba(180,215,228,0.5)", display: "flex", alignItems: "center" }}
                aria-label="LinkedIn profile"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Article + Sidebar ─────────────────────────────────────────────── */}
      <section style={{ background: "#f5f7f8", paddingTop: "56px", paddingBottom: "80px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) min(340px, 32%)", gap: "52px", alignItems: "start" }}>

            {/* ── Article ────────────────────────────────────────────────── */}
            <article style={{ minWidth: 0 }}>
              <div style={{ height: "3px", background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: "2px", marginBottom: "36px" }} />

              {/* Excerpt / lead */}
              <blockquote style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: "24px", marginBottom: "36px" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.05rem, 1.8vw, 1.18rem)", lineHeight: 1.8, color: "#2e4a54", fontWeight: 500, fontStyle: "italic" }}>
                  {post.excerpt}
                </p>
              </blockquote>

              {/* Body */}
              <div style={{ background: "#ffffff", borderRadius: "20px", padding: "40px 44px", border: `1px solid rgba(${c.rgb},0.12)`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                {body.length > 0 ? (
                  <ArticleBody body={body} accentColor={c.color} accentRgb={c.rgb} />
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#7a9099" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px", display: "block", opacity: 0.5 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <p style={{ fontWeight: 700, color: "#0e2530", marginBottom: "8px" }}>Article body not yet published</p>
                    <p style={{ fontSize: "0.85rem", maxWidth: "320px", margin: "0 auto 24px" }}>
                      Content is being migrated. Read the full version on our main site.
                    </p>
                    <a
                      href="https://www.confideleap.com/blogs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "10px", background: `linear-gradient(135deg, ${c.color}, rgba(${c.rgb},0.7))`, color: "#fff", fontWeight: 700, fontSize: "0.87rem", textDecoration: "none" }}
                    >
                      Read on ConfideLeap.com
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a9099", marginRight: "4px" }}>Tags:</span>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "0.8rem", fontWeight: 600, color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: "4px 12px", borderRadius: "100px" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Back link */}
              <div style={{ marginTop: "40px" }}>
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: c.color, fontSize: "0.88rem", fontWeight: 700, textDecoration: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back to Blog
                </Link>
              </div>
            </article>

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <aside style={{ position: "sticky", top: "96px", display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* CTA card */}
              <div style={{ padding: "28px", borderRadius: "20px", background: "#ffffff", border: `1px solid rgba(${c.rgb},0.2)`, overflow: "hidden", position: "relative" }}>
                <div aria-hidden style={{ position: "absolute", top: "-30%", right: "-20%", width: "160px", height: "160px", borderRadius: "50%", background: `radial-gradient(circle, rgba(${c.rgb},0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.05rem", marginBottom: "10px", color: "#0e2530", position: "relative" }}>
                  Get Expert IR Advice
                </h3>
                <p style={{ color: "#567079", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "20px", position: "relative" }}>
                  Talk to our team about building your investor relations strategy today.
                </p>
                <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.88rem", padding: "11px 18px", background: `linear-gradient(135deg, ${c.color}, rgba(${c.rgb},0.75))`, boxShadow: `0 6px 20px rgba(${c.rgb},0.25)`, position: "relative" }}>
                  Contact Us
                </Link>
              </div>

              {/* Related articles */}
              {sidebarPosts.length > 0 && (
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid rgba(18,52,63,0.1)" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7a9099", marginBottom: "16px" }}>
                    {related.length >= 2 ? "Related Articles" : "More Articles"}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {sidebarPosts.map((p) => {
                      const rc = catMeta[p.category] ?? catMeta.uncategorized;
                      return (
                        <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: "block", padding: "14px", borderRadius: "12px", background: "#f5f7f8", border: "1px solid rgba(18,52,63,0.08)", textDecoration: "none" }}>
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: rc.color, background: rc.bg, border: `1px solid ${rc.border}`, padding: "2px 8px", borderRadius: "100px", display: "inline-block", marginBottom: "8px" }}>
                            {p.categoryLabel}
                          </span>
                          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#0e2530", lineHeight: 1.5, margin: 0 }}>
                            {p.title}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "#9ab0b8", marginTop: "6px" }}>
                            {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Services shortcut */}
              <div style={{ padding: "20px 24px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(14,165,198,0.08), rgba(8,127,158,0.06))", border: "1px solid rgba(14,165,198,0.2)" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#0e2530", marginBottom: "8px" }}>Explore Our Expertise</p>
                <p style={{ fontSize: "0.78rem", color: "#567079", lineHeight: 1.6, marginBottom: "14px" }}>IR Advisory, PR, Digital Marketing, Annual Reports & Podcasts.</p>
                <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 700, color: "#0ea5c6", textDecoration: "none" }}>
                  View all expertise
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
