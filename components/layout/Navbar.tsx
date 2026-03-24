'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import siteData from '../../content/site.json';
import { GetStartedButton } from '../ui/get-started-button';


type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems = siteData.nav as NavItem[];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const logoFallbacks = [
    '/assets/logo-removebg-preview.png',
    siteData.logoPath,
    '/assets/logo.jpg',
  ].filter((value): value is string => Boolean(value));
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (mobileOpen || servicesOpen) {
        setShowNavbar(true);
        lastScrollY.current = currentY;
        return;
      }
      if (currentY <= 10) setShowNavbar(true);
      else if (currentY > lastScrollY.current + 4) { setShowNavbar(false); setServicesOpen(false); }
      else if (currentY < lastScrollY.current - 4) setShowNavbar(true);
      lastScrollY.current = currentY;
    };
    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [mobileOpen, servicesOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 14px',
    borderRadius: '999px',
    fontSize: '0.82rem',
    fontWeight: active ? 600 : 500,
    color: active ? '#0ea5c6' : '#334a52',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease',
    letterSpacing: '0.01em',
  });

  return (
    <header
      style={{
        position: 'fixed',
        top: '10px',
        left: '16px',
        right: '16px',
        zIndex: 1000,
        transition: 'transform 0.28s ease, opacity 0.22s ease, box-shadow 0.3s ease',
        transform: showNavbar ? 'translateY(0)' : 'translateY(-140%)',
        opacity: showNavbar ? 1 : 0,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid rgba(18,52,63,${scrolled ? '0.15' : '0.1'})`,
        borderRadius: '999px',
        boxShadow: scrolled ? '0 10px 28px rgba(17,57,68,0.09)' : '0 4px 16px rgba(17,57,68,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src={logoFallbacks[logoIndex]}
            alt={siteData.logoAlt ?? `${siteData.name} logo`}
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            onError={() => setLogoIndex((p) => Math.min(p + 1, logoFallbacks.length - 1))}
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '4px',
            background: 'rgba(244,250,252,0.9)',
            border: '1px solid rgba(18,52,63,0.1)',
            borderRadius: '999px',
          }}
          className="navbar-desktop"
        >
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} style={{ position: 'relative' }}>
                <button
                  onClick={() => setServicesOpen((p) => !p)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  style={navLinkStyle(isActive(item.href))}
                >
                  {/* Tube-light indicator — contained inside the pill */}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="tube-lamp"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: 'rgba(14,165,198,0.1)',
                        zIndex: 0,
                      }}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                    >
                      {/* Glow strip at BOTTOM (inside bounds) */}
                      <span style={{
                        position: 'absolute',
                        bottom: 2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '32px',
                        height: '3px',
                        borderRadius: '999px',
                        background: '#0ea5c6',
                        boxShadow: '0 0 10px 3px rgba(14,165,198,0.5)',
                      }} />
                    </motion.span>
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                  <ChevronDown
                    size={13}
                    strokeWidth={2.5}
                    style={{
                      position: 'relative', zIndex: 1,
                      transition: 'transform 0.2s',
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(14px)',
                        border: '1px solid rgba(18,52,63,0.12)',
                        borderRadius: '16px',
                        padding: '8px',
                        minWidth: '240px',
                        boxShadow: '0 16px 36px rgba(17,57,68,0.12)',
                        zIndex: 100,
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setServicesOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center',
                            padding: '10px 14px',
                            fontSize: '0.875rem', fontWeight: 500,
                            color: isActive(child.href) ? '#0ea5c6' : '#335058',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,165,198,0.08)'; e.currentTarget.style.color = '#0ea5c6'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isActive(child.href) ? '#0ea5c6' : '#335058'; }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                style={navLinkStyle(isActive(item.href))}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="tube-lamp"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '999px',
                      background: 'rgba(14,165,198,0.1)',
                      zIndex: 0,
                    }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  >
                    <span style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      height: '3px',
                      borderRadius: '999px',
                      background: '#0ea5c6',
                      boxShadow: '0 0 10px 3px rgba(14,165,198,0.5)',
                    }} />
                  </motion.span>
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
              </Link>
            )
          )}
        </nav>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <GetStartedButton href="/contact" label="Talk to an Expert" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'white',
              border: '1px solid rgba(18,52,63,0.18)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: '#21353c',
            }}
            className="navbar-hamburger"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M4 4l12 12M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <rect x="2" y="5" width="16" height="1.5" rx="0.75" fill="currentColor" />
                  <rect x="2" y="9.25" width="16" height="1.5" rx="0.75" fill="currentColor" />
                  <rect x="2" y="13.5" width="16" height="1.5" rx="0.75" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(18,52,63,0.1)',
              borderRadius: '0 0 24px 24px',
            }}
          >
            <div style={{ padding: '12px 24px 20px' }}>
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '12px 0',
                      fontSize: '0.95rem', fontWeight: 600,
                      color: isActive(item.href) ? '#0ea5c6' : '#22393f',
                      borderBottom: '1px solid rgba(18,52,63,0.08)',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div style={{ paddingLeft: '16px' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'block', padding: '10px 0',
                            fontSize: '0.875rem', fontWeight: 500,
                            color: isActive(child.href) ? '#0ea5c6' : '#4d666f',
                            borderBottom: '1px solid rgba(18,52,63,0.06)',
                            textDecoration: 'none',
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
