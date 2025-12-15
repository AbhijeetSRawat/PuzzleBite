"use client";

import { useState } from "react";
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { BurgerBountyGame } from "@/components/games/BurgerBountyGame";
import { VortellisPizzaGame } from "@/components/games/VortellisPizzaGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { WhackAMole } from "@/components/games/WhackAMole";
import { Game2048 } from "@/components/games/Game2048";
import { TriviaGame } from "@/components/games/TriviaGame";
import { DiscountModal } from "@/components/ui/DiscountModal";
import { Gamepad2, Grid, Brain, MousePointer2, Hash, HelpCircle, Utensils, Car } from "lucide-react";

const games = [
    {
        id: "burger",
        title: "Burger Bounty",
        description: "Run your own burger joint! Cook, serve, and manage your restaurant in this addictive simulation game.",
        color: "bg-gradient-to-br from-orange-500 to-red-700",
        icon: Utensils
    },
    {
        id: "pizza",
        title: "Vortelli's Pizza",
        description: "Deliver pizzas in an open world! Drive fast, avoid traffic, and satisfy hungry customers.",
        color: "bg-gradient-to-br from-red-500 to-yellow-600",
        icon: Car
    },
    {
        id: "memory",
        title: "Memory Match",
        description: "Test your memory by finding matching pairs of cards.",
        color: "bg-gradient-to-br from-purple-500 to-violet-700",
        icon: Brain
    },
    {
        id: "whack",
        title: "Whack-a-Mole",
        description: "Hit the moles as they pop up! Test your reflexes.",
        color: "bg-gradient-to-br from-red-500 to-rose-700",
        icon: MousePointer2
    },
    {
        id: "2048",
        title: "2048",
        description: "Combine tiles to reach the elusive 2048 tile.",
        color: "bg-gradient-to-br from-yellow-500 to-amber-700",
        icon: Hash
    },
    {
        id: "trivia",
        title: "Trivia Quiz",
        description: "Answer questions across various categories to test your knowledge.",
        color: "bg-gradient-to-br from-pink-500 to-fuchsia-700",
        icon: HelpCircle
    },
];

export function PlayGames() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [showDiscount, setShowDiscount] = useState(false);

    const handleGameComplete = () => {
        setSelectedGame(null);
        setShowDiscount(true);
    };

    return (
        <section className="py-20 mb-20 bg-background relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 h-[600px] md:h-[800px]">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
                    Play Games
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Dive into our collection of immersive games. Select a card to start playing!
                </p>

                <ScrollStack itemDistance={70} itemStackDistance={20} >
                    {games.map((game) => (
                        <ScrollStackItem key={game.id} itemClassName={`${game.color} text-white`}>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                                            <game.icon className="w-6 h-6 md:w-8 md:h-8" />
                                            {game.title}
                                        </h3>
                                        <p className="text-base md:text-lg opacity-90 leading-relaxed max-w-xl">{game.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                                        onClick={() => setSelectedGame(game.id)}
                                    >
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>

            {/* Game Components Rendered Here */}
            {selectedGame === "burger" && <BurgerBountyGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "pizza" && <VortellisPizzaGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "memory" && <MemoryGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "whack" && <WhackAMole onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "2048" && <Game2048 onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "trivia" && <TriviaGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}

            <DiscountModal isOpen={showDiscount} onClose={() => setShowDiscount(false)} />
        </section>
    );
}
