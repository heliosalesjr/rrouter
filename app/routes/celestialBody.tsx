import { useLoaderData, useParams } from "react-router";

export async function clientLoader({ params }: { params: { celestialBody: string } }) {
  const apiKey = process.env.REACT_APP_NASA_API_KEY;
  const category = params.celestialBody;

  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=6`);
  if (!res.ok) {
    throw new Error("Celestial body not found - NASA is DOWN!");
  }

  const data = await res.json();

  // Adiciona um filtro por categoria com base em palavras-chave
  const keywords: { [key: string]: string[] } = {
    planets: ["Mars", "Earth", "Venus", "Jupiter", "Saturn", "Neptune", "Uranus"],
    stars: ["star", "sun", "nebula", "galaxy"],
    missions: ["mission", "apollo", "rover", "spacecraft"],
  };

  const filteredData = data.filter((item: any) => {
    const content = `${item.title} ${item.explanation}`.toLowerCase();
    return keywords[category]?.some((keyword) => content.includes(keyword.toLowerCase()));
  });

  if (filteredData.length === 0) {
    throw new Error("No celestial bodies found for this category.");
  }

  return filteredData;
}



export default function CelestialBody() {
  const { celestialBody } = useParams(); // Pega o parâmetro da URL
  const loaderData = useLoaderData<any[]>();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 capitalize">
        {celestialBody}
      </h2>

      {loaderData.length === 0 ? (
        <p>No celestial bodies found for this category.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loaderData.map((body: any, index: number) => (
            <li
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={body.url}
                alt={body.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{body.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {body.explanation.substring(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
