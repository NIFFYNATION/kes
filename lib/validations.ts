import { z } from "zod";
import { BUSINESS_STAGES } from "./constants";

const stageValues = BUSINESS_STAGES.map((s) => s.value) as [
  string,
  ...string[],
];

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is a little too long.")
    .regex(
      /^[\p{L}\p{M}'’.\- ]+$/u,
      "Names can only contain letters, spaces, hyphens and apostrophes.",
    ),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number.")
    .regex(/^[+\d][\d\s()\-]{6,19}$/, "Please enter a valid phone number."),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name.")
    .max(100, "That business name is a little too long."),
  businessStage: z.enum(stageValues, {
    message: "Please select your business stage.",
  }),
  /** Honeypot — must stay empty. Bots fill it in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

/** Field-level errors keyed by field name, for inline form display. */
export type FieldErrors = Partial<
  Record<keyof RegistrationInput | "form", string>
>;

export function flattenFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof RegistrationInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
