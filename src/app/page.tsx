"use client";

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SocialProofToast from "@/components/home/SocialProofToast";
import BundleSection from "@/components/home/BundleSection";
import BackgroundReveal from "@/components/ui/BackgroundReveal";
import { useSiteMedia } from "@/hooks/useSiteMedia";

export default function Home() {
  const { mediaUrl: backgroundImage } = useSiteMedia('home_bg_mask', '');

  return (
    <div className="relative overflow-hidden">
      <BackgroundReveal backgroundImage={backgroundImage} />
      <Hero />
      <SocialProofToast />
      <BundleSection />
      <FeaturedProducts />
      <Categories />

      {/* Education Teaser */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#04060B] to-space-black">
        <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 to-transparent pointer-events-none" />
          <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Wellness Knowledge</span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-8 italic">Explore the Future of Wellness.</h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Deep dive into our expert-curated guides on modern intimacy, holistic health, and the science of pleasure.
          </p>
          <button className="neon-button px-12 mx-auto">
            Visit Journal
          </button>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Join the Private Community.</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border border-white/10 glass-card flex items-center justify-center text-white/20 font-black">
                U{i}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40">
              +12k
            </div>
          </div>
          <p className="mt-8 text-white/30 text-sm italic">"Trusted by over 12,000 customers across India."</p>
        </div>
      </section>
    </div>
  );
}
