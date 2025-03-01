import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) return <p className="text-center text-red-500 py-10">Error cargando productos</p>;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-center bg-cover" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <h1 className="relative text-5xl font-extrabold uppercase tracking-widest text-center">BUHAL CLOTHING</h1>
      </section>

      {/* Productos */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center col-span-full text-gray-400">No hay productos disponibles.</p>
        )}
      </section>
    </main>
  );
}
