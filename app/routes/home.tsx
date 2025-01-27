import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Space Odyssey" },
    { name: "Check out the universe!", content: "Welcome to Space Odyssey" },
  ];
}

export default function Home() {
  const [imageData, setImageData] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const res = await fetch(
          `https://images-api.nasa.gov/search?q=galaxy&media_type=image`
        );
        if (!res.ok) throw new Error("Failed to fetch data from NASA API");

        const data = await res.json();
        const items = data.collection?.items || [];
        if (items.length > 0) {
          // Seleciona uma imagem aleatória do conjunto retornado
          const randomItem = items[Math.floor(Math.random() * items.length)];
          const imageLink = randomItem.links?.[0]?.href;
          const imageTitle = randomItem.data?.[0]?.title || "Untitled";

          if (imageLink) {
            setImageData({ url: imageLink, title: imageTitle });
          } else {
            console.warn("No image link found for the selected item.");
          }
        } else {
          console.warn("No images found in the response.");
        }
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };

    fetchRandomImage();
  }, []); // Executa uma única vez ao carregar a página.

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {imageData ? (
        <>
          <img
            src={imageData.url}
            alt={imageData.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            {imageData.title}
          </p>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 animate-pulse">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="block xl:inline">Explore Celestial Bodies with </span>
          <span className="block text-sky-300 xl:inline">Space Odyssey</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl">
          Travel through space and time. Learn about the planets, stars, and galaxies that make up our universe.
        </p>
        <div className="flex mt-6 space-x-4">
          <Link
            to="/universe"
            className="flex items-center justify-center px-6 py-3 text-lg text-white bg-sky-600 rounded-md hover:bg-sky-700"
          >
            Explore Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <Link
            to="/about"
            className="flex items-center px-6 py-3 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
