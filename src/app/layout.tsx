import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/layout/CartDrawer";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
import LiveSalesDashboard from "./live-analytics/page";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {


  title: process.env.NEXT_PUBLIC_DOMAIN !== 'http://localhost:3000' ? "AdultPlayToys.in | Private. Premium. Future Wellness." : '',
  description: process.env.NEXT_PUBLIC_DOMAIN !== 'http://localhost:3000' ? "Next-generation private wellness tech brand. Discreet delivery guaranteed." : '',
  keywords: process.env.NEXT_PUBLIC_DOMAIN !== 'http://localhost:3000' ? ["wellness", "premium toys", "discreet delivery", "future wellness"] : [],

  authors: [{ name: "Adlply Echo System" }],
  creator: "Adlply",
  publisher: "Adlply",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'https://aptoys.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Adlply | Premium Adult Wellness Tech",
    description: "Future-forward wellness products with confidential shipping across India.",
    url: process.env.NEXT_PUBLIC_DOMAIN || 'https://aptoys.vercel.app',
    siteName: 'Adlply',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adlply | Premium Adult Wellness Tech",
    description: "Future-forward wellness products with confidential shipping across India.",
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-outfit antialiased bg-space-black text-white`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <AnalyticsTracker />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <WhatsAppCTA />
          <LiveSalesDashboard />
          {/* Organization Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Adlply",
                "url": process.env.NEXT_PUBLIC_DOMAIN || "https://aptoys.vercel.app",
                "logo": `${process.env.NEXT_PUBLIC_DOMAIN || "https://aptoys.vercel.app"}/logo.png`,
                "description": "Premium tech-forward adult wellness brand focused on privacy and innovation.",
                "sameAs": [
                  `${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`,
                  `${process.env.NEXT_PUBLIC_FACEBOOK_URL}`,
                  `${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
                  `${process.env.NEXT_PUBLIC_GLOBE_URL}`,



                ]
              })
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
