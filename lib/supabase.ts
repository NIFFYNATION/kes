import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { RegistrationInput } from "./validations";

/**
 * Server-side Supabase client.
 *
 * Uses the service role key, so this module must never be imported into a
 * Client Component. It is intentionally lazy and returns `null` when env vars
 * are missing so local dev and CI builds succeed without credentials.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const REGISTRATIONS_TABLE = "registrations";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!cached) {
    cached = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

export const isSupabaseConfigured = Boolean(url && serviceKey);

export type RegistrationRow = {
  full_name: string;
  email: string;
  phone: string;
  business_name: string;
  business_stage: string;
  source: string;
};

export function toRegistrationRow(
  input: RegistrationInput,
  source = "landing-hero",
): RegistrationRow {
  return {
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    business_name: input.businessName ?? "",
    business_stage: input.businessStage ?? "",
    source,
  };
}

type SaveResult =
  | { status: "saved" }
  | { status: "duplicate" }
  | { status: "skipped" }
  | { status: "error"; message: string };

export async function saveRegistration(
  input: RegistrationInput,
): Promise<SaveResult> {
  const supabase = getSupabase();
  if (!supabase) return { status: "skipped" };

  const { error } = await supabase
    .from(REGISTRATIONS_TABLE)
    .insert(toRegistrationRow(input));

  if (error) {
    // 23505 = unique_violation (email already registered)
    if (error.code === "23505") return { status: "duplicate" };
    return { status: "error", message: error.message };
  }
  return { status: "saved" };
}
