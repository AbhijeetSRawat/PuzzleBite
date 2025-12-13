"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FloatingShapes } from "@/components/3d/FloatingShapes";
import { ArrowRight } from "lucide-react";
import { GameSelector } from "@/components/games/GameSelector";
import CurvedLoop from "@/components/ui/CurvedLoop";

export function Hero() {
    const [showGames, setShowGames] = useState(false);

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Premium dining atmosphere"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
            </div>

            <FloatingShapes />

            <CurvedLoop
                marqueeText="PuzzleBITE: Waiting can be fun..."
                speed={1}
                curveAmount={200}
                interactive={true}
                className="text-white/10"
            />

            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Turn <span className="text-gradient">Waiting Time</span> into <br />
                        <span className="text-gradient">Engagement Opportunities</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        PuzzleBITE helps cafes and restaurants keep guests entertained with fun puzzles and challenges — while boosting venue revenue.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowGames(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-primary/25 transition-all"
                    >
                        Get Started <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
                <span className="text-sm">Scroll to explore</span>
            </div>

            <GameSelector isOpen={showGames} onClose={() => setShowGames(false)} />
        </section>
    );
}
