"use client";

import { motion } from "framer-motion";
import { Trophy, Puzzle, LayoutDashboard, Radio, TrendingUp } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

const features = [
    {
        icon: Trophy,
        title: "Gamified discount engine",
        description: "Fun, interactive way to earn deals—not just passive coupons",
    },
    {
        icon: Puzzle,
        title: "Multi-category puzzles",
        description: "Puzzles tailored to diners’ preferences (coding, trivia, logic)",
    },
    {
        icon: LayoutDashboard,
        title: "Dashboards",
        description: "Enables restaurants to track usage, redemptions, and ROI",
    },
    {
        icon: Radio,
        title: "Live Feed",
        description: "Real-time events and updates for Social & viral hooks.",
    },
    {
        icon: TrendingUp,
        title: "Performance-aligned pricing",
        description: "Mix of subscriptions and per-puzzle commissions ensures risk-sharing.",
    },
];

export function Features() {
    return (
        <section id="features" className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Features</h2>
                    <p className="text-xl text-gray-400">Never before features to get rid of abysmal waiting time.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ElectricBorder color="#8b5cf6" style={{ borderRadius: 16 }}>
                                <div className="glass-panel p-6 h-full hover:bg-white/5 transition-colors">
                                    <feature.icon className="w-10 h-10 text-primary mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
