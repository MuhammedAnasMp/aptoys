"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiTrendingUp, FiPlus, FiUser, FiClock } from "react-icons/fi";

const initialThreads = [
    {
        id: "1",
        title: "Best practices for Nebula Pulse maintenance?",
        author: "NeonUser99",
        replies: 12,
        upvotes: 45,
        timestamp: "2 hours ago",
        category: "Technical"
    },
    {
        id: "2",
        title: "How to stay discreet with shared roommates?",
        author: "PrivacyPro",
        replies: 28,
        upvotes: 89,
        timestamp: "5 hours ago",
        category: "Privacy"
    },
    {
        id: "3",
        title: "Upcoming 2026 product collection leaks?",
        author: "FutureWanderer",
        replies: 156,
        upvotes: 342,
        timestamp: "1 day ago",
        category: "Leaks"
    }
];

export default function CommunityPage() {
    const [threads, setThreads] = useState(initialThreads);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

                {/* Main Content */}
                <div className="flex-grow">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Echo System</span>
                            <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter">Community.</h1>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="neon-button hidden md:flex items-center gap-2"
                        >
                            <FiPlus /> New Thread
                        </button>
                    </div>

                    <div className="space-y-6">
                        {threads.map((thread, idx) => (
                            <motion.div
                                key={thread.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 md:p-8 hover:border-neon-purple/50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex-grow">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-electric-blue mb-4 block">{thread.category}</span>
                                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-neon-purple transition-colors mb-6">{thread.title}</h3>
                                        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                                            <div className="flex items-center gap-2">
                                                <FiUser className="text-neon-purple" /> {thread.author}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiClock /> {thread.timestamp}
                                            </div>
                                            <div className="hidden md:flex items-center gap-2">
                                                <FiMessageSquare /> {thread.replies} Replies
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 p-3 glass-card bg-white/5 min-w-[60px]">
                                        <FiTrendingUp className="text-neon-purple" />
                                        <span className="text-xs font-bold">{thread.upvotes}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="sticky top-28 space-y-8">
                        <div className="glass-card p-8 bg-gradient-to-br from-neon-purple/10 to-transparent">
                            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Trending Topics</h4>
                            <ul className="space-y-4">
                                {["#NebulaGlow", "#DiscreetLiving", "#BioTechWellness"].map(tag => (
                                    <li key={tag} className="text-xs text-white/50 hover:text-white cursor-pointer flex justify-between items-center transition-colors">
                                        <span>{tag}</span>
                                        <span className="bg-white/5 px-2 py-0.5 rounded-full text-[8px]">Fire</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-card p-8">
                            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Community Stats</h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-2xl font-black text-neon-purple">12,402</p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30">Explorers</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-electric-blue">89k+</p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30">Messages Sent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Thread Modal Mockup */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-space-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-xl glass-card p-8 bg-[#0B0F19]"
                        >
                            <h2 className="text-2xl font-bold mb-8">Start a Discussion</h2>
                            <div className="space-y-6">
                                <input type="text" placeholder="Topic Title" className="w-full h-14 glass-card bg-white/5 px-6 outline-none focus:border-neon-purple" />
                                <textarea placeholder="Share your thoughts..." className="w-full h-40 glass-card bg-white/5 p-6 outline-none focus:border-neon-purple resize-none" />
                                <div className="flex gap-4">
                                    <button className="neon-button flex-grow">Publish Echo</button>
                                    <button onClick={() => setIsModalOpen(false)} className="px-6 glass-card hover:bg-white/10 transition-colors">Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-24 md:hidden w-14 h-14 rounded-full bg-neon-purple text-white flex items-center justify-center shadow-lg z-40"
            >
                <FiPlus size={24} />
            </button>
        </div>
    );
}
