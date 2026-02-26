import { getSiteConfig } from "@/lib/mdx";
import { Button } from "@/components/ui/button";

export async function VenueMap() {
  const config = await getSiteConfig();

  const name = config.venueName || "Polytech Lille";
  const address =
    config.venueAddress || "Avenue Paul Langevin, 59655 Villeneuve-d'Ascq";

  const encodedAddress = encodeURIComponent(`${name}, ${address}`);

  return (
    <div className="my-8 space-y-6 not-prose">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          title={`Carte de ${name}`}
          className="absolute inset-0"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Itinéraire Google Maps
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href={`https://www.openstreetmap.org/search?query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir sur OpenStreetMap
          </a>
        </Button>
      </div>
    </div>
  );
}
