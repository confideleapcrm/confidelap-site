import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllClients, getClientBySlug } from "../../../lib/content";
import { RippleButton } from "../../../components/ui/multi-type-ripple-buttons";
import { ClientDocuments } from "../../../components/ClientDocuments";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const clients = await getAllClients();
  return clients.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) return {};
  return {
    title: `${client.name} | ConfideLeap`,
    description: client.description,
  };
}


const industryColor: Record<string, string> = {
  Chemicals: "#3b82f6", Infrastructure: "#8b5cf6", Healthcare: "#10b981",
  Pharmaceuticals: "#10b981", Manufacturing: "#f59e0b", Aquaculture: "#06b6d4",
  Environment: "#22c55e", Energy: "#fbbf24", "Renewable Energy": "#fbbf24",
  "Oil & Gas": "#ef4444", FMCG: "#a855f7", Jewellery: "#f59e0b",
  Fintech: "#0ea5c6", "Industrial Equipment": "#64748b",
};

export default async function ClientDetailPage({ params }: Props) {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) notFound();

  const iColor = industryColor[client.industry] ?? "#0ea5c6";
  const docs = client.documents ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="section-dark grid-lines"
        style={{ paddingTop: "90px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-20%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(14,165,198,0.14) 0%, transparent 68%)` }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-25%", left: "-8%", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(108,71,255,0.1) 0%, transparent 70%)` }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.8rem", color: "rgba(180,215,228,0.5)", marginBottom: "32px" }}>
            <Link href="/" style={{ color: "rgba(180,215,228,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/clients" style={{ color: "rgba(180,215,228,0.5)", textDecoration: "none" }}>Clients</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "rgba(180,215,228,0.85)" }}>{client.name}</span>
          </nav>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "28px", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: `${iColor}22`, border: `1px solid ${iColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2rem", color: iColor, flexShrink: 0 }}>
              {client.name.charAt(0)}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: iColor, background: `${iColor}1a`, border: `1px solid ${iColor}33`, padding: "4px 12px", borderRadius: "100px", display: "inline-block", marginBottom: "14px" }}>
                {client.industry}
              </span>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f0f8fa", lineHeight: 1.1, marginBottom: "14px" }}>
                {client.name}
              </h1>
              <p style={{ color: "rgba(180,215,228,0.65)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "680px" }}>
                {client.description}
              </p>

              {/* Services used */}
              {client.services && client.services.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
                  {client.services.map((s) => (
                    <span key={s} style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(180,215,228,0.7)", background: "rgba(14,165,198,0.08)", border: "1px solid rgba(14,165,198,0.2)", padding: "4px 12px", borderRadius: "100px" }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Website link */}
            {client.website && (
              <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className="rounded-[10px] border border-[rgba(14,165,198,0.3)] bg-transparent font-semibold leading-[1.2]">
                <a href={client.website} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0ea5c6", textDecoration: "none", padding: "10px 20px", whiteSpace: "nowrap" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Visit Website
                </a>
              </RippleButton>
            )}
          </div>
        </div>
      </section>

      {/* ── Documents ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ marginBottom: "40px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6", display: "block", marginBottom: "10px" }}>
              Investor Documents
            </span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#0e2530" }}>
              {docs.length > 0 ? "Document Repository" : "No Documents Yet"}
            </h2>
          </div>
          <ClientDocuments docs={docs} />
        </div>
      </section>

      {/* ── Back ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#f5f7f8", paddingBottom: "60px" }}>
        <div className="container">
          <Link href="/clients" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0ea5c6", fontSize: "0.88rem", fontWeight: 700, textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Clients
          </Link>
        </div>
      </section>
    </>
  );
}
