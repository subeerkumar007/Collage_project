"use client";
import { useCart } from "../context/CartContext";
import { Product } from "../lib/products";

export default function AddToCartButton({
  product,
  small,
}: {
  product: Product;
  small?: boolean;
}) {
  const { addItem, items } = useCart();
  const existing = items.find((i) => i.id === product.id);
  const { removeItem, updateQuantity } = useCart();

  const onDecrease = () => {
    if (!existing) return;
    if (existing.quantity > 1) {
      updateQuantity(existing.id, existing.quantity - 1);
    } else {
      removeItem(existing.id);
    }
  };

  const onIncrease = () => addItem(product);

  if (existing) {
    return (
      <div
        className={`inline-flex items-center rounded bg-gradient-to-r from-purple-600 to-pink-600 text-black font-semibold w-full justify-between ${
          small ? "text-xs px-2 py-1" : "px-2 py-1"
        }`}
      >
        <button
          onClick={onDecrease}
          aria-label={`Decrease quantity of ${product.name}`}
          className={`px-2 ${small ? "text-sm" : "text-base"}`}
        >
          -
        </button>
        <div className="flex-1 text-center">{existing.quantity}</div>
        <button
          onClick={onIncrease}
          aria-label={`Increase quantity of ${product.name}`}
          className={`px-2 ${small ? "text-sm" : "text-base"}`}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => addItem(product)}
      className={`rounded ${
        small ? "text-xs px-2 py-1" : "px-4 py-2"
      } bg-gradient-to-r from-purple-600 to-pink-600 text-black font-semibold w-full`}
    >
      Add
    </button>
  );
}
