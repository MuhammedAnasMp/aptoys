"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteMedia } from "@/hooks/useSiteMedia";

interface BlogItemImageProps {
    index: number;
    thumbnail?: string;
    mediaKey?: string;
    alt: string;
    className?: string;
}

import BlogImage from "@/components/blog/BlogImage";

export default function BlogArchiveClient({ blogs }: { blogs: any[] }) {
    const featuredBlog = blogs[0];
    const gridBlogs = blogs.slice(1);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-12">
                <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Wellness Journal</span>
                <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-4">The Journal.</h1>
                <p className="text-white/40 max-w-xl text-lg">Insights, engineering, and philosophy from the forefront of future wellness.</p>
            </div>

            {/* Featured Card */}
            {featuredBlog ? (
                <Link href={`/blog/${featuredBlog.slug}`} className="group relative block w-full h-[600px] mb-12 rounded-[3rem] overflow-hidden glass-card">
                    <BlogImage
                        index={0}
                        thumbnail={featuredBlog.thumbnail}
                        mediaKey={featuredBlog.mediaKey}
                        alt="hero"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-12 max-w-3xl">
                        <span className="bg-neon-purple px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Featured</span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 group-hover:text-neon-purple transition-colors">{featuredBlog.title}</h2>
                        <div className="flex items-center gap-6 text-white/50 text-xs font-bold uppercase tracking-widest">
                            <span>By {featuredBlog.author}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span>{featuredBlog.reading_time} min Read</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span>{new Date(featuredBlog.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </Link>
            ) : null}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {gridBlogs.map((blog, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Link href={`/blog/${blog.slug}`} className="group block glass-card glass-card-hover p-6">
                            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                                <BlogImage
                                    index={idx + 1}
                                    thumbnail={blog.thumbnail}
                                    mediaKey={blog.mediaKey}
                                    alt={blog.mediaKey || 'blog image'}
                                    className="object-cover opacity-80"
                                />
                            </div>
                            <span className="text-neon-purple text-[10px] font-bold uppercase tracking-widest mb-4 block">Journal Entry</span>
                            <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-neon-purple transition-colors leading-tight">{blog.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">{blog.content}</p>
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30 border-t border-white/5 pt-6">
                                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                <span>{blog.reading_time} min Read</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
