import { supabase } from './supabase';
import { createObjectCsvWriter } from 'csv-writer';

export async function generateCSV() {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) throw error;

  const csvWriter = createObjectCsvWriter({
    path: 'orders.csv',
    header: [
      { id: 'id', title: 'Order ID' },
      { id: 'name', title: 'Name' },
      { id: 'address', title: 'Address' },
      { id: 'phone', title: 'Phone' },
      { id: 'cart', title: 'Products' },
    ],
  });

  await csvWriter.writeRecords(data.map(order => ({
    id: order.id,
    name: order.name,
    address: order.address,
    phone: order.phone,
    cart: order.cart.map(p => `${p.name} (x${p.quantity})`).join(', '),
  })));

  console.log('CSV generado exitosamente.');
}
