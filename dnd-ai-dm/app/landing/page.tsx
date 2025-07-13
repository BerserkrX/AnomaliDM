// app/landing/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, Globe2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-background z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo placeholder - swap with your image/logo */}
          <Link href="#" className="text-xl font-bold">
            AnomaliDM
          </Link>
          {/* Nav links */}
          <ul className="flex space-x-6">
            <li>
              <Link href="#features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#waitlist" className="hover:underline">
                Waitlist
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>

      <main className="h-[calc(100vh-4rem)] overflow-y-auto bg-background text-foreground flex flex-col items-center justify-start px-4 py-16">
        {/* Hero Section with Background Image */}
        <section
          id="waitlist"
          className="relative w-full bg-cover bg-center mb-16"
          style={{
            backgroundImage: "url('/images/landing-hero.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 40%',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex flex-col items-center text-center py-32 px-4">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Welcome to the Realm of the AI DM
            </h1>
            <p className="text-lg mb-6 text-muted-foreground max-w-xl">
              Revolutionizing your tabletop adventures with AI-driven storytelling.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd8E_ED02zBa0PldH9_utDZ7R2rLuOSx10oE6sjFB8alQI7sA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Waitlist
              </a>
            </Button>
          </div>
        </section>

        {/* Feature Cards */}
        <section id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mb-16">
          <Link
            href="#feature-magical"
            className="group bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary"
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary group-hover:scale-105 transition" />
            <h3 className="text-xl font-semibold mb-2">Magical Narratives</h3>
            <p className="text-sm text-muted-foreground">
              AI weaves story arcs that react to every choice, making each session unique.
            </p>
          </Link>
          <Link
            href="#feature-encounters"
            className="group bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-secondary"
          >
            <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-secondary group-hover:scale-105 transition" />
            <h3 className="text-xl font-semibold mb-2">Smarter Encounters</h3>
            <p className="text-sm text-muted-foreground">
              Dynamic challenges adjust to your party’s strengths and play style.
            </p>
          </Link>
          <Link
            href="#feature-worlds"
            className="group bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-accent"
          >
            <Globe2 className="mx-auto mb-4 h-8 w-8 text-accent group-hover:scale-105 transition" />
            <h3 className="text-xl font-semibold mb-2">Living Worlds</h3>
            <p className="text-sm text-muted-foreground">
              Persistent worlds remember your triumphs, failures, and allies.
            </p>
          </Link>
        </section>

        {/* In-Depth Feature Sections */}
        <section id="feature-magical" className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Magical Narratives</h2>
          <p className="text-lg text-muted-foreground">
            Dive deeper into our AI-driven storytelling engine. Characters evolve, plots branch,
            and every decision you make reshapes the world.
          </p>
        </section>

        <section id="feature-encounters" className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Smarter Encounters</h2>
          <p className="text-lg text-muted-foreground">
            Experience combat and challenges that scale with your party’s tactics and teamwork,
            ensuring balanced difficulty and engaging gameplay.
          </p>
        </section>

        <section id="feature-worlds" className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Living Worlds</h2>
          <p className="text-lg text-muted-foreground">
            Your journey leaves a mark. Towns remember your deeds, factions adapt,
            and your world grows richer with each session.
          </p>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-3xl mb-16">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <details className="mb-2">
            <summary className="cursor-pointer font-medium">How does the AI generate stories?</summary>
            <p className="mt-2 text-muted-foreground">
              Our AI uses a mix of large language models and custom prompts to craft narratives based
              on your party’s choices and campaign settings.
            </p>
          </details>
          <details className="mb-2">
            <summary className="cursor-pointer font-medium">Is my data secure?</summary>
            <p className="mt-2 text-muted-foreground">
              Absolutely—your data is encrypted in transit and at rest, and we follow best practices
              for user privacy.
            </p>
          </details>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mb-8">
          <p>Get ready to embark on your next adventure.</p>
        </footer>
      </main>
    </div>
  );
}
