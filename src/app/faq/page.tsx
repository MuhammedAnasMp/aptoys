"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const faqData = [
    {
        category: "Shipping",
        questions: [
            { q: "Is the delivery discreet?", a: "Absolutely. All orders are shipped in plain, unmarked brown boxes with no mention of 'AdultPlayToys' or the contents on the exterior. The sender name will be a generic corporate entity." },
            { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days depending on your location in India. Express shipping is available for major metros (1-2 days)." }
        ]
    },
    {
        category: "Wellness",
        questions: [
            { q: "How do I clean my products?", a: "We recommend using a specialized toy cleaner or mild, scent-free soap and warm water. Ensure the device is fully dry before storing in a cool, dark place." },
            { q: "Are the materials safe?", a: "Yes. Every product we stock is made from premium, body-safe, hypoallergenic materials like medical-grade silicone or phthalate-free TPE." }
        ]
    }
];

export default function FAQPage() {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Support Center</span>
                    <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Your Questions, <span className="text-white/30 italic">Answered.</span></h1>

                    <div className="relative max-w-xl mx-auto">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            type="text"
                            placeholder="Search wellness help..."
                            className="w-full h-14 pl-12 pr-6 rounded-2xl glass-card bg-white/5 border-white/10 text-sm focus:border-neon-purple outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-12">
                    {faqData.map((cat) => (
                        <div key={cat.category}>
                            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-6 flex items-center gap-4">
                                {cat.category}
                                <div className="flex-grow h-[1px] bg-white/5" />
                            </h2>
                            <div className="space-y-4">
                                {cat.questions.map((item) => (
                                    <div key={item.q} className="glass-card overflow-hidden transition-all hover:bg-white/5">
                                        <button
                                            onClick={() => setActiveItem(activeItem === item.q ? null : item.q)}
                                            className="w-full p-6 flex items-center justify-between text-left group"
                                        >
                                            <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                                                {item.q}
                                            </span>
                                            <FiChevronDown className={`transition-transform duration-500 ${activeItem === item.q ? "rotate-180 text-neon-purple" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeItem === item.q && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-6 pb-6 text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                                                        {item.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* SEO Schema Script */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.flatMap(cat => cat.questions.map(q => ({
                            "@type": "Question",
                            "name": q.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": q.a
                            }
                        })))
                    })}
                </script>
            </div>
        </div>
    );
}
