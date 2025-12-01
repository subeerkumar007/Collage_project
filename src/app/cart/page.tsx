"use client";
import { useCart, CartItem } from "../../context/CartContext";

export default function CartPage() {
  const {
    items,
    subtotal,
    deliveryFee,
    grandTotal,
    removeItem,
    increment,
    decrement,
    clear,
    totalItems,
  } = useCart();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="text-sm text-gray-500">
            {totalItems} item{totalItems === 1 ? "" : "s"} in your basket
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="text-sm text-red-600 font-semibold hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
          Your cart is empty. Browse categories to add some products.
        </div>
      )}

      <ul className="space-y-4">
        {items.map((i: CartItem) => (
          <li
            key={i.id}
            className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 flex-1">
              <img
                src={i.image}
                alt={i.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{i.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{i.price.toFixed(2)} each
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrement(i.id)}
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    -
                  </button>
                  <span className="font-semibold">{i.quantity}</span>
                  <button
                    onClick={() => increment(i.id)}
                    className="px-3 py-1 bg-gray-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between md:w-48">
              <p className="font-semibold">
                ₹{(i.quantity * i.price).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(i.id)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-semibold border-t border-gray-100 pt-3">
              <span>Total payable</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="mt-5 w-full px-4 py-3 bg-brand rounded-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
