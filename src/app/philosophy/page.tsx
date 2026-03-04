import { Metadata } from "next";
import PhilosophyClient from "@/components/philosophy/PhilosophyClient";

export const metadata: Metadata = {
    title: "Philosophy | AdultPlayToys",
    description: "Beyond the Ordinary. Discover the vision, values, and future of wellness tech at AdultPlayToys. Personal wellness for the next generation.",
    keywords: ["wellness tech", "future of wellness", "adult play toys philosophy", "discreet luxury wellness", "wellness innovation"],
    alternates: {
        canonical: "https://adultplaytoys.in/philosophy",
    },
    openGraph: {
        title: "The Philosophy of Future Wellness | AdultPlayToys",
        description: "Explore the 2050 vision of personal wellness tech. Privacy, aesthetics, and radical excellence.",
        url: "https://adultplaytoys.in/philosophy",
        images: [
            {
                url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000",
                width: 1000,
                height: 800,
                alt: "Future Tech Philosophy",
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "The Philosophy of Future Wellness | AdultPlayToys",
        description: "Explore the 2050 vision of personal wellness tech. Privacy, aesthetics, and radical excellence.",
        images: ["https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000"],
    }
};

export default function PhilosophyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Our Philosophy - AdultPlayToys",
        "description": "The vision, values, and future of wellness tech at AdultPlayToys.",
        "url": "https://adultplaytoys.in/philosophy",
        "mainEntity": {
            "@id": "https://adultplaytoys.in/#organization",
            "@type": "Organization",
            "name": "AdultPlayToys",
            "description": "Next-generation personal wellness tech brand focusing on privacy, aesthetics, and radical excellence.",
            "url": "https://adultplaytoys.in",
            "logo": "https://adultplaytoys.in/logo.png",
            "sameAs": [
                "https://www.instagram.com/adultplaytoys",
                "https://twitter.com/adultplaytoys"
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PhilosophyClient />
        </>
    );
}
