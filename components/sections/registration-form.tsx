"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Field, SelectField } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { BUSINESS_STAGES, EVENT } from "@/lib/constants";
import {
  registrationSchema,
  flattenFieldErrors,
  type FieldErrors,
} from "@/lib/validations";

type Status = "idle" | "submitting" | "success";

const EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  businessStage: "",
  website: "", // honeypot
};

export function RegistrationForm() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const set = (key: keyof typeof EMPTY) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear the error the moment the user starts correcting it
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(null);

    // Validate on the client first — instant feedback, fewer round trips.
    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(flattenFieldErrors(parsed.error));
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("idle");
        setErrors(json.errors ?? {});
        setFormMessage(json.message ?? "Something went wrong. Please retry.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setFormMessage("Network error. Please check your connection and retry.");
    }
  }

  /* ------------------------------ Success view ----------------------------- */

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
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-400">
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
            <span className="text-gold-300">{values.email}</span>. Your entry
            pass and full details follow closer to the date.
          </p>
          <div className="hairline my-8" />
          <dl className="grid w-full grid-cols-2 gap-6 text-left">
            <div>
              <dt className="text-label mb-1.5 uppercase text-cream-faint">
                Date
              </dt>
              <dd className="text-sm font-semibold text-cream">
                {EVENT.dates.label}
              </dd>
            </div>
            <div>
              <dt className="text-label mb-1.5 uppercase text-cream-faint">
                Venue
              </dt>
              <dd className="text-sm font-semibold text-cream">
                {EVENT.venue.name}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    );
  }

  /* -------------------------------- Form view ------------------------------ */

  const submitting = status === "submitting";

  return (
    <div className="relative overflow-hidden rounded-shell glass p-7 shadow-float sm:p-9">
      <GoldEdge />

      <header className="mb-7">
        <p className="text-label mb-3 uppercase text-gold-500">Registration</p>
        <h2 className="text-[1.75rem] font-bold leading-tight tracking-[-0.03em] text-cream">
          Reserve your free seat
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-cream-dim">
          {EVENT.admission}. Confirmation is sent instantly by email.
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field
          label="Full Name"
          placeholder="Adaeze Okonkwo"
          autoComplete="name"
          required
          value={values.fullName}
          onChange={(e) => set("fullName")(e.target.value)}
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
          onChange={(e) => set("email")(e.target.value)}
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
          onChange={(e) => set("phone")(e.target.value)}
          error={errors.phone}
          disabled={submitting}
        />
        <Field
          label="Business or Brand Name"
          placeholder="Your company or brand"
          autoComplete="organization"
          value={values.businessName}
          onChange={(e) => set("businessName")(e.target.value)}
          error={errors.businessName}
          disabled={submitting}
        />
        <SelectField
          label="Business Stage"
          options={BUSINESS_STAGES}
          placeholder="Select your stage"
          value={values.businessStage}
          onChange={(e) => set("businessStage")(e.target.value)}
          error={errors.businessStage}
          disabled={submitting}
        />

        {/* Honeypot — visually hidden, ignored by humans, filled by bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="kes-website">Website</label>
          <input
            id="kes-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website")(e.target.value)}
          />
        </div>

        {formMessage && (
          <p role="alert" className="text-sm text-red-300/90">
            {formMessage}
          </p>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={submitting}
          className="mt-2 w-full"
        >
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

        <p className="pt-1 text-center text-xs leading-relaxed text-cream-faint">
          By registering, you agree to receive summit updates by email or SMS.
        </p>
      </form>
    </div>
  );
}

/* -------------------------------- Fragments ------------------------------- */

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
      className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal-950/25 border-t-charcoal-950"
    />
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
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
