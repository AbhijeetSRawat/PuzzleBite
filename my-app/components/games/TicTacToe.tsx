"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, RefreshCw, Trophy, Circle } from "lucide-react";

interface TicTacToeProps {
    onClose: () => void;
    onComplete: () => void;
}

export function TicTacToe({ onClose, onComplete }: TicTacToeProps) {
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState(false);

    const checkWinner = (squares: (string | null)[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i: number) => {
        if (winner || board[i]) return;

        const newBoard = [...board];
        newBoard[i] = isXNext ? "X" : "O";
        setBoard(newBoard);

        const w = checkWinner(newBoard);
        if (w) {
            setWinner(w);
        } else if (!newBoard.includes(null)) {
            setIsDraw(true);
        } else {
            setIsXNext(!isXNext);
        }
    };

    // Computer move (simple random for now)
    useEffect(() => {
        if (!isXNext && !winner && !isDraw) {
            const timer = setTimeout(() => {
                const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
                if (emptyIndices.length > 0) {
                    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    handleClick(randomIndex);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, winner, isDraw, board]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsDraw(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-lg w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Tic Tac Toe</h2>
                    <p className="text-gray-400">Beat the AI to win a discount!</p>
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto mb-8">
                    {board.map((square, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            disabled={!!square || !!winner || !isXNext}
                            className={`h-24 rounded-lg bg-white/5 flex items-center justify-center text-4xl font-bold transition-colors ${!square && !winner && isXNext ? "hover:bg-white/10" : ""
                                }`}
                        >
                            {square === "X" && <X className="w-12 h-12 text-primary" />}
                            {square === "O" && <Circle className="w-10 h-10 text-accent" />}
                        </button>
                    ))}
                </div>

                {(winner || isDraw) && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4">
                            {winner === "X" ? "You Won!" : winner === "O" ? "AI Won!" : "It's a Draw!"}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={resetGame}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                <RefreshCw className="w-4 h-4" /> Play Again
                            </button>
                            {winner === "X" && (
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
