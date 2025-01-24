
import type { Route } from "../+types/celestialBody";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const celestialBodyName = params.celestialBody;

  if (!celestialBodyName) {
    throw new Error("Celestial body not specified");
  }

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

  if (!NASA_API_KEY) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=6`
  );

  if (!res.ok) {
    throw new Error(`Error fetching celestial body data: ${res.status}`);
  }

  const data = await res.json();

  const celestialBody = data.find((body: any) =>
    body.title.toLowerCase().includes(celestialBodyName.toLowerCase())
  );

  if (!celestialBody) {
    throw new Error("Celestial body not found");
  }

  return celestialBody;
}

export default function CelestialBody({ loaderData }: Route.ComponentProps) {
  const body = {
    title: loaderData?.title || "N/A",
    explanation: loaderData?.explanation || "No description available.",
    imageUrl: loaderData?.url || "",
    date: loaderData?.date || "Unknown date",
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{body.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Date:</span> {body.date}
          </p>
          <p className="text-gray-700">{body.explanation}</p>
        </div>
        {body.imageUrl && (
          <div className="flex justify-center items-center">
            <img
              src={body.imageUrl}
              alt={body.title}
              className="w-full h-auto border rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
