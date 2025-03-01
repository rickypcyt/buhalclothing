"use client";

import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price, 0));
  }, [cart]);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-5">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold border-b pb-4 mb-6">Tu Carrito</h1>
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-700">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-400">${item.price}</p>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <div className="mt-4 space-x-4">
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
                <Link href="/checkout">
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg">
                    Proceder al Pago
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}