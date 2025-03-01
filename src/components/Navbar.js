"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Cart from "@/components/cart";
import { motion } from "framer-motion";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white py-4 px-6 fixed top-0 left-0 w-full z-50 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold tracking-wide uppercase">
            BUHAL CLOTHING
          </Link>

          {/* Menú de navegación */}
          <div className="flex space-x-6 text-lg">
            <div className="relative group">
              <button className="hover:text-gray-400">Products ▾</button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-black border border-gray-700 py-2 w-48">
                <Link href="/products" className="block px-4 py-2 hover:bg-gray-800">All Products</Link>
                <Link href="/categories/hats" className="block px-4 py-2 hover:bg-gray-800">Hats</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-gray-400">Info ▾</button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-black border border-gray-700 py-2 w-40">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-800">About Us</Link>
                <Link href="/contact" className="block px-4 py-2 hover:bg-gray-800">Contact</Link>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search" className="bg-gray-900 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500" />
            <span className="absolute right-3 top-2 text-gray-400">🔍</span>
          </div>

          {/* Botón del carrito con contador */}
          <button className="relative text-xl" onClick={() => setCartOpen(true)}>
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Modal del carrito */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setCartOpen(false)} // Cierra al hacer clic fuera
        >
          <motion.div 
            className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
          >
            <Cart />
            <button 
              onClick={() => setCartOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-xl"
            >
              ✖
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
