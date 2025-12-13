"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, RefreshCw, Trophy } from "lucide-react";

interface SnakeGameProps {
    onClose: () => void;
    onComplete: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export function SnakeGame({ onClose, onComplete }: SnakeGameProps) {
    const [snake, setSnake] = useState<[number, number][]>([[10, 10]]);
    const [food, setFood] = useState<[number, number]>([15, 15]);
    const [direction, setDirection] = useState<[number, number]>([0, -1]); // Up
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const generateFood = useCallback(() => {
        let newFood: [number, number];
        do {
            newFood = [
                Math.floor(Math.random() * GRID_SIZE),
                Math.floor(Math.random() * GRID_SIZE),
            ];
        } while (snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
        setFood(newFood);
    }, [snake]);

    const resetGame = () => {
        setSnake([[10, 10]]);
        setDirection([0, -1]);
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        generateFood();
    };

    const moveSnake = useCallback(() => {
        if (gameOver || !isPlaying) return;

        const newHead: [number, number] = [
            snake[0][0] + direction[0],
            snake[0][1] + direction[1],
        ];

        // Check collisions
        if (
            newHead[0] < 0 ||
            newHead[0] >= GRID_SIZE ||
            newHead[1] < 0 ||
            newHead[1] >= GRID_SIZE ||
            snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
            setGameOver(true);
            setIsPlaying(false);
            return;
        }

        const newSnake = [newHead, ...snake];

        // Check food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore(s => s + 1);
            generateFood();
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, direction, food, gameOver, isPlaying, generateFood]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp": if (direction[1] !== 1) setDirection([0, -1]); break;
                case "ArrowDown": if (direction[1] !== -1) setDirection([0, 1]); break;
                case "ArrowLeft": if (direction[0] !== 1) setDirection([-1, 0]); break;
                case "ArrowRight": if (direction[0] !== -1) setDirection([1, 0]); break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    useEffect(() => {
        const interval = setInterval(moveSnake, INITIAL_SPEED);
        return () => clearInterval(interval);
    }, [moveSnake]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-lg w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Snake Challenge</h2>
                    <p className="text-gray-400">Score 5 points to win a discount!</p>
                    <div className="text-xl font-bold text-primary mt-2">Score: {score}</div>
                </div>

                <div
                    className="relative bg-black border border-gray-700 mx-auto"
                    style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
                >
                    {snake.map((segment, i) => (
                        <div
                            key={i}
                            className="absolute bg-primary rounded-sm"
                            style={{
                                left: segment[0] * CELL_SIZE,
                                top: segment[1] * CELL_SIZE,
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                opacity: i === 0 ? 1 : 0.7,
                            }}
                        />
                    ))}
                    <div
                        className="absolute bg-accent rounded-full animate-pulse"
                        style={{
                            left: food[0] * CELL_SIZE,
                            top: food[1] * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                        }}
                    />

                    {!isPlaying && !gameOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <button
                                onClick={resetGame}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-bold"
                            >
                                Start Game
                            </button>
                        </div>
                    )}

                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                            <h3 className="text-2xl font-bold text-red-500 mb-4">Game Over!</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    <RefreshCw className="w-4 h-4" /> Try Again
                                </button>
                                {score >= 5 && (
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

                <div className="mt-6 text-center text-sm text-gray-500">
                    Use arrow keys to move
                </div>
            </div>
        </div>
    );
}
