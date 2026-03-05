import { Metadata } from "next";
import { getThreads } from "@/lib/api";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
    title: "Community | Adlply - Echo System",
    description: "Join the conversation. Discuss future wellness, biotech, and engineering philosophy with the Adlply community.",
    openGraph: {
        title: "Adlply Community",
        description: "Join the Echo System. Discuss the future of wellness.",
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
