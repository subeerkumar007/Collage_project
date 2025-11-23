"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartSidebar() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const count = items.reduce((a, c) => a + c.quantity, 0);
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-4 py-3 rounded-full bg-brand shadow font-semibold"
      >
        Cart ({count})
      </button>
      {open && (
        <div className="absolute bottom-16 right-0 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 space-y-4">
          <h3 className="font-semibold">Cart ({count})</h3>
          {items.length === 0 && <p className="text-sm">Cart empty.</p>}
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex gap-2 items-start text-sm">
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-15 h-15 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium line-clamp-2">{i.name}</p>
                  <p>₹{i.price.toFixed(2)}</p>
                  <div className="mt-1">
                    <div className="inline-flex items-center rounded bg-brand text-white font-semibold w-28 justify-between">
                      <button
                        onClick={() => {
                          if (i.quantity > 1)
                            updateQuantity(i.id, i.quantity - 1);
                          else removeItem(i.id);
                        }}
                        aria-label={`Decrease quantity of ${i.name}`}
                        className="px-2"
                      >
                        -
                      </button>
                      <div className="px-2 text-center">{i.quantity}</div>
                      <button
                        onClick={() => updateQuantity(i.id, i.quantity + 1)}
                        aria-label={`Increase quantity of ${i.name}`}
                        className="px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(i.id)}
                  className="text-red-600 text-xs"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold">Subtotal: ₹{subtotal.toFixed(2)}</p>
              <Link
                href="/cart"
                className="block text-center w-full bg-brand rounded py-2 font-semibold"
              >
                Go to Cart
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
