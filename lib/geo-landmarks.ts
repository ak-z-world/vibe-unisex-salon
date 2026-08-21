// lib/geo-landmarks.ts
// ─────────────────────────────────────────────────────────────────────────
// Semantic geo-clusters per branch, used to generate natural-language,
// screen-reader-visible "nearby areas" content (GEO / AEO — Phase 5 & 10).
// This is NOT a replacement for lib/branches.ts `nearbyAreas`; it extends
// it with landmark categories (metro, colleges, IT parks, hospitals,
// malls) so LLM crawlers can build a richer entity map of each location.
//
// NOTE: Keep claims conservative and update this file if a branch moves
// or if new metro/rail stations open near a location — inaccurate transit
// claims actively hurt local SEO trust signals.
// ─────────────────────────────────────────────────────────────────────────

export interface GeoCluster {
  slug: string;
  /** Rail/metro connectivity genuinely near the branch. Keep conservative. */
  transit: string[];
  /** Well-known streets, junctions, parks, or public landmarks. */
  landmarks: string[];
  /** Colleges / educational institutions in the vicinity. */
  colleges: string[];
  /** IT parks / commercial or office hubs nearby. */
  itHubs: string[];
  /** Hospitals in the surrounding area. */
  hospitals: string[];
  /** Malls / major shopping destinations nearby. */
  malls: string[];
  /** Residential neighbourhoods this branch effectively serves. */
  residentialAreas: string[];
}

export const GEO_CLUSTERS: Record<string, GeoCluster> = {
  "anna-nagar-chennai": {
    slug: "anna-nagar-chennai",
    transit: [
      "Anna Nagar Tower Metro Station",
      "Anna Nagar East Metro Station",
      "Shenoy Nagar Metro Station",
    ],
    landmarks: [
      "Anna Nagar Tower Park",
      "Anna Nagar 2nd Avenue",
      "Thirumangalam Signal",
      "Chinthamani Signal",
    ],
    colleges: ["Meenakshi College for Women", "Anna Adarsh College for Women"],
    itHubs: ["Guindy–Ambattur commercial corridor"],
    hospitals: ["Apollo First Med Hospitals", "SIMS Hospital"],
    malls: ["VR Chennai", "Ampa Skywalk"],
    residentialAreas: [
      "Mogappair",
      "Kilpauk",
      "Aminjikarai",
      "Shenoy Nagar",
      "Arumbakkam",
    ],
  },

  "t-nagar-chennai": {
    slug: "t-nagar-chennai",
    transit: ["Mambalam Suburban Railway Station", "Saidapet Metro Station (nearby)"],
    landmarks: ["Panagal Park", "Pondy Bazaar", "Ranganathan Street"],
    colleges: ["Vidhya Mandir Senior Secondary School (nearby)"],
    itHubs: ["Nandanam / Teynampet commercial belt"],
    hospitals: ["Government Kilpauk Medical College (greater area)", "Vijaya Hospital"],
    malls: ["Pothys", "Nalli Silks flagship area", "Pondy Bazaar shopping street"],
    residentialAreas: [
      "Nungambakkam",
      "Kodambakkam",
      "Saidapet",
      "Alwarpet",
      "Teynampet",
    ],
  },

  "ekkatuthangal-chennai": {
    slug: "ekkatuthangal-chennai",
    transit: ["Ekkattuthangal Metro Station"],
    landmarks: ["Jawaharlal Nehru Salai (100 Feet Road)", "Ambal Nagar"],
    colleges: ["Government College of Technology (Guindy, nearby)"],
    itHubs: ["Guindy Industrial Estate", "DLF IT Park (nearby)"],
    hospitals: ["Sri Ramachandra Medical Centre (greater area)"],
    malls: ["Grand Mall Guindy (nearby)"],
    residentialAreas: [
      "Guindy",
      "Alandur",
      "Ashok Nagar",
      "St. Thomas Mount",
      "Vadapalani",
    ],
  },

  "porur-chennai": {
    slug: "porur-chennai",
    transit: ["Porur Junction bus terminus", "Mount Poonamallee Road corridor"],
    landmarks: ["Porur Lake", "Porur Junction"],
    colleges: ["SRM Institutions (Porur campus, nearby)"],
    itHubs: ["DLF IT Park Porur", "Porur–Poonamallee commercial belt"],
    hospitals: ["Vijaya Hospital Vadapalani (nearby)", "Sri Ramachandra Medical Centre"],
    malls: ["Phoenix Marketcity (Velachery, city-wide reach)"],
    residentialAreas: [
      "Iyyappanthangal",
      "Ramapuram",
      "Valasaravakkam",
      "Mugalivakkam",
      "Maduravoyal",
    ],
  },

  "velachery-chennai": {
    slug: "velachery-chennai",
    transit: ["Velachery MRTS Railway Station"],
    landmarks: ["Velachery Main Road", "Grand Southern Trunk Road"],
    colleges: ["Sathyabama Institute of Science and Technology (nearby)"],
    itHubs: ["Tidel Park", "Perungudi–OMR IT corridor"],
    hospitals: ["Apollo Speciality Hospital OMR (nearby)"],
    malls: ["Phoenix Marketcity Velachery", "Grand Sweets & Snacks Velachery"],
    residentialAreas: [
      "Madipakkam",
      "Pallikaranai",
      "Perungudi",
      "Thoraipakkam",
      "Taramani",
    ],
  },

  "virugambakkam-chennai": {
    slug: "virugambakkam-chennai",
    transit: ["Vadapalani Metro Station (nearby)", "Arcot Road bus corridor"],
    landmarks: ["Virugambakkam Market", "Kaliamman Koil Street", "Avichi School junction"],
    colleges: ["Meenakshi Ammal Dental College (nearby)"],
    itHubs: ["Vadapalani–Arcot Road commercial hub"],
    hospitals: ["Vijaya Hospital Vadapalani (nearby)", "SIMS Hospital Vadapalani"],
    malls: ["Nexus Vijaya Mall Vadapalani (nearby)"],
    residentialAreas: [
      "Saligramam",
      "Vadapalani",
      "Chinmaya Nagar",
      "Koyambedu",
      "Alwarthirunagar",
    ],
  },
};

export function getGeoCluster(slug: string): GeoCluster | undefined {
  return GEO_CLUSTERS[slug];
}

