import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GetStartedButtonProps {
  label?: string
  href?: string
  className?: string
}

export function GetStartedButton({ label = "Talk to an Expert", href, className }: Readonly<GetStartedButtonProps>) {
  const inner = (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-11 min-w-[220px] px-6 pr-14 text-[0.95rem]",
        // base: brand teal outline
        "bg-white text-[var(--accent-secondary)] border border-[rgba(14,165,198,0.38)] shadow-[0_6px_14px_rgba(8,86,108,0.2)]",
        // hover: brand teal fill
        "hover:bg-[var(--accent-secondary)] hover:text-white hover:border-[rgba(8,107,136,0.66)]",
        className,
      )}
    >
      <span className="pr-6 transition-opacity duration-500 group-hover:opacity-0">
        {label}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-10 place-items-center transition-all duration-500 bg-[rgba(14,165,198,0.14)] text-[var(--accent-secondary)] group-hover:bg-[rgba(255,255,255,0.2)] group-hover:text-white group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </button>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    )
  }

  return inner
}
