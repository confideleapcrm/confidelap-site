import type { Metadata } from "next";
import { createImageUrlBuilder } from "@sanity/image-url";
import Link from "next/link";

import { getAllPosts } from "../../lib/content";
import { Component } from "../../components/ui/blog-posts";
import { sanityClient } from "../../lib/sanity";
import { RippleButton } from "../../components/ui/multi-type-ripple-buttons";

export const metadata: Metadata = {
  title: "Blog – Finance Insights, Updates & Trends | ConfideLeap",
  description:
    "Explore ConfideLeap's blog for the latest insights, trends, and expert advice on investor relations, digital marketing, public relations and much more.",
};

const builder = createImageUrlBuilder(sanityClient);

const fallbackImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
];

const darkRippleClass =
  "rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent font-semibold leading-[1.2]";

function estimateReadTime(excerpt: string): number {
  return Math.max(3, Math.ceil(excerpt.trim().split(/\s+/).length / 30));
}

function getImage(post: Parameters<typeof builder.image>[0] | undefined | null, index: number): string {
  if (post) {
    try {
      return builder.image(post).width(800).height(450).fit("crop").url();
    } catch {
      // fall through
    }
  }
  return fallbackImages[index % fallbackImages.length];
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  const heroCards = featured.map((post, index) => ({
    id: index + 1,
    title: post.title,
    category: post.categoryLabel,
    href: `/blog/${post.slug}`,
    imageUrl: getImage(post.coverImage ?? null, index),
    readTime: estimateReadTime(post.excerpt),
  }));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-dark grid-lines" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.2) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-22%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.16) 0%, transparent 72%)" }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "8%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.14)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.12)", border: "1px solid rgba(14,165,198,0.28)", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12abc9" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>Our Blog</span>
          </div>

          <h1 className="anim-fade-up delay-100" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "22px", color: "#f0f8fa", maxWidth: "820px" }}>
            Finance Insights,<br />
            <span className="shimmer-text">Updates & Trends</span>
          </h1>

          <p className="anim-fade-up delay-200" style={{ fontSize: "clamp(1rem, 1.9vw, 1.15rem)", color: "rgba(210,235,242,0.7)", maxWidth: "620px", lineHeight: 1.8, marginBottom: "40px" }}>
            Expert perspectives on investor relations, digital marketing, and advisory communication from the ConfideLeap team.
          </p>

          <div className="anim-fade-up delay-300" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ padding: "13px 26px" }}>
              Talk to Our Experts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className={darkRippleClass}>
              <Link href="/services" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(200,235,242,0.8)", textDecoration: "none", padding: "12px 24px" }}>
                Explore Services
              </Link>
            </RippleButton>
          </div>
        </div>
      </section>

      {/* ── Featured Posts Grid ───────────────────────────────────────────── */}
      {heroCards.length > 0 && (
        <section style={{ background: "linear-gradient(180deg, #f8fbfd 0%, #eef5f8 100%)", paddingTop: "56px", paddingBottom: "56px", borderTop: "1px solid rgba(18,52,63,0.08)" }}>
          <div className="container">
            <Component
              title="Featured Articles"
              description="Our most-read pieces on investor relations, digital strategy, and financial communications."
              posts={heroCards}
              theme="light"
            />
          </div>
        </section>
      )}

      {/* ── All Articles ──────────────────────────────────────────────────── */}
      <section style={{ background: "#ffffff", paddingTop: "64px", paddingBottom: "80px", borderTop: "1px solid rgba(18,52,63,0.07)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="badge" style={{ marginBottom: "12px" }}>All Articles</div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#0e2530", letterSpacing: "-0.03em" }}>
                Browse Every Post
              </h2>
            </div>
            <span style={{ fontSize: "0.85rem", color: "#7a9099", fontWeight: 600 }}>
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 24px", color: "#7a9099" }}>
              <p style={{ fontSize: "1.1rem" }}>No articles published yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "28px" }}>
              {posts.map((post, index) => {
                const imgUrl = getImage(post.coverImage ?? null, index);
                const accentColor = post.categoryColor || "#0ea5c6";
                const accentRgb = post.categoryRgb || "14,165,198";
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    style={{ display: "flex", flexDirection: "column", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(18,52,63,0.1)", background: "#ffffff", textDecoration: "none", transition: "transform 0.2s ease, box-shadow 0.2s ease", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                    className="card-hover"
                  >
                    {/* Cover */}
                    <div style={{ height: "200px", overflow: "hidden", background: "#e8f2f6", position: "relative" }}>
                      <img
                        src={imgUrl}
                        alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {/* Category badge over image */}
                      <span style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        background: `rgba(${accentRgb},0.92)`,
                        backdropFilter: "blur(6px)",
                        padding: "4px 10px",
                        borderRadius: "100px",
                        color: "#fff",
                      }}>
                        {post.categoryLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0e2530", lineHeight: 1.4, marginBottom: "10px", flex: 1 }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: "0.84rem", color: "#567079", lineHeight: 1.65, marginBottom: "16px" }}>
                        {post.excerpt.length > 130 ? `${post.excerpt.slice(0, 130)}…` : post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{ fontSize: "0.68rem", fontWeight: 600, color: "#7a9099", background: "rgba(18,52,63,0.06)", padding: "3px 9px", borderRadius: "100px" }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid rgba(18,52,63,0.08)" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#3a5a66" }}>
                            {post.author ?? "ConfideLeap Team"}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#9ab0b8" }}>
                            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {" · "}
                            {estimateReadTime(post.excerpt)} min read
                          </span>
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: accentColor, display: "flex", alignItems: "center", gap: "4px" }}>
                          Read
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "#051319", padding: "72px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "16px", color: "#ffffff" }}>
            Want Expert Advice for Your <span className="gradient-text">Business?</span>
          </h2>
          <p style={{ color: "#a8c5d1", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.75 }}>
            Talk to our team about investor relations, PR, digital marketing, or annual report strategy.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: "14px 30px" }}>
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
