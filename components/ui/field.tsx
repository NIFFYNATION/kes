"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const labelClass =
  "mb-2 block text-label uppercase text-cream-faint transition-colors duration-300";

const controlBase = cn(
  "w-full rounded-field border bg-charcoal-900 px-4 text-base text-cream",
  "placeholder:text-cream-faint/70 transition-all duration-300",
  "focus:outline-none focus:ring-0",
);

function stateClass(hasError: boolean) {
  return hasError
    ? "border-red-400/70 focus:border-red-500/80 focus:bg-charcoal-900"
    : "border-cream/12 hover:border-cream/25 focus:border-gold-500/70 focus:bg-charcoal-900 focus:shadow-[0_0_0_4px_rgba(194,103,12,0.12)]";
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}

/* ---------------------------------- Input --------------------------------- */

export function Field({
  label,
  error,
  className,
  ...props
}: {
  label: string;
  error?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "className">) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn("group", className)}>
      <label
        htmlFor={id}
        className={cn(labelClass, "group-focus-within:text-gold-500")}
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(controlBase, stateClass(Boolean(error)), "h-12")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

/* -------------------------------- Textarea -------------------------------- */

export function TextareaField({
  label,
  error,
  className,
  rows = 4,
  ...props
}: {
  label: string;
  error?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"textarea">, "className">) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn("group", className)}>
      <label
        htmlFor={id}
        className={cn(labelClass, "group-focus-within:text-gold-500")}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={cn(controlBase, stateClass(Boolean(error)), "resize-none py-3")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

/* --------------------------------- Select --------------------------------- */

export function SelectField({
  label,
  error,
  options,
  placeholder = "Select an option",
  className,
  ...props
}: {
  label: string;
  error?: string;
  className?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
} & Omit<ComponentPropsWithoutRef<"select">, "className">) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn("group", className)}>
      <label
        htmlFor={id}
        className={cn(labelClass, "group-focus-within:text-gold-500")}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={cn(
            controlBase,
            stateClass(Boolean(error)),
            "h-12 cursor-pointer appearance-none pr-11",
            !props.value && "text-cream-faint/60",
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Minimal chevron */}
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-cream-faint transition-colors duration-300 group-focus-within:text-gold-500"
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

/* --------------------------------- Radio ---------------------------------- */

export function RadioField({
  label,
  error,
  options,
  value,
  onChange,
  disabled,
  className,
}: {
  label: string;
  error?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <fieldset
      className={cn("group", className)}
      disabled={disabled}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={cn(labelClass, "group-focus-within:text-gold-500")}>
        {label}
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const checked = value === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "relative flex min-h-[3.75rem] cursor-pointer items-center gap-3 overflow-hidden rounded-[1rem] border px-4 text-base font-semibold transition-all duration-300",
                "focus-within:outline-none focus-within:ring-4 focus-within:ring-gold-500/15",
                checked
                  ? "border-gold-500/80 bg-[linear-gradient(135deg,rgba(246,204,94,0.19),rgba(194,103,12,0.08))] text-gold-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(194,103,12,0.13)]"
                  : "border-cream/12 bg-charcoal-900/85 text-cream-dim shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-0.5 hover:border-cream/25 hover:bg-charcoal-900 hover:text-cream",
                error && "border-red-400/70",
                disabled && "cursor-not-allowed opacity-55",
              )}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "relative grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  checked
                    ? "border-gold-400 bg-gold-400 shadow-[0_0_0_4px_rgba(246,204,94,0.12)]"
                    : "border-cream/25 bg-cream/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full bg-[#061a5b] transition-all duration-300",
                    checked ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                />
              </span>
              <span className="flex-1">{option.label}</span>
              {checked && (
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="h-5 w-5 shrink-0 text-gold-400"
                >
                  <path
                    d="m4.25 10.25 3.5 3.5 8-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </label>
          );
        })}
      </div>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </fieldset>
  );
}
