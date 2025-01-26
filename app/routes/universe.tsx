import { Link } from "react-router";

const categories = [
  { id: "planets", name: "Planetas do Sistema Solar" },
  { id: "stars", name: "Estrelas e Galáxias" },
  { id: "missions", name: "Missões Espaciais" },
];

export default function Universe() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Explore o Universo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <Link
              to={`/universe/${category.id}`}
              className="text-sky-600 hover:underline text-lg font-semibold"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
