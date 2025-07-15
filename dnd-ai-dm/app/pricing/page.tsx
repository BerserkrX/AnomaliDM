// app/pricing/page.tsx
'use client'

import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { useState } from 'react'

interface Plan {
  label: string
  priceId: string
  price: number
  usageLimit: string
  features: string[]
  image: string
}

const plans: Plan[] = [
  {
    label: 'Silver',
    priceId: 'price_ABC...',
    price: 20,
    usageLimit: '100,000 tokens',
    features: ['Solo & duo one-shots', 'Up to 1 active campaign', 'Email support'],
    image: '/coins/silver.png',
  },
  {
    label: 'Gold',
    priceId: 'price_DEF...',
    price: 50,
    usageLimit: '300,000 tokens',
    features: [
      'Everything in Silver',
      'Up to 3 active campaigns',
      'Priority email support',
      'Campaign analytics',
    ],
    image: '/coins/gold.png',
  },
  {
    label: 'Platinum',
    priceId: 'price_GHI...',
    price: 70,
    usageLimit: '1,000,000 tokens',
    features: [
      'Everything in Gold',
      'Unlimited campaigns',
      'Live chat support',
      'Early access to new features',
    ],
    image: '/coins/platinum.png',
  },
]

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId)
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    )
    const { sessionId } = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    }).then((r) => r.json())

    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId })
    }
  }

  return (
    <section
      id="pricing"
      className="relative py-20 px-4 bg-background text-foreground"
    >
      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12">
          Flexible pricing for every adventurer
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isPopular = plan.label === 'Gold'
            return (
              <div
                key={plan.label}
                className={`relative flex flex-col items-center text-center rounded-lg p-8 border backdrop-blur-lg
                  ${isPopular
                    ? 'border-amber-400 bg-gray-800/80'
                    : 'border-gray-700 bg-gray-800/60'}
                `}
              >
                {/* Coin Icon */}
                <div className="absolute -top-10">
                  <Image
                    src={plan.image}
                    width={60}
                    height={60}
                    alt={`${plan.label} tier coin`}
                  />
                </div>

                {isPopular && (
                  <span className="mt-8 mb-4 px-3 py-1 bg-amber-400 text-black rounded-full text-xs font-semibold">
                    Most popular
                  </span>
                )}

                <h2 className="mt-4 text-2xl font-semibold">{plan.label}</h2>
                <p className="mt-2 text-4xl font-bold">
                  ${plan.price}
                  <span className="text-lg font-medium text-gray-400">/mo</span>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {plan.usageLimit} / month
                </p>

                <ul className="mt-6 space-y-2 text-left w-full">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start">
                      <span
                        className={`mt-1 mr-3 h-3 w-3 flex-shrink-0 rounded-full ${
                          isPopular ? 'bg-amber-400' : 'bg-indigo-400'
                        }`}
                      />
                      <span className="text-gray-200">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={loading === plan.priceId}
                  onClick={() => handleSubscribe(plan.priceId)}
                  className={`mt-auto w-full mt-8 py-3 rounded-lg font-semibold transition 
                    ${
                      isPopular
                        ? 'bg-amber-500 text-gray-900 hover:opacity-90'
                        : 'bg-indigo-600 text-white hover:opacity-90'
                    } disabled:opacity-50`}
                >
                  {loading === plan.priceId ? 'Redirecting…' : 'Subscribe'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
