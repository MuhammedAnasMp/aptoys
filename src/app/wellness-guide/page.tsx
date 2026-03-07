import { Metadata } from "next";
import Link from "next/link";
import { FiShield, FiZap, FiHeart, FiDroplet } from "react-icons/fi";

export const metadata: Metadata = {
    title: "Expert Wellness Guide | Adlply - Understanding Adult Innovation",
    description: "Your comprehensive guide to modern intimate wellness. Learn about material safety, product types, and how to choose the right technology for your body.",
    keywords: "sex toy guide india, body safe silicone toys, how to choose vibrators, adult wellness education, intimate health tech",
};

const guideSections = [
    {
        title: "Material Science",
        icon: <FiShield className="text-neon-purple" size={32} />,
        description: "Medical-grade silicone vs. The Industry Standard.",
        content: "Safety starts with the surface. We exclusively promote non-porous, medical-grade silicone. Unlike cheaper PVC or 'Jelly' materials, high-grade silicone doesn't harbor bacteria and is free from phthalates, ensuring your body is never exposed to porous toxins."
    },
    {
        title: "Sensation Engineering",
        icon: <FiZap className="text-electric-blue" size={32} />,
        description: "Vibration, Air-Pulse, and Kinetic Energy.",
        content: "Understand the technology behind the pleasure. From high-torque vibrating motors for deep muscle resonance to revolutionary air-pulse technology that uses pressure waves for indirect stimulation, choosing the right motor type is key to your wellness journey."
    },
    {
        title: "The Lubrication Law",
        icon: <FiDroplet className="text-glow-pink" size={32} />,
        description: "Protecting your investment and your body.",
        content: "Silicone on silicone is a chemist's nightmare. To preserve the soft-touch finish of your premium devices, always use high-quality water-based lubricants. Silicone-based lubes can degrade the surface of your toys, creating microscopic pits where bacteria can grow."
    },
    {
        title: "The Wellness Loop",
        icon: <FiHeart className="text-green-400" size={32} />,
        description: "Sleep, Stress Relief, and Intimate Health.",
        content: "Intimate wellness is a pillar of overall health. Regular use of wellness devices is linked to improved sleep quality, reduced cortisol (stress) levels, and enhanced pelvic floor health. It's not just about the moment; it's about your long-term vitality."
    }
];

export default function WellnessGuide() {
    return (
        <div className="min-h-screen bg-[#04060B] py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-electric-blue/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-electric-blue text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Education & Excellence</span>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">The Wellness <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-electric-blue">Manifesto.</span></h1>
                    <p className="text-white/40 text-lg leading-relaxed">
                        Expert guidance on navigating the world of premium intimate technology. Focus on safety, sensation, and the science of pleasure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {guideSections.map((section, idx) => (
                        <div key={idx} className="glass-card p-10 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                            <div className="mb-8">{section.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-electric-blue transition-colors">{section.title}</h3>
                            <p className="text-white/30 text-sm font-bold uppercase tracking-widest mb-6 leading-tight">{section.description}</p>
                            <p className="text-white/50 leading-relaxed mb-8">{section.content}</p>
                        </div>
                    ))}
                </div>

                {/* Direct Import / Fair Pricing Section - NEW */}
                <section className="glass-card p-12 md:p-20 bg-white/[0.01] border-white/5 mb-20 text-center">
                    <h2 className="text-3xl font-black mb-6 tracking-tighter uppercase italic">The Fair Pricing Revolution</h2>
                    <p className="text-white/40 max-w-3xl mx-auto leading-relaxed mb-0">
                        We are often asked how we provide professional-grade wellness tech at 40-60% less than other sellers. The answer is our <span className="text-electric-blue font-bold">Direct-to-Community</span> model. We coordinate global bulk orders directly from manufacturing hubs once specific demand thresholds are met. This allows us to bypass traditional retail markups and import fees, delivering world-class quality at domestic price points.
                    </p>
                </section>

                {/* Direct Product Education Section */}
                <section className="glass-card p-12 md:p-20 bg-gradient-to-br from-neon-purple/5 to-transparent border-neon-purple/10 mb-20">
                    <div className="max-w-4xl">
                        <h2 className="text-3xl font-bold mb-8">Choosing Your First Premium Device</h2>
                        <div className="space-y-8 text-white/60 leading-relaxed">
                            <div>
                                <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Step 1: Identify the Sensation</h4>
                                <p>Are you looking for internal fulfillment or external stimulation? Vibrators offer steady, rhythmic pulses, while Air-Pulse devices simulate oral sensations through pressurized air waves. Wands provide the most power for broad-area relief.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Step 2: Check the Material</h4>
                                <p>If it doesn't say "Medical Grade Silicone," be cautious. At Adlply, we only curate the highest tier of body-safe materials to ensure zero irritation and long-term durability.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Step 3: Consider the Ritual</h4>
                                <p>Wellness is a ritual. Look for 100% waterproof devices to enjoy in the bath or shower, and prioritize USB-rechargeable technology to ensure your device is always ready. 100% discretion is built into the quiet motors of all our premium picks.</p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 list-none p-0">
                                {["Hypoallergenic Silicone", "Whisper-Quiet Motors", "100% Waterproof Tech", "Ergonomic Engineering"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-white text-sm font-bold tracking-tight">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(0,243,255,1)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="text-center">
                    <h4 className="text-xl font-bold mb-8">Ready to find your perfect match?</h4>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/shop" className="neon-button px-10 py-4 flex items-center justify-center gap-2">
                            Explore All Devices
                        </Link>
                        <Link href="/faq" className="glass-card px-10 py-4 font-bold text-sm flex items-center justify-center hover:bg-white/10 transition-all uppercase tracking-widest">
                            View Product FAQs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
