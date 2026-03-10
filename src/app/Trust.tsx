import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { FiPackage, FiLock, FiTruck } from "react-icons/fi";
function Trust() {
    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                    <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-4 md:mb-6 block">Uncompromising Standards</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 md:mb-8">Discreet Delivery. <br />Decidedly Premium.</h2>
                    <div className="space-y-6 md:space-y-8">
                        <div className="flex gap-4 md:gap-6 items-start">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-neon-purple mt-1 md:mt-0">
                                <FiPackage size={20} className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 md:mb-2 text-base md:text-lg">Anonymous Packaging</h4>
                                <p className="text-white/40 text-xs md:text-sm">Every order is shipped in plain, unmarked boxes with no mention of the contents or brand name on the label.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-6 items-start">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-electric-blue mt-1 md:mt-0">
                                <FiLock size={20} className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 md:mb-2 text-base md:text-lg">Secure Transactions</h4>
                                <p className="text-white/40 text-xs md:text-sm">We use bank-level encryption for all payments. 'AdultPlayToys' will not appear on your credit card statement.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-6 items-start">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-glow-pink mt-1 md:mt-0">
                                <FiTruck size={20} className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 md:mb-2 text-base md:text-lg">Hand to Hand Delivery</h4>
                                <p className="text-white/40 text-xs md:text-sm">Our dedicated concierge team ensures personalized, direct delivery to your hands for absolute privacy and comfort.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trust