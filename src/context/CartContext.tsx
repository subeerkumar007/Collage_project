"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../lib/products";

export interface CartItem extends Product {
  quantity: number;
}
interface CartState {
  items: CartItem[];
  addItem: (p: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
}

const CartCtx = createContext<CartState | undefined>(undefined);

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}
function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(items));
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(load());
  }, []);
  useEffect(() => {
    save(items);
  }, [items]);

  const addItem = (p: Product) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing)
        return prev.map((i) =>
          i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...p, quantity: 1 }];
    });
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  const clear = () => setItems([]);
  const subtotal = items.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <CartCtx.Provider
      value={{ items, addItem, removeItem, updateQuantity, clear, subtotal }}
    >
      {children}
    </CartCtx.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("CartContext missing");
  return ctx;
}
