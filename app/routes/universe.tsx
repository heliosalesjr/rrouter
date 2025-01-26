import { Link } from "react-router";
import { useEffect, useState } from "react";

export async function clientLoader() {
  const apiKey = process.env.REACT_APP_NASA_API_KEY;

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=6`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error fetching data: ${res.status} - ${errorText}`);
    throw new Error(`Error fetching data: ${res.status}`);
  }

  const data = await res.json();
  return data;
}


export default function Universe({ loaderData }: { loaderData: any[] }) {
  const [search, setSearch] = useState<string>("");
  const [filteredBodies, setFilteredBodies] = useState<any[]>(loaderData);

  useEffect(() => {
    const filtered = loaderData.filter((body: any) =>
      body.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBodies(filtered);
  }, [search, loaderData]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Universe</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search celestial bodies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {filteredBodies.length === 0 ? (
        <div> No celestial bodies match your search. </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBodies.map((body: any, index: number) => (
            <li
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <Link
                to={`/universe/${body.title}`}
                className="text-sky-600 hover:underline text-lg font-semibold"
              >
                {body.title}
              </Link>
              <img
                src={body.url}
                alt={body.title}
                className="w-full h-40 object-cover mt-2 rounded"
              />
              <div className="text-gray-600 text-sm mt-1">
                {body.explanation.substring(0, 100)}...
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
