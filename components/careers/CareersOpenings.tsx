"use client";

import { useState, useEffect, useRef } from "react";
import type { Job } from "@/lib/content";
import siteData from "@/content/site.json";

interface ApplyForm {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
}

interface CareersOpeningsProps {
  jobs: Job[];
}

const MAX_CV_SIZE_BYTES = 2 * 1024 * 1024;

export function CareersOpenings({ jobs }: CareersOpeningsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState<ApplyForm>({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (selectedJob) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedJob]);

  function openModal(job: Job) {
    setSelectedJob(job);
    setForm({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
    setCvFile(null);
    setStatus("idle");
    setErrorMsg("");
  }

  function closeModal() {
    setSelectedJob(null);
    setCvFile(null);
    setStatus("idle");
    setErrorMsg("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedJob) return;

    if (!cvFile) {
      setStatus("error");
      setErrorMsg("Please upload your CV (max 2 MB).");
      return;
    }

    if (cvFile.size > MAX_CV_SIZE_BYTES) {
      setStatus("error");
      setErrorMsg("CV file size must be 2 MB or less.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("phone", form.phone);
      payload.append("linkedin", form.linkedin);
      payload.append("coverLetter", form.coverLetter);
      payload.append("jobTitle", selectedJob.title);
      payload.append("jobId", selectedJob.id);
      payload.append("cv", cvFile);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (jobs.length === 0) {
    return (
      <section id="openings" className="section" style={{ background: "#f5f7f8" }}>
        <div className="container" style={{ textAlign: "center", padding: "60px 24px" }}>
          <p style={{ fontSize: "1rem", color: "#567079" }}>No open positions at the moment. Check back soon!</p>
          <p style={{ fontSize: "0.9rem", color: "#7a9099", marginTop: "8px" }}>
            Or send an open application to{" "}
            <a href={`mailto:${siteData.email}`} style={{ color: "#0ea5c6", fontWeight: 600, textDecoration: "none" }}>
              {siteData.email}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── Current Openings ─────────────────────────────────────────────── */}
      <section id="openings" className="section" style={{ background: "#f5f7f8" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#567079" }}>Current Jobs</span>
            <span style={{ flex: 1, height: "1px", background: "rgba(18,52,63,0.12)" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#7a9099" }}>{jobs.length} open role{jobs.length !== 1 ? "s" : ""}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {jobs.map((job, i) => (
              <article key={job.id} className="svc-row reveal">
                {/* Left accent strip */}
                <div className="svc-row-accent" style={{ background: `linear-gradient(180deg, ${job.color.hex} 0%, transparent 100%)` }} />

                {/* Watermark number */}
                <div aria-hidden style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(5rem, 9vw, 8rem)", color: `rgba(${job.color.rgb}, 0.06)`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div style={{ padding: "36px 40px 36px 48px", position: "relative", zIndex: 1 }}>
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "18px", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", letterSpacing: "-0.02em", color: "#0e2530", marginBottom: "10px" }}>
                        {job.title}
                      </h3>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ padding: "4px 12px", borderRadius: "100px", background: `rgba(${job.color.rgb},0.1)`, border: `1px solid rgba(${job.color.rgb},0.25)`, fontSize: "0.75rem", fontWeight: 700, color: job.color.hex }}>
                          {job.type}
                        </span>
                        <span style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(18,52,63,0.06)", border: "1px solid rgba(18,52,63,0.12)", fontSize: "0.75rem", fontWeight: 600, color: "#3e5963", display: "flex", alignItems: "center", gap: "4px" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {job.location}
                        </span>
                        <span style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(18,52,63,0.06)", border: "1px solid rgba(18,52,63,0.12)", fontSize: "0.75rem", fontWeight: 600, color: "#3e5963" }}>
                          {job.exp} exp.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div style={{ marginBottom: "28px" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099", marginBottom: "12px" }}>Requirements</p>
                    <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "8px" }}>
                      {job.requirements.map((req) => (
                        <li key={req} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: `rgba(${job.color.rgb},0.12)`, border: `1px solid rgba(${job.color.rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke={job.color.hex} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span style={{ fontSize: "0.875rem", color: "#3e5963", lineHeight: 1.55 }}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer row */}
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", paddingTop: "24px", borderTop: "1px solid rgba(18,52,63,0.08)" }}>
                    <button
                      type="button"
                      onClick={() => openModal(job)}
                      className="btn-primary"
                      style={{ background: `linear-gradient(135deg, ${job.color.hex} 0%, ${job.color.dark} 100%)`, boxShadow: `0 6px 20px rgba(${job.color.rgb},0.28)`, padding: "11px 24px", fontSize: "0.9rem", border: "none", cursor: "pointer" }}
                    >
                      Apply Now
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                    <p style={{ fontSize: "0.82rem", color: "#7a9099" }}>
                      Or email your CV to{" "}
                      <a href={`mailto:${siteData.email}?subject=Application – ${job.title}`} style={{ color: job.color.hex, fontWeight: 600, textDecoration: "none" }}>
                        {siteData.email}
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply Modal ───────────────────────────────────────────────────── */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Apply for ${selectedJob.title}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5, 19, 25, 0.78)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div
            ref={modalRef}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "640px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              overflow: "hidden",
              margin: "auto",
            }}
          >
            {/* Modal header */}
            <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #edf2f4", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: selectedJob.color.hex, marginBottom: "4px" }}>
                  Apply Now
                </p>
                <h2 style={{ margin: 0, fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "1.25rem", color: "#0e2530", letterSpacing: "-0.02em" }}>
                  {selectedJob.title}
                </h2>
                <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "100px", background: `rgba(${selectedJob.color.rgb},0.1)`, fontSize: "0.72rem", fontWeight: 700, color: selectedJob.color.hex }}>
                    {selectedJob.type}
                  </span>
                  <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(18,52,63,0.06)", fontSize: "0.72rem", fontWeight: 600, color: "#3e5963" }}>
                    {selectedJob.location}
                  </span>
                  <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(18,52,63,0.06)", fontSize: "0.72rem", fontWeight: 600, color: "#3e5963" }}>
                    {selectedJob.exp} exp.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                style={{ background: "rgba(18,52,63,0.07)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3e5963" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Job description */}
            <div style={{ padding: "18px 24px", background: "#f8fbfc", borderBottom: "1px solid #edf2f4" }}>
              <p style={{ margin: "0 0 14px", fontSize: "0.875rem", color: "#4a6370", lineHeight: 1.75 }}>
                {selectedJob.description}
              </p>
              <p style={{ margin: "0 0 8px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a9099" }}>
                Requirements
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                {selectedJob.requirements.map((req) => (
                  <li key={req} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: `rgba(${selectedJob.color.rgb},0.12)`, border: `1px solid rgba(${selectedJob.color.rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke={selectedJob.color.hex} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#3e5963", lineHeight: 1.55 }}>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal body */}
            <div style={{ padding: "24px" }}>
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `rgba(${selectedJob.color.rgb},0.12)`, border: `1px solid rgba(${selectedJob.color.rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedJob.color.hex} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#0e2530", marginBottom: "8px" }}>Application Submitted!</h3>
                  <p style={{ color: "#567079", lineHeight: 1.65, fontSize: "0.9rem", marginBottom: "20px" }}>
                    Thanks for applying! We&apos;ve sent a confirmation to <strong>{form.email}</strong> and our team will be in touch if your profile is a good fit.
                  </p>
                  <button type="button" onClick={closeModal} style={{ padding: "10px 24px", borderRadius: "8px", background: selectedJob.color.hex, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#3e5963", marginBottom: "6px" }}>
                        Full Name <span style={{ color: "#e05" }}>*</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Priya Sharma"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#3e5963", marginBottom: "6px" }}>
                        Email <span style={{ color: "#e05" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="priya@company.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#3e5963", marginBottom: "6px" }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#3e5963", marginBottom: "6px" }}>
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={form.linkedin}
                        onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                        placeholder="linkedin.com/in/priya"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#3e5963", marginBottom: "6px" }}>
                      Cover Letter <span style={{ color: "#e05" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.coverLetter}
                      onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
                      placeholder="Tell us why you're a great fit for this role..."
                      style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#3e5963", marginBottom: "6px" }}>
                      Upload CV <span style={{ color: "#e05" }}>*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setCvFile(file);
                        if (file && file.size > MAX_CV_SIZE_BYTES) {
                          setStatus("error");
                          setErrorMsg("CV file size must be 2 MB or less.");
                        } else if (status === "error" && errorMsg.includes("CV")) {
                          setStatus("idle");
                          setErrorMsg("");
                        }
                      }}
                      style={{
                        ...inputStyle,
                        padding: "8px 10px",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    />
                    <p style={{ margin: "6px 0 0", fontSize: "0.72rem", color: "#7a9099" }}>
                      Accepted: PDF, DOC, DOCX. Max file size: 2 MB.
                    </p>
                  </div>

                  {status === "error" && (
                    <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#fff5f5", border: "1px solid #fca5a5", marginBottom: "14px" }}>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#b91c1c" }}>{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "10px",
                      background: status === "loading" ? "#aaa" : `linear-gradient(135deg, ${selectedJob.color.hex} 0%, ${selectedJob.color.dark} 100%)`,
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      letterSpacing: "0.01em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit Application
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "8px",
  border: "1px solid #d4e0e5",
  background: "#fafcfd",
  fontSize: "0.875rem",
  color: "#12343f",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
