// data/services.ts
// Full Vibe Unisex Salon services menu — production-typed, slug-ready.

export type PricingVariant = {
  label: string;
  price: number;
};

export type ServiceItem = {
  name: string;
  /** Single price when there is no variant split */
  price?: number;
  /** Variant pricing (Female/Male, With/Without Extension, etc.) */
  variants?: PricingVariant[];
  /** Optional item-level note */
  note?: string;
  /** Price suffix hint, e.g. "+" meaning "starting from" */
  priceSuffix?: string;
  /** Add this to highlight specific cards */
  highlight?: boolean;
};

export type ServiceGroup = {
  /** Sub-group label, e.g. "Female", "Male", "Hairdo" */
  label: string;
  items: ServiceItem[];
};

export type ServiceCategory = {
  id: number;
  /** Display name shown in headings and cards */
  name: string;
  /** URL-safe slug, e.g. "hair-colour" */
  slug: string;
  /** Short description used in meta and category cards */
  description: string;
  /** Category-level note shown below heading */
  note?: string;
  /** Flat list of services (used when there are no sub-groups) */
  items?: ServiceItem[];
  /** Sub-grouped services (used when category splits by gender / type) */
  groups?: ServiceGroup[];
};

// ─── Locations (used in SEO metadata) ───────────────────────────────────────
export const SALON_LOCATIONS = [
  "Anna Nagar",
  "T Nagar",
  "Ekkatuthangal",
  "Velachery",
  "Porur",
  "Virugambakkam",
] as const;

export type SalonLocation = (typeof SALON_LOCATIONS)[number];

export const LOCATIONS_STRING = SALON_LOCATIONS.join(" | ");
export const LOCATIONS_SEO =
  SALON_LOCATIONS.slice(0, -1).join(", ") + " & " + SALON_LOCATIONS[SALON_LOCATIONS.length - 1];

// ─── Master Services Array ────────────────────────────────────────────────────
export const SERVICES: ServiceCategory[] = [
  // ── 1. Haircuts ─────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Haircuts",
    slug: "haircuts",
    description:
      "Professional haircuts for women, men, and kids at Vibe Unisex Salon. Precision cuts starting at ₹100 across all Chennai locations.",
    groups: [
      {
        label: "Female",
        items: [
          { name: "Haircut", price: 250, highlight: true },
          { name: "Hair Trim", price: 250 },
          { name: "Kids Haircut", price: 250 },
          { name: "Hair Blowdry & Setting", price: 250 },
          { name: "Hair Wash & Conditioning", price: 150 },
        ],
      },
      {
        label: "Male",
        items: [
          { name: "Haircut + Wash", price: 250, highlight: true },
          { name: "Trim", price: 100 },
        ],
      },
    ],
  },

  // ── 2. Hair Styles & Hairdo ──────────────────────────────────────────────────
  {
    id: 2,
    name: "Hair Styles & Hairdo",
    slug: "hair-styles-hairdo",
    description:
      "Temporary styling, curls, ironing, tongs, and elaborate hairdos with or without extensions. Perfect for events and occasions.",
    groups: [
      {
        label: "Hair Styles",
        items: [
          { name: "Ironing (Temporary)", price: 999 },
          { name: "Tongs Setting (Temporary)", price: 699 },
          { name: "Curls Setting (Temporary)", price: 999 },
        ],
      },
      {
        label: "Hairdo",
        items: [
          {
            name: "Basic Hairdo",
            variants: [
              { label: "With Extension", price: 1999 },
              { label: "Without Extension", price: 1499 },
            ],
          },
          {
            name: "Advance Hairdo",
            variants: [
              { label: "With Extension", price: 2999 },
              { label: "Without Extension", price: 1999 },
            ],
          },
        ],
      },
    ],
  },

  // ── 3. Hair Colour ────────────────────────────────────────────────────────────
  {
    id: 3,
    name: "Hair Colour",
    slug: "hair-colour",
    description:
      "Professional hair colouring including highlights, global colour, root touch-ups, and streaks. Certified colourists at all locations.",
    groups: [
      {
        label: "Female",
        items: [
          { name: "Highlights", price: 1999 },
          { name: "Global Colour", price: 2999 },
          { name: "Root Touch-Up", price: 1000 },
        ],
      },
      {
        label: "Streaks",
        items: [
          { name: "Per Streak (Minimum 6)", price: 250 },
        ],
      },
      {
        label: "Male",
        items: [
          { name: "Highlights", price: 700 },
          { name: "Global Colour", price: 800 },
        ],
      },
    ],
  },

  // ── 4. Hair Spa ───────────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Hair Spa",
    slug: "hair-spa",
    description:
      "Rejuvenating Wella hair spa treatments for care, smoothness, nourishment, repair, and dandruff detox. Available for both women and men.",
    groups: [
      {
        label: "Treatments",
        items: [
          {
            name: "Wella Care",
            variants: [
              { label: "Female", price: 999 },
              { label: "Male", price: 699 },
            ],
          },
          {
            name: "Smoothness",
            variants: [
              { label: "Female", price: 1199 },
              { label: "Male", price: 799 },
            ],
          },
          {
            name: "Nourishment",
            variants: [
              { label: "Female", price: 1199 },
              { label: "Male", price: 799 },
            ],
          },
          {
            name: "Repair",
            variants: [
              { label: "Female", price: 1299 },
              { label: "Male", price: 899 },
            ],
          },
          {
            name: "Detoks (Anti-Dandruff)",
            variants: [
              { label: "Female", price: 1499 },
              { label: "Male", price: 1099 },
            ],
          },
        ],
      },
    ],
  },

  // ── 5. Hair Treatments ────────────────────────────────────────────────────────
  {
    id: 5,
    name: "Hair Treatments",
    slug: "hair-treatments",
    description:
      "Advanced hair transformation treatments — smoothening, keratin, botox, boto smooth, and nanoplastia. Includes a complimentary haircut.",
    note: "All treatments include a complimentary haircut.",
    items: [
      { name: "Smoothening", price: 2999, priceSuffix: "+" },
      { name: "Keratin", price: 3999, priceSuffix: "+" },
      { name: "Botox", price: 4999, priceSuffix: "+" },
      { name: "Boto Smooth", price: 5999, priceSuffix: "+" },
      { name: "Nanoplastia", price: 5999, priceSuffix: "+" },
    ],
  },

  // ── 6. Skin Care & Facials ─────────────────────────────────────────────────
  {
    id: 6,
    name: "Skin Care & Facials",
    slug: "skin-care-facials",
    description:
      "Full-spectrum skin care from clean-ups and fruit facials to advanced Hydra Facials and Korean Glass Skin treatments.",
    groups: [
      {
        label: "General Skin Care",
        items: [
          { name: "Clean Up", price: 549 },
          { name: "Brightening Peel Off Mask", price: 649 },
          { name: "Fruit Facial", price: 799 },
          { name: "Wine Facial", price: 999 },
          { name: "Pearl Facial", price: 1199 },
          { name: "Brightening Facial", price: 1499 },
          { name: "Glowing Facial", price: 1799 },
          { name: "Whitening Facial", price: 1999 },
          { name: "Gold Facial", price: 2199 },
          { name: "Oxygen Facial", price: 2699 },
          { name: "Oxygen — Bridal Glow", price: 2999 },
        ],
      },
      {
        label: "Hydra Facial",
        items: [
          { name: "Signature Hydra Facial", price: 1499 },
          { name: "Brightening Hydra Facial", price: 1999 },
          { name: "Platinum Hydra Facial", price: 2499 },
          { name: "Glowing Hydra Facial", price: 2699 },
          { name: "Whitening Hydra Facial", price: 2999 },
          { name: "Korean Glass Skin", price: 3499 },
          { name: "Luxury Hydra Facial", price: 3999 },
        ],
      },
    ],
  },

  // ── 7. Detan & Bleach ─────────────────────────────────────────────────────
  {
    id: 7,
    name: "Detan & Bleach",
    slug: "detan-bleach",
    description:
      "Professional detan and bleach services covering face, arms, legs, back, and full body for an even, radiant complexion.",
    groups: [
      {
        label: "Detan",
        items: [
          { name: "Face & Neck", price: 499 },
          { name: "Full Arms", price: 599 },
          { name: "Full Legs", price: 899 },
          { name: "Back", price: 499 },
          { name: "Full Body (Hands, Legs, Face, Neck, Back)", price: 1999 },
        ],
      },
      {
        label: "Bleach",
        items: [
          { name: "Face & Neck", price: 399 },
          { name: "Full Arms", price: 499 },
          { name: "Foot", price: 499 },
          { name: "Full Legs", price: 799 },
          { name: "Back", price: 450 },
          { name: "Full Body (Hands, Legs, Face, Neck, Back)", price: 1999 },
        ],
      },
    ],
  },

  // ── 8. Massage ───────────────────────────────────────────────────────────────
  {
    id: 8,
    name: "Massage",
    slug: "massage",
    description:
      "Relaxing head and scalp massage with premium oils — coconut, almond, olive, and navarathna — followed by a hair wash.",
    groups: [
      {
        label: "Female",
        items: [
          { name: "Coconut Oil + Wash", price: 500 },
          { name: "Almond Oil + Wash", price: 500 },
          { name: "Olive Oil + Wash", price: 500 },
          { name: "Navarathna Oil + Wash", price: 500 },
        ],
      },
      {
        label: "Male",
        items: [
          { name: "Coconut Oil + Wash", price: 500 },
          { name: "Almond Oil + Wash", price: 500 },
          { name: "Olive Oil + Wash", price: 500 },
          { name: "Navarathna Oil + Wash", price: 500 },
        ],
      },
    ],
  },

  // ── 9. Hands & Foot Spa ────────────────────────────────────────────────────
  {
    id: 9,
    name: "Hands & Foot Spa",
    slug: "hands-foot-spa",
    description:
      "Manicure and pedicure services from essential to luxury tiers. Pamper your hands and feet at any Vibe location.",
    groups: [
      {
        label: "Manicure",
        items: [
          { name: "Essential", price: 449 },
          { name: "Classic", price: 599 },
          { name: "Signature", price: 699 },
          { name: "Luxury", price: 899 },
        ],
      },
      {
        label: "Pedicure",
        items: [
          { name: "Essential", price: 649 },
          { name: "Classic", price: 799 },
          { name: "Signature", price: 999 },
          { name: "Luxury", price: 1199 },
        ],
      },
    ],
  },

  // ── 10. Makeup & Saree Draping ─────────────────────────────────────────────
  {
    id: 10,
    name: "Makeup & Saree Draping",
    slug: "makeup-saree-draping",
    description:
      "Premium bridal makeup, party makeup, groom HD makeup, bridesmaid packages, and expert saree draping services.",
    groups: [
      {
        label: "Makeup",
        items: [
          { name: "The Premium", price: 7999 },
          { name: "The Classic", price: 11999 },
          { name: "The Elite", price: 14999 },
          { name: "The Luxury", price: 18999 },
        ],
      },
      {
        label: "Groom",
        items: [
          { name: "Bridegroom HD", price: 4999 },
          { name: "Shoot Makeup", price: 2999 },
        ],
      },
      {
        label: "Bridesmaid",
        items: [
          { name: "Party Makeup", price: 1999 },
          { name: "Elegant", price: 3999 },
        ],
      },
      {
        label: "Saree",
        items: [
          { name: "Saree Pre-Pleating", price: 499 },
          { name: "Saree Draping", price: 999 },
        ],
      },
    ],
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Returns the ServiceCategory matching a slug, or undefined. */
export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** All valid slugs — used in generateStaticParams. */
export function getAllSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

/**
 * Returns the lowest price across all items/variants in a category.
 * Useful for "Starting from ₹X" in cards.
 */
export function getStartingPrice(category: ServiceCategory): number {
  const collect = (items: ServiceItem[]): number[] =>
    items.flatMap((item) =>
      item.variants ? item.variants.map((v) => v.price) : item.price ? [item.price] : []
    );

  const allPrices = category.items
    ? collect(category.items)
    : (category.groups ?? []).flatMap((g) => collect(g.items));

  return Math.min(...allPrices);
}