// lib/seo-config.ts
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for every domain / brand / contact / rating value
// used across metadata exports, JSON-LD schema builders, robots.ts and
// sitemap.ts. Update values here — never hardcode the domain elsewhere.
// ─────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://vibeunisexsalon.in";
export const SITE_NAME = "Vibe Unisex Salon";
export const SITE_SHORT_NAME = "Vibe Salon";
export const SITE_LOCALE = "en_IN";
export const SITE_LANGUAGE = "en-IN";
export const SITE_DESCRIPTION =
  "Vibe Unisex Salon — Chennai's luxury unisex salon chain for hair, beauty, and grooming across branches in Anna Nagar, T. Nagar, Porur, Velachery, Ekkatuthangal, and Virugambakkam.";

export const DEFAULT_PHONE = "+91 96773 77316";
export const SUPPORT_EMAIL = "admin@vibeunisexsalon.in";
export const ADMIN_EMAIL = "admin@vibeunisexsalon.in";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/vibe_unisex_salon4",
} as const;

export const PRIMARY_CITY = "Chennai";
export const PRIMARY_STATE = "Tamil Nadu";
export const PRIMARY_COUNTRY = "IN";
export const PRIMARY_COUNTRY_NAME = "India";

export const THEME_COLOR = "#B9935A";
export const BACKGROUND_COLOR = "#FAF8F5";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const DEFAULT_KEYWORDS = [
  "Best Unisex Salon in Chennai",
  "Premium Salon Chennai",
  "Luxury Salon Chennai",
  "Hair Salon Chennai",
  "Beauty Salon Chennai",
  "Hair Cut Chennai",
  "Hair Spa Chennai",
  "Keratin Treatment Chennai",
  "Hair Coloring Chennai",
  "Bridal Makeup Chennai",
  "Facial Treatment Chennai",
  "Mens Grooming Chennai",
  "Professional Hairstylist Chennai",
  "Hair Smoothening Chennai",
  "Salon near me Chennai",
  "Best hair salon near me in Chennai",
  "Unisex Salon Virugambakkam",
  "Hair Salon Virugambakkam",
  "Keratin Treatment Virugambakkam",
  "Bridal Makeup Virugambakkam",
];

/**
 * AI / LLM / answer-engine crawlers explicitly permitted in robots.ts.
 * Keeping this centralized means adding a new bot is a one-line change.
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "AmazonBot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Bytespider",
  "cohere-ai",
  "DuckAssistBot",
  "Diffbot",
  "YouBot",
  "Timpibot",
  "Ai2Bot",
] as const;

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

export function canonicalFor(path: string): { canonical: string } {
  return { canonical: absoluteUrl(path) };
}
