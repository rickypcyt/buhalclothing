import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) return <p>Error cargando productos</p>;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <section className="max-w-6xl mx-auto py-10 px-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
