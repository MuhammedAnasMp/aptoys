"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { faqData } from "@/constants/faq";

export default function FAQClient() {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const filteredFaqs = useMemo(() => {
        if (!search) return faqData;

        return faqData.map(cat => ({
            ...cat,
            questions: cat.questions.filter(item =>
                item.q.toLowerCase().includes(search.toLowerCase()) ||
                item.a.toLowerCase().includes(search.toLowerCase())
            )
        })).filter(cat => cat.questions.length > 0);
    }, [search]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Intelligence Hub</span>
                <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic text-white/90">Common <span className="text-white/20">Questions.</span></h1>

                <div className="relative max-w-xl mx-auto">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full h-16 pl-6 pr-6 rounded-2xl glass-card bg-white/5 border-white/10 text-sm focus:border-neon-purple outline-none transition-all shadow-2xl focus:shadow-neon-purple/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-16">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((cat) => (
                        <div key={cat.category}>
                            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-8 flex items-center gap-4">
                                {cat.icon}
                                <span className="ml-2">{cat.category}</span>
                                <div className="flex-grow h-[1px] bg-white/5 shadow-[0_1px_0_rgba(255,255,255,0.02)]" />
                            </h2>
                            <div className="space-y-4">
                                {cat.questions.map((item) => (
                                    <div
                                        key={item.q}
                                        className={`glass-card overflow-hidden transition-all duration-300 border-l-2 ${activeItem === item.q
                                            ? 'border-l-neon-purple bg-white/[0.03] scale-[1.01]'
                                            : 'border-l-transparent hover:border-l-white/20 hover:bg-white/[0.02]'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setActiveItem(activeItem === item.q ? null : item.q)}
                                            className="w-full p-8 flex items-center justify-between text-left group"
                                        >
                                            <span className={`text-base font-bold transition-colors ${activeItem === item.q ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                                                {item.q}
                                            </span>
                                            <FiChevronDown className={`transition-transform duration-500 text-white/20 ${activeItem === item.q ? "rotate-180 text-neon-purple" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeItem === item.q && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                >
                                                    <div className="px-8 pb-8 text-white/50 text-base leading-relaxed border-t border-white/5 pt-6 font-medium">
                                                        {item.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 glass-card bg-white/[0.02]">
                        <p className="text-white/30 uppercase tracking-[0.2em] font-bold">No answers found for "{search}"</p>
                    </div>
                )}
            </div>

            <div className="mt-24 p-12 glass-card border-dashed border-white/10 text-center flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
                <p className="text-white/40 mb-8 max-w-md mx-auto">Our support team is available 24/7 for discreet guidance and assistance.</p>
                <button className="neon-button px-10">Contact Support</button>
            </div>
        </div>
    );
}
