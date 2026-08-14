import { z } from "zod";
import {
  BUSINESS_STAGES,
  DESIGNATIONS,
  TSHIRT_COLORS,
  TSHIRT_SIZES,
  YES_NO_OPTIONS,
} from "./constants";

const stageValues = BUSINESS_STAGES.map((s) => s.value) as [
  string,
  ...string[],
];
const designationValues = DESIGNATIONS.map((item) => item.value) as [
  string,
  ...string[],
];
const yesNoValues = YES_NO_OPTIONS.map((item) => item.value) as [
  string,
  ...string[],
];
const tshirtColorValues = TSHIRT_COLORS.map((item) => item.value) as [
  string,
  ...string[],
];
const tshirtSizeValues = TSHIRT_SIZES.map((item) => item.value) as [
  string,
  ...string[],
];

const registrationBaseSchema = z.object({
  designation: z.enum(designationValues, {
    message: "Please select your designation.",
  }),
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
    .max(100, "That business name is a little too long.")
    .optional()
    .or(z.literal("")),
  businessStage: z
    .enum(stageValues, {
      message: "Please select your business stage.",
    })
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .trim()
    .min(2, "Please tell us where you're coming from.")
    .max(120, "That's a little too long."),
  hopeToLearn: z
    .string()
    .trim()
    .min(3, "Please share what you hope to learn.")
    .max(500, "Please keep this under 500 characters."),
  attendedKesBefore: z.enum(yesNoValues, {
    message: "Please tell us if you have attended KES before.",
  }),
  financialSupportInterest: z.enum(yesNoValues, {
    message: "Please select yes or no.",
  }),
  tshirtInterest: z.enum(yesNoValues, {
    message: "Please select yes or no.",
  }),
  tshirtColor: z.enum(tshirtColorValues).or(z.literal("")).default(""),
  tshirtSize: z.enum(tshirtSizeValues).or(z.literal("")).default(""),
  /** Honeypot — must stay empty. Bots fill it in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export const registrationSchema = registrationBaseSchema
  .superRefine((data, context) => {
    if (data.tshirtInterest !== "yes") return;

    if (!data.tshirtColor) {
      context.addIssue({
        code: "custom",
        path: ["tshirtColor"],
        message: "Please select your preferred T-shirt colour.",
      });
    }

    if (!data.tshirtSize) {
      context.addIssue({
        code: "custom",
        path: ["tshirtSize"],
        message: "Please select your T-shirt size.",
      });
    }
  })
  .transform((data) => ({
    ...data,
    tshirtColor: data.tshirtInterest === "yes" ? data.tshirtColor : "",
    tshirtSize: data.tshirtInterest === "yes" ? data.tshirtSize : "",
  }));

export const registrationStepOneSchema = registrationBaseSchema.pick({
  designation: true,
  fullName: true,
  email: true,
  phone: true,
  location: true,
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
