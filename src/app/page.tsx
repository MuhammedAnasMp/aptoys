"use client";

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SocialProofToast from "@/components/home/SocialProofToast";
import BundleSection from "@/components/home/BundleSection";
import BackgroundReveal from "@/components/ui/BackgroundReveal";
import ParallaxIcons from "@/components/ui/ParallaxIcons";
import { useSiteMedia } from "@/hooks/useSiteMedia";

import Trust from "./Trust";
import CommunitySection from "./CommunitySection";

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
      <Trust />
      <CommunitySection />
    </div>
  );
}
