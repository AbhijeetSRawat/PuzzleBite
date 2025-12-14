"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

const plans = [
    {
        name: "Standard",
        price: "₹ 4999",
        description: "Perfect for standard operations looking to gamify dining.",
        features: [
            "Access to basic puzzle library",
            "Standard customer engagement reports",
            "Email support",
            "Venue branding (basic)",
        ],
        color: "border-gray-700",
        buttonColor: "bg-gray-700 hover:bg-gray-600",
    },
    {
        name: "Premium",
        price: "₹ 9999",
        description: "Perfect for premium operations looking to gamify dining.",
        features: ["All 6 Games", "Advanced Analytics", "Priority Support", "Custom Branding"],
        popular: true,
        color: "border-[#6366f1]",
        buttonColor: "bg-[#6366f1] hover:bg-[#5a5ee0]",
    },
    {
        name: "Gold",
        price: "₹ 14999",
        description: "For the ultimate experience with full customization and dedicated support.",
        features: ["Everything in Premium", "Dedicated Account Manager", "API Access", "White Labeling"],
        popular: false,
        color: "#ec4899",
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
                    <p className="text-xl text-gray-400">Flexible plans tailored for every venue’s needs.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative"
                        >
                            <ElectricBorder color={plan.color} style={{ borderRadius: 24 }}>
                                <div className={`glass-panel p-8 h-full relative ${plan.popular ? 'border-primary/50' : ''}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-gray-400">/month</span>
                                    </div>
                                    <p className="text-gray-400 mb-8">{plan.description}</p>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
