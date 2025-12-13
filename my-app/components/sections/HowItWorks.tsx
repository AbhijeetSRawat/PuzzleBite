"use client";

import { motion } from "framer-motion";
import { QrCode, Gamepad2, TicketPercent } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

const steps = [
    {
        icon: QrCode,
        title: "Scan QR",
        description: "Guests scan a QR code to see exciting wait time discounts/offers.",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Gamepad2,
        title: "Play Challenges",
        description: "Crack the puzzles & riddles challenge.",
        color: "text-accent",
        bg: "bg-accent/10",
    },
    {
        icon: TicketPercent,
        title: "Earn Discounts",
        description: "Earn the discount/offer coupons to be redeemed now or later.",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
                    <p className="text-xl text-gray-400">Gamified engagement tools that delight customers and drive retention.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="hover:scale-105 transition-transform duration-300"
                        >
                            <ElectricBorder color={index === 0 ? "#6366f1" : index === 1 ? "#ec4899" : "#14b8a6"} style={{ borderRadius: 24 }}>
                                <div className="glass-panel p-8 text-center h-full">
                                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${step.bg}`}>
                                        <step.icon className={`w-10 h-10 ${step.color}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-gray-400">{step.description}</p>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
