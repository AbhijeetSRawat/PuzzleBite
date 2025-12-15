"use client";

import { X, Trophy } from "lucide-react";

interface VortellisPizzaGameProps {
    onClose: () => void;
    onComplete: () => void;
}

export function VortellisPizzaGame({ onClose, onComplete }: VortellisPizzaGameProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm lg:pt-20">
            <div className="relative bg-gray-900 p-4 rounded-2xl border border-white/10 w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Vortelli's Pizza Delivery</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={onComplete}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg animate-bounce"
                        >
                            <Trophy className="w-4 h-4" /> Claim Reward
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 w-full bg-black rounded-lg overflow-hidden relative">
                    <iframe
                        src="https://www.gamepix.com/play/vortellis-pizza-delivery"
                        className="w-full h-full border-0"
                        title="Vortelli's Pizza Delivery"
                        allowFullScreen
                    />
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                    Play the game and click "Claim Reward" when you're done!
                </div>
            </div>
        </div>
    );
}
