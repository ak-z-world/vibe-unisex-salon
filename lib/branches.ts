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
    name: "Vibe Unisex Salon – T. Nagar",
    slug: "t-nagar-chennai",
    city: "Chennai",
    neighborhood: "T. Nagar",
    address: "12, G N Chetty Rd, T. Nagar, Chennai, Tamil Nadu 600017",
    state: "Tamil Nadu",
    pincode: "600017",
    phone: "+91 98765 43210",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.google.com/?q=T+Nagar+Chennai",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    latitude: 13.0418,
    longitude: 80.2341,
  },
  {
    id: "b2",
    name: "Vibe Unisex Salon – Indiranagar",
    slug: "indiranagar-bengaluru",
    city: "Bengaluru",
    neighborhood: "Indiranagar",
    address: "100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 98765 43211",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.google.com/?q=Indiranagar+Bengaluru",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    latitude: 12.9784,
    longitude: 77.6408,
  },
  {
    id: "b3",
    name: "Vibe Unisex Salon – Banjara Hills",
    slug: "banjara-hills-hyderabad",
    city: "Hyderabad",
    neighborhood: "Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
    state: "Telangana",
    pincode: "500034",
    phone: "+91 98765 43212",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    latitude: 17.4126,
    longitude: 78.4483,
  },
  {
    id: "b4",
    name: "Vibe Unisex Salon – Andheri West",
    slug: "andheri-west-mumbai",
    city: "Mumbai",
    neighborhood: "Andheri West",
    address: "Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053",
    state: "Maharashtra",
    pincode: "400053",
    phone: "+91 98765 43213",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.google.com/?q=Andheri+West+Mumbai",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    latitude: 19.1307,
    longitude: 72.8264,
  },
  {
    id: "b5",
    name: "Vibe Unisex Salon – Connaught Place",
    slug: "connaught-place-delhi",
    city: "Delhi",
    neighborhood: "Connaught Place",
    address: "Block A, Connaught Place, New Delhi 110001",
    state: "Delhi",
    pincode: "110001",
    phone: "+91 98765 43214",
    hours: "Mon–Sun: 9:00 AM – 9:00 PM",
    mapsLink: "https://maps.google.com/?q=Connaught+Place+Delhi",
    featuredImageUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    latitude: 28.6315,
    longitude: 77.2167,
  },
];
export const BRAND_NAME = "Vibe Unisex Salon";

export const ADMIN_EMAIL = "admin@vibeunisexsalon.in";

export const FROM_EMAIL = "noreply@vibeunisexsalon.in";

export const branchEmailMap: Record<string, string> = {
  "t-nagar-chennai": "tnagar@vibeunisexsalon.in",
  "indiranagar-bengaluru": "indiranagar@vibeunisexsalon.in",
  "banjara-hills-hyderabad": "banjarahills@vibeunisexsalon.in",
  "andheri-west-mumbai": "andheri@vibeunisexsalon.in",
  "connaught-place-delhi": "connaughtplace@vibeunisexsalon.in",
};

export function getBranchBySlug(slug: string): Branch | undefined {
  return SALON_BRANCHES.find((b) => b.slug === slug);
}

