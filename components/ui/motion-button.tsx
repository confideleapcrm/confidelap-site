"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface MotionButtonProps {
  label: string
  href?: string
  onClick?: () => void
  className?: string
}

export default function MotionButton({ label, href, onClick, className }: MotionButtonProps) {
  const inner = (
    <motion.span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        position: "relative",
        overflow: "hidden",
        padding: "11px 26px",
        borderRadius: "10px",
        fontWeight: 700,
        fontSize: "0.92rem",
        color: "#ffffff",
        background: "#0a7a97",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        border: "none",
        outline: "none",
        letterSpacing: "0.01em",
      }}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
    >
      {/* Sliding shine overlay */}
      <motion.span
        aria-hidden
        variants={{
          rest: { x: "-110%", skewX: "-15deg" },
          hover: { x: "110%", skewX: "-15deg", transition: { duration: 0.45, ease: "easeInOut" } },
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>

      {/* Arrow that slides in on hover */}
      <motion.span
        aria-hidden
        variants={{
          rest: { x: -4, opacity: 0 },
          hover: { x: 0, opacity: 1, transition: { duration: 0.2 } },
        }}
        style={{ position: "relative", zIndex: 1, display: "inline-flex" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.span>
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", display: "inline-flex" }}>
        {inner}
      </Link>
    )
  }

  return (
    <button onClick={onClick} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
      {inner}
    </button>
  )
}
