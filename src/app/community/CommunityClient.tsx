"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMessageCircle, FiArrowUp, FiX, FiSend, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { createThread, createReply } from "@/lib/api";

export default function CommunityClient({ initialThreads }: { initialThreads: any[] }) {
    const [threads, setThreads] = useState(initialThreads);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedThreadId, setExpandedThreadId] = useState<string | number | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const threadsPerPage = 15;

    // New Thread Form State
    const [newThread, setNewThread] = useState({ title: "", content: "", category: "General" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New Reply State
    const [replyContent, setReplyContent] = useState("");
    const [showReplyForm, setShowReplyForm] = useState<string | number | null>(null);

    const categories = ["All", "Technical", "Privacy", "Leaks", "General", "Wellness"];

    const filteredThreads = threads.filter(thread => {
        const matchesCategory = selectedCategory === "All" || thread.category === selectedCategory;
        const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            thread.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);
    const startIndex = (currentPage - 1) * threadsPerPage;
    const paginatedThreads = filteredThreads.slice(startIndex, startIndex + threadsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset pagination when filtering
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(1);
    };

    const handleCreateThread = async () => {
        if (!newThread.title || !newThread.content) return;
        setIsSubmitting(true);
        const result = await createThread({
            ...newThread,
            author: "User_" + Math.floor(Math.random() * 1000) // Mock user
        });
        if (result) {
            setThreads([result, ...threads]);
            setIsModalOpen(false);
            setNewThread({ title: "", content: "", category: "General" });
        }
        setIsSubmitting(false);
    };

    const handlePostReply = async (threadId: string | number) => {
        if (!replyContent) return;
        setIsSubmitting(true);
        const result = await createReply({
            thread: threadId,
            content: replyContent,
            author: "User_" + Math.floor(Math.random() * 1000) // Mock user
        });
        if (result) {
            setThreads(threads.map(t => {
                if (t.id === threadId) {
                    return {
                        ...t,
                        replies: [...(t.replies || []), result],
                        reply_count: (t.reply_count || 0) + 1
                    };
                }
                return t;
            }));
            setReplyContent("");
            setShowReplyForm(null);
        }
        setIsSubmitting(false);
    };

    const toggleThread = (id: string | number) => {
        setExpandedThreadId(expandedThreadId === id ? null : id);
        setShowReplyForm(null); // Reset reply form when switching
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-electric-blue text-[9px] uppercase tracking-[0.4em] font-bold mb-2 block opacity-70">Echo System</span>
                        <h1 className="text-3xl md:text-7xl font-black mb-0 tracking-tight">Community</h1>

                        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? 'bg-electric-blue text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                                        : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="neon-button hidden md:flex items-center gap-2 h-10 px-6 text-[10px]"
                    >
                        <FiPlus /> New Thread
                    </button>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full h-12 glass-card bg-white/5 px-6 outline-none focus:border-electric-blue transition-colors text-sm"
                    />
                </div>

                <div className="space-y-6">
                    {paginatedThreads.length > 0 ? (
                        paginatedThreads.map((thread) => (
                            <motion.div
                                key={thread.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`overflow-hidden transition-all duration-300 ${expandedThreadId === thread.id
                                    ? 'border-b border-electric-blue/30 bg-electric-blue/[0.01]'
                                    : 'border-b border-white/5 hover:border-white/10 cursor-pointer'
                                    }`}
                                onClick={() => expandedThreadId !== thread.id && toggleThread(thread.id)}
                            >
                                {/* Thread Header - Always Visible */}
                                <div className="px-5 py-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-electric-blue bg-electric-blue/10 px-2 py-0.5 rounded-full">
                                                {thread.category}
                                            </span>
                                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest italic">
                                                By <span className="text-white/40 not-italic">{thread.author}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
                                                {new Date(thread.created_at).toLocaleDateString()}
                                            </span>
                                            {expandedThreadId === thread.id ? (
                                                <button onClick={(e) => { e.stopPropagation(); toggleThread(thread.id); }}>
                                                    <FiChevronUp className="text-white/20 hover:text-white transition-colors" />
                                                </button>
                                            ) : (
                                                <FiChevronDown className="text-white/10" />
                                            )}
                                        </div>
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 transition-colors ${expandedThreadId === thread.id ? 'text-electric-blue' : 'group-hover:text-electric-blue'}`}>
                                        {thread.title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-1.5 text-white/30 text-[9px] font-bold uppercase tracking-widest">
                                                <FiMessageCircle className="text-electric-blue size-3" /> {thread.reply_count}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-white/30 text-[9px] font-bold uppercase tracking-widest">
                                                <FiArrowUp className="text-green-500 size-3" /> {thread.upvotes}
                                            </div>
                                        </div>
                                        {expandedThreadId !== thread.id && (
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-white/10 group-hover:text-electric-blue/40 transition-colors">Click to expand</span>
                                        )}
                                    </div>
                                </div>

                                {/* Accordion Content - Animated */}
                                <AnimatePresence>
                                    {expandedThreadId === thread.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="border-t border-white/5"
                                        >
                                            <div className="py-4 space-y-6">
                                                {/* Original Content */}
                                                <div className="rounded-xl">
                                                    <p className="text-white/50 text-sm leading-relaxed whitespace-pre-wrap">{thread.content}</p>
                                                </div>

                                                {/* Replies Section */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Replies ({thread.replies?.length || 0})</h4>
                                                        <button
                                                            onClick={() => setShowReplyForm(showReplyForm === thread.id ? null : thread.id)}
                                                            className="text-[10px] font-bold uppercase tracking-widest text-electric-blue hover:text-white transition-colors flex items-center gap-2 px-3 py-1 rounded-full border border-electric-blue/20 hover:bg-electric-blue/10"
                                                        >
                                                            {showReplyForm === thread.id ? "Close" : "Add Yours"}
                                                        </button>
                                                    </div>

                                                    {/* Inline Reply Form */}
                                                    <AnimatePresence>
                                                        {showReplyForm === thread.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                className="glass-card p-6 bg-white/5"
                                                            >
                                                                <textarea
                                                                    value={replyContent}
                                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                                    placeholder="Add to the discussion..."
                                                                    className="w-full h-24 bg-transparent outline-none text-sm text-white/70 placeholder:text-white/20 resize-none mb-4"
                                                                />
                                                                <div className="flex justify-end">
                                                                    <button
                                                                        onClick={() => handlePostReply(thread.id)}
                                                                        disabled={isSubmitting || !replyContent}
                                                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-electric-blue text-white px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all disabled:opacity-50"
                                                                    >
                                                                        <FiSend /> {isSubmitting ? "Echoing..." : "Post Echo"}
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    {thread.replies?.map((reply: any) => (
                                                        <motion.div
                                                            key={reply.id}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="p-6 rounded-2xl bg-white/5 border-l-2 border-l-electric-blue/20"
                                                        >
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{reply.author}</span>
                                                                <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest italic font-medium">
                                                                    {new Date(reply.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-white/50 leading-relaxed">{reply.content}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 glass-card">
                            <p className="text-white/30 uppercase tracking-[0.2em] font-bold">No threads found matching your search.</p>
                        </div>
                    )}
                </div>


                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-full glass-card hover:bg-white/10 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="sr-only">Previous</span>
                            <FiChevronUp className="-rotate-90" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-full font-bold text-[10px] transition-all ${currentPage === page
                                        ? 'bg-electric-blue text-white shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                                        : 'glass-card hover:bg-white/10 text-white/40'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-full glass-card hover:bg-white/10 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="sr-only">Next</span>
                            <FiChevronDown className="-rotate-90" />
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-72 shrink-0">
                <div className="sticky top-28 space-y-6">
                    <div className="glass-card p-6 bg-gradient-to-br from-electric-blue/5 to-transparent border-electric-blue/10">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-white/60">Trending Topics</h4>
                        <ul className="space-y-3">
                            {["#NebulaGlow", "#DiscreetLiving", "#BioTechWellness"].map(tag => (
                                <li key={tag} className="text-[11px] text-white/40 hover:text-electric-blue cursor-pointer flex justify-between items-center transition-colors">
                                    <span>{tag}</span>
                                    <span className="bg-electric-blue/10 text-electric-blue px-2 py-0.5 rounded-full text-[7px] font-black uppercase">Trending</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-card p-6 border-white/5">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-white/60">Community Stats</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Explorers</p>
                                <p className="text-xl font-black text-neon-purple tracking-tighter">12,402</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Messages</p>
                                <p className="text-xl font-black text-electric-blue tracking-tighter">89k+</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Thread Modal */}
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
                            className="relative w-full max-w-xl glass-card p-8 bg-[#0B0F19] border-electric-blue/30"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold tracking-tighter">Start a Discussion</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/30 hover:text-white transition-colors">
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Category</label>
                                    <select
                                        value={newThread.category}
                                        onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                                        className="w-full h-14 glass-card bg-white/5 px-6 outline-none focus:border-electric-blue transition-colors appearance-none text-white/80"
                                    >
                                        {categories.filter(c => c !== "All").map(cat => (
                                            <option key={cat} value={cat} className="bg-[#0B0F19]">{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Title</label>
                                    <input
                                        type="text"
                                        placeholder="What's on your mind?"
                                        value={newThread.title}
                                        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                                        className="w-full h-14 glass-card bg-white/5 px-6 outline-none focus:border-electric-blue transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Discussion</label>
                                    <textarea
                                        placeholder="Share your thoughts..."
                                        value={newThread.content}
                                        onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                                        className="w-full h-40 glass-card bg-white/5 p-6 outline-none focus:border-electric-blue transition-colors resize-none"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleCreateThread}
                                        disabled={isSubmitting || !newThread.title || !newThread.content}
                                        className="neon-button flex-grow disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Publishing..." : "Publish Echo"}
                                    </button>
                                    <button onClick={() => setIsModalOpen(false)} className="px-8 glass-card hover:bg-white/10 transition-colors uppercase text-[10px] font-bold tracking-widest">Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-24 md:hidden w-14 h-14 rounded-full bg-electric-blue text-white flex items-center justify-center shadow-lg z-40"
            >
                <FiPlus size={24} />
            </button>
        </div>
    );
}
