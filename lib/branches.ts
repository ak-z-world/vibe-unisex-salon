export interface Branch {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapsLink: string;
  featuredImageUrl: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
  state: string;
  pincode: string;
  status: "open" | "coming_soon";
  openingDate?: string;
}

export const SALON_BRANCHES: Branch[] = [
  {
    id: "b1",
    name: "Anna Nagar",
    slug: "anna-nagar-chennai",
    city: "Chennai",
    neighborhood: "Anna Nagar",
    address:
      "No:42/9, First Floor, Shanthiniketan Colony, Anna Nagar, Chennai, Tamil Nadu 600101",
    state: "Tamil Nadu",
    pincode: "600101",
    phone: "+918072352853",
    hours: "Mon–Sun:  10:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/JaN2nJgtLVpj6fFC6",
    featuredImageUrl: "/images/annanagar.svg",
    latitude: 13.08763848847409,
    longitude: 80.19406765338717,
    status: "open",
  },
  {
    id: "b2",
    name: "T. Nagar",
    slug: "t-nagar-chennai",
    city: "Chennai",
    neighborhood: "T. Nagar",
    address: "28, Dhandapani St, T. Nagar, Chennai, Tamil Nadu 600017",
    state: "Tamil Nadu",
    pincode: "600017",
    phone: "+919342795928",
    hours: "Mon–Sun:  10:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/dzdyacoqprkGGRpK8",
    featuredImageUrl: "/images/tnagar.svg",
    latitude: 13.0398618823334,
    longitude: 80.23385217404764,
    status: "open",
  },
  {
    id: "b3",
    name: "Ekkatuthangal",
    slug: "ekkatuthangal-chennai",
    city: "Chennai",
    neighborhood: "Ekkatuthangal",
    address:
      "3/15, Jawaharlal Nehru Salai, Ambal Nagar, Ekkatuthangal, Chennai, Tamil Nadu 600032",
    state: "Tamil Nadu",
    pincode: "600032",
    phone: "+916374679577",
    hours: "Mon–Sun:  10:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/DB4ERZiWVn75YoFo9",
    featuredImageUrl: "/images/ekkatuthangal.svg",
    latitude: 13.02183340538191,
    longitude: 80.20609466942182,
    status: "open",
  },
  {
    id: "b4",
    name: "Porur",
    slug: "porur-chennai",
    city: "Chennai",
    neighborhood: "Porur",
    address:
      "201, Trunk Rd, Next to Thambivilas Cafe, Theru Veedhi Amman Koil Streets, Porur, Chennai, Tamil Nadu 600116",
    state: "Tamil Nadu",
    pincode: "600116",
    phone: "+917603957055",
    hours: "Mon–Sun:  10:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/nYo2EFmS5esdVw3f7",
    featuredImageUrl: "/images/porur.svg",
    latitude: 13.038676158385805,
    longitude: 80.16181014174965,
    status: "open",
  },
  {
    id: "b5",
    name: "Velachery",
    slug: "velachery-chennai",
    city: "Chennai",
    neighborhood: "Velachery",
    address:
      "1, Periyar St, Nehru Nagar, Velachery, Chennai, Tamil Nadu 600042",
    state: "Tamil Nadu",
    pincode: "600042",
    phone: "+919363702047",
    hours: "Mon–Sun:  10:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/X2sfpWcm7jKu9G8g6",
    featuredImageUrl: "/images/velachery.svg",
    latitude: 12.994558372044812,
    longitude: 80.21778719645563,
    status: "open",
  },
  {
    id: "b6",
    name: "Virugambakkam",
    slug: "virugambakkam-chennai",
    city: "Chennai",
    neighborhood: "Virugambakkam",
    address: "35A, Kaliamman Koil St, Elango Nagar,",
    state: "Tamil Nadu",
    pincode: "600092",
    phone: "+916385500712",
    hours: "Mon–Sun:  10:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/ZBbW6FaP72FihMde8",
    featuredImageUrl: "/images/velachery.svg",
    latitude: 13.054138728355701,
    longitude: 80.19261367486781,
    status: "coming_soon",
    openingDate: "2026-09-10",
  },
];

export const nearbyAreas: Record<string, string[]> = {
  "anna-nagar-chennai": [
    "Mogappair",
    "Kilpauk",
    "Aminjikarai",
    "Shenoy Nagar",
    "Arumbakkam",
  ],

  "t-nagar-chennai": [
    "Nungambakkam",
    "Kodambakkam",
    "Saidapet",
    "Alwarpet",
    "Teynampet",
  ],

  "ekkatuthangal-chennai": [
    "Guindy",
    "Alandur",
    "Ashok Nagar",
    "St. Thomas Mount",
    "Vadapalani",
  ],

  "porur-chennai": [
    "Iyyappanthangal",
    "Ramapuram",
    "Valasaravakkam",
    "Mugalivakkam",
    "Maduravoyal",
  ],

  "velachery-chennai": [
    "Madipakkam",
    "Pallikaranai",
    "Perungudi",
    "Thoraipakkam",
    "Taramani",
  ],

  "virugambakkam-chennai": [
    "Vadapalani",
    "Saligramam",
    "Chinmaya Nagar",
    "Koyambedu",
    "Alwarthirunagar",
  ],
};

export const BRAND_NAME = "Vibe Unisex Salon";

export const ADMIN_EMAIL = "admin@vibeunisexsalon.in";

export const FROM_EMAIL = "noreply@vibeunisexsalon.in";

export const branchEmailMap: Record<string, string> = {
  "anna-nagar-chennai": "admin@vibeunisexsalon.in",
  "t-nagar-chennai": "admin@vibeunisexsalon.in",
  "ekkatuthangal-chennai": "admin@vibeunisexsalon.in",
  "porur-chennai": "admin@vibeunisexsalon.in",
  "velachery-chennai": "admin@vibeunisexsalon.in",
  "virugambakkam-chennai": "admin@vibeunisexsalon.in",
};

export function getBranchBySlug(slug: string): Branch | undefined {
  return SALON_BRANCHES.find((b) => b.slug === slug);
}

export function isBranchOpen(branch: Branch): boolean {
  if (branch.status === "open") return true;
  if (branch.openingDate) {
    const today = new Date().toISOString().split("T")[0];
    return today >= branch.openingDate;
  }
  return false;
}

