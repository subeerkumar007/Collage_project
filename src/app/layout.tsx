import "./globals.css";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import { CartProvider } from "../context/CartContext";
import Providers from "../components/Providers";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Commerce",
  description: "Enjoy the fastest Delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="afterInteractive"
        />
        <Providers>
          <CartProvider>
            <Navbar />
            <div className="flex-1 container mx-auto px-4 py-4">{children}</div>
            <Footer />
            <CartSidebar />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
