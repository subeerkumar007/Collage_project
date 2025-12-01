"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartSidebar() {
  const {
    items,
    subtotal,
    deliveryFee,
    grandTotal,
    totalItems,
    removeItem,
    increment,
    decrement,
  } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-4 py-3 rounded-full bg-brand shadow font-semibold"
      >
        Cart ({totalItems})
      </button>

      {open && (
        <div className="absolute left-0 right-0 bottom-0 sm:bottom-16 sm:right-0 sm:left-auto sm:w-96 max-h-[70vh] overflow-y-auto bg-white rounded-t-lg sm:rounded-lg shadow-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Cart ({totalItems})</h3>
            {subtotal > 0 && (
              <p className="text-xs text-gray-500">
                ₹{(499 - subtotal > 0 ? 499 - subtotal : 0).toFixed(0)} away from free delivery
              </p>
            )}
          </div>
          {items.length === 0 && <p className="text-sm text-gray-500">Your cart is empty.</p>}

          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex gap-3 items-start text-sm border border-gray-100 rounded-lg p-2">
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-16 h-16 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-medium line-clamp-2">{i.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹{i.price.toFixed(2)} × {i.quantity}
                  </p>
                  <div className="mt-2 inline-flex items-center rounded bg-brand text-white font-semibold w-28 justify-between">
                    <button
                      onClick={() => decrement(i.id)}
                      aria-label={`Decrease quantity of ${i.name}`}
                      className="px-2"
                    >
                      -
                    </button>
                    <div className="px-2 text-center">{i.quantity}</div>
                    <button
                      onClick={() => increment(i.id)}
                      aria-label={`Increase quantity of ${i.name}`}
                      className="px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(i.id)}
                  className="text-red-600 text-xs uppercase tracking-wide"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {items.length > 0 && (
            <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              <Link
                href="/cart"
                className="block text-center w-full bg-brand rounded py-2 font-semibold"
              >
                Review Cart
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
