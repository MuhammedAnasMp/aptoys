import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/api";
import Link from "next/link";
import BlogPostClient from "./BlogPostClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: "Article Not Found | Adlply Journal",
        };
    }

    const description = blog.content.substring(0, 160) + "...";

    return {
        title: `${blog.title} | Adlply - Future Wellness Journal`,
        description: description,
        openGraph: {
            title: blog.title,
            description: description,
            type: "article",
            publishedTime: blog.created_at,
            authors: [blog.author],
            images: [
                {
                    url: blog.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: description,
            images: [blog.thumbnail],
        }
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <p className="text-white/40 mb-8">The journal entry you are looking for does not exist or has been moved.</p>
                <Link href="/blog" className="glass-card px-8 py-3 rounded-full text-sm font-bold hover:bg-white/5 transition-colors">
                    Return to Journal
                </Link>
            </div>
        );
    }

    return (
        <section>
            <BlogPostClient blog={blog} />

            {/* Structured Schema Data for the Article */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": blog.title,
                    "image": blog.thumbnail,
                    "datePublished": blog.created_at,
                    "author": {
                        "@type": "Person",
                        "name": blog.author
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Adlply",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://adlply.com/logo.png"
                        }
                    },
                    "description": blog.content.substring(0, 200),
                    "articleBody": blog.content
                })
            }} />
        </section>
    );
}
