import React from "react";
import { getOrders } from "../../lib/orders";

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin — Orders & Ratings</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-600">Order ID: {o.id}</div>
                <div className="font-semibold">User: {o.user}</div>
                <div className="text-xs text-gray-500">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{o.total.toFixed(2)}</div>
                <div className="text-sm">Status: {o.status}</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <div className="font-medium">Items</div>
                <ul className="mt-2 space-y-1">
                  {o.items.map((it) => (
                    <li key={it.productId} className="text-sm">
                      {it.name} — {it.quantity} x ₹{it.price} = ₹
                      {(it.price * it.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-medium">Rating & Feedback</div>
                {typeof o.rating === "number" ? (
                  <div className="mt-2 text-sm">
                    <div>Rating: {o.rating} / 5</div>
                    <div className="text-gray-700 mt-1">
                      "{o.feedback ?? "—"}"
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-gray-500">
                    No rating yet
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
