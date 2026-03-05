import { staticBlogs } from "@/constants/blogs";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "https://myincome.pythonanywhere.com/api";

export async function getBlogs() {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error("Failed to fetch blogs from API");
            return staticBlogs;
        }

        const apiData = await response.json();
        const sortedApiData = apiData.sort((a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        return [...sortedApiData, ...staticBlogs];
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return staticBlogs;
    }
}

export async function getBlogBySlug(slug: string) {
    // Check static blogs first
    const staticMatch = staticBlogs.find(b => b.slug === slug);
    if (staticMatch) return staticMatch;

    try {
        const response = await fetch(`${API_BASE_URL}/blogs/`, {
            next: { revalidate: 3600 }
        });

        if (response.ok) {
            const apiData = await response.json();
            return apiData.find((b: any) => b.slug === slug) || null;
        }
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
    }


    return null;
}

export const staticThreads = [
    {
        id: "static-t1",
        title: "The Future of Neural Link Privacy",
        author: "CyberSage",
        category: "Privacy",
        created_at: "2026-02-15T10:00:00Z",
        reply_count: 156,
        upvotes: 432,
        content: "How are we ensuring that neural data isn't being harvested by third-party health apps?",
        replies: []
    },
    {
        id: "static-t2",
        title: "NebulaGlow Beta Testing Feedback",
        author: "TechEnthusiast",
        category: "Wellness",
        created_at: "2026-02-20T14:30:00Z",
        reply_count: 89,
        upvotes: 124,
        content: "The latest firmware update for NebulaGlow seems to have improved sleep tracking accuracy significantly.",
        replies: []
    }
];

export async function getThreads() {
    try {
        const response = await fetch(`${API_BASE_URL}/threads/`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error("Failed to fetch threads from API");
            return staticThreads;
        }

        const apiData = await response.json();
        // API threads first, then static threads
        return [...apiData, ...staticThreads];
    } catch (error) {
        console.error("Error fetching threads:", error);
        return staticThreads;
    }
}

export async function createThread(data: { title: string; content: string; category: string; author: string }) {
    try {
        const response = await fetch(`${API_BASE_URL}/threads/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error("Error creating thread:", error);
        return null;
    }
}

export async function createReply(data: { thread: number | string; content: string; author: string }) {
    try {
        const response = await fetch(`${API_BASE_URL}/replies/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error("Error creating reply:", error);
        return null;
    }
}
