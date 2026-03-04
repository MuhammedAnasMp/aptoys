import { Metadata } from "next";
import { getBlogs } from "@/lib/api";
import BlogArchiveClient from "./BlogArchiveClient";

export const metadata: Metadata = {
    title: "Journal | Adlply - Future Wellness Insights",
    description: "Explore deep insights into personal wellness, biotechnology, and the philosophy of future engineering. Read the latest entries from the Adlply journal.",
    openGraph: {
        title: "Adlply Journal",
        description: "Future wellness, biotechnology, and engineering philosophy.",
        type: "website",
    }
};

export default async function BlogArchive() {
    const blogs = await getBlogs();

    return (
        <section className="min-h-screen py-24 px-6 md:px-12 bg-[#0B0F19]">
            <BlogArchiveClient blogs={blogs} />

            {/* Structured Schema Data for the Archive */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "name": "Adlply Journal",
                    "description": "Insights, engineering, and philosophy from the forefront of future wellness.",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Adlply"
                    },
                    "blogPost": blogs.map((blog: any) => ({
                        "@type": "BlogPosting",
                        "headline": blog.title,
                        "url": `https://adlply.com/blog/${blog.slug}`,
                        "datePublished": blog.created_at,
                        "author": {
                            "@type": "Person",
                            "name": blog.author
                        }
                    }))
                })
            }} />
        </section>
    );
}
