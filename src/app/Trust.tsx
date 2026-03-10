import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { FiPackage, FiLock, FiTruck } from "react-icons/fi";
function Trust() {
    return (
        <section className="py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group pr-4 lg:pr-12"
                >
                    <div className="aspect-square rounded-[3rem] overflow-hidden glass-card border-white/10 relative">
                        <Image
                            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1000"
                            alt="Premium Quality Standards"
                            fill
                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-black/60 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                    </div>
                    {/* Decorative background glow */}
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-neon-purple/10 blur-[100px] -z-10 group-hover:bg-neon-purple/20 transition-colors duration-700" />
                </motion.div>
                <div>
                    <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Uncompromising Standards</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">Discreet Delivery. <br />Decidedly Premium.</h2>
                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-neon-purple">
                                <FiPackage size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Anonymous Packaging</h4>
                                <p className="text-white/40 text-sm">Every order is shipped in plain, unmarked boxes with no mention of the contents or brand name on the label.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-electric-blue">
                                <FiLock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Secure Transactions</h4>
                                <p className="text-white/40 text-sm">We use bank-level encryption for all payments. 'AdultPlayToys' will not appear on your credit card statement.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-glow-pink">
                                <FiTruck size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Hand to Hand Delivery</h4>
                                <p className="text-white/40 text-sm">Our dedicated concierge team ensures personalized, direct delivery to your hands for absolute privacy and comfort.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trust