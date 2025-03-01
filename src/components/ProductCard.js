"use client";

import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-black border border-gray-700 p-6 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <img 
        src={product.image} 
        alt={product.name} 
        className="h-52 w-full object-cover rounded-lg shadow-md" 
      />
      <h2 className="text-xl font-semibold mt-3 text-white">{product.name}</h2>
      <p className="text-gray-400 text-sm mt-1">{product.description}</p>
      <p className="text-gray-300 text-lg font-bold mt-2">${product.price}</p>
      <button
        className="mt-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white py-2 px-5 rounded-lg font-medium tracking-wide transition"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
