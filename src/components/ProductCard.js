import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-md text-center">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-400">${product.price}</p>
      <button
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
