import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { EVENT, BUSINESS_STAGES } from "./constants";
import type { RegistrationInput } from "./validations";

/**
 * Transactional email via Gmail SMTP.
 * Lazy + null-safe so the app builds and runs without credentials.
 *
 * Gmail requires an App Password (not your normal account password) and
 * 2-Step Verification must be enabled: https://myaccount.google.com/apppasswords
 */

const user = process.env.GMAIL_USER?.trim();

/** Google displays App Passwords in groups of four; the spaces are cosmetic. */
const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

/**
 * Gmail rewrites `from` to the authenticated mailbox anyway, so the address
 * is fixed to `user` and only the display name is configurable.
 */
const FROM = user ? `${EVENT.name} <${user}>` : "";

let cached: Transporter | null = null;

function getTransport(): Transporter | null {
  if (!user || !pass) return null;
  if (!cached) {
    cached = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return cached;
}

export const isMailerConfigured = Boolean(user && pass);

function stageLabel(value: string) {
  return BUSINESS_STAGES.find((s) => s.value === value)?.label ?? value;
}

function confirmationHtml(input: RegistrationInput) {
  const firstName = input.fullName.split(" ")[0];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${EVENT.name} ${EVENT.year}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0c;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#131417;border:1px solid rgba(244,240,232,0.08);border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:40px 40px 0;">
                <p style="margin:0 0 28px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#d4ac63;font-weight:600;">
                  ${EVENT.name} ${EVENT.year} · ${EVENT.theme}
                </p>
                <h1 style="margin:0 0 20px;font-size:34px;line-height:1.1;letter-spacing:-0.03em;color:#f4f0e8;font-weight:700;">
                  Your free seat is reserved.
                </h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#b3aea3;">
                  ${firstName}, thank you for registering. You're joining a room of faith-driven entrepreneurs ready to build with purpose, lead with conviction, and create something worth repeating.
                </p>
                <p style="margin:0 0 32px;font-size:16px;line-height:1.65;color:#b3aea3;">
                  Admission is free. We'll send your entry pass and full details closer to the date.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#191a1e;border:1px solid rgba(244,240,232,0.07);border-radius:16px;">
                  <tr>
                    <td style="padding:24px 24px 8px;">
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#857f75;font-weight:600;">Date</p>
                      <p style="margin:0 0 18px;font-size:15px;color:#f4f0e8;font-weight:600;">${EVENT.dates.full}</p>
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#857f75;font-weight:600;">Venue</p>
                      <p style="margin:0 0 18px;font-size:15px;color:#f4f0e8;font-weight:600;">${EVENT.venue.full}</p>
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#857f75;font-weight:600;">Registered as</p>
                      <p style="margin:0 0 24px;font-size:15px;color:#f4f0e8;font-weight:600;">${input.businessName} · ${stageLabel(input.businessStage)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 40px;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#857f75;">
                  Questions? Reply to this email or reach us at
                  <a href="mailto:${EVENT.email}" style="color:#d4ac63;text-decoration:none;">${EVENT.email}</a>.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-size:11px;color:#5a564f;">
            ${EVENT.name} ${EVENT.year} · ${EVENT.venue.cityShort}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Plain-text alternative — improves deliverability and avoids spam filters. */
function confirmationText(input: RegistrationInput) {
  const firstName = input.fullName.split(" ")[0];

  return [
    `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`,
    ``,
    `Your free seat is reserved.`,
    ``,
    `${firstName}, thank you for registering. You're joining a room of faith-driven entrepreneurs ready to build with purpose, lead with conviction, and create something worth repeating.`,
    ``,
    `Admission is free. We'll send your entry pass and full details closer to the date.`,
    ``,
    `Date:  ${EVENT.dates.full}`,
    `Venue: ${EVENT.venue.full}`,
    `Registered as: ${input.businessName} · ${stageLabel(input.businessStage)}`,
    ``,
    `Questions? Reply to this email or reach us at ${EVENT.email}.`,
  ].join("\n");
}

type EmailResult =
  | { status: "sent" }
  | { status: "skipped" }
  | { status: "error"; message: string };

export async function sendConfirmationEmail(
  input: RegistrationInput,
): Promise<EmailResult> {
  const transport = getTransport();
  if (!transport) return { status: "skipped" };

  try {
    await transport.sendMail({
      from: FROM,
      to: input.email,
      replyTo: EVENT.email,
      subject: `Your free seat is reserved — ${EVENT.name} ${EVENT.year}`,
      text: confirmationText(input),
      html: confirmationHtml(input),
    });
    return { status: "sent" };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
