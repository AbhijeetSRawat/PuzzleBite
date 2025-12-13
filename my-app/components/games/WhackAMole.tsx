"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Trophy, MousePointer2 } from "lucide-react";

interface WhackAMoleProps {
    onClose: () => void;
    onComplete: () => void;
}

export function WhackAMole({ onClose, onComplete }: WhackAMoleProps) {
    const [score, setScore] = useState(0);
    const [activeHole, setActiveHole] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
            setGameOver(true);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    useEffect(() => {
        let moleTimer: NodeJS.Timeout;
        if (isPlaying) {
            moleTimer = setInterval(() => {
                const randomHole = Math.floor(Math.random() * 9);
                setActiveHole(randomHole);
                setTimeout(() => setActiveHole(null), 800);
            }, 1000);
        }
        return () => clearInterval(moleTimer);
    }, [isPlaying]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsPlaying(true);
        setGameOver(false);
    };

    const handleWhack = (index: number) => {
        if (index === activeHole) {
            setScore((prev) => prev + 1);
            setActiveHole(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-lg w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Whack-a-Mole</h2>
                    <p className="text-gray-400">Score 10 points in 30 seconds!</p>
                    <div className="flex justify-center gap-8 mt-4">
                        <div className="text-xl font-bold text-primary">Score: {score}</div>
                        <div className="text-xl font-bold text-accent">Time: {timeLeft}s</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 max-w-[300px] mx-auto">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square bg-white/10 rounded-full relative overflow-hidden cursor-pointer"
                            onClick={() => handleWhack(i)}
                        >
                            <AnimatePresence>
                                {activeHole === i && (
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="w-16 h-16 bg-primary rounded-full border-4 border-white/20 flex items-center justify-center">
                                            <div className="w-10 h-2 bg-black/30 rounded-full mb-4" />
                                            <div className="absolute top-4 w-2 h-2 bg-black rounded-full left-4" />
                                            <div className="absolute top-4 w-2 h-2 bg-black rounded-full right-4" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {!isPlaying && !gameOver && (
                    <div className="text-center">
                        <button
                            onClick={startGame}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold text-lg"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4">
                            {score >= 10 ? <span className="text-green-500">You Won!</span> : <span className="text-red-500">Time's Up!</span>}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={startGame}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                <RefreshCw className="w-4 h-4" /> Try Again
                            </button>
                            {score >= 10 && (
                                <button
                                    onClick={onComplete}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg animate-bounce"
                                >
                                    <Trophy className="w-4 h-4" /> Claim Reward
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
