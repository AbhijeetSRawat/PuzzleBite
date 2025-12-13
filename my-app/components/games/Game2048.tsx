"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, RefreshCw, Trophy } from "lucide-react";

interface Game2048Props {
    onClose: () => void;
    onComplete: () => void;
}

const GRID_SIZE = 4;

export function Game2048({ onClose, onComplete }: Game2048Props) {
    const [grid, setGrid] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const initializeGrid = useCallback(() => {
        const newGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
        addRandomTile(newGrid);
        addRandomTile(newGrid);
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
        setWon(false);
    }, []);

    useEffect(() => {
        initializeGrid();
    }, [initializeGrid]);

    const addRandomTile = (currentGrid: number[][]) => {
        const emptyCells = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (currentGrid[i][j] === 0) emptyCells.push({ r: i, c: j });
            }
        }
        if (emptyCells.length > 0) {
            const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            currentGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const move = (direction: 'up' | 'down' | 'left' | 'right') => {
        if (gameOver) return;

        let moved = false;
        const newGrid = grid.map(row => [...row]);
        let newScore = score;

        const rotate = (matrix: number[][]) => matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());

        let workingGrid = [...newGrid];
        if (direction === 'right') workingGrid = workingGrid.map(row => row.reverse());
        if (direction === 'up') workingGrid = rotate(rotate(rotate(workingGrid)));
        if (direction === 'down') workingGrid = rotate(workingGrid);

        // Logic for sliding and merging
        for (let i = 0; i < GRID_SIZE; i++) {
            let row = workingGrid[i].filter(val => val !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    newScore += row[j];
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            while (row.length < GRID_SIZE) row.push(0);
            if (workingGrid[i].join(',') !== row.join(',')) moved = true;
            workingGrid[i] = row;
        }

        // Restore orientation
        if (direction === 'right') workingGrid = workingGrid.map(row => row.reverse());
        if (direction === 'up') workingGrid = rotate(workingGrid);
        if (direction === 'down') workingGrid = rotate(rotate(rotate(workingGrid)));

        if (moved) {
            addRandomTile(workingGrid);
            setGrid(workingGrid);
            setScore(newScore);

            if (workingGrid.some(row => row.some(cell => cell >= 128))) { // Win condition lowered for demo
                setWon(true);
                setGameOver(true);
            } else if (checkGameOver(workingGrid)) {
                setGameOver(true);
            }
        }
    };

    const checkGameOver = (currentGrid: number[][]) => {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (currentGrid[i][j] === 0) return false;
                if (i < GRID_SIZE - 1 && currentGrid[i][j] === currentGrid[i + 1][j]) return false;
                if (j < GRID_SIZE - 1 && currentGrid[i][j] === currentGrid[i][j + 1]) return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") move('up');
            if (e.key === "ArrowDown") move('down');
            if (e.key === "ArrowLeft") move('left');
            if (e.key === "ArrowRight") move('right');
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [grid, gameOver]);

    const getCellColor = (value: number) => {
        const colors: { [key: number]: string } = {
            2: "bg-gray-700 text-white",
            4: "bg-gray-600 text-white",
            8: "bg-orange-500 text-white",
            16: "bg-orange-600 text-white",
            32: "bg-red-500 text-white",
            64: "bg-red-600 text-white",
            128: "bg-yellow-500 text-white shadow-[0_0_10px_rgba(234,179,8,0.5)]",
            256: "bg-yellow-600 text-white shadow-[0_0_15px_rgba(202,138,4,0.6)]",
            512: "bg-yellow-700 text-white",
            1024: "bg-yellow-800 text-white",
            2048: "bg-yellow-900 text-white",
        };
        return colors[value] || "bg-gray-800";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-lg w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">2048 Challenge</h2>
                    <p className="text-gray-400">Reach the 128 tile to win!</p>
                    <div className="text-xl font-bold text-primary mt-2">Score: {score}</div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg mx-auto w-fit">
                    <div className="grid grid-cols-4 gap-2">
                        {grid.map((row, i) => (
                            row.map((cell, j) => (
                                <motion.div
                                    key={`${i}-${j}`}
                                    layout
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`w-16 h-16 rounded-md flex items-center justify-center text-2xl font-bold ${getCellColor(cell)}`}
                                >
                                    {cell !== 0 && cell}
                                </motion.div>
                            ))
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Use arrow keys to merge tiles
                </div>

                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-2xl">
                        <h3 className="text-3xl font-bold mb-4">
                            {won ? <span className="text-green-500">You Won!</span> : <span className="text-red-500">Game Over!</span>}
                        </h3>
                        <div className="flex gap-4">
                            <button
                                onClick={initializeGrid}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                <RefreshCw className="w-4 h-4" /> Try Again
                            </button>
                            {won && (
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
