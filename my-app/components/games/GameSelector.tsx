"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Grid, Brain, MousePointer2, Hash, HelpCircle } from "lucide-react";
import { DiscountModal } from "@/components/ui/DiscountModal";
import { SnakeGame } from "@/components/games/SnakeGame";
import { TicTacToe } from "@/components/games/TicTacToe";
import { MemoryGame } from "@/components/games/MemoryGame";
import { WhackAMole } from "@/components/games/WhackAMole";
import { Game2048 } from "@/components/games/Game2048";
import { TriviaGame } from "@/components/games/TriviaGame";

interface GameSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

const games = [
    { id: "snake", name: "Snake", icon: Gamepad2, color: "text-green-500", bg: "bg-green-500/10" },
    { id: "tictactoe", name: "Tic Tac Toe", icon: Grid, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "memory", name: "Memory Match", icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: "whack", name: "Whack-a-Mole", icon: MousePointer2, color: "text-red-500", bg: "bg-red-500/10" },
    { id: "2048", name: "2048", icon: Hash, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { id: "trivia", name: "Trivia Quiz", icon: HelpCircle, color: "text-pink-500", bg: "bg-pink-500/10" },
];

export function GameSelector({ isOpen, onClose }: GameSelectorProps) {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [showDiscount, setShowDiscount] = useState(false);

    const handleGameComplete = () => {
        // Close game and show discount
        setSelectedGame(null);
        setShowDiscount(true);
    };

    const handleCloseDiscount = () => {
        setShowDiscount(false);
        onClose();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && !selectedGame && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={onClose}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-gray-900 border border-white/10 p-8 rounded-2xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-3xl font-bold mb-2 text-center">Choose a Challenge</h2>
                            <p className="text-gray-400 text-center mb-8">Play a game to unlock your discount!</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {games.map((game) => (
                                    <button
                                        key={game.id}
                                        onClick={() => setSelectedGame(game.id)}
                                        className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 transition-all group"
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${game.bg} group-hover:scale-110 transition-transform`}>
                                            <game.icon className={`w-8 h-8 ${game.color}`} />
                                        </div>
                                        <span className="font-bold text-lg">{game.name}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Game Components Rendered Here */}
            {selectedGame === "snake" && <SnakeGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "tictactoe" && <TicTacToe onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "memory" && <MemoryGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "whack" && <WhackAMole onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "2048" && <Game2048 onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}
            {selectedGame === "trivia" && <TriviaGame onClose={() => setSelectedGame(null)} onComplete={handleGameComplete} />}

            <DiscountModal isOpen={showDiscount} onClose={handleCloseDiscount} />
        </>
    );
}
