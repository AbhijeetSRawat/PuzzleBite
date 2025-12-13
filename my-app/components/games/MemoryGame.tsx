"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, RefreshCw, Trophy, Star, Heart, Zap, Cloud, Sun, Moon, Music, Camera } from "lucide-react";

interface MemoryGameProps {
    onClose: () => void;
    onComplete: () => void;
}

const ICONS = [Star, Heart, Zap, Cloud, Sun, Moon, Music, Camera];

export function MemoryGame({ onClose, onComplete }: MemoryGameProps) {
    const [cards, setCards] = useState<{ id: number; icon: any; isFlipped: boolean; isMatched: boolean }[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const shuffledIcons = [...ICONS, ...ICONS]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({
                id: index,
                icon,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffledIcons);
        setFlippedCards([]);
        setMoves(0);
        setIsWon(false);
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [first, second] = newFlipped;

            if (cards[first].icon === cards[second].icon) {
                newCards[first].isMatched = true;
                newCards[second].isMatched = true;
                setCards(newCards);
                setFlippedCards([]);

                if (newCards.every(card => card.isMatched)) {
                    setIsWon(true);
                }
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[first].isFlipped = false;
                    resetCards[second].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-2xl w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Memory Match</h2>
                    <p className="text-gray-400">Match all pairs to win!</p>
                    <div className="text-xl font-bold text-primary mt-2">Moves: {moves}</div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    {cards.map((card) => (
                        <motion.button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`aspect-square rounded-lg flex items-center justify-center text-3xl transition-all ${card.isFlipped || card.isMatched ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {(card.isFlipped || card.isMatched) ? (
                                <card.icon className="w-8 h-8" />
                            ) : (
                                <span className="text-2xl text-gray-500">?</span>
                            )}
                        </motion.button>
                    ))}
                </div>

                {isWon && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 text-green-500">You Won!</h3>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={resetGame}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                <RefreshCw className="w-4 h-4" /> Play Again
                            </button>
                            <button
                                onClick={onComplete}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg animate-bounce"
                            >
                                <Trophy className="w-4 h-4" /> Claim Reward
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
