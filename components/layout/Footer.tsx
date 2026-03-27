'use client';

import React from 'react';
import Link from 'next/link';
import siteData from '../../content/site.json';

const services = siteData.nav.find((n) => n.label === 'Expertise')?.children ?? [];
const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Our Clients', href: '/clients' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const logoFallbacks = [
    siteData.logoPath,
    '/assets/logo.jpeg',
    '/assets/logo.png',
    '/assets/logo.png',
    '/assets/logo.webp',
    '/assets/logo.svg',
  ].filter((value): value is string => Boolean(value));
  const [logoIndex, setLogoIndex] = React.useState(0);

  return (
    <footer style={{ background: '#f4f9fa', borderTop: '1px solid rgba(18, 52, 63, 0.14)', marginTop: '0' }}>
      {/* CTA Band */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(18,171,201,0.14) 0%, rgba(8,127,158,0.1) 100%)',
        borderBottom: '1px solid rgba(18, 52, 63, 0.12)',
        padding: '64px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="badge" style={{ margin: '0 auto 20px' }}>Ready to grow?</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: '#163740' }}>
            Let&apos;s Build Your <span className="gradient-text">IR Strategy</span> Together
          </h2>
          <p style={{ color: '#436068', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 32px' }}>
            From investor outreach to annual reports, ConfideLeap is your all-in-one growth partner.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn-outline">View All Expertise</Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img
                src={logoFallbacks[logoIndex]}
                alt={siteData.logoAlt ?? `${siteData.name} logo`}
                style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                onError={() => {
                  setLogoIndex((prev) => {
                    if (prev < logoFallbacks.length - 1) {
                      return prev + 1;
                    }
                    return prev;
                  });
                }}
              />
            </Link>
            <p style={{ fontSize: '0.875rem', color: '#567079', lineHeight: 1.7, marginBottom: '20px' }}>
              {siteData.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: siteData.social.facebook, label: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { href: siteData.social.twitter, label: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { href: siteData.social.instagram, label: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.92)', borderRadius: '8px',
                    border: '1px solid rgba(18, 52, 63, 0.16)',
                    color: '#3f5962',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget.style.background = 'rgba(14,165,198,0.12)'); (e.currentTarget.style.color = '#0a748e'); (e.currentTarget.style.borderColor = 'rgba(14,165,198,0.4)'); }}
                  onMouseLeave={(e) => { (e.currentTarget.style.background = 'rgba(255,255,255,0.92)'); (e.currentTarget.style.color = '#3f5962'); (e.currentTarget.style.borderColor = 'rgba(18, 52, 63, 0.16)'); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#1f343b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Expertise
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: '0.875rem', color: '#58717a', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget.style.color = '#0a7893'); }}
                    onMouseLeave={(e) => { (e.currentTarget.style.color = '#58717a'); }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#1f343b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '0.875rem', color: '#58717a', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget.style.color = '#0a7893'); }}
                    onMouseLeave={(e) => { (e.currentTarget.style.color = '#58717a'); }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#1f343b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a7893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: '0.875rem', color: '#58717a', lineHeight: 1.6 }}>{siteData.address}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a7893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12 19.79 19.79 0 0 1 1 3.17 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={`tel:${siteData.phone}`} style={{ fontSize: '0.875rem', color: '#58717a', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget.style.color = '#0a7893'); }}
                  onMouseLeave={(e) => { (e.currentTarget.style.color = '#58717a'); }}
                >{siteData.phone}</a>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a7893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${siteData.email}`} style={{ fontSize: '0.875rem', color: '#58717a', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget.style.color = '#0a7893'); }}
                  onMouseLeave={(e) => { (e.currentTarget.style.color = '#58717a'); }}
                >{siteData.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(18, 52, 63, 0.14)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.8rem', color: '#607881' }}>
            © {year} ConfideLeap Partners. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#607881' }}>
            Top Investor Relations Advisory Firm in India
          </p>
        </div>
      </div>
    </footer>
  );
}
