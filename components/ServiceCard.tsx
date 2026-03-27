"use client";

import Link from "next/link";
import { FiBarChart2, FiFileText, FiMic, FiTarget, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  "trending-up": FiTrendingUp,
  "target": FiTarget,
  "bar-chart-2": FiBarChart2,
  "file-text": FiFileText,
  "mic": FiMic,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  colors: {
    bg: string;
    accent: string;
    accentLight: string;
    text: string;
    border: string;
  };
}

export function ServiceCard({
  slug,
  title,
  subtitle,
  description,
  iconName,
  colors,
}: Readonly<ServiceCardProps>) {
  const Icon = iconMap[iconName] || FiTrendingUp;
  return (
    //Older Coloer Cards
  //  style={{         display: "flex",         flexDirection: "column",         justifyContent: "space-between",         height: "100%",         textDecoration: "none",         background: colors.bg,         border: `1.5px solid ${colors.border}`,         borderRadius: "26px",         overflow: "hidden",         padding: "clamp(20px, 3.2vw, 34px)",         transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",         cursor: "pointer",         boxShadow: "0 14px 34px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)",       }} make yhis cards matt 
    <Link
      href={`/services/${slug}`}
      className="card-hover"
      style={{
        position: "relative",
        isolation: "isolate",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        textDecoration: "none",
        background: colors.bg,
        backgroundImage: `
          radial-gradient(circle at 20% 15%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%),
          radial-gradient(circle at 78% 84%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 48%),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, rgba(0,0,0,0.015) 1px 2px)
        `,
        backgroundBlendMode: "soft-light, multiply, normal",
        border: `1.5px solid ${colors.border}`,
        borderRadius: "26px",
        overflow: "hidden",
        padding: "clamp(20px, 3.2vw, 34px)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(-10px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 20px 44px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 10px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)";
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 0.45px, transparent 0.65px), radial-gradient(rgba(0,0,0,0.12) 0.35px, transparent 0.55px)",
          backgroundSize: "3px 3px, 4px 4px",
          backgroundPosition: "0 0, 1px 1px",
          opacity: 0.22,
          mixBlendMode: "overlay",
        }}
      />
      <div className="scroll-stack-card-inner" style={{ position: "relative", zIndex: 1 }}>
        <div>
          <div
            style={{
              width: "clamp(62px, 10vw, 92px)",
              height: "clamp(62px, 10vw, 92px)",
              borderRadius: "24px",
              background: `rgba(255,255,255,0.15)`,
              backdropFilter: "blur(10px)",
              border: `1.5px solid ${colors.accentLight}`,
              color: colors.accentLight,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "clamp(14px, 2.5vw, 24px)",
              boxShadow: `0 8px 20px rgba(0,0,0,0.15)`,
              transition: "all 0.3s ease",
            }}
          >
            <Icon size={44} aria-hidden="true" />
          </div>
          <h3
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 2.6vw, 1.85rem)",
              marginBottom: "clamp(8px, 1.8vw, 14px)",
              color: colors.text,
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: colors.accentLight,
              fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
              lineHeight: 1.45,
              marginBottom: "clamp(10px, 2vw, 14px)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(0.86rem, 1.5vw, 0.98rem)",
              lineHeight: 1.55,
              marginBottom: "clamp(10px, 2vw, 14px)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        </div>
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: colors.accentLight,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.3s ease",
            }}
          >
            Explore Expertise →
          </span>
        </div>
      </div>
    </Link>
  );
}
