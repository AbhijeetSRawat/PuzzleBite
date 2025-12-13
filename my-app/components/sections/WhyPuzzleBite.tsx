"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

const reasons = [
    {
        title: "Differentiator",
        description: "World's first digital solution to transform waiting time into engagement opportunities.",
    },
    {
        title: "Footfall & Revenue Booster",
        description: "Customers keep coming back to enjoy puzzleBITE's fun based challenges. Experience the repeat footfall & revenue boost like never before",
    },
    {
        title: "Wait Time Killer",
        description: "Unlimited Fun & Challenges to keep the customers happily engaged.",
    },
];

export function WhyPuzzleBite() {
    return (
        <section id="why-puzzlebite" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Why PuzzleBITE</h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Don't just take our word for it, this is what we do best.
                        </p>

                        <div className="space-y-8">
                            {reasons.map((reason, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-8 h-8 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{reason.title}</h3>
                                        <p className="text-gray-400">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <ElectricBorder color="#ec4899" style={{ borderRadius: 16 }}>
                            <div className="relative h-[500px] rounded-2xl overflow-hidden glass-panel group">
                                <Image
                                    src="/images/engagement.png"
                                    alt="Friends playing games at a cafe"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-10">
                                    <h3 className="text-6xl font-bold text-white mb-2">3x</h3>
                                    <p className="text-2xl text-gray-200">Customer Retention</p>
                                </div>
                            </div>
                        </ElectricBorder>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
