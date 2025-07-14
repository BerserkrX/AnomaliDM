// app/pricing/page.tsx
'use client'
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

export default function Pricing() {
  const [loadingPrice, setLoadingPrice] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    setLoadingPrice(priceId);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const { sessionId } = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    }).then(r => r.json());
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  const plans = [
    { label: 'Silver', priceId: 'price_ABC...' },
    { label: 'Gold', priceId: 'price_DEF...' },
    { label: 'Platinum', priceId: 'price_GHI...' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 grid md:grid-cols-3 gap-8">
      {plans.map(p => (
        <div key={p.label} className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{p.label} Tier</h2>
          <p className="mb-6">
            ${p.label === 'Silver' ? 20 : p.label === 'Gold' ? 50 : 70}/mo
          </p>
          <button
            disabled={loadingPrice === p.priceId}
            onClick={() => handleSubscribe(p.priceId)}
            className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {loadingPrice === p.priceId ? 'Redirecting…' : `Subscribe`}
          </button>
        </div>
      ))}
    </div>
  );
}
