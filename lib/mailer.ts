import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import path from "node:path";
import { EVENT, BUSINESS_STAGES, DESIGNATIONS } from "./constants";
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
 * Where new-registration alerts go (the event host/admin). Falls back to the
 * sending mailbox so the host is notified even if ADMIN_EMAIL isn't set.
 */
const adminEmail = process.env.ADMIN_EMAIL?.trim() || user;

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

function designationLabel(value: string) {
  return DESIGNATIONS.find((item) => item.value === value)?.label ?? value;
}

function yesNoLabel(value: string) {
  return value === "yes" ? "Yes" : "No";
}

function registrantName(input: RegistrationInput) {
  return `${designationLabel(input.designation)} ${input.fullName}`;
}

/** Combines the optional business name and stage into a single line, or "". */
function businessSummary(input: RegistrationInput) {
  return [input.businessName, input.businessStage ? stageLabel(input.businessStage) : ""]
    .filter(Boolean)
    .join(" · ");
}

/**
 * The KES logo is embedded inline via a CID attachment (referenced as
 * `cid:kes-logo` in the HTML). This renders reliably across mail clients that
 * block remote images, unlike a hosted <img src> URL.
 */
const LOGO_CID = "kes-logo";
const LOGO_PATH = path.join(process.cwd(), "public", "kes-logo-2026.png");

const logoAttachment = {
  filename: "kes-logo-2026.png",
  path: LOGO_PATH,
  cid: LOGO_CID,
};

/** Inline logo header shared by every email. */
function logoHeader() {
  return `
                <img src="cid:${LOGO_CID}" alt="${EVENT.name}" height="54" style="display:block;height:54px;width:auto;margin:0 0 28px;" />`;
}

/** Renders a labelled detail row only when the value is present. */
function detailRow(label: string, value?: string) {
  if (!value) return "";
  return `
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#857f75;font-weight:600;">${label}</p>
                      <p style="margin:0 0 18px;font-size:15px;color:#f4f0e8;font-weight:600;">${value}</p>`;
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
              <td style="padding:40px 40px 0;">${logoHeader()}
                <p style="margin:0 0 28px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#d4ac63;font-weight:600;">
                  ${EVENT.name} ${EVENT.year} · ${EVENT.theme}
                </p>
                <h1 style="margin:0 0 20px;font-size:34px;line-height:1.1;letter-spacing:-0.03em;color:#f4f0e8;font-weight:700;">
                  Your free seat is reserved.
                </h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#b3aea3;">
                  ${designationLabel(input.designation)} ${firstName}, thank you for registering. You're joining a room of faith-driven entrepreneurs ready to build with purpose, lead with conviction, and create something worth repeating.
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
                    <td style="padding:24px 24px 8px;">${detailRow("Date", EVENT.dates.full)}${detailRow("Venue", EVENT.venue.full)}${detailRow("Business", businessSummary(input))}${input.tshirtInterest === "yes" ? detailRow("KES customised T-shirt", "Interested · ₦7,500") : ""}
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
    `${designationLabel(input.designation)} ${firstName}, thank you for registering. You're joining a room of faith-driven entrepreneurs ready to build with purpose, lead with conviction, and create something worth repeating.`,
    ``,
    `Admission is free. We'll send your entry pass and full details closer to the date.`,
    ``,
    `Date:  ${EVENT.dates.full}`,
    `Venue: ${EVENT.venue.full}`,
    businessSummary(input) ? `Business: ${businessSummary(input)}` : "",
    input.tshirtInterest === "yes" ? `KES T-shirt: Interested (₦7,500)` : "",
    ``,
    `Questions? Reply to this email or reach us at ${EVENT.email}.`,
  ]
    .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
    .join("\n");
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
      attachments: [logoAttachment],
    });
    return { status: "sent" };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}

/* ------------------------ Admin / host notification ----------------------- */

function adminNotificationHtml(input: RegistrationInput) {
  const rows: [string, string][] = [
    ["Full name", registrantName(input)],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Coming from", input.location],
    ["Business", input.businessName ?? ""],
    ["Stage", input.businessStage ? stageLabel(input.businessStage) : ""],
    ["Hoping to learn", input.hopeToLearn],
    ["Attended KES before", yesNoLabel(input.attendedKesBefore)],
    ["Financial support", yesNoLabel(input.financialSupportInterest)],
    ["KES T-shirt · ₦7,500", yesNoLabel(input.tshirtInterest)],
  ];

  const cells = rows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) => `
                  <tr>
                    <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#857f75;font-weight:600;width:120px;vertical-align:top;">${label}</td>
                    <td style="padding:10px 0;font-size:15px;color:#f4f0e8;font-weight:600;">${value}</td>
                  </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New registration — ${EVENT.name} ${EVENT.year}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0c;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#131417;border:1px solid rgba(244,240,232,0.08);border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:40px 40px 0;">${logoHeader()}
                <p style="margin:0 0 20px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#d4ac63;font-weight:600;">
                  ${EVENT.name} ${EVENT.year} · New registration
                </p>
                <h1 style="margin:0 0 24px;font-size:28px;line-height:1.15;letter-spacing:-0.03em;color:#f4f0e8;font-weight:700;">
                  ${registrantName(input)} just reserved a seat.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#191a1e;border:1px solid rgba(244,240,232,0.07);border-radius:16px;">
                  <tr><td style="padding:8px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}
                    </table>
                  </td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 40px;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#857f75;">
                  Reply to reach ${input.fullName.split(" ")[0]} at
                  <a href="mailto:${input.email}" style="color:#d4ac63;text-decoration:none;">${input.email}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function adminNotificationText(input: RegistrationInput) {
  return [
    `New registration — ${EVENT.name} ${EVENT.year}`,
    ``,
    `Full name:   ${registrantName(input)}`,
    `Email:       ${input.email}`,
    `Phone:       ${input.phone}`,
    `Coming from: ${input.location}`,
    input.businessName ? `Business:    ${input.businessName}` : "",
    input.businessStage ? `Stage:       ${stageLabel(input.businessStage)}` : "",
    `Attended KES before: ${yesNoLabel(input.attendedKesBefore)}`,
    `Financial support interest: ${yesNoLabel(input.financialSupportInterest)}`,
    `KES T-shirt interest (₦7,500): ${yesNoLabel(input.tshirtInterest)}`,
    ``,
    `Hoping to learn:`,
    input.hopeToLearn,
  ]
    .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
    .join("\n");
}

/**
 * Alerts the event host that someone registered. Uses the registrant's email
 * as reply-to so the host can respond directly from their inbox.
 */
export async function sendAdminNotification(
  input: RegistrationInput,
): Promise<EmailResult> {
  const transport = getTransport();
  if (!transport || !adminEmail) return { status: "skipped" };

  try {
    await transport.sendMail({
      from: FROM,
      to: adminEmail,
      replyTo: input.email,
      subject: `New registration: ${registrantName(input)} — ${EVENT.name} ${EVENT.year}`,
      text: adminNotificationText(input),
      html: adminNotificationHtml(input),
      attachments: [logoAttachment],
    });
    return { status: "sent" };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
