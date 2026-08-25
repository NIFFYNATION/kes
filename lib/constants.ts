/**
 * Single source of truth for event facts used across sections.
 * Keeps the Hero, registration, Footer and metadata in sync.
 */

export const EVENT = {
  name: "Kingdom Entrepreneurs Summit",
  shortName: "KES",
  year: "2026",
  theme: "The Sovereign Entrepreneur",
  tagline: "Influence. Audacity. Legacy.",
  description:
    "A free gathering for faith-driven entrepreneurs ready to build with purpose, lead with conviction, and create something worth repeating.",
  url: "https://kesummit.com.ng",
  dates: {
    label: "October 17, 2026",
    full: "Saturday, October 17, 2026",
    short: "Oct 17",
    iso: "2026-10-17",
    day: "Saturday",
  },
  venue: {
    name: "Dominion Hall",
    street: "Beside Henry Tee Motors",
    area: "Ring Road, Ibadan",
    cityShort: "Ibadan",
    country: "Nigeria",
    full: "Dominion Hall, Beside Henry Tee Motors, Ring Road, Ibadan",
  },
  admission: "Free with registration",
  email: "hello@kingdomentrepreneurssummit.com",
  phone: "+234 706 785 3362",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    youtube: "https://youtube.com",
  },
} as const;

export const BUSINESS_STAGES = [
  { value: "idea", label: "Idea Stage" },
  { value: "startup", label: "Startup" },
  { value: "growing", label: "Growing Business" },
  { value: "established", label: "Established Business" },
] as const;

export const DESIGNATIONS = [
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
  { value: "miss", label: "Miss" },
  { value: "ms", label: "Ms." },
  { value: "dr", label: "Dr." },
  { value: "prof", label: "Prof." },
  { value: "pastor", label: "Pastor" },
  { value: "reverend", label: "Reverend" },
  { value: "apostle", label: "Apostle" },
  { value: "chief", label: "Chief" },
  { value: "engineer", label: "Engineer" },
  { value: "barrister", label: "Barrister" },
  { value: "nurse", label: "Nurse" },
  { value: "other", label: "Other" },
] as const;

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const TSHIRT_COLORS = [
  { value: "white", label: "White" },
  { value: "navy-blue", label: "Navy Blue" },
  { value: "black", label: "Black" },
] as const;

export const TSHIRT_SIZES = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
] as const;

export const NAV_LINKS = [
  { label: "The Summit", href: "#sovereign" },
  { label: "Pillars", href: "#pillars" },
  { label: "Journey", href: "#journey" },
  { label: "Past Events", href: "#past-events" },
] as const;
