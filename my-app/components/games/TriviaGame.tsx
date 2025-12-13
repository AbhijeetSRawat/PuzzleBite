"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, RefreshCw, Trophy, Check, AlertCircle } from "lucide-react";

interface TriviaGameProps {
    onClose: () => void;
    onComplete: () => void;
}

const QUESTIONS = [
    {
        question: "Which country invented pizza?",
        options: ["France", "Italy", "USA", "Greece"],
        answer: 1
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Onion", "Avocado", "Pepper"],
        answer: 2
    },
    {
        question: "Which is the only food that never spoils?",
        options: ["Honey", "Rice", "Salt", "Sugar"],
        answer: 0
    },
    {
        question: "What is the rarest M&M color?",
        options: ["Blue", "Red", "Brown", "Green"],
        answer: 2
    },
    {
        question: "Which fruit has the most calories?",
        options: ["Banana", "Avocado", "Mango", "Grapes"],
        answer: 1
    }
];

export function TriviaGame({ onClose, onComplete }: TriviaGameProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleOptionClick = (index: number) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const correct = index === QUESTIONS[currentQuestion].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentQuestion < QUESTIONS.length - 1) {
                setCurrentQuestion(c => c + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-lg w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                {!showResult ? (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Food Trivia</h2>
                            <p className="text-gray-400">Answer 3 questions correctly to win!</p>
                            <div className="flex justify-between items-center mt-4 px-4">
                                <span className="text-sm text-gray-500">Question {currentQuestion + 1}/{QUESTIONS.length}</span>
                                <span className="text-sm font-bold text-primary">Score: {score}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2 rounded-full mt-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-6 text-center">
                                {QUESTIONS[currentQuestion].question}
                            </h3>
                            <div className="space-y-3">
                                {QUESTIONS[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={selectedOption !== null}
                                        className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${selectedOption === index
                                                ? isCorrect
                                                    ? "bg-green-500/20 border-green-500 text-green-500"
                                                    : "bg-red-500/20 border-red-500 text-red-500"
                                                : "bg-white/5 hover:bg-white/10 border-transparent"
                                            } border`}
                                    >
                                        <span>{option}</span>
                                        {selectedOption === index && (
                                            isCorrect ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4">
                            {score >= 3 ? <span className="text-green-500">You Won!</span> : <span className="text-red-500">Nice Try!</span>}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            You got {score} out of {QUESTIONS.length} questions correct.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={resetGame}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                <RefreshCw className="w-4 h-4" /> Try Again
                            </button>
                            {score >= 3 && (
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
