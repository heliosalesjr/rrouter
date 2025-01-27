import { useState } from "react";

const categories = [
  { id: "planets", name: "Planets from the solar system", icon: "🪐" },
  { id: "stars", name: "Stars and galaxies", icon: "🌟" },
  { id: "missions", name: "Space Missions", icon: "🚀" },
];

const keywords: { [key: string]: string[] } = {
  planets: ["Mars", "Earth", "Venus", "Jupiter", "Saturn", "Neptune", "Uranus"],
  stars: ["star", "sun", "nebula", "galaxy"],
  missions: ["mission", "apollo", "rover", "spacecraft"],
};

export default function Universe() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const fetchCategoryData = async (categoryId: string) => {
    setLoading(true);
    setResults([]);
    try {
      const apiKey = process.env.REACT_APP_NASA_API_KEY;
      const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`);
      if (!res.ok) throw new Error("Failed to fetch data from NASA API");

      const data = await res.json();
      const filteredData = data.filter((item: any) => {
        const content = `${item.title} ${item.explanation}`.toLowerCase();
        return keywords[categoryId]?.some((keyword) => content.includes(keyword.toLowerCase()));
      });

      setResults(filteredData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchCategoryData(categoryId);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-700 text-center py-4">Explore the Universe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center 
              rounded-xl p-4 shadow-lg cursor-pointer transition-transform transform hover:scale-105 
              ${selectedCategory === category.id ? "bg-sky-500 text-white" : "bg-white text-gray-900"}
              hover:bg-sky-500 hover:text-white`}
          >
            <div className="text-4xl">{category.icon}</div>
            <h3 className="text-lg font-bold mt-2">{category.name}</h3>
          </div>
        ))}
      </div>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}

      {!loading && selectedCategory && results.length === 0 && (
        <p className="text-gray-600 text-center">
          No celestial bodies found for the category "{selectedCategory}".
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((body, index) => (
            <div
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
