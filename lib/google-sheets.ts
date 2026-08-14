import "server-only";

import type { RegistrationInput } from "./validations";

const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();
const secret = process.env.GOOGLE_SHEETS_SECRET?.trim();

type SaveResult =
  | { status: "saved" }
  | { status: "duplicate" }
  | { status: "skipped" }
  | { status: "error"; message: string };

type SheetsResponse = {
  ok?: boolean;
  code?: string;
  message?: string;
};

function getEndpoint(): URL | null {
  if (!webAppUrl || !secret) return null;

  try {
    const url = new URL(webAppUrl);
    const isAppsScriptEndpoint =
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname);

    return isAppsScriptEndpoint ? url : null;
  } catch {
    return null;
  }
}

/**
 * Sends a validated registration to the private Google Apps Script web app.
 * The shared secret stays on the server and is never sent to the browser.
 */
export async function saveRegistration(
  input: RegistrationInput,
): Promise<SaveResult> {
  const endpoint = getEndpoint();
  if (!endpoint || !secret) return { status: "skipped" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: secret,
        registration: {
          designation: input.designation,
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          location: input.location,
          businessName: input.businessName ?? "",
          businessStage: input.businessStage ?? "",
          hopeToLearn: input.hopeToLearn,
          attendedKesBefore: input.attendedKesBefore,
          financialSupportInterest: input.financialSupportInterest,
          tshirtInterest: input.tshirtInterest,
          tshirtColor: input.tshirtColor,
          tshirtSize: input.tshirtSize,
          source: "kes-2026-website",
        },
      }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `Google Sheets returned HTTP ${response.status}.`,
      };
    }

    const result = (await response.json()) as SheetsResponse;
    if (result.ok) return { status: "saved" };
    if (result.code === "duplicate") return { status: "duplicate" };

    return {
      status: "error",
      message: result.message || "Google Sheets rejected the registration.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Could not reach the Google Sheets web app.",
    };
  }
}
