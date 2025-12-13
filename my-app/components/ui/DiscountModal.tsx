"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Gift } from "lucide-react";

interface DiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DiscountModal({ isOpen, onClose }: DiscountModalProps) {
    const [step, setStep] = useState<"form" | "result">("form");
    const [discount, setDiscount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep("form");
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const randomDiscount = Math.floor(Math.random() * (70 - 20 + 1)) + 20;
            setDiscount(randomDiscount);
            setStep("result");
            setLoading(false);

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#ec4899', '#14b8a6']
            });
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="relative bg-gray-900 border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {step === "form" ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Gift className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Claim Your Reward!</h3>
                                <p className="text-gray-400 mb-6">
                                    Enter your details to reveal your mystery discount coupon.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">Phone</label>
                                        <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                                    </div>

                                    <button
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 rounded-lg mt-4 transition-all flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Reveal Discount"
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring" }}
                                    className="mb-6"
                                >
                                    <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                                        {discount}%
                                    </span>
                                    <span className="text-2xl font-bold text-white block mt-2">OFF</span>
                                </motion.div>

                                <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
                                <p className="text-gray-400 mb-8">
                                    Your coupon code has been sent to your email/phone. Show this screen to the waiter to redeem now.
                                </p>

                                <div className="bg-white/10 p-4 rounded-lg mb-6 border border-dashed border-white/30">
                                    <code className="text-xl font-mono text-primary">PUZZLE{discount}WIN</code>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
