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
    featuredImageUrl:"/images/annanagar.svg",
    latitude: 13.085,
    longitude: 80.2101,
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
    featuredImageUrl:"/images/tnagar.svg",
    latitude: 13.0418,
    longitude: 80.2341,
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
    featuredImageUrl:
      "/images/ekkatuthangal.svg",
    latitude: 13.017,
    longitude: 80.205,
  },
  {
    id: "b4",
    name: " Porur",
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
    featuredImageUrl:
      "/images/porur.svg",
    latitude: 13.035,
    longitude: 80.158,
  },
  {
    id: "b5",
    name: " Velachery",
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
    featuredImageUrl:
      "/images/velachery.svg",
    latitude: 12.979,
    longitude: 80.221,
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
};

export function getBranchBySlug(slug: string): Branch | undefined {
  return SALON_BRANCHES.find((b) => b.slug === slug);
}
