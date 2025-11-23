import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { Product } from "../lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition p-3 flex flex-col">
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="rounded mb-2 object-cover h-32 w-full"
        />
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
      </Link>
      <p className="text-xs text-gray-500 mb-1">{product.unit}</p>
      <p className="font-semibold mb-2">₹{product.price.toFixed(2)}</p>
      <AddToCartButton product={product} small />
    </div>
  );
}
