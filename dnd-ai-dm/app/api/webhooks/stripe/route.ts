
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-06-30.basil' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature mismatch', error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  const data = event.data.object as any;
  const userId = data.metadata?.userId;

  switch (event.type) {
    case 'checkout.session.completed':
    case 'invoice.payment_succeeded':
      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          stripe_price: data.subscription ? (await stripe.subscriptions.retrieve(data.subscription)).items.data[0].price.id : data.price.id,
          status: 'active',
          current_period_end: new Date(data.current_period_end * 1000).toISOString(),
        })
        .eq('user_id', userId);
      break;
    case 'customer.subscription.deleted':
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('user_id', userId);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
