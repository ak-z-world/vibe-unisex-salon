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
    name: "Vibe Unisex Salon – Anna Nagar",
    slug: "anna-nagar-chennai",
    city: "Chennai",
    neighborhood: "Anna Nagar",
    address:
      "No:42/9, First Floor, Shanthiniketan Colony, Anna Nagar, Chennai, Tamil Nadu 600101",
    state: "Tamil Nadu",
    pincode: "600101",
    phone: "+91 98765 43210",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/iozjgAmAGrgFqRJE7",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    latitude: 13.085,
    longitude: 80.2101,
  },
  {
    id: "b2",
    name: "Vibe Unisex Salon – T. Nagar",
    slug: "t-nagar-chennai",
    city: "Chennai",
    neighborhood: "T. Nagar",
    address: "28, Dhandapani St, T. Nagar, Chennai, Tamil Nadu 600017",
    state: "Tamil Nadu",
    pincode: "600017",
    phone: "+91 98765 43211",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/P1xoVYL11DNRnQ5d8",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    latitude: 13.0418,
    longitude: 80.2341,
  },
  {
    id: "b3",
    name: "Vibe Unisex Salon – Ekkatuthangal",
    slug: "ekkatuthangal-chennai",
    city: "Chennai",
    neighborhood: "Ekkatuthangal",
    address:
      "3/15, Jawaharlal Nehru Salai, Ambal Nagar, Ekkatuthangal, Chennai, Tamil Nadu 600032",
    state: "Tamil Nadu",
    pincode: "600032",
    phone: "+91 98765 43212",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/1wEbD7NpnmoBjbdi6",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    latitude: 13.017,
    longitude: 80.205,
  },
  {
    id: "b4",
    name: "Vibe Unisex Salon – Porur",
    slug: "porur-chennai",
    city: "Chennai",
    neighborhood: "Porur",
    address:
      "201, Trunk Rd, Next to Thambivilas Cafe, Theru Veedhi Amman Koil Streets, Porur, Chennai, Tamil Nadu 600116",
    state: "Tamil Nadu",
    pincode: "600116",
    phone: "+91 98765 43213",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/4J9dy41jjP4uj8xM6",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    latitude: 13.035,
    longitude: 80.158,
  },
  {
    id: "b5",
    name: "Vibe Unisex Salon – Velachery",
    slug: "velachery-chennai",
    city: "Chennai",
    neighborhood: "Velachery",
    address:
      "1, Periyar St, Nehru Nagar, Velachery, Chennai, Tamil Nadu 600042",
    state: "Tamil Nadu",
    pincode: "600042",
    phone: "+91 98765 43214",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.app.goo.gl/yLKqGCVwp8Vg6MJD8",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
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
