import Link from "next/link";
import Image from "next/image";
import { SALON_BRANCHES } from "@/lib/branches";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Salon Locations | Vibe Unisex Salon",
  description: "Find a premium Vibe Unisex Salon near you. Explore our branches across India for top-tier hair, skin, and grooming services.",
};

export default function AllBranchesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="section-label">Locations</span>
          <h1 className="text-4xl md:text-5xl mt-4 mb-6 text-[#1A1410]">
            Find Your Nearest <span className="text-[#C9A84C]">Vibe</span>
          </h1>
          <p className="text-[#6B5F55] text-lg font-body">
            Experience premium grooming and beauty services at any of our exclusive locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SALON_BRANCHES.map((branch, index) => (
            <div 
              key={branch.id} 
              className="bg-white border border-[#E2D9CC] overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 w-full overflow-hidden bg-[#F5F0E8]">
                <Image
                  src={branch.featuredImageUrl}
                  alt={branch.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl mb-4 text-[#1A1410]">{branch.name}</h2>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 text-[#6B5F55] font-body text-sm">
                    <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0" />
                    <p>{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B5F55] font-body text-sm">
                    <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" />
                    <p>{branch.phone}</p>
                  </div>
                </div>

                <Link
                  href={`/branches/${branch.slug}`}
                  className="inline-flex items-center gap-2 text-[#C9A84C] font-body font-medium text-sm tracking-widest uppercase hover:text-[#9A7A28] transition-colors"
                >
                  View Branch <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}