"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const labelClass =
  "mb-2 block text-label uppercase text-cream-faint transition-colors duration-300";

const controlBase = cn(
  "w-full rounded-field border bg-charcoal-900 px-4 text-[0.9375rem] text-cream",
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
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-600">
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
