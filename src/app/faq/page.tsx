import { faqData } from "@/constants/faq";
import FAQClient from "./FAQClient";
import { Metadata } from "next";
import { formatUrl } from "@/lib/api";

export const metadata: Metadata = {
    title: "AdultPlayToys Support & FAQ",
    description: "Everything you need to know about discreet shipping, secure payments, and premium product safety at AdultPlayToys. Your hub for private wellness intelligence.",
    openGraph: {
        title: "AdultPlayToys | FAQ",
        description: "Your discreet guide to premium wellness, privacy, and secure delivery.",
        type: "website",
    }
};

const API_BASE_URL = `${formatUrl(process.env.NEXT_PUBLIC_API_URL, 'https://aptoys.vercel.app')}/api`;

async function getFaqs() {
    const url = `${API_BASE_URL}/faqs/`;


    const res = await fetch(url, {
        next: { revalidate: 3600 }
    });


    if (!res.ok) {
        console.error("Fetch failed");
        return [];
    }

    const data = await res.json();

    return data;
}

export default async function FAQPage() {


    const apiFaqs = await getFaqs();

    return (
        <div className="min-h-screen py-10 px-6 relative overflow-hidden">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full -z-10" />

            <FAQClient apiFaqs={apiFaqs} />

            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.flatMap((cat: any) => cat.questions.map((q: any) => ({
                            "@type": "Question",
                            "name": q.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": q.a
                            }
                        })))
                    })
                }}
            />
        </div>
    );
}
