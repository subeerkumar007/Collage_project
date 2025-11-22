"use client";
import { useCart, CartItem } from "../../context/CartContext";
import AddToCartButton from "../../components/AddToCartButton";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 && <p>Your cart is empty.</p>}
      <ul className="space-y-4">
        {items.map((i: CartItem) => (
          <li
            key={i.id}
            className="flex items-center gap-4 bg-white p-4 rounded shadow-sm"
          >
            <img
              src={i.image}
              alt={i.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{i.name}</p>
              <p className="text-sm text-gray-500">₹{i.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(i.id, Math.max(1, i.quantity - 1))
                  }
                  className="px-2 py-1 bg-gray-100 rounded"
                >
                  -
                </button>
                <span>{i.quantity}</span>
                <button
                  onClick={() => updateQuantity(i.id, i.quantity + 1)}
                  className="px-2 py-1 bg-gray-100 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeItem(i.id)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <div className="mt-6 text-right space-y-2">
          <p className="text-lg font-semibold">
            Subtotal: ₹{subtotal.toFixed(2)}
          </p>
          <button className="px-4 py-2 bg-brand rounded font-semibold">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
