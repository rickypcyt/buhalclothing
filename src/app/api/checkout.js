import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cart, customerInfo } = req.body;

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cart`,
      metadata: customerInfo,
    });

    await supabase.from('orders').insert([
      { name: customerInfo.name, email: customerInfo.email, address: customerInfo.address, cart }
    ]);

    res.json({ id: session.id });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
