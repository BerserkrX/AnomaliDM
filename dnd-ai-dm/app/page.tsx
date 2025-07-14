// app/landing/page.tsx
'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, Globe2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-background z-50">
        <nav className="flex items-center justify-between h-16 p-4">
          {/* Logo & Branding on the left */}
          <Link href="/" className="flex items-center space-x-2">
            <NextImage
              src="/logo.png"
              alt="AnomaliDM"
              width={150}
              height={48}
              style={{ width: 'auto', height: '3rem' }}
            />
            <span className="text-xl font-bold text-foreground font-serif">AnomaliDM</span>
          </Link>

          {/* Nav links on the right */}
          <ul className="flex space-x-6">
            <li><Link href="#features" className="hover:underline">Features</Link></li>
            <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="#waitlist" className="hover:underline">Waitlist</Link></li>
          </ul>
        </nav>
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      <main className="h-[calc(100vh-4rem)] overflow-y-auto bg-background text-foreground flex flex-col items-center justify-start px-4 pt-6 pb-16">
        {/* Hero Section */}
        <section
          id="waitlist"
          className="relative w-full bg-cover bg-center mb-10"
          style={{
            backgroundImage: "url('/images/landing-hero.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 40%',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center text-center py-32 px-4">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Your Party. Your Quest. Our Intelligence.
            </h1>
            <p className="text-lg mb-6 text-card-foreground max-w-xl">
              Let Anomali craft the world. You shape the story.
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
        <section id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mb-8">
          <Link
            href="#feature-magical"
            className="group bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary"
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary group-hover:scale-105 transition" />
            <h3 className="text-xl font-semibold mb-2">Play Without a DM</h3>
            <p className="text-sm text-muted-foreground">
                If your group is missing a DM, you need a break, or you&#39;re a forever-DM who finally wants to play, Anomali runs the game for you.
            </p>
          </Link>
          <Link
            href="#feature-encounters"
            className="group bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-secondary"
          >
            <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-secondary group-hover:scale-105 transition" />
            <h3 className="text-xl font-semibold mb-2">Cinematic Storytelling</h3>
            <p className="text-sm text-muted-foreground">
                Anomali creates rich worlds, NPCs, and encounters based on your tone and theme. It adapts to your choices and keeps you immersed.
            </p>
          </Link>
          <Link
            href="#feature-worlds"
            className="group bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-accent"
          >
            <Globe2 className="mx-auto mb-4 h-8 w-8 text-accent group-hover:scale-105 transition" />
            <h3 className="text-xl font-semibold mb-2">Living Worlds</h3>
            <p className="text-sm text-muted-foreground">
              Run a full campaign with your entire group. Persistent worlds remember your triumphs, failures, and allies.
            </p>
          </Link>
        </section>
        {/* Decorative line under feature cards */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-2/3 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-60" />
        </div>

        {/* In-Depth Feature Details (alternating image/description) */}
        <section id="features-details" className="flex flex-col gap-12 w-full max-w-4xl lg:w-2/3 mx-auto mb-16">
          {/* 1st feature: image left, text right */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <NextImage src="/images/play-without-dm.png" alt="Play Without a DM" width={384} height={384} className="w-96 h-96 object-contain mb-4 md:mb-0" />
            <div className="md:text-left text-center">
              <h2 className="text-3xl font-bold mb-2">Play Without a DM</h2>
              <p className="text-lg text-muted-foreground">
                Whether you&rsquo;re down a Dungeon Master, taking a break, or you&rsquo;re the forever-DM who never gets to play, Anomali has your back.
                With intelligent storytelling, turn-based interaction, and fully automated rule interpretation, you no longer need a human behind the screen.
                Anomali becomes your Game Master &mdash; available 24/7, never burned out, always in character.
                Finally, you can enjoy the thrill of discovery from the player&rsquo;s side of the table &mdash; without sacrificing narrative depth or structure.
              </p>
            </div>
          </div>
          {/* 2nd feature: text left, image right */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6">
            <NextImage src="/images/cinematic-storytelling.png" alt="Cinematic Storytelling" width={384} height={384} className="w-96 h-96 object-contain mb-4 md:mb-0" />
            <div className="md:text-right text-center">
              <h2 className="text-3xl font-bold mb-2">Cinematic Storytelling</h2>
              <p className="text-lg text-muted-foreground">
                Tabletop RPGs are at their best when the story pulls you in, and that&rsquo;s exactly what Anomali is built to do.
                Our AI Dungeon Master creates immersive environments, dynamic characters, and tone-driven narratives tailored to your party&rsquo;s actions.
                From tense diplomacy to chaotic combat, Anomali adapts the pacing and tension to your choices in real time with no scripts, no repetition, and no boring exposition.
                It won&rsquo;t matter if you want dark and gritty or whimsical and wild, every session will feel like an epic tale worth remembering.
              </p>
            </div>
          </div>
          {/* 3rd feature: image left, text right */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <NextImage src="/images/living-worlds.png" alt="Living Worlds" width={384} height={384} className="w-96 h-96 object-contain mb-4 md:mb-0" />
            <div className="md:text-left text-center">
              <h2 className="text-3xl font-bold mb-2">Living Worlds</h2>
              <p className="text-lg text-muted-foreground">
                Anomali doesn&rsquo;t just generate one-shot adventures, it builds worlds that evolve with your group.
                The towns you visit, the NPCs you talk to, the enemies you face, they all remember.
                Factions rise and fall based on your choices. Allies might become enemies. Ruins may crumble, but the legends you leave behind will echo forever.
                This is more than a game session. It&rsquo;s a persistent, evolving narrative universe shaped entirely by your party&rsquo;s decisions.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-3xl w-full mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <details className="mb-2 w-full">
            <summary className="cursor-pointer font-medium">How does the AI generate stories?</summary>
            <p className="mt-2 text-muted-foreground">
              Our AI uses a mix of large language models and custom prompts to craft narratives based
              on your party’s choices and campaign settings.
            </p>
          </details>
          <details className="mb-2 w-full">
            <summary className="cursor-pointer font-medium">Is my data secure?</summary>
            <p className="mt-2 text-muted-foreground">
              Absolutely—your data is encrypted in transit and at rest, and we follow best practices
              for user privacy.
            </p>
          </details>
          <details className="mb-2 w-full">
            <summary className="cursor-pointer font-medium">What if I want to change my character?</summary>
            <p className="mt-2 text-muted-foreground">
              No problem! You can modify your character&#39;s traits, backstory, and appearance at any time
              during the campaign. Just let the AI know what changes you&#39;d like to make.
            </p>
          </details>
            <details className="mb-2 w-full">
                <summary className="cursor-pointer font-medium">Can I play solo?</summary>
                <p className="mt-2 text-muted-foreground">
                Yes! Anomali can run solo adventures, allowing you to experience the game even without a full party.
                </p>
            </details>
            <details className="mb-2 w-full">
                <summary className="cursor-pointer font-medium">What can I play?</summary>
                <p className="mt-2 text-muted-foreground">
                Anomali supports a wide range of tabletop RPG systems, including Dungeons & Dragons, Pathfinder, and more. You can create custom campaigns or use existing modules to get started.
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
