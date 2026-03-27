"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "./ui/testimonials-columns-1";

const fallbackTestimonials: Testimonial[] = [
  {
    text: "ConfideLeap transformed how we communicate with investors. Their strategic messaging brought clarity and confidence to our stakeholders.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Priya Sharma",
    role: "CFO, PharmaCorp Ltd",
  },
  {
    text: "Their public relations advisory helped us achieve media coverage we never thought possible. A truly exceptional team.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Arjun Mehta",
    role: "CEO, GreenEnergy Solutions",
  },
  {
    text: "The annual report they crafted for us was not just a document — it was a powerful narrative that resonated with every reader.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    name: "Nisha Patel",
    role: "Head of Communications, InfraGroup",
  },
  {
    text: "Digital marketing advisory from ConfideLeap gave us measurable ROI from day one. Their insight into investor audiences is unmatched.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Rohit Jain",
    role: "Marketing Director, FinTech Ventures",
  },
  {
    text: "The podcast series they produced elevated our brand voice significantly in the financial community.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    name: "Simran Kaur",
    role: "Investor Relations Manager, Aquaculture Inc",
  },
  {
    text: "Working with ConfideLeap was seamless from onboarding to execution. Their dedication to our success sets them apart.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Vikram Desai",
    role: "MD, Manufacturing Exports Ltd",
  },
  {
    text: "They understood our complex sector immediately and delivered IR communication that truly spoke to our investors.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    name: "Meera Nair",
    role: "VP Strategy, Chemicals Group",
  },
  {
    text: "ConfideLeap's team brought professionalism and creativity to every deliverable. Our public image has never been stronger.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
    name: "Karan Malhotra",
    role: "COO, FMCG Brands India",
  },
  {
    text: "Their holistic approach — covering IR, PR and digital — meant we had one trusted partner for all our communications needs.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    name: "Anjali Rao",
    role: "Director, Renewable Energy Corp",
  },
];

interface TestimonialsProps {
  readonly testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: Readonly<TestimonialsProps>) {
  const data = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  const third = Math.ceil(data.length / 3);
  const firstColumn = data.slice(0, third);
  const secondColumn = data.slice(third, third * 2);
  const thirdColumn = data.slice(third * 2);

  const [isHovered, setIsHovered] = useState(false);
  const [wheelDelta, setWheelDelta] = useState(0);
  const columnsRef = useRef<HTMLDivElement>(null);

  // Scrollbar constants
  const TRACK_H = 680;
  const THUMB_H = 80;
  const THUMB_TRAVEL = TRACK_H - THUMB_H;
  const SCROLL_RANGE = 600;

  const thumbTop = ((((wheelDelta * 0.6) % SCROLL_RANGE) + SCROLL_RANGE) % SCROLL_RANGE) / SCROLL_RANGE * THUMB_TRAVEL;

  const isDraggingBar = useRef(false);
  const dragStartY = useRef(0);
  const dragStartDelta = useRef(0);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingBar.current = true;
    dragStartY.current = e.clientY;
    dragStartDelta.current = wheelDelta;
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientY - rect.top - THUMB_H / 2) / THUMB_TRAVEL));
    setWheelDelta((pct * SCROLL_RANGE) / 0.6);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDraggingBar.current) return;
      const dy = e.clientY - dragStartY.current;
      const pct = dy / THUMB_TRAVEL;
      setWheelDelta(dragStartDelta.current + (pct * SCROLL_RANGE) / 0.6);
    };
    const onUp = () => { isDraggingBar.current = false; };
    globalThis.addEventListener("mousemove", onMove);
    globalThis.addEventListener("mouseup", onUp);
    return () => {
      globalThis.removeEventListener("mousemove", onMove);
      globalThis.removeEventListener("mouseup", onUp);
    };
  }, [THUMB_TRAVEL, SCROLL_RANGE]);

  // Attach all pointer + wheel listeners imperatively to avoid JSX handler lint warnings
  useEffect(() => {
    const el = columnsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setWheelDelta((prev) => prev + e.deltaY);
    };
    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section style={{ background: "#051319", padding: "80px 0", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "540px", margin: "0 auto 48px" }}
        >
          <span style={{
            border: "1px solid rgba(14,165,198,0.3)",
            color: "#0ea5c6",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}>
            Testimonials
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}>
            What our clients say
          </h2>
          <p style={{ color: "#a8c5d1", textAlign: "center", lineHeight: 1.7, fontSize: "0.97rem" }}>
            Trusted by companies across industries to deliver strategic communications.
          </p>
        </motion.div>

        {/* Columns + Scrollbar */}
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", justifyContent: "center" }}>
          <section
            ref={columnsRef}
            aria-label="Testimonials"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              maxHeight: "680px",
              overflow: "hidden",
              maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
              cursor: isHovered ? "grab" : "default",
            }}
          >
            <TestimonialsColumn
              testimonials={firstColumn}
              duration={15}
              paused={isHovered}
              wheelDelta={wheelDelta}
            />
            <TestimonialsColumn
              testimonials={secondColumn}
              duration={19}
              paused={isHovered}
              wheelDelta={wheelDelta}
              className="hidden-mobile"
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              duration={17}
              paused={isHovered}
              wheelDelta={wheelDelta}
              className="hidden-tablet"
            />
          </section>

          {/* Visible Scrollbar */}
          <div
            role="scrollbar"
            aria-controls="testimonials-columns"
            aria-valuenow={Math.round((thumbTop / THUMB_TRAVEL) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onClick={handleTrackClick}
            onMouseDown={handleThumbMouseDown}
            onKeyDown={(e) => {
              const step = SCROLL_RANGE / 10;
              if (e.key === "ArrowDown") setWheelDelta((p) => p + step / 0.6);
              if (e.key === "ArrowUp") setWheelDelta((p) => p - step / 0.6);
            }}
            style={{
              width: "6px",
              height: `${TRACK_H}px`,
              background: "rgba(14,165,198,0.12)",
              borderRadius: "3px",
              position: "relative",
              cursor: "pointer",
              flexShrink: 0,
              border: "1px solid rgba(14,165,198,0.2)",
              outline: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "6px",
                height: `${THUMB_H}px`,
                top: `${thumbTop}px`,
                background: "linear-gradient(180deg, #0ea5c6, #0d6779)",
                borderRadius: "3px",
                cursor: "grab",
                boxShadow: "0 0 8px rgba(14,165,198,0.5)",
                transition: isDraggingBar.current ? "none" : "top 0.1s linear",
              }}
            />
          </div>
        </div>

        <style>{`
          .hidden-mobile { display: none; }
          .hidden-tablet { display: none; }
          @media (min-width: 768px) { .hidden-mobile { display: block; } }
          @media (min-width: 1024px) { .hidden-tablet { display: block; } }
        `}</style>
      </div>
    </section>
  );
}
