"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiClock, FiUser, FiArrowLeft, FiShare2 } from "react-icons/fi";

import BlogImage from "@/components/blog/BlogImage";

export default function BlogPostClient({ blog }: { blog: any }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen pb-24 relative bg-[#0B0F19]">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-[64px] md:top-[80px] left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-electric-blue z-[100] origin-left"
                style={{ scaleX }}
            />

            <div className="max-w-4xl mx-auto px-6 pt-12">
                <Link href="/blog" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-12 text-sm transition-colors group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-neon-purple px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{blog.category || "Journal"}</span>
                        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                            <time dateTime={blog.created_at}>
                                {new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-12">{blog.title}</h1>

                    <div className="flex items-center justify-between border-y border-white/5 py-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden glass-card border-white/20 relative">
                                <FiUser className="absolute inset-0 m-auto text-white/20" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">{blog.author}</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Wellness Contributor</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                <FiClock size={16} /> {blog.reading_time} Min Read
                            </div>
                            <button
                                onClick={handleShare}
                                className="text-white/30 hover:text-neon-purple transition-colors"
                                aria-label="Share article"
                            >
                                <FiShare2 size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="mb-16 aspect-video rounded-[3rem] overflow-hidden glass-card relative">
                    <BlogImage
                        thumbnail={blog.thumbnail}
                        mediaKey={blog.mediaKey}
                        alt={blog.mediaKey || blog.title}
                        className="object-cover opacity-80"
                        priority
                    />
                </div>

                {/* Content */}
                <article className="prose prose-invert prose-p:text-white/50 prose-p:text-lg prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter max-w-none mb-20 text-white/70">
                    <div className="whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </article>
            </div>
        </div>
    );
}
