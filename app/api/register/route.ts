import { NextResponse } from "next/server";
import {
  registrationSchema,
  flattenFieldErrors,
  type FieldErrors,
} from "@/lib/validations";
import { saveRegistration } from "@/lib/supabase";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/mailer";

/** Registrations are user submissions — never cache this route. */
export const dynamic = "force-dynamic";

type ApiResponse = {
  ok: boolean;
  message: string;
  errors?: FieldErrors;
};

/** Very small in-memory throttle (best-effort; resets on cold start). */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "Too many attempts. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "Invalid request format." },
      { status: 400 },
    );
  }

  const parsed = registrationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: flattenFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped — accept silently so bots don't learn anything.
  if (data.website) {
    return NextResponse.json<ApiResponse>({
      ok: true,
      message: "Your seat is reserved.",
    });
  }

  const saved = await saveRegistration(data);

  if (saved.status === "duplicate") {
    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        message: "This email is already registered. Check your inbox.",
        errors: { email: "This email is already registered." },
      },
      { status: 409 },
    );
  }

  if (saved.status === "error") {
    console.error("[register] supabase:", saved.message);
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "We couldn't save your registration. Try again." },
      { status: 500 },
    );
  }

  if (saved.status === "skipped") {
    console.warn(
      "[register] Supabase not configured — registration not persisted.",
    );
  }

  // Emails must never block a successful registration. Send the registrant's
  // confirmation and the host's alert concurrently.
  const [email, adminAlert] = await Promise.all([
    sendConfirmationEmail(data),
    sendAdminNotification(data),
  ]);
  if (email.status === "error") {
    console.error("[register] mailer:", email.message);
  }
  if (email.status === "skipped") {
    console.warn(
      "[register] Gmail not configured — confirmation email not sent.",
    );
  }
  if (adminAlert.status === "error") {
    console.error("[register] admin notification:", adminAlert.message);
  }
  if (adminAlert.status === "skipped") {
    console.warn(
      "[register] Gmail not configured — admin notification not sent.",
    );
  }

  return NextResponse.json<ApiResponse>({
    ok: true,
    message: "Your seat is reserved. Check your inbox for confirmation.",

  });
}
