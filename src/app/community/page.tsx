import { Metadata } from "next";
import { getThreads } from "@/lib/api";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
    title: "Echo System | Private Wellness Community",
    description: "Join the Adlply Echo System. A private community discussing future wellness, biotechnology, and the intersection of engineering and intimacy in India.",
    openGraph: {
        title: "Adlply Echo System Community",
        description: "Join the conversation. Discuss the future of wellness tech.",
        type: "website",
    }
};

export default async function CommunityPage() {
    const threads = await getThreads();

    return (
        <div className="min-h-screen py-12 px-6 md:px-8 bg-[#0B0F19]">
            <CommunityClient initialThreads={threads} />

            {/* Structured Data for Discussions */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ForumWebPage",
                    "name": "Adlply Community Echo System",
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": threads.map((thread: any, index: number) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "DiscussionForumPosting",
                                "headline": thread.title,
                                "author": {
                                    "@type": "Person",
                                    "name": thread.author
                                },
                                "datePublished": thread.created_at,
                                "interactionStatistic": {
                                    "@type": "InteractionCounter",
                                    "interactionType": "https://schema.org/CommentAction",
                                    "userInteractionCount": thread.reply_count
                                }
                            }
                        }))
                    }
                })
            }} />
        </div>
    );
}
