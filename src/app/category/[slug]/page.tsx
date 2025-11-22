import { categories, products } from "../../../lib/data";
import ProductCard from "../../../components/ProductCard";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return notFound();
  const filtered = products.filter((p) => p.category === cat.slug);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{cat.name}</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
