"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useCart, CartItem } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const { data: session } = useSession();
  const count = items.reduce((a: number, c: CartItem) => a + c.quantity, 0);
  const pathname = usePathname();

  const nav = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Fresh", href: "/category/fruits", icon: "🥬" },
    { label: "Vegetables", href: "/category/vegetables", icon: "🥦" },
    { label: "Dairy", href: "/category/dairy", icon: "🥛" },
    { label: "Bakery", href: "/category/bakery", icon: "🍞" },
    { label: "Beverages", href: "/category/beverages", icon: "🥤" },
    { label: "Snacks", href: "/category/snacks", icon: "🍪" },
    { label: "Personal", href: "/category/personal-care", icon: "🧴" },
    { label: "Household", href: "/category/household", icon: "🧹" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4">
        <Link href="/" className="text-3xl font-extrabold tracking-tight hover:scale-105 transition-transform">
          <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Rush
          </span>
          <span className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient ml-1">
            Now
          </span>
        </Link>
        <div className="flex-1 hidden md:block max-w-2xl">
          <SearchBar compact />
        </div>
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {session.user?.name?.split(" ")[0] || "User"}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all text-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
          <Link 
            href="/cart" 
            className="relative group"
          >
            <span className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105">
              Cart
            </span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full px-2.5 py-1 shadow-lg animate-pulse">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Enhanced category navigation bar */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <nav className="container mx-auto px-4 py-3 overflow-x-auto whitespace-nowrap scrollbar-thin">
          <ul className="flex items-center gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                    ${
                      isActive(item.href)
                        ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 shadow-md font-semibold"
                        : "text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 font-medium"
                    }
                  `}
                >
                  <span className={`text-lg leading-none ${isActive(item.href) ? 'opacity-100' : 'opacity-80'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
