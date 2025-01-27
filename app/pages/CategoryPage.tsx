import { useLoaderData, useRouteError } from "react-router";

export default function CategoryPage() {
  const loaderData = useLoaderData() as any[];
  const error = useRouteError();

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Erro ao carregar dados</h1>
        <p className="mt-4 text-gray-600">
          {error.message || "Try again later"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Resultados</h2>
      {loaderData && loaderData.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loaderData.map((body, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{body.title}</h3>
              <img
                src={body.url}
                alt={body.title}
                className="w-full h-40 object-cover mt-2 rounded"
              />
              <p className="text-sm text-gray-600 mt-1">
                {body.explanation.substring(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
