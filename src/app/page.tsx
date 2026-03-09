"use client";

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SocialProofToast from "@/components/home/SocialProofToast";
import BundleSection from "@/components/home/BundleSection";
import BackgroundReveal from "@/components/ui/BackgroundReveal";
import ParallaxIcons from "@/components/ui/ParallaxIcons";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSiteMedia } from "@/hooks/useSiteMedia";
import { FiPackage, FiLock, FiTruck } from "react-icons/fi";

export default function Home() {
  const { mediaUrl: backgroundImage } = useSiteMedia('home_bg_mask', '');

  return (
    <div className="relative overflow-hidden">
      <BackgroundReveal backgroundImage={backgroundImage} />
      <ParallaxIcons />
      <Hero />
      <SocialProofToast />
      <BundleSection />
      <FeaturedProducts />
      <Categories />

      {/* Wellness Philosophy Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#04060B] to-space-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block underline-glow">Intelligence Hub</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 italic">The Philosophy of Engineering Bliss.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">Our approach combines three pillars of modern excellence to deliver the ultimate private experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Biotech Excellence",
                desc: "Body-safe, medical-grade materials engineered for long-term health and sensitivity.",
                icon: "🧬"
              },
              {
                title: "High Engineering",
                desc: "Precision mechanics and whisper-quiet motors designed with aerospace-level attention to detail.",
                icon: "⚙️"
              },
              {
                title: "Absolute Privacy",
                desc: "End-to-end encrypted data protection and confidential, unmarked shipping across India.",
                icon: "🛡️"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="glass-card p-10 hover:border-neon-purple/30 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">{pillar.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="neon-button px-12 mx-auto">Explore Our Journal</button>
          </div>
        </div>
      </section>

      {/* Trust & Discreet Delivery Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group pr-4 lg:pr-12"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden glass-card border-white/10 relative">
              <Image
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1000"
                alt="Premium Quality Standards"
                fill
                className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black/60 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
            </div>
            {/* Decorative background glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-neon-purple/10 blur-[100px] -z-10 group-hover:bg-neon-purple/20 transition-colors duration-700" />
          </motion.div>
          <div>
            <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Uncompromising Standards</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">Discreet Delivery. <br />Decidedly Premium.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-neon-purple">
                  <FiPackage size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Anonymous Packaging</h4>
                  <p className="text-white/40 text-sm">Every order is shipped in plain, unmarked boxes with no mention of the contents or brand name on the label.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-electric-blue">
                  <FiLock size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Secure Transactions</h4>
                  <p className="text-white/40 text-sm">We use bank-level encryption for all payments. 'AdultPlayToys' will not appear on your credit card statement.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-glow-pink">
                  <FiTruck size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Hand to Hand Delivery</h4>
                  <p className="text-white/40 text-sm">Our dedicated concierge team ensures personalized, direct delivery to your hands for absolute privacy and comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 px-6 md:px-12 text-center bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <span className="text-neon-purple/50 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Private Network</span>
          <h3 className="text-3xl font-bold mb-10 tracking-tight">Trusted by 12,000+ Wellness Visionaries.</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-14 h-14 rounded-full border border-white/10 glass-card flex items-center justify-center text-white/20 font-black relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                U{i}
              </div>
            ))}
            <div className="w-14 h-14 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-[10px] font-bold text-neon-purple">
              +12k
            </div>
          </div>
          <p className="text-white/30 text-sm italic italic">"Join the future of personal wellness in the AdultPlayToys Echo System across India."</p>
        </div>
      </section>
    </div>
  );
}
