"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.name

        return (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => setActiveTab(item.name)}
            className={cn(
              "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors select-none",
              isActive ? "text-[#0ea5c6]" : "text-[#30474f] hover:text-[#0ea5c6]",
            )}
          >
            <span className="hidden md:inline">{item.name}</span>
            <span className="md:hidden">
              <Icon size={18} strokeWidth={2.5} />
            </span>

            {isActive && (
              <motion.div
                layoutId="tube-lamp"
                className="absolute inset-0 rounded-full -z-10"
                style={{ background: "rgba(14,165,198,0.08)" }}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Tube light glow at top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                  style={{ background: "#0ea5c6" }}
                >
                  <div className="absolute w-12 h-6 rounded-full blur-md -top-2 -left-2"
                    style={{ background: "rgba(14,165,198,0.25)" }} />
                  <div className="absolute w-8 h-6 rounded-full blur-md -top-1"
                    style={{ background: "rgba(14,165,198,0.2)" }} />
                  <div className="absolute w-4 h-4 rounded-full blur-sm top-0 left-2"
                    style={{ background: "rgba(14,165,198,0.2)" }} />
                </div>
              </motion.div>
            )}
          </Link>
        )
      })}
    </div>
  )
}
