import { Resend } from "resend";

import siteData from "@/content/site.json";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export const runtime = "nodejs";

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
    return Response.json(
      { error: "Server is missing RESEND_API_KEY." },
      { status: 500 }
    );
  }

  const adminEmail = process.env.CONTACT_ADMIN_EMAIL ?? siteData.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "ConfideLeap <onboarding@resend.dev>";

  if (!adminEmail) {
    return Response.json(
      { error: "Server is missing CONTACT_ADMIN_EMAIL." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const phone = payload.phone?.trim();
  const subject = payload.subject?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !subject || !message) {
    return Response.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const resend = new Resend(resendApiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const safeTagline = escapeHtml(siteData.tagline || "Confidence In Every Leap.");
  const safeAddress = escapeHtml(siteData.address || "");

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: "Thanks for contacting ConfideLeap",
        html: `
          <div style="margin:0; padding:24px 10px; background:#f7f9fa; font-family: Arial, sans-serif; color:#12343f;">
            <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2eaee; border-radius:10px; overflow:hidden;">
              <div style="padding:16px 22px; border-bottom:1px solid #edf2f4; background:#ffffff;">
                <p style="margin:0; font-size:15px; font-weight:700; color:#0e5d74;">ConfideLeap</p>
                <p style="margin:4px 0 0; font-size:12px; color:#6a8088;">${safeTagline}</p>
              </div>

              <div style="padding:22px;">
                <p style="margin:0 0 12px; font-size:15px; color:#2d4952;">Hi ${safeName},</p>
                <p style="margin:0 0 10px; font-size:15px; line-height:1.65; color:#35545d;">
                  Thank you for reaching out to us. We have received your query and assigned it to the relevant team.
                </p>
                <p style="margin:0 0 14px; font-size:15px; line-height:1.65; color:#35545d;">
                  We usually respond within one business day.
                </p>

                <div style="margin:0 0 14px; padding:11px 13px; background:#fafcfd; border:1px solid #e2edf1; border-radius:8px;">
                  <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; color:#4a707d;">Your Message</p>
                  <p style="margin:0; font-size:14px; color:#12343f;"><strong>Subject:</strong> ${safeSubject}</p>
                </div>

                <p style="margin:0 0 6px; font-size:14px; color:#556f77;">Need immediate assistance? Call us at <strong style="color:#1c6073;">${siteData.phone}</strong>.</p>
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
      resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        replyTo: email,
        subject: `New Contact Form Submission: ${safeSubject}`,
        html: `
          <div style="margin:0; padding:24px 10px; background:#f7f9fa; font-family: Arial, sans-serif; color:#12343f;">
            <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e2eaee; border-radius:10px; overflow:hidden;">
              <div style="padding:16px 22px; border-bottom:1px solid #edf2f4; background:#ffffff;">
                <p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; color:#557a87;">New Inquiry</p>
                <h2 style="margin:8px 0 0; font-size:20px; line-height:1.35; color:#12343f;">Contact Form Submission</h2>
              </div>

              <div style="padding:20px 22px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px;">
                  <tr>
                    <td style="padding:8px 0; width:130px; color:#617b84; font-weight:700;">Name</td>
                    <td style="padding:8px 0; color:#12343f;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:130px; color:#617b84; font-weight:700;">Email</td>
                    <td style="padding:8px 0; color:#12343f;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:130px; color:#617b84; font-weight:700;">Phone</td>
                    <td style="padding:8px 0; color:#12343f;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:130px; color:#617b84; font-weight:700;">Subject</td>
                    <td style="padding:8px 0; color:#12343f;">${safeSubject}</td>
                  </tr>
                </table>

                <div style="margin-top:14px; padding:11px 13px; border:1px solid #e2edf1; border-radius:8px; background:#fafcfd;">
                  <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; color:#4a707d;">Message</p>
                  <p style="margin:0; font-size:14px; line-height:1.7; color:#294148; white-space:pre-wrap;">${safeMessage}</p>
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
      { error: "Failed to send your message. Please try again." },
      { status: 500 }
    );
  }
}
