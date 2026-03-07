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
            <div className="text-center mb-10">
                <span className="text-neon-purple text-[9px] uppercase tracking-[0.4em] font-bold mb-2 block opacity-70">Intelligence Hub</span>
                <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase italic text-white/90">Common <span className="text-white/20">Questions.</span></h1>

                <div className="relative max-w-xl mx-auto">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full h-12 pl-12 pr-6 rounded-xl glass-card bg-white/5 border-white/10 text-sm focus:border-neon-purple outline-none transition-all shadow-xl focus:shadow-neon-purple/10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-10">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((cat) => (
                        <div key={cat.category}>
                            <h2 className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 mb-6 flex items-center gap-3">
                                {cat.icon}
                                <span className="ml-1">{cat.category}</span>
                                <div className="flex-grow h-[1px] bg-white/5" />
                            </h2>
                            <div className="space-y-1">
                                {cat.questions.map((item) => (
                                    <div
                                        key={item.q}
                                        className={`overflow-hidden transition-all duration-300 border-b border-white/5 ${activeItem === item.q
                                            ? 'bg-white/[0.02]'
                                            : 'hover:bg-white/[0.01]'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setActiveItem(activeItem === item.q ? null : item.q)}
                                            className="w-full py-4 flex items-center justify-between text-left group px-3"
                                        >
                                            <span className={`text-sm font-bold transition-colors ${activeItem === item.q ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                                                {item.q}
                                            </span>
                                            <FiChevronDown className={`transition-transform duration-500 text-white/20 size-4 ${activeItem === item.q ? "rotate-180 text-neon-purple" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeItem === item.q && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="pb-5 text-white/40 text-sm leading-relaxed pt-2 px-3">
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
                    <div className="text-center py-16 glass-card bg-white/[0.01]">
                        <p className="text-white/20 uppercase tracking-[0.2em] font-bold text-xs">No answers found for "{search}"</p>
                    </div>
                )}
            </div>

            <div className="mt-16 p-8 glass-card border-dashed border-white/5 text-center flex flex-col items-center justify-center bg-white/[0.01]">
                <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
                <p className="text-white/30 mb-6 max-w-md mx-auto text-sm">Our support team is available 24/7 for discreet guidance and assistance.</p>
                <button className="neon-button px-8 py-2.5 text-[10px]">Contact Support</button>
            </div>
        </div>
    );
}
