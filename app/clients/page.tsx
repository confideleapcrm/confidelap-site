import type { Metadata } from "next";
import Link from "next/link";
import { getAllClients } from "../../lib/content";
import { RippleButton } from "../../components/ui/multi-type-ripple-buttons";
import ClientsShowcase from "../../components/ClientsShowcase";

const darkRippleClass = "rounded-[10px] border border-[rgba(14,165,198,0.3)] bg-transparent font-semibold leading-[1.2]";

export const metadata: Metadata = {
  title: "Our Clients | ConfideLeap",
  description:
    "We work closely with every client as a true partner — supporting their growth, earning their trust, and sharing in their success. 18+ companies across diverse industries.",
};

export default async function ClientsPage() {
  const clients = await getAllClients();
  const industries = Array.from(new Set(clients.map((c) => c.industry))).sort();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "100px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}
      >
        {/* Floating orbs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span
            className="anim-float"
            style={{ position: "absolute", top: "-20%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.16) 0%, transparent 68%)" }}
          />
          <span
            className="anim-float-2"
            style={{ position: "absolute", bottom: "-30%", left: "-12%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.12) 0%, transparent 70%)" }}
          />
          <span
            className="anim-spin-slow"
            style={{ position: "absolute", top: "12%", right: "12%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.15)" }}
          />
          <span
            className="anim-spin-slow-rev"
            style={{ position: "absolute", bottom: "8%", left: "8%", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(108,71,255,0.12)" }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Badge */}
          <div
            className="anim-fade-up"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.25)", marginBottom: "28px" }}
          >
            <span className="ping-dot" style={{ background: "#0ea5c6" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0ea5c6" }}>Our Clientele</span>
          </div>

          <h1
            className="anim-fade-up delay-100 shimmer-text"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: "22px" }}
          >
            Trusted by {clients.length}+ Companies<br />Across India
          </h1>

          <p
            className="anim-fade-up delay-200"
            style={{ color: "rgba(180,215,228,0.7)", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", maxWidth: "580px", margin: "0 auto 44px", lineHeight: 1.8 }}
          >
            We work closely with every client as a true partner — supporting their growth,
            earning their trust, and sharing in their success across diverse industries.
          </p>

          {/* Stats row */}
          <div
            className="anim-fade-up delay-300"
            style={{ display: "inline-flex", gap: "48px", padding: "20px 44px", borderRadius: "20px", background: "rgba(14,165,198,0.06)", border: "1px solid rgba(14,165,198,0.18)", flexWrap: "wrap", justifyContent: "center" }}
          >
            {[
              { val: `${clients.length}+`, label: "Clients" },
              { val: `${industries.length}+`, label: "Industries" },
              { val: "100%", label: "Satisfaction" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#f0f8fa", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(180,215,228,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients Showcase (marquee + bento grid) ────────────────────── */}
      <ClientsShowcase clients={clients} />

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section
        className="section-dark"
        style={{ textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.12) 0%, transparent 68%)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h2
            className="shimmer-text"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "16px" }}
          >
            Want to Join Our Growing List of Clients?
          </h2>
          <p style={{ color: "rgba(180,215,228,0.65)", maxWidth: "480px", margin: "0 auto 36px", fontSize: "1rem", lineHeight: 1.75 }}>
            Let&apos;s discuss how ConfideLeap can help your business build investor confidence and drive sustainable growth.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ padding: "14px 32px", fontSize: "0.95rem", boxShadow: "0 8px 32px rgba(14,165,198,0.35)" }}
            >
              Get in Touch
            </Link>
            <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className={darkRippleClass}>
              <Link href="/services" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(180,215,228,0.85)", textDecoration: "none", padding: "14px 32px" }}>
                Explore Expertise
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </RippleButton>
          </div>
        </div>
      </section>
    </>
  );
}
