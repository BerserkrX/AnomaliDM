import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Globe2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-10">
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
          Realm of the AI Dungeon Master
        </h1>

        <p className="text-lg mb-6 text-muted-foreground">
          Your quests are powered by magic and machine.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Button size="lg" className="bg-primary hover:bg-yellow-400 text-black">
            <Sparkles className="mr-2 h-5 w-5" /> Start Campaign
          </Button>

          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-foreground">
            Log In
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-4 text-center max-w-4xl">
        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-primary">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Magical Narratives</h3>
          <p className="text-sm text-muted-foreground">
            Your AI DM weaves story arcs from your decisions and desires.
          </p>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-secondary">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-secondary" />
          <h3 className="text-xl font-semibold mb-2">Smarter Encounters</h3>
          <p className="text-sm text-muted-foreground">
            Combat, puzzles, and diplomacy adapt to your party’s play style.
          </p>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-accent">
          <Globe2 className="mx-auto mb-4 h-8 w-8 text-accent" />
          <h3 className="text-xl font-semibold mb-2">Living Worlds</h3>
          <p className="text-sm text-muted-foreground">
            Persistent worlds remember your journey, friends, and rivals.
          </p>
        </div>
      </section>
    </main>
  );
}
