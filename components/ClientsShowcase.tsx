"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Client } from "../lib/content";

const industryMeta: Record<string, { color: string; rgb: string }> = {
  Chemicals:          { color: "#3b82f6", rgb: "59,130,246" },
  Infrastructure:     { color: "#8b5cf6", rgb: "139,92,246" },
  Pharmaceuticals:    { color: "#10b981", rgb: "16,185,129" },
  Healthcare:         { color: "#10b981", rgb: "16,185,129" },
  Manufacturing:      { color: "#f59e0b", rgb: "245,158,11" },
  Aquaculture:        { color: "#06b6d4", rgb: "6,182,212" },
  Environment:        { color: "#22c55e", rgb: "34,197,94" },
  "Renewable Energy": { color: "#fbbf24", rgb: "251,191,36" },
  "Oil & Gas":        { color: "#ef4444", rgb: "239,68,68" },
  "Agricultural Export": { color: "#a3e635", rgb: "163,230,53" },
  FMCG:               { color: "#a855f7", rgb: "168,85,247" },
  Fintech:            { color: "#0ea5c6", rgb: "14,165,198" },
};

const fallback = { color: "#0ea5c6", rgb: "14,165,198" };

function getMeta(industry: string) {
  return industryMeta[industry] ?? fallback;
}

// ── Marquee ─────────────────────────────────────────────────────────────────

function MarqueeRow({ clients, reverse = false }: Readonly<{ clients: Client[]; reverse?: boolean }>) {
  const trackRef = useRef<HTMLDivElement>(null);

  // CSS animation direction handled via inline style
  const items = [...clients, ...clients]; // duplicate for seamless loop

  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "12px",
          width: "max-content",
          animation: `marquee-scroll 40s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {items.map((client, i) => {
          const m = getMeta(client.industry);
          return (
            <div
              key={`${client.slug}-${i}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "100px",
                background: `rgba(${m.rgb}, 0.08)`,
                border: `1px solid rgba(${m.rgb}, 0.24)`,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: `rgba(${m.rgb}, 0.18)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  color: m.color,
                }}
              >
                {client.name.charAt(0)}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#294148" }}>
                {client.name}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: m.color,
                  background: `rgba(${m.rgb}, 0.12)`,
                  padding: "2px 8px",
                  borderRadius: "100px",
                }}
              >
                {client.industry}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function ClientCard({ client, large = false }: Readonly<{ client: Client; large?: boolean }>) {
  const m = getMeta(client.industry);

  return (
    <Link
      href={`/clients/${client.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: large ? "36px" : "28px",
        borderRadius: "20px",
        background: "#ffffff",
        border: `1px solid rgba(${m.rgb}, 0.2)`,
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        height: "100%",
        boxShadow: "0 8px 22px rgba(8,28,38,0.06)",
        // @ts-ignore
        "--card-rgb": m.rgb,
      }}
      className="client-card"
    >
      {/* Top glow accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${m.rgb},0.12) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Watermark initial */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-12px",
          right: "-8px",
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: large ? "8rem" : "6rem",
          color: `rgba(${m.rgb}, 0.06)`,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {client.name.charAt(0)}
      </div>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            width: large ? "60px" : "48px",
            height: large ? "60px" : "48px",
            borderRadius: "16px",
            background: `rgba(${m.rgb}, 0.12)`,
            border: `1px solid rgba(${m.rgb}, 0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 900,
            fontSize: large ? "1.4rem" : "1.15rem",
            color: m.color,
            flexShrink: 0,
          }}
        >
          {client.name.charAt(0)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.09em",
                color: m.color,
                background: `rgba(${m.rgb}, 0.1)`,
                border: `1px solid rgba(${m.rgb}, 0.22)`,
                padding: "3px 10px",
                borderRadius: "100px",
              }}
            >
              {client.industry}
            </span>
            {client.featured && (
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fbbf24",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.22)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                }}
              >
                Featured
              </span>
            )}
          </div>
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: large ? "1.1rem" : "0.95rem",
              color: "#0e2530",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {client.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.82rem",
          color: "#4f6973",
          lineHeight: 1.75,
          marginBottom: "20px",
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: large ? 4 : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {client.description}
      </p>

      {/* Services */}
      {client.services && client.services.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {client.services.slice(0, large ? 4 : 3).map((svc) => (
            <span
              key={svc}
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#567079",
                background: "rgba(14,165,198,0.08)",
                border: "1px solid rgba(14,165,198,0.18)",
                padding: "3px 10px",
                borderRadius: "100px",
              }}
            >
              {svc}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: `1px solid rgba(${m.rgb}, 0.1)`,
        }}
      >
        {client.region ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#8da1a8" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {client.region}
          </span>
        ) : client.website ? (
          <span style={{ fontSize: "0.72rem", color: "#8da1a8", fontFamily: "monospace" }}>
            {client.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        ) : (
          <span />
        )}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: m.color,
          }}
        >
          View profile
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Filter Pill ───────────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  color,
  onClick,
}: Readonly<{ label: string; active: boolean; color?: string; onClick: () => void }>) {
  const c = color ?? "#0ea5c6";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "5px 14px",
        borderRadius: "100px",
        border: active ? `1px solid ${c}` : "1px solid rgba(18,52,63,0.14)",
        background: active ? c : "rgba(18,52,63,0.03)",
        color: active ? "#ffffff" : "#3e5963",
        fontSize: "0.78rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.16s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ClientsShowcase({ clients }: Readonly<{ clients: Client[] }>) {
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);

  // Derive unique filter options from data
  const regions = Array.from(new Set(clients.map((c) => c.region).filter(Boolean) as string[])).sort();
  const industries = Array.from(new Set(clients.map((c) => c.industry))).sort();
  const services = Array.from(
    new Set(clients.flatMap((c) => c.services ?? []))
  ).sort();

  // Apply filters (AND logic)
  const filtered = clients.filter((c) => {
    if (regionFilter && c.region !== regionFilter) return false;
    if (industryFilter && c.industry !== industryFilter) return false;
    if (serviceFilter && !(c.services ?? []).includes(serviceFilter)) return false;
    return true;
  });

  const activeFilterCount = [regionFilter, industryFilter, serviceFilter].filter(Boolean).length;

  const featured = filtered.filter((c) => c.featured);
  const rest = filtered.filter((c) => !c.featured);

  // Marquee always uses all clients (unfiltered, decorative)
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <>
      {/* ── Marquee Strip ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "#f6fbfc",
          borderTop: "1px solid rgba(14,165,198,0.14)",
          borderBottom: "1px solid rgba(14,165,198,0.14)",
          padding: "32px 0",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .client-card:hover {
            transform: translateY(-4px);
            border-color: rgba(var(--card-rgb), 0.35) !important;
            box-shadow: 0 16px 34px rgba(8,28,38,0.12), 0 0 0 1px rgba(var(--card-rgb), 0.16);
          }
        `}</style>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <MarqueeRow clients={row1.length >= 2 ? row1 : clients} />
          <MarqueeRow clients={row2.length >= 2 ? row2 : clients} reverse />
        </div>
      </section>

      {/* ── Filter Bar + Grid ─────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg, #f7fcfd 0%, #f2f8fa 100%)",
          padding: "80px 0 100px",
        }}
      >
        <div className="container">
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0b7f9f", marginBottom: "12px" }}>
              Our Clients
            </p>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#0e2530", letterSpacing: "-0.035em", margin: 0 }}>
              Trusted Partners Across Industries
            </h2>
          </div>

          {/* ── Filter Bar ──────────────────────────────────────────── */}
          <div style={{ marginBottom: "40px", padding: "20px 24px", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(14,165,198,0.12)", boxShadow: "0 2px 12px rgba(8,28,38,0.05)" }}>

            {/* Region row — dropdown */}
            {regions.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: industries.length > 0 || services.length > 0 ? "14px" : 0 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", width: "60px", flexShrink: 0 }}>Region</span>
                <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                  <select
                    value={regionFilter ?? ""}
                    onChange={(e) => setRegionFilter(e.target.value || null)}
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      padding: "6px 32px 6px 14px",
                      borderRadius: "100px",
                      border: regionFilter ? "1px solid #0ea5c6" : "1px solid rgba(18,52,63,0.14)",
                      background: regionFilter ? "rgba(14,165,198,0.07)" : "rgba(18,52,63,0.03)",
                      color: regionFilter ? "#0b7f9f" : "#3e5963",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      outline: "none",
                      minWidth: "160px",
                    }}
                  >
                    <option value="">All Regions</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={regionFilter ? "#0ea5c6" : "#7a9099"}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ position: "absolute", right: "12px", pointerEvents: "none" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            )}

            {/* Industry row */}
            {industries.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: services.length > 0 ? "14px" : 0 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", width: "60px", flexShrink: 0 }}>Industry</span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {industries.map((ind) => {
                    const m = getMeta(ind);
                    return (
                      <FilterPill
                        key={ind}
                        label={ind}
                        active={industryFilter === ind}
                        color={m.color}
                        onClick={() => setIndustryFilter(industryFilter === ind ? null : ind)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Services row */}
            {services.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", width: "60px", flexShrink: 0 }}>Service</span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {services.map((svc) => (
                    <FilterPill
                      key={svc}
                      label={svc}
                      active={serviceFilter === svc}
                      color="#6c47ff"
                      onClick={() => setServiceFilter(serviceFilter === svc ? null : svc)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Active count + clear */}
            {activeFilterCount > 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(14,165,198,0.1)" }}>
                <span style={{ fontSize: "0.78rem", color: "#567079" }}>
                  Showing <strong style={{ color: "#0e2530" }}>{filtered.length}</strong> of {clients.length} clients
                </span>
                <button
                  type="button"
                  onClick={() => { setRegionFilter(null); setIndustryFilter(null); setServiceFilter(null); }}
                  style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0ea5c6", background: "none", border: "none", cursor: "pointer", padding: "0", textDecoration: "underline" }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* ── Client Grid ─────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "#ffffff", borderRadius: "20px", border: "1px solid rgba(14,165,198,0.1)" }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#0e2530", marginBottom: "8px" }}>No clients match these filters</p>
              <p style={{ fontSize: "0.875rem", color: "#567079", marginBottom: "20px" }}>Try removing a filter to see more results.</p>
              <button
                type="button"
                onClick={() => { setRegionFilter(null); setIndustryFilter(null); setServiceFilter(null); }}
                style={{ padding: "9px 20px", borderRadius: "100px", background: "#0ea5c6", color: "#fff", fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer" }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured row */}
              {featured.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                  {featured.map((client) => (
                    <ClientCard key={client.slug} client={client} large />
                  ))}
                </div>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {rest.map((client) => (
                    <ClientCard key={client.slug} client={client} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
