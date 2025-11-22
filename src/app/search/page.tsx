import { products } from "../../lib/data";

interface Props {
  searchParams: { q?: string };
}

export default function SearchResultsPage({ searchParams }: Props) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const filtered = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : [];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Search Results{" "}
        {q && (
          <span className="text-base font-medium text-gray-500">for "{q}"</span>
        )}
      </h1>
      {q === "" && (
        <p className="text-sm text-gray-500">
          Type something in the search box above.
        </p>
      )}
      {q !== "" && filtered.length === 0 && (
        <p className="text-sm">No products found.</p>
      )}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white p-3 rounded shadow-sm flex flex-col"
          >
            <img
              src={p.image}
              alt={p.name}
              className="rounded mb-2 object-cover h-32 w-full"
            />
            <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
              {p.name}
            </h3>
            <p className="text-xs text-gray-500 mb-1">{p.unit}</p>
            <p className="font-semibold mb-2">₹{p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
