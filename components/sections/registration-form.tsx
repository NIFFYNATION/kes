"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Field,
  RadioField,
  SelectField,
  TextareaField,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  BUSINESS_STAGES,
  DESIGNATIONS,
  EVENT,
  YES_NO_OPTIONS,
} from "@/lib/constants";
import {
  flattenFieldErrors,
  registrationSchema,
  registrationStepOneSchema,
  type FieldErrors,
} from "@/lib/validations";

type Status = "idle" | "submitting" | "success";

type RegistrationResponse = {
  message?: string;
  errors?: FieldErrors;
  redirectUrl?: string;
};

const EMPTY = {
  designation: "",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  businessName: "",
  businessStage: "",
  hopeToLearn: "",
  attendedKesBefore: "",
  financialSupportInterest: "",
  tshirtInterest: "",
  website: "",
};

export function RegistrationForm() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const set = (key: keyof typeof EMPTY) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) =>
      current[key] ? { ...current, [key]: undefined } : current,
    );
  };

  function goToDetails() {
    setFormMessage(null);
    const parsed = registrationStepOneSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(flattenFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setStep(2);
  }

  function goToContact() {
    setFormMessage(null);
    setStep(1);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(null);

    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(flattenFieldErrors(parsed.error));
      if (!registrationStepOneSchema.safeParse(values).success) setStep(1);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await response.json()) as RegistrationResponse;

      if (!response.ok) {
        setStatus("idle");
        setErrors(json.errors ?? {});
        setFormMessage(json.message ?? "Something went wrong. Please retry.");
        return;
      }

      if (json.redirectUrl) {
        window.location.assign(json.redirectUrl);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setFormMessage("Network error. Please check your connection and retry.");
    }
  }

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-shell glass p-8 shadow-float sm:p-10">
        <GoldEdge />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center py-6 text-center"
        >
          <span className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-500">
              <motion.path
                d="M4.5 12.5l5 5 10-11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
              />
            </svg>
          </span>
          <h3 className="text-display-3 mb-3 text-cream">
            Your free seat is reserved.
          </h3>
          <p className="text-cream-dim max-w-sm leading-relaxed">
            We&apos;ve sent a confirmation to{" "}
            <span className="text-gold-600">{values.email}</span>. Your entry
            pass and full details follow closer to the date.
          </p>
          <div className="hairline my-8" />
          <dl className="grid w-full grid-cols-2 gap-6 text-left">
            <div>
              <dt className="text-label mb-1.5 uppercase text-cream-faint">Date</dt>
              <dd className="text-sm font-semibold text-cream">{EVENT.dates.label}</dd>
            </div>
            <div>
              <dt className="text-label mb-1.5 uppercase text-cream-faint">Venue</dt>
              <dd className="text-sm font-semibold text-cream">{EVENT.venue.name}</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div className="relative overflow-hidden rounded-shell glass p-7 shadow-float sm:p-9">
      <GoldEdge />

      <header className="mb-7">
        <p className="text-label mb-3 uppercase text-gold-500">Registration</p>
        <h2 className="text-[1.75rem] font-bold leading-tight tracking-[-0.03em] text-cream">
          Reserve your free seat
        </h2>
        <p className="mt-2.5 text-base leading-relaxed text-cream-dim">
          {EVENT.admission}. Confirmation is sent instantly by email.
        </p>
        <div className="mt-6 flex items-center gap-3" aria-label={`Step ${step} of 2`}>
          {[1, 2].map((item) => (
            <span
              key={item}
              className={
                item === step
                  ? "h-1.5 flex-1 rounded-full bg-gold-500"
                  : "h-1.5 flex-1 rounded-full bg-cream/12"
              }
            />
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-cream-faint">
          Step {step} of 2 · {step === 1 ? "Contact details" : "Summit preferences"}
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {step === 1 ? (
          <motion.div
            key="contact"
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <SelectField
              label="Designation"
              options={DESIGNATIONS}
              placeholder="Select your designation"
              value={values.designation}
              onChange={(event) => set("designation")(event.target.value)}
              error={errors.designation}
              disabled={submitting}
            />
            <Field
              label="Full Name"
              placeholder="Adaeze Okonkwo"
              autoComplete="name"
              required
              value={values.fullName}
              onChange={(event) => set("fullName")(event.target.value)}
              error={errors.fullName}
              disabled={submitting}
            />
            <Field
              label="Email Address"
              type="email"
              inputMode="email"
              placeholder="you@company.com"
              autoComplete="email"
              value={values.email}
              onChange={(event) => set("email")(event.target.value)}
              error={errors.email}
              disabled={submitting}
            />
            <Field
              label="Phone Number"
              type="tel"
              inputMode="tel"
              placeholder="+234 800 000 0000"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => set("phone")(event.target.value)}
              error={errors.phone}
              disabled={submitting}
            />
            <Field
              label="Where are you coming from for the summit?"
              placeholder="City, state or country"
              autoComplete="address-level2"
              value={values.location}
              onChange={(event) => set("location")(event.target.value)}
              error={errors.location}
              disabled={submitting}
            />
            <Button
              type="button"
              variant="gold"
              size="lg"
              className="mt-2 w-full"
              onClick={goToDetails}
            >
              Next
              <Arrow />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="preferences"
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <Field
              label="Business or Brand Name (optional)"
              placeholder="Your company or brand"
              autoComplete="organization"
              value={values.businessName}
              onChange={(event) => set("businessName")(event.target.value)}
              error={errors.businessName}
              disabled={submitting}
            />
            <SelectField
              label="Business Stage (optional)"
              options={BUSINESS_STAGES}
              placeholder="Select your stage"
              value={values.businessStage}
              onChange={(event) => set("businessStage")(event.target.value)}
              error={errors.businessStage}
              disabled={submitting}
            />
            <TextareaField
              label="What do you hope to learn at the summit?"
              placeholder="Share what you're hoping to take away…"
              rows={3}
              value={values.hopeToLearn}
              onChange={(event) => set("hopeToLearn")(event.target.value)}
              error={errors.hopeToLearn}
              disabled={submitting}
            />
            <RadioField
              label="Have you attended KES before?"
              options={YES_NO_OPTIONS}
              value={values.attendedKesBefore}
              onChange={set("attendedKesBefore")}
              error={errors.attendedKesBefore}
              disabled={submitting}
            />
            <RadioField
              label="Are you interested in supporting KES financially?"
              options={YES_NO_OPTIONS}
              value={values.financialSupportInterest}
              onChange={set("financialSupportInterest")}
              error={errors.financialSupportInterest}
              disabled={submitting}
            />
            <RadioField
              label="Are you interested in a KES customised T-shirt for ₦7,500?"
              options={YES_NO_OPTIONS}
              value={values.tshirtInterest}
              onChange={set("tshirtInterest")}
              error={errors.tshirtInterest}
              disabled={submitting}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                disabled={submitting}
                onClick={goToContact}
              >
                <BackArrow />
                Previous
              </Button>
              <Button type="submit" variant="gold" size="lg" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner />
                    Reserving…
                  </>
                ) : (
                  <>
                    Register For Free
                    <Arrow />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="kes-website">Website</label>
          <input
            id="kes-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => set("website")(event.target.value)}
          />
        </div>

        {formMessage && (
          <p role="alert" className="text-sm text-red-600">
            {formMessage}
          </p>
        )}

        <p className="pt-1 text-center text-sm leading-relaxed text-cream-faint">
          By registering, you agree to receive summit updates by email or SMS.
        </p>
      </form>
    </div>
  );
}

function GoldEdge() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-gold-400),transparent)]"
    />
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
    />
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
    >
      <path
        d="M2.5 8h11M9 3.5L13.5 8 9 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
      <path
        d="M13.5 8h-11M7 3.5L2.5 8 7 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
