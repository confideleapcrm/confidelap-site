'use client';

import { type ChangeEvent, useState } from "react";
import siteData from "../../content/site.json";
import { RippleButton } from "../../components/ui/multi-type-ripple-buttons";

const darkRippleClass = "rounded-[10px] border border-[rgba(255,255,255,0.15)] bg-transparent font-semibold leading-[1.2]";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactForm, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;

const fieldValidators: Record<keyof ContactForm, (value: string) => string> = {
  name: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Name is required.";
    if (trimmed.length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required.";
    if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address.";
    return "";
  },
  phone: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (!PHONE_REGEX.test(trimmed)) return "Enter a valid phone number.";
    return "";
  },
  subject: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Subject is required.";
    if (trimmed.length < 3) return "Subject must be at least 3 characters.";
    return "";
  },
  message: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Message is required.";
    if (trimmed.length < 20) return "Message should be at least 20 characters.";
    return "";
  },
};

function getFieldError(key: keyof ContactForm, value: string) {
  return fieldValidators[key](value);
}

function getFormErrors(values: ContactForm): ContactFormErrors {
  const nextErrors: ContactFormErrors = {};
  (Object.keys(values) as Array<keyof ContactForm>).forEach((key) => {
    const error = getFieldError(key, values[key]);
    if (error) nextErrors[key] = error;
  });
  return nextErrors;
}

function mergeFieldError(
  prev: ContactFormErrors,
  key: keyof ContactForm,
  error: string,
): ContactFormErrors {
  if (!error) {
    const { [key]: _, ...rest } = prev;
    return rest;
  }
  return { ...prev, [key]: error };
}

const socials = [
  { label: "LinkedIn",   href: "https://www.linkedin.com/company/confideleap-partners" },
  { label: "Instagram",  href: siteData.social.instagram },
  { label: "Facebook",   href: siteData.social.facebook },
  { label: "X / Twitter", href: siteData.social.twitter },
  { label: "Threads",    href: "https://www.threads.net/@confideleap.partners" },
  { label: "YouTube",    href: "https://www.youtube.com/@confideleap" },
];

const contactItems = [
  {
    label: "Office Address",
    value: siteData.address,
    href: undefined as string | undefined,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5c6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Phone Number",
    value: siteData.phone,
    href: `tel:${siteData.phone}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5c6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12 19.79 19.79 0 0 1 1 3.17 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email Address",
    value: siteData.email,
    href: `mailto:${siteData.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5c6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

  const set = (key: keyof ContactForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));

    if (formErrors[key]) {
      const nextError = getFieldError(key, value);
      setFormErrors((prev) => mergeFieldError(prev, key, nextError));
    }
  };

  const onBlurField = (key: keyof ContactForm) => () => {
    const error = getFieldError(key, form[key]);
    setFormErrors((prev) => mergeFieldError(prev, key, error));
  };

  const submitForm = async () => {
    const nextErrors = getFormErrors(form);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setErrorMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Unable to send your message right now. Please try again.");
      }

      setSubmitted(true);
  setFormErrors({});
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-dark grid-lines" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-18%", right: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.2) 0%, transparent 70%)" }} />
          <span className="anim-float-2" style={{ position: "absolute", bottom: "-22%", left: "-10%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(8,127,158,0.16) 0%, transparent 72%)" }} />
          <span className="anim-spin-slow" style={{ position: "absolute", top: "8%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(14,165,198,0.14)" }} />
          <span className="anim-spin-slow-rev" style={{ position: "absolute", top: "5%", right: "7%", width: "380px", height: "380px", borderRadius: "50%", border: "1px dashed rgba(14,165,198,0.08)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", background: "rgba(14,165,198,0.12)", border: "1px solid rgba(14,165,198,0.28)", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12abc9" }} className="ping-dot" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7dd9ee" }}>Contact Us</span>
          </div>

          <h1 className="anim-fade-up delay-100" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02, marginBottom: "22px", color: "#f0f8fa" }}>
            Seamless Communication,<br />
            <span className="shimmer-text">Global Impact.</span>
          </h1>

          <p className="anim-fade-up delay-200" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(210,235,242,0.7)", maxWidth: "520px", lineHeight: 1.8 }}>
            Reach out for a personalized strategy session, partnership inquiry,
            or any questions about our services.
          </p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "start" }}>

            {/* ── Left: Info ──────────────────────────────────────────────── */}
            <div className="reveal-left" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0ea5c6" }}>Get In Touch</span>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#0e2530", marginTop: "8px", lineHeight: 1.2 }}>
                  Let&apos;s talk about<br />your next step.
                </h2>
              </div>

              {/* Info cards */}
              {contactItems.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "16px", padding: "20px", borderRadius: "16px", background: "#ffffff", border: "1px solid rgba(18,52,63,0.08)", alignItems: "flex-start", transition: "box-shadow 0.25s ease" }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(14,165,198,0.1)", border: "1px solid rgba(14,165,198,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a9099", marginBottom: "5px" }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ color: "#0e2530", fontSize: "0.9rem", lineHeight: 1.55, fontWeight: 500, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { (e.currentTarget.style.color = "#0ea5c6"); }}
                        onMouseLeave={(e) => { (e.currentTarget.style.color = "#0e2530"); }}
                      >{item.value}</a>
                    ) : (
                      <p style={{ color: "#0e2530", fontSize: "0.9rem", lineHeight: 1.55, fontWeight: 500 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div style={{ padding: "22px", borderRadius: "16px", background: "#ffffff", border: "1px solid rgba(18,52,63,0.08)" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", marginBottom: "14px" }}>Follow Us</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {socials.map(({ href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ padding: "6px 14px", borderRadius: "100px", background: "rgba(14,165,198,0.07)", border: "1px solid rgba(14,165,198,0.18)", fontSize: "0.78rem", fontWeight: 600, color: "#2e6070", transition: "all 0.2s ease", textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget.style.background = "rgba(14,165,198,0.15)"); (e.currentTarget.style.color = "#0a7f9f"); }}
                      onMouseLeave={(e) => { (e.currentTarget.style.background = "rgba(14,165,198,0.07)"); (e.currentTarget.style.color = "#2e6070"); }}
                    >{label}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Form ─────────────────────────────────────────────── */}
            <div className="reveal-right" style={{ background: "#ffffff", borderRadius: "24px", border: "1px solid rgba(18,52,63,0.1)", padding: "40px", boxShadow: "0 4px 40px rgba(0,0,0,0.05)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "1.5rem", marginBottom: "10px", color: "#0e2530" }}>Message Sent!</h3>
                  <p style={{ color: "#567079", lineHeight: 1.7, marginBottom: "28px" }}>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="btn-outline"
                    style={{ fontSize: "0.88rem" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submitForm();
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <div style={{ marginBottom: "4px" }}>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#0e2530", marginBottom: "6px" }}>
                      Send us a message
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "#7a9099" }}>Fill up the form and we&apos;ll get back to you shortly.</p>
                  </div>

                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label htmlFor="name" className="form-label">Name *</label>
                      <input id="name" type="text" className="form-input" placeholder="John Doe" required value={form.name} onChange={set("name")} onBlur={onBlurField("name")} />
                      {formErrors.name && <p style={{ marginTop: "6px", color: "#dc2626", fontSize: "0.78rem", fontWeight: 600 }}>{formErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input id="email" type="email" className="form-input" placeholder="john@company.com" required value={form.email} onChange={set("email")} onBlur={onBlurField("email")} />
                      {formErrors.email && <p style={{ marginTop: "6px", color: "#dc2626", fontSize: "0.78rem", fontWeight: 600 }}>{formErrors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input id="phone" type="tel" className="form-input" placeholder="+91 9999 999 999" value={form.phone} onChange={set("phone")} onBlur={onBlurField("phone")} />
                    {formErrors.phone && <p style={{ marginTop: "6px", color: "#dc2626", fontSize: "0.78rem", fontWeight: 600 }}>{formErrors.phone}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input id="subject" type="text" className="form-input" placeholder="e.g. Investor Relations Inquiry" required value={form.subject} onChange={set("subject")} onBlur={onBlurField("subject")} />
                    {formErrors.subject && <p style={{ marginTop: "6px", color: "#dc2626", fontSize: "0.78rem", fontWeight: 600 }}>{formErrors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea id="message" className="form-input" placeholder="Tell us about your business and how we can help..." required rows={5} value={form.message} onChange={set("message")} onBlur={onBlurField("message")} />
                    {formErrors.message && <p style={{ marginTop: "6px", color: "#dc2626", fontSize: "0.78rem", fontWeight: 600 }}>{formErrors.message}</p>}
                  </div>

                  {errorMessage && (
                    <p style={{ margin: 0, color: "#dc2626", fontSize: "0.85rem", fontWeight: 600 }}>
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ justifyContent: "center", padding: "15px", fontSize: "0.95rem", opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Contact Strip ───────────────────────────────────────────── */}
      <section className="section-dark" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span className="anim-float" style={{ position: "absolute", top: "-60%", left: "-5%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,198,0.12) 0%, transparent 70%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", alignItems: "center" }}>
          <span className="reveal" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(200,230,240,0.7)", textAlign: "center" }}>
            Prefer to reach us directly?
          </span>
          <div className="reveal" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href={`tel:${siteData.phone}`} className="btn-primary" style={{ gap: "10px" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12 19.79 19.79 0 0 1 1 3.17 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {siteData.phone}
            </a>
            <RippleButton variant="hover" hoverRippleColor="rgba(14,165,198,0.35)" className={darkRippleClass}>
              <a href={`mailto:${siteData.email}`} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#9ee6f4", textDecoration: "none", padding: "13px 24px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                {siteData.email}
              </a>
            </RippleButton>
          </div>
        </div>
      </section>
    </>
  );
}
