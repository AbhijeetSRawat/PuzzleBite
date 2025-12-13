"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Story() {
    return (
        <section id="story" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Story</h2>
                        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                            <p>
                                It all began over coffee and contemplation — observing patrons in cafés tapping their phones, glancing at the door, restless during the wait. We asked: What if every minute of anticipation could become a moment of delight?
                            </p>
                            <p>
                                This is more than gamified discounts. It’s hospitality reinvented — where every bored second becomes an opportunity and venues build deeper relationships with guests.
                            </p>
                            <p>
                                From that spark, PuzzleBITE was born — designed to transform dining queues into playful engagement. We embed puzzles, challenges, and incentives directly into the guest experience, helping venues convert waiting time into connection, fun, and loyalty.
                            </p>
                            <p>
                                It’s hospitality reinvented — where every bored second becomes an opportunity, where diners leave smiling, and venues foster deeper relationships.
                            </p>
                            <p className="font-semibold text-white">
                                Every puzzle solved, every coupon earned, and every story told fuels our journey — and we’re only just beginning.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-panel p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center"
                    >
                        <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary relative">
                            <Image
                                src="/owner.png"
                                alt="Lokendra Singh"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-2">Meet the Founder</h3>
                            <h4 className="text-xl text-primary mb-4">Lokendra Singh</h4>
                            <p className="text-gray-400 mb-4">
                                Lokendra Singh is the visionary behind PuzzleBITE, bringing 19 years of experience in startup strategy, growth, and product execution. With a deep passion for blending technology and engagement, Lokendra saw the untapped potential in transforming idle waiting into meaningful interaction.
                            </p>
                            <p className="text-gray-400">
                                Under his leadership, PuzzleBITE is not just a product — it’s a brand promise: that every wait can tell a story, and every visit can spark joy.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
