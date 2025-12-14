"use client";

import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PlayGames } from "@/components/sections/PlayGames";
import { Features } from "@/components/sections/Features";
import { WhyPuzzleBite } from "@/components/sections/WhyPuzzleBite";
import { Pricing } from "@/components/sections/Pricing";
import { Story } from "@/components/sections/Story";
import { Contact } from "@/components/sections/Contact";

import { ParallaxBackground } from "@/components/ui/ParallaxBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ParallaxBackground />
      <Hero />
      <HowItWorks />
      <PlayGames />
      <Features />
      <WhyPuzzleBite />
      <Pricing />
      <Story />
      <Contact />
    </main>
  );
}
