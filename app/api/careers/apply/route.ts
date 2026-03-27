import { Resend } from "resend";
import siteData from "@/content/site.json";

export const runtime = "nodejs";

type ApplyPayload = {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  jobTitle: string;
  jobId: string;
  coverLetter: string;
};

const MAX_CV_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_CV_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

function readTextFormField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function hasAllowedCvExtension(fileName: string) {
  const lower = fileName.toLowerCase();
  return lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return Response.json({ error: "Server is missing RESEND_API_KEY." }, { status: 500 });
  }

  const adminEmail = process.env.CONTACT_ADMIN_EMAIL ?? siteData.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "ConfideLeap <onboarding@resend.dev>";

  let payload: ApplyPayload;
  let cvFile: File | null = null;
  try {
    const formData = await request.formData();
    const cvEntry = formData.get("cv");

    payload = {
      name: readTextFormField(formData, "name"),
      email: readTextFormField(formData, "email"),
      phone: readTextFormField(formData, "phone"),
      linkedin: readTextFormField(formData, "linkedin"),
      jobTitle: readTextFormField(formData, "jobTitle"),
      jobId: readTextFormField(formData, "jobId"),
      coverLetter: readTextFormField(formData, "coverLetter"),
    };

    cvFile = cvEntry instanceof File ? cvEntry : null;
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const phone = payload.phone?.trim();
  const linkedin = payload.linkedin?.trim();
  const jobTitle = payload.jobTitle?.trim();
  const jobId = payload.jobId?.trim();
  const coverLetter = payload.coverLetter?.trim();

  if (!name || !email || !jobTitle || !coverLetter || !cvFile) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (cvFile.size > MAX_CV_SIZE_BYTES) {
    return Response.json({ error: "CV file size must be 2 MB or less." }, { status: 400 });
  }

  if (!ALLOWED_CV_MIME_TYPES.has(cvFile.type) && !hasAllowedCvExtension(cvFile.name)) {
    return Response.json({ error: "Only PDF, DOC, or DOCX CV files are allowed." }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeLinkedin = escapeHtml(linkedin || "Not provided");
  const safeJobTitle = escapeHtml(jobTitle);
  const safeJobId = escapeHtml(jobId || "Not provided");
  const safeCoverLetter = escapeHtml(coverLetter);
  const safeAddress = escapeHtml(siteData.address || "");
  const cvBytes = await cvFile.arrayBuffer();
  const cvBase64 = Buffer.from(cvBytes).toString("base64");

  const resend = new Resend(resendApiKey);

  try {
    await Promise.all([
      // Confirmation to applicant
      resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: `Application Received – ${safeJobTitle} | ConfideLeap`,
        html: `
          <div style="margin:0; padding:24px 10px; background:#f7f9fa; font-family: Arial, sans-serif; color:#12343f;">
            <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2eaee; border-radius:10px; overflow:hidden;">
              <div style="padding:16px 22px; border-bottom:1px solid #edf2f4; background:#ffffff;">
                <p style="margin:0; font-size:15px; font-weight:700; color:#0e5d74;">ConfideLeap</p>
                <p style="margin:4px 0 0; font-size:12px; color:#6a8088;">Confidence In Every Leap.</p>
              </div>

              <div style="padding:24px 22px;">
                <p style="margin:0 0 12px; font-size:15px; color:#2d4952;">Hi ${safeName},</p>
                <p style="margin:0 0 12px; font-size:15px; line-height:1.65; color:#35545d;">
                  Thank you for applying for the <strong style="color:#0e5d74;">${safeJobTitle}</strong> role at ConfideLeap.
                  We have received your application and our team will review it shortly.
                </p>
                <p style="margin:0 0 18px; font-size:15px; line-height:1.65; color:#35545d;">
                  If your profile is a good fit, we will reach out to schedule the next steps.
                  We appreciate your interest in joining us.
                </p>

                <div style="padding:12px 16px; background:#f0f9fb; border-left:3px solid #0ea5c6; border-radius:0 6px 6px 0; margin-bottom:18px;">
                  <p style="margin:0; font-size:13px; color:#12343f;"><strong>Role applied for:</strong> ${safeJobTitle}</p>
                </div>

                <p style="margin:0; font-size:14px; color:#556f77;">
                  Have questions? Email us at
                  <a href="mailto:${siteData.email}" style="color:#0ea5c6; font-weight:600; text-decoration:none;">${siteData.email}</a>
                </p>
                <p style="margin:14px 0 0; font-size:14px; color:#556f77;">Regards,<br/><strong style="color:#12343f;">ConfideLeap Team</strong></p>
              </div>

              <div style="padding:12px 22px; background:#f8fbfc; color:#6e848c; font-size:12px; line-height:1.55; border-top:1px solid #edf2f4;">
                <div>${siteData.name} • ${siteData.email}</div>
                <div>${safeAddress}</div>
              </div>
            </div>
          </div>
        `,
      }),

      // Notification to admin
      resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        replyTo: email,
        subject: `New Job Application: ${safeJobTitle} – ${safeName}`,
        attachments: [
          {
            filename: cvFile.name || `cv-${name.replaceAll(" ", "-").toLowerCase()}.pdf`,
            content: cvBase64,
          },
        ],
        html: `
          <div style="margin:0; padding:24px 10px; background:#f7f9fa; font-family: Arial, sans-serif; color:#12343f;">
            <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e2eaee; border-radius:10px; overflow:hidden;">
              <div style="padding:16px 22px; border-bottom:1px solid #edf2f4; background:#ffffff;">
                <p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; color:#557a87;">New Application</p>
                <h2 style="margin:8px 0 0; font-size:20px; line-height:1.35; color:#12343f;">${safeJobTitle}</h2>
              </div>

              <div style="padding:20px 22px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px;">
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">Name</td>
                    <td style="padding:8px 0; color:#12343f;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">Email</td>
                    <td style="padding:8px 0; color:#12343f;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">Phone</td>
                    <td style="padding:8px 0; color:#12343f;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">LinkedIn</td>
                    <td style="padding:8px 0; color:#12343f;">${safeLinkedin}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">Role</td>
                    <td style="padding:8px 0; color:#12343f;">${safeJobTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">Job ID</td>
                    <td style="padding:8px 0; color:#12343f;">${safeJobId}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:140px; color:#617b84; font-weight:700;">CV Attachment</td>
                    <td style="padding:8px 0; color:#12343f;">${escapeHtml(cvFile.name)} (${Math.max(1, Math.round(cvFile.size / 1024))} KB)</td>
                  </tr>
                </table>

                <div style="margin-top:16px; padding:13px 15px; border:1px solid #e2edf1; border-radius:8px; background:#fafcfd;">
                  <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; color:#4a707d;">Cover Letter</p>
                  <p style="margin:0; font-size:14px; line-height:1.75; color:#294148; white-space:pre-wrap;">${safeCoverLetter}</p>
                </div>
              </div>

              <div style="padding:12px 22px; background:#f8fbfc; color:#6e848c; font-size:12px; line-height:1.55; border-top:1px solid #edf2f4;">
                Reply directly to this email to contact ${safeName}.
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send your application. Please try again." },
      { status: 500 }
    );
  }
}
