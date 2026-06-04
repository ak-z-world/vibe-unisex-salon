
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBranchBySlug,
} from "@/lib/branches";
import {
  LocalBusinessSchema,
  BreadcrumbSchema,
} from "@/app/components/SEO/StructuredData";

const SITE_URL = "https://vibeunisexsalon.in";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found",
    };
  }

  const location = `${branch.neighborhood}, ${branch.city}`;

  const title = `${branch.name} | Best Unisex Salon in ${location}`;

  const description = `Visit ${branch.name} in ${location} for premium haircuts, hair spa, keratin treatment, facials, bridal makeup, beard styling, manicure, pedicure and complete beauty services.`;

  return {
    title,
    description,

    keywords: [
      branch.name,
      `${location} salon`,
      `best salon in ${location}`,
      `unisex salon in ${location}`,
      `haircut in ${location}`,
      `hair spa in ${location}`,
      `bridal makeup in ${location}`,
      `beauty parlour in ${location}`,
      `facial in ${location}`,
      `hair salon near me`,
      `salon near me`,
      `${branch.city} salon`,
      `${branch.neighborhood} salon`,
    ],

    alternates: {
      canonical: `${SITE_URL}/branches/${branch.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/branches/${branch.slug}`,
      siteName: "Vibe Unisex Salon",
      locale: "en_IN",
      type: "website",

      images: [
        {
          url: branch.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: branch.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [branch.featuredImageUrl],
    },
  };
}

export default async function BranchPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const location = `${branch.neighborhood}, ${branch.city}`;


  return (
    <>
       <LocalBusinessSchema branch={branch} />
       <BreadcrumbSchema
    slug={branch.slug}
    name={branch.name}
  />

      <main className="min-h-screen">

        {/* Hero Section */}

        <section className="relative h-[500px]">

          <img
            src={branch.featuredImageUrl}
            alt={branch.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

            <div className="text-center text-white px-4">

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {branch.name}
              </h1>

              <p className="text-lg md:text-xl">
                Premium Hair & Beauty Services in {location}
              </p>

            </div>

          </div>

        </section>

        {/* Branch Details */}

        <section className="max-w-7xl mx-auto px-4 py-16">

          <h2 className="text-3xl font-bold mb-6">
            Best Unisex Salon in {location}
          </h2>

          <p className="text-gray-600 leading-8 mb-10">
            Looking for the best salon in {location}? {branch.name}
            provides professional haircuts, beard styling, hair spa,
            keratin treatment, hair coloring, facials, manicure,
            pedicure, bridal makeup and advanced beauty services.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Hair Services
              </h3>

              <p>
                Haircut, Hair Spa, Keratin Treatment,
                Smoothening, Hair Coloring, Beard Styling.
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Beauty Services
              </h3>

              <p>
                Facial, Cleanup, D-Tan,
                Threading, Waxing and Skin Care.
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Bridal Services
              </h3>

              <p>
                Bridal Makeup, Reception Makeup,
                Groom Packages and Party Makeup.
              </p>
            </div>

          </div>

        </section>

        {/* Contact Section */}

        <section className="bg-gray-100 py-16">

          <div className="max-w-7xl mx-auto px-4">

            <h2 className="text-3xl font-bold mb-8">
              Visit Our Salon
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <p className="mb-4">
                  <strong>Address:</strong>
                  <br />
                  {branch.address}
                </p>

                <p className="mb-4">
                  <strong>Phone:</strong>
                  <br />
                  {branch.phone}
                </p>

                <p className="mb-4">
                  <strong>Working Hours:</strong>
                  <br />
                  {branch.hours}
                </p>

                <a
                  href={branch.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-6 py-3 rounded-lg"
                >
                  Get Directions
                </a>

              </div>

              <div>

                <iframe
                  src={`https://maps.google.com/maps?q=${branch.latitude},${branch.longitude}&z=15&output=embed`}
                  width="100%"
                  height="350"
                  loading="lazy"
                  className="rounded-xl"
                />

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

