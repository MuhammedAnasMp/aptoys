import { faqData } from "@/constants/faq";
import FAQClient from "./FAQClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | Adlply Intelligence Hub",
    description: "Find answers to common questions about discreet shipping, product safety, privacy, and payments at Adlply.",
    openGraph: {
        title: "FAQ | Adlply Intelligence Hub",
        description: "Your discreet guide to wellness, privacy, and shipping.",
        type: "website",
    }
};

export default function FAQPage() {
    return (
        <div className="min-h-screen py-24 px-6 relative overflow-hidden">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full -z-10" />

            <FAQClient />

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
