"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blogs = [
    {
        title: "The Future of Personal Wellness in 2050",
        slug: "future-of-personal-wellness",
        author: "Dr. Aris V.",
        date: "March 15, 2026",
        readingTime: "5 min",
        category: "Technology",
        image: "/mock-blog-1.jpg",
        excerpt: "Exploring how integrated bio-tech and ergonomic design are redefining the boundaries of intimacy and personal care."
    },
    {
        title: "Discreet Wellness: A Guide to Modern Privacy",
        slug: "discreet-wellness-guide",
        author: "Sarah J.",
        date: "March 10, 2026",
        readingTime: "8 min",
        category: "Philosophy",
        image: "/mock-blog-2.jpg",
        excerpt: "Why the modern explorer values discretion above all else, and how to maintain a premium lifestyle privately."
    },
    {
        title: "Ultrasonic Vibration vs. Mechanical Rotation",
        slug: "ultrasonic-vs-mechanical",
        author: "Tech Team",
        date: "March 05, 2026",
        readingTime: "12 min",
        category: "Technical",
        image: "/mock-blog-3.jpg",
        excerpt: "A deep dive into the engineering behind our latest Nebula series and why frequency matters more than force."
    }
];

export default function BlogArchive() {
    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Wellness Journal</span>
                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-4">The Journal.</h1>
                    <p className="text-white/40 max-w-xl text-lg">Insights, engineering, and philosophy from the forefront of future wellness.</p>
                </div>

                {/* Featured Card */}
                <Link href={`/blog/${blogs[0].slug}`} className="group relative block w-full h-[600px] mb-20 rounded-[3rem] overflow-hidden glass-card">
                    <Image src={blogs[0].image} alt="hero" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-12 max-w-3xl">
                        <span className="bg-neon-purple px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">{blogs[0].category}</span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 group-hover:text-neon-purple transition-colors">{blogs[0].title}</h2>
                        <div className="flex items-center gap-6 text-white/50 text-xs font-bold uppercase tracking-widest">
                            <span>By {blogs[0].author}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span>{blogs[0].readingTime} Read</span>
                        </div>
                    </div>
                </Link>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.slice(1).map((blog, idx) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={`/blog/${blog.slug}`} className="group block glass-card glass-card-hover p-6">
                                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                                    <Image src={blog.image} alt={blog.title} fill className="object-cover opacity-80" />
                                </div>
                                <span className="text-neon-purple text-[10px] font-bold uppercase tracking-widest mb-4 block">{blog.category}</span>
                                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors leading-tight">{blog.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">{blog.excerpt}</p>
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30 border-t border-white/5 pt-6">
                                    <span>{blog.date}</span>
                                    <span>{blog.readingTime} Read</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
