"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiShoppingBag, FiShield, FiTruck, FiRefreshCw, FiChevronDown, FiPlay, FiHeart, FiShare2, FiArrowRight, FiChevronLeft } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";
import TrustPayment from "@/components/ui/TrustPayment";

// Pool of generic SEO-optimized reviews for wellness toys
const SOCIAL_PROOF_REVIEWS = [
    { author: "Arjun Sharma", state: "Delhi", rating: 5, comment: "Absolutely satisfied with the quality. Exceeded expectations.", is_verified: true },
    { author: "Mohammed Zaid", state: "Mumbai", rating: 5, comment: "Life saved! This has made such a massive difference. Bahrain quality standards.", is_verified: true },
    { author: "Sneha Reddy", state: "Hyderabad", rating: 4, comment: "Bohot accha product hai. Safe and discreet delivery. Well serviced.", is_verified: true, lang: "Hindi" },
    { author: "Ananya Iyer", state: "Chennai", rating: 5, comment: "Good feeling and premium build. Will definitely explore more. Best in market.", is_verified: true },
    { author: "Vikram Singh", state: "Punjab", rating: 4, comment: "Sira gal baat! Very satisfied with the performance. Great value for money.", is_verified: true, lang: "Punjabi" },
    { author: "Priya Chatterjee", state: "Kolkata", rating: 5, comment: "Khub bhalo! Incredible quality. The attention to detail is remarkable.", is_verified: true, lang: "Bengali" },
    { author: "Karthik Nair", state: "Kerala", rating: 5, comment: "Seamless experience. Discreet and professional. Super happy.", is_verified: true },
    { author: "Fatima Bi", state: "Lucknow", rating: 4, comment: "Truly well serviced. The packaging was completely anonymous as promised.", is_verified: true },
    { author: "Aakash Mehta", state: "Gujarat", rating: 5, comment: "A total game changer. Feeling much more empowered now. Saras che!", is_verified: true, lang: "Gujarati" },
    { author: "Ishita Fernandes", state: "Goa", rating: 5, comment: "The best investment I've made recently. Quality is top-notch.", is_verified: true },
    { author: "Siddharth Rao", state: "Bangalore", rating: 4, comment: "Excellent service. Discreet and fast shipping. Fully satisfied.", is_verified: true },
    { author: "Riya Kapoor", state: "Chandigarh", rating: 5, comment: "Premium experience all around. So glad I found this site.", is_verified: true },
    { author: "Kabir Khan", state: "Pune", rating: 3, comment: "Product is good but expected more features for the price. Still satisfied.", is_verified: true },
    { author: "Neha Deshmukh", state: "Nagpur", rating: 5, comment: "Life saved! This brought back so much joy and confidence. Amazing.", is_verified: true },
    { author: "Manish Gupta", state: "Patna", rating: 2, comment: "Shipping took longer than expected. Product quality is okay.", is_verified: true },
    { author: "Tanvi Shetty", state: "Mangalore", rating: 4, comment: "Tuluva products level quality! Well serviced and very discreet.", is_verified: true },
    { author: "Aditya Verma", state: "Indore", rating: 5, comment: "Exceptional safety measures. Feels very high-tech and safe.", is_verified: true },
    { author: "Sonia D'souza", state: "Mangalore", rating: 5, comment: "Incredible wellness addition. So satisfied with the purchase.", is_verified: true },
    { author: "Rahul Jain", state: "Jaipur", rating: 4, comment: "Great value. Discreet packaging is a huge plus. Very safe.", is_verified: true },
    { author: "Deepika Padukone", state: "Bangalore", rating: 5, comment: "Good feeling! The technology here is state-of-the-art. Love it.", is_verified: true },
    { author: "Sameer Sheikh", state: "Mumbai", rating: 5, comment: "Absolutely life saving for stress. Every cent worth it.", is_verified: true },
    { author: "Anjali Menon", state: "Kochi", rating: 4, comment: "Nalla experience! Very satisfied with the timely delivery.", is_verified: true, lang: "Malayalam" },
    { author: "Varun Malhotra", state: "Gurgaon", rating: 5, comment: "Top-tier curation. You can tell they only pick premium items.", is_verified: true },
    { author: "Kavya Patil", state: "Maharashtra", rating: 5, comment: "Masta aahe! Discreet, premium, and effective. Fully satisfied.", is_verified: true, lang: "Marathi" },
    { author: "Abhishek Pandey", state: "UP", rating: 3, comment: "Decent performance but packaging had a small tear (discreet though).", is_verified: true },
    { author: "Sanya Joseph", state: "Kerala", rating: 5, comment: "Life saved! This has significantly improved my quality of life. Thank you.", is_verified: true },
    { author: "Divya Balan", state: "Tamil Nadu", rating: 5, comment: "Arumaiyana product! A must-have for wellness enthusiasts.", is_verified: true, lang: "Tamil" },
    { author: "Nikhil Bhatt", state: "Uttarakhand", rating: 4, comment: "Completely satisfied. Quality is evident from the first touch.", is_verified: true },
    { author: "Ridhi Goswami", state: "Assam", rating: 5, comment: "Truly transformative. So happy with the results. Dhanyawaad.", is_verified: true },
    { author: "Yash Tiwari", state: "MP", rating: 1, comment: "Battery life could be better. Bit disappointed.", is_verified: true },
    { author: "Pooja Hegde", state: "Karnataka", rating: 4, comment: "Well serviced and delivered with care. Highly recommended to everyone.", is_verified: true },
    { author: "Armaan Malik", state: "Mumbai", rating: 5, comment: "Excellent experience. The privacy measures are unmatched in India.", is_verified: true },
    { author: "Shruti Haasan", state: "Chennai", rating: 5, comment: "Nalla irukku! The design is very ergonomic and sleek.", is_verified: true, lang: "Tamil" },
    { author: "Amit Trivedi", state: "Ahmedabad", rating: 4, comment: "Kamaal che! Great value for money. Fully satisfied with delivery.", is_verified: true, lang: "Gujarati" },
    { author: "Tara Sutaria", state: "Mumbai", rating: 5, comment: "Transformative journey. The product quality is beyond worlds.", is_verified: true },
    { author: "Zoya Akhtar", state: "Delhi", rating: 5, comment: "Life saved! This has helped me reconnect with my body.", is_verified: true },
    { author: "Rishabh Pant", state: "Roorkee", rating: 2, comment: "Too many emails after buying. Product is okay.", is_verified: true },
    { author: "Sara Ali Khan", state: "Pataudi", rating: 5, comment: "Shandaar! Premium items that really work for your soul.", is_verified: true, lang: "Hindi" },
    { author: "Aryan Vaid", state: "Rajasthan", rating: 5, comment: "Satisfied with everything. Packaging was totally anonymous.", is_verified: true },
    { author: "Kriti Sanon", state: "Delhi", rating: 4, comment: "Great quality and discreet. Just as advertised in the shop.", is_verified: true },
    { author: "Arjun Nair", state: "Kerala", rating: 5, comment: "വളരെ നല്ല ഉൽപ്പന്നം. വീണ്ടും വാങ്ങും.", is_verified: false, lang: "Malayalam" },
    { author: "Rahul Menon", state: "Kerala", rating: 4, comment: "Nalla quality aanu. Worth the price.", is_verified: false },
    { author: "Akhil Raj", state: "Kerala", rating: 3, comment: "ശരി തന്നെ, പക്ഷേ കുറച്ച് മെച്ചപ്പെടുത്താം.", is_verified: false, lang: "Malayalam" },
    { author: "Neha Pillai", state: "Kerala", rating: 5, comment: "Really liked it. Delivery fast aayirunnu.", is_verified: false },
    { author: "Vivek S", state: "Kerala", rating: 4, comment: "ഉപയോഗിക്കാൻ എളുപ്പമാണ്.", is_verified: false, lang: "Malayalam" },
    { author: "Anu Thomas", state: "Kerala", rating: 5, comment: "Super product! Totally satisfied.", is_verified: false },
    { author: "Rohit Babu", state: "Kerala", rating: 2, comment: "Expected kurachu better aayirunnu.", is_verified: false },
    { author: "Sreya Nair", state: "Kerala", rating: 4, comment: "Packaging neat aanu.", is_verified: false },
    { author: "Jithin Das", state: "Kerala", rating: 5, comment: "വിലയ്ക്ക് അനുസരിച്ച് നല്ലതാണ്.", is_verified: false, lang: "Malayalam" },
    { author: "Asha R", state: "Kerala", rating: 3, comment: "Okay experience. Not bad.", is_verified: false },

    { author: "Deepak Kumar", state: "Kerala", rating: 4, comment: "Nalla build quality.", is_verified: false },
    { author: "Divya Soman", state: "Kerala", rating: 5, comment: "വളരെ സന്തോഷം.", is_verified: false, lang: "Malayalam" },
    { author: "Manu Joseph", state: "Kerala", rating: 4, comment: "Fast delivery and good support.", is_verified: false },
    { author: "Nithya Raj", state: "Kerala", rating: 5, comment: "Ith pole oru product thediyirunnu.", is_verified: false },
    { author: "Ajmal K", state: "Kerala", rating: 3, comment: "Average aanu but okay.", is_verified: false },
    { author: "Reshma N", state: "Kerala", rating: 5, comment: "Very happy with purchase.", is_verified: false },
    { author: "Sarath Lal", state: "Kerala", rating: 4, comment: "Design valare nannayi.", is_verified: false },
    { author: "Fathima P", state: "Kerala", rating: 5, comment: "വളരെ ഉപകാരപ്പെട്ടു.", is_verified: false, lang: "Malayalam" },
    { author: "Anand Mohan", state: "Kerala", rating: 3, comment: "Just okay experience.", is_verified: false },
    { author: "Keerthi Menon", state: "Kerala", rating: 4, comment: "Nice and simple to use.", is_verified: false },

    { author: "Aravind P", state: "Kerala", rating: 5, comment: "Super! Totally worth it.", is_verified: false },
    { author: "Sneha Das", state: "Kerala", rating: 4, comment: "Good packaging and safe delivery.", is_verified: false },
    { author: "Rakesh S", state: "Kerala", rating: 3, comment: "Kurachu improvements venam.", is_verified: false },
    { author: "Lakshmi Nair", state: "Kerala", rating: 5, comment: "എനിക്ക് വളരെ ഇഷ്ടപ്പെട്ടു.", is_verified: false, lang: "Malayalam" },
    { author: "Vishnu T", state: "Kerala", rating: 4, comment: "Good overall experience.", is_verified: false },
    { author: "Anjali K", state: "Kerala", rating: 5, comment: "Really impressed with quality.", is_verified: false },
    { author: "Basil Mathew", state: "Kerala", rating: 2, comment: "Delivery delay undayirunnu.", is_verified: false },
    { author: "Athira S", state: "Kerala", rating: 4, comment: "Nalla finishing aanu.", is_verified: false },
    { author: "Arjun Varma", state: "Kerala", rating: 5, comment: "Highly recommended.", is_verified: false },
    { author: "Nikhil P", state: "Kerala", rating: 3, comment: "Sadharana product.", is_verified: false },

    { author: "Anas K", state: "Kerala", rating: 5, comment: "വിലയ്ക്ക് നല്ല value.", is_verified: false, lang: "Malayalam" },
    { author: "Riya Thomas", state: "Kerala", rating: 4, comment: "Fast shipping.", is_verified: false },
    { author: "Haris M", state: "Kerala", rating: 5, comment: "Quality top aanu.", is_verified: false },
    { author: "Sanjay Raj", state: "Kerala", rating: 3, comment: "Average experience.", is_verified: false },
    { author: "Meera Nair", state: "Kerala", rating: 5, comment: "Loved the product.", is_verified: false },
    { author: "Jasmin P", state: "Kerala", rating: 4, comment: "Nalla packaging.", is_verified: false },
    { author: "Ajith Kumar", state: "Kerala", rating: 5, comment: "വളരെ നല്ലതാണ്.", is_verified: false, lang: "Malayalam" },
    { author: "Sumi S", state: "Kerala", rating: 4, comment: "Very useful item.", is_verified: false },
    { author: "Rinto Paul", state: "Kerala", rating: 3, comment: "Okay for price.", is_verified: false },
    { author: "Anju Varghese", state: "Kerala", rating: 5, comment: "Happy with purchase.", is_verified: false },

    { author: "Sreeraj", state: "Kerala", rating: 4, comment: "Worth trying.", is_verified: false },
    { author: "Afsal K", state: "Kerala", rating: 5, comment: "Super experience.", is_verified: false },
    { author: "Anitha S", state: "Kerala", rating: 3, comment: "Expected little more.", is_verified: false },
    { author: "Dileep N", state: "Kerala", rating: 4, comment: "Simple and nice.", is_verified: false },
    { author: "Vimal Raj", state: "Kerala", rating: 5, comment: "Excellent quality.", is_verified: false },
    { author: "Anson Mathew", state: "Kerala", rating: 4, comment: "Fast and safe delivery.", is_verified: false },
    { author: "Firoz K", state: "Kerala", rating: 5, comment: "Valare nalla product.", is_verified: false },
    { author: "Roshni P", state: "Kerala", rating: 3, comment: "Normal experience.", is_verified: false },
    { author: "Hari Krishnan", state: "Kerala", rating: 4, comment: "Nice build quality.", is_verified: false },
    { author: "Aparna N", state: "Kerala", rating: 5, comment: "Very satisfied.", is_verified: false },

    { author: "Naveen Raj", state: "Kerala", rating: 4, comment: "Works well.", is_verified: false },
    { author: "Sajid K", state: "Kerala", rating: 5, comment: "Highly satisfied.", is_verified: false },
    { author: "Mini Joseph", state: "Kerala", rating: 3, comment: "Could be better.", is_verified: false },
    { author: "Albin P", state: "Kerala", rating: 5, comment: "Great value.", is_verified: false },
    { author: "Ratheesh K", state: "Kerala", rating: 4, comment: "Nalla feel aanu.", is_verified: false },
    { author: "Arya S", state: "Kerala", rating: 5, comment: "Loved using it.", is_verified: false },
    { author: "Sreenath P", state: "Kerala", rating: 3, comment: "Okayish.", is_verified: false },
    { author: "Karthika Nair", state: "Kerala", rating: 5, comment: "വളരെ നല്ല അനുഭവം.", is_verified: false, lang: "Malayalam" },
    { author: "Ashwin B", state: "Kerala", rating: 4, comment: "Nice finishing.", is_verified: false },
    { author: "Nisha K", state: "Kerala", rating: 5, comment: "Very useful.", is_verified: false },

    { author: "Ranjith P", state: "Kerala", rating: 4, comment: "Quality good.", is_verified: false },
    { author: "Manisha S", state: "Kerala", rating: 5, comment: "Happy customer.", is_verified: false },
    { author: "Praveen Raj", state: "Kerala", rating: 3, comment: "Not bad.", is_verified: false },
    { author: "Akhila P", state: "Kerala", rating: 4, comment: "Worth the money.", is_verified: false },
    { author: "Subin K", state: "Kerala", rating: 5, comment: "Super product.", is_verified: false },
    { author: "Devika N", state: "Kerala", rating: 4, comment: "Delivery fast.", is_verified: false },
    { author: "Anwar K", state: "Kerala", rating: 5, comment: "Really liked.", is_verified: false },
    { author: "Arathi S", state: "Kerala", rating: 3, comment: "Average product.", is_verified: false },
    { author: "Binu P", state: "Kerala", rating: 4, comment: "Good support.", is_verified: false },
    { author: "Nimisha Nair", state: "Kerala", rating: 5, comment: "Great purchase.", is_verified: false },

    { author: "Anoop S", state: "Kerala", rating: 4, comment: "Nice experience.", is_verified: false },
    { author: "Riya Mathew", state: "Kerala", rating: 5, comment: "Loved it.", is_verified: false },
    { author: "Sajin K", state: "Kerala", rating: 3, comment: "Normal quality.", is_verified: false },
    { author: "Vineeth Raj", state: "Kerala", rating: 5, comment: "Excellent.", is_verified: false },
    { author: "Athul P", state: "Kerala", rating: 4, comment: "Nalla item.", is_verified: false },
    { author: "Megha S", state: "Kerala", rating: 5, comment: "Super happy.", is_verified: false },
    { author: "Jerin P", state: "Kerala", rating: 3, comment: "Okay item.", is_verified: false },
    { author: "Sanoop K", state: "Kerala", rating: 4, comment: "Good finish.", is_verified: false },
    { author: "Reshmi S", state: "Kerala", rating: 5, comment: "Really good.", is_verified: false },
    { author: "Anoop Varghese", state: "Kerala", rating: 4, comment: "Satisfied.", is_verified: false },
    { author: "Arjun Nair", state: "Kerala", rating: 5, comment: "വളരെ നല്ല അനുഭവം ആയിരുന്നു. ആദ്യമായി ഓർഡർ ചെയ്തപ്പോൾ തന്നെ quality നല്ലതാണെന്ന് മനസ്സിലായി. Packaging neat ആയിരുന്നു, deliveryയും സമയത്ത് എത്തി. Definitely വീണ്ടും വാങ്ങാൻ ആഗ്രഹിക്കുന്നു.", is_verified: false, lang: "Malayalam" },

    { author: "Rahul Menon", state: "Kerala", rating: 4, comment: "Honestly speaking product quality nalla thanne aanu. First use cheythappol thanne feel difference undayirunnu. Packaging discreet aayirunnu which I liked. Only small improvement delivery speedil venam.", is_verified: false },

    { author: "Sneha Pillai", state: "Kerala", rating: 5, comment: "Ith pole oru product njan kurachu naalayi search cheythu kondirunnu. Finally ith try cheythappol result nallathayirunnu. Use cheyyan easy aanu, designum ergonomic aanu. Totally satisfied with the purchase.", is_verified: false },

    { author: "Vishnu Prasad", state: "Kerala", rating: 4, comment: "Product overall nalla experience aanu thannath. Quality strong aanu, feel premium pole undu. Delivery safe aayi vannu. Kurachu price kuravayirunnenkil perfect aayene.", is_verified: false },

    { author: "Anjali Kurian", state: "Kerala", rating: 3, comment: "Experience okay aayirunnu. Product work cheyyunnu but njan expect cheythathinekkal kurachu average feel undayirunnu. Packaging neat aanu and delivery fast aayirunnu.", is_verified: false },

    { author: "Deepak Kumar", state: "Kerala", rating: 5, comment: "Super experience overall. Product build quality kandappol thanne premium feel undu. Customer supportum nalla responsive aayirunnu. Definitely recommend cheyyam.", is_verified: false },

    { author: "Meera Nair", state: "Kerala", rating: 4, comment: "എനിക്ക് ഇത് ഉപയോഗിച്ചപ്പോൾ നല്ല അനുഭവം തന്നെയാണ് കിട്ടിയത്. Quality decent ആണ്, packaging discreet ആയിരുന്നു. Delivery timeum acceptable ആയിരുന്നു.", is_verified: false, lang: "Malayalam" },

    { author: "Akhil Raj", state: "Kerala", rating: 5, comment: "Honestly njan ith purchase cheythappol ithra good aayirikkum ennu karuthiyilla. But after using it for few days, I can say it's worth the money. Quality really impressed me.", is_verified: false },

    { author: "Reshma N", state: "Kerala", rating: 4, comment: "Overall experience positive aanu. Product use cheyyan easy aanu, instructions clear aayirunnu. Delivery fast aayirunnu. Slight improvement qualityil undenkil even better aakum.", is_verified: false },

    { author: "Sarath Lal", state: "Kerala", rating: 5, comment: "വളരെ മികച്ച ഒരു ഉൽപ്പന്നമാണ്. ഉപയോഗിക്കാൻ സുഖകരവും design വളരെ sleek ആയതുമാണ്. Packaging discreet ആയതിനാൽ privacy നല്ല രീതിയിൽ maintain ചെയ്തിട്ടുണ്ട്.", is_verified: false, lang: "Malayalam" },

    { author: "Athira S", state: "Kerala", rating: 4, comment: "Product quality good aanu. First time try cheythappol thanne nalla build quality feel cheythu. Delivery kurachu delay undayirunnu but product itself nice.", is_verified: false },

    { author: "Basil Mathew", state: "Kerala", rating: 3, comment: "Average experience aanu. Product okay aanu but njan expect cheytha levelil premium feel undayirunnilla. Packaging however neat aayirunnu.", is_verified: false },

    { author: "Lakshmi Nair", state: "Kerala", rating: 5, comment: "എനിക്ക് വളരെ ഇഷ്ടപ്പെട്ടു. ആദ്യമായി വാങ്ങുമ്പോൾ ചെറിയ doubt ഉണ്ടായിരുന്നു, പക്ഷേ ഉപയോഗിച്ചപ്പോൾ qualityയും comfortഉം വളരെ നല്ലതായി തോന്നി.", is_verified: false, lang: "Malayalam" },

    { author: "Nikhil P", state: "Kerala", rating: 4, comment: "Good product for the price. Use cheyyan easy aanu and instructions clear aayirunnu. Delivery fast aayi vannu which was a plus point.", is_verified: false },

    { author: "Anas K", state: "Kerala", rating: 5, comment: "Valare nalla product aanu. Quality strong aanu, finishingum neat aanu. First use kazhinjappol thanne satisfied feel undayi.", is_verified: false },

    { author: "Riya Thomas", state: "Kerala", rating: 4, comment: "Overall nalla experience aanu. Packaging discreet aayirunnu which I appreciate. Productum good quality aanu.", is_verified: false },

    { author: "Haris M", state: "Kerala", rating: 5, comment: "Super product honestly. I didn't expect this much quality for this price. Build quality solid aanu and designum modern aanu.", is_verified: false },

    { author: "Sanjay Raj", state: "Kerala", rating: 3, comment: "It's okay product. Work cheyyunnu but kurachu better materials use cheythirunnenkil premium feel undayene.", is_verified: false },

    { author: "Jasmin P", state: "Kerala", rating: 4, comment: "Delivery fast aayirunnu and packaging neat. Product use cheyyan simple aanu and instructions clear aayirunnu. Overall good experience.", is_verified: false },

    { author: "Ajith Kumar", state: "Kerala", rating: 5, comment: "വളരെ നല്ല ഒരു വാങ്ങൽ ആയിരുന്നു. വിലയ്ക്ക് അനുസരിച്ച് qualityയും performanceഉം വളരെ നല്ലതാണ്.", is_verified: false, lang: "Malayalam" }
];

type Media = {
    media_type: "image" | "video";
    file: string;
}


interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    discount_price?: string;
    rating: number;
    sales_count: number;
    customer_count: number;
    is_trending: boolean;
    benefits: { title: string; detail: string; }[];
    images: { id: number; file: string; media_type: string; }[];
    reviews: {
        id: number;
        author: string;
        rating: number;
        comment: string;
        is_verified: boolean;
        created_at: string;
        images: { id: number; file: string; media_type: string; }[];
    }[];
}

export default function ProductDetails() {
    const params = useParams();
    const slug = params.slug as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const { addToCart } = useCart();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [displayedReviews, setDisplayedReviews] = useState<any[]>([]);

    useEffect(() => {
        if (product) {
            setDisplayedReviews(product.reviews);
        }
    }, [product]);

    const handleReadAllReviews = () => {
        // Pick 25 random reviews from the social proof pool
        const shuffled = [...SOCIAL_PROOF_REVIEWS].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 25).map((rev, idx) => ({
            ...rev,
            id: -(idx + Date.now()), // Unique negative ID for fake reviews
            created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            images: []
        }));

        setDisplayedReviews(prev => [...prev, ...selected]);
    };
    const [previewMedia, setPreviewMedia] = useState<Media | null>(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}/`);
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white/50">
                Product not found
            </div>
        );
    }

    const mediaItems = product.images.map(img => ({
        id: img.id,
        type: img.media_type,
        url: img.file
    }));

    // generate a random number between 100 and 1000 and that not chnage today but increase in hours count  
    const randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    const today = new Date();
    const hours = today.getHours();
    const randomNumberWithHours = randomNumber + hours;


    return (
        <div className="min-h-screen pb-24">
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <Link
                    href="/shop"
                    className="group flex items-center gap-2 text-white/40 hover:text-neon-purple transition-all text-xs font-bold uppercase tracking-[0.2em] w-fit mb-8"
                >
                    <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center group-hover:border-neon-purple/50">
                        <FiChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Back to Shop
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left: Gallery */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="sticky top-28 aspect-[4/5] rounded-[2rem] overflow-hidden glass-card border-white/10 relative"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedMedia}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full"
                            >
                                {mediaItems.length > 0 && mediaItems[selectedMedia].type === "video" ? (
                                    <video
                                        ref={videoRef}
                                        src={mediaItems[selectedMedia].url}
                                        autoPlay
                                        muted
                                        loop
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                ) : (mediaItems.length > 0 && mediaItems[selectedMedia].url && mediaItems[selectedMedia].url !== "") ? (
                                    <Image
                                        src={mediaItems[selectedMedia].url}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        unoptimized={mediaItems[selectedMedia].type === "gif"}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <span className="text-white/10 font-black uppercase tracking-widest text-2xl font-mono">No Media</span>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <div className="flex gap-4 mt-6">
                        {mediaItems.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedMedia(i)}
                                className={`w-20 h-20 rounded-xl glass-card overflow-hidden cursor-pointer hover:border-neon-purple active:scale-95 transition-all relative ${selectedMedia === i ? "border-neon-purple ring-2 ring-neon-purple/50" : "border-white/10"}`}
                            >
                                {item.type === "video" ? (
                                    <div className="w-full h-full bg-space-black flex items-center justify-center relative">
                                        <FiPlay className="text-white z-10" />
                                        <video src={item.url} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                                    </div>
                                ) : (item.url && item.url !== "") ? (
                                    <Image
                                        src={item.url}
                                        alt="thumb"
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                        unoptimized={item.type === "gif"}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/10 italic text-[10px]">
                                        N/A
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {product.is_trending && (
                                <span className="bg-electric-blue/20 text-electric-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-electric-blue/30">
                                    Trending in India
                                </span>
                            )}
                            <span className="bg-neon-purple/20 text-neon-purple text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-neon-purple/30">
                                Discreet Delivery
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{product.name}</h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1 text-neon-purple">
                                {[1, 2, 3, 4, 5].map(i => <FiStar key={i} fill={i <= Math.floor(product.rating) ? "currentColor" : "none"} />)}
                                <span className="text-white/40 text-xs ml-2">({product.reviews.length + randomNumberWithHours} reviews)</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10" />
                            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-glow-pink">{product.sales_count}+</span> Units Sold
                            </div>
                        </div>

                        <div className="flex items-end gap-4 mb-10">
                            <span className="text-4xl font-black text-white">₹{product.price}</span>
                            {product.discount_price && (
                                <>
                                    <span className="text-white/30 line-through text-lg mb-1">₹{product.discount_price}</span>
                                    <span className="text-glow-pink text-sm font-bold mb-1">
                                        Save ₹{(parseFloat(product.discount_price) - parseFloat(product.price)).toLocaleString()}
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-white/50 leading-relaxed mb-10">
                            {product.description}
                        </p>

                        {/* Benefit Tabs */}
                        <div className="space-y-4 mb-12">
                            {product.benefits.map((benefit, i) => (
                                <div key={i} className="glass-card p-4 transition-all hover:bg-white/5">
                                    <button
                                        onClick={() => setActiveTab(activeTab === i ? -1 : i)}
                                        className="w-full flex items-center justify-between text-sm font-bold text-white/80"
                                    >
                                        <span>{benefit.title}</span>
                                        <FiChevronDown className={`transition-transform duration-300 ${activeTab === i ? "rotate-180" : ""}`} />
                                    </button>
                                    {activeTab === i && (
                                        <p className="mt-3 text-white/40 text-xs leading-relaxed animate-in fade-in slide-in-from-top-2">
                                            {benefit.detail}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: mediaItems?.[0]?.url || "",
                                    slug: slug
                                })}
                                className="neon-button h-14 w-full text-sm"
                            >
                                <FiShoppingBag className="mr-2" /> Add to Cart
                            </button>
                            <div className="h-14 w-full">
                                <WhatsAppCTA productName={product.name} productId={product.id} variant="inline" />
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/5">
                            <div className="flex flex-col items-center text-center gap-2">
                                <FiShield className="text-neon-purple" size={24} />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">1 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <FiTruck className="text-electric-blue" size={24} />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <FiRefreshCw className="text-glow-pink" size={24} />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Private Return</span>
                            </div>
                        </div>

                        <TrustPayment />

                    </motion.div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="mb-12">
                    <span className="text-glow-pink text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Social Proof</span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Verified Explorers.</h2>
                </div>

                {/* Review Summary & Global Media Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 bg-white/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                    {/* Rating Breakdown */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="text-6xl font-black text-white">{product.rating}</div>
                            <div>
                                <div className="flex text-neon-purple mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <FiStar key={i} fill={i <= Math.floor(product.rating) ? "currentColor" : "none"} size={16} />)}
                                </div>
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{product.reviews.length + randomNumberWithHours + 5}+ Verified Reviews</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[5, 4, 3, 2, 1].map(stars => {
                                const count = product.reviews.filter(r => r.rating === stars).length;
                                const percentage = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0;
                                return (
                                    <div key={stars} className="flex items-center gap-4 group">
                                        <div className="text-[10px] font-bold text-white/40 w-12 uppercase tracking-tighter group-hover:text-white transition-colors">{stars} Stars</div>
                                        <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${percentage}%` }}
                                                className="h-full bg-gradient-to-r from-neon-purple to-electric-blue"
                                            />
                                        </div>
                                        <div className="text-[10px] font-bold text-white/20 w-8">{Math.round(percentage)}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Review Media Gallery */}
                    <div className="lg:col-span-8">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-3">
                            Media from Explorers <div className="h-[1px] flex-grow bg-white/5" />
                        </h4>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                            {product.reviews.flatMap(r => r.images || []).slice(0, 12).map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="aspect-square relative rounded-2xl overflow-hidden glass-card group cursor-pointer border border-white/5"
                                    onClick={() => setPreviewMedia(img as any)} // <-- add this
                                >
                                    {img.media_type === "video" ? (
                                        <div className="w-full h-full bg-space-black flex items-center justify-center">
                                            <FiPlay size={12} className="text-white/50 group-hover:text-white transition-colors" />
                                            <video src={img.file} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40" />
                                        </div>
                                    ) : (
                                        <Image src={img.file} alt="review" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    )}
                                </motion.div>
                            ))}
                            {product.reviews.flatMap(r => r.images || []).length === 0 && (
                                <div className="col-span-full h-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl">
                                    <FiStar className="text-white/5 mb-2" size={24} />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/20">No media uploaded yet</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {previewMedia && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setPreviewMedia(null)} // close on click outside
                    >
                        {previewMedia && previewMedia?.media_type === "video" ? (
                            <video src={previewMedia.file} autoPlay muted loop className="max-h-[90%] max-w-[90%] rounded-xl object-contain" />
                        ) : (
                            <img src={previewMedia.file} alt="preview" className="max-h-[90%] max-w-[90%] rounded-xl" />
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-5 flex flex-col h-full hover:border-white/20 transition-all duration-500"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-0.5 text-neon-purple text-[8px]">
                                    {[1, 2, 3, 4, 5].map(i => <FiStar key={i} fill={i <= review.rating ? "currentColor" : "none"} size={10} />)}
                                </div>
                                <span className="text-white/20 text-[8px] font-bold uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>

                            <p className="text-white/60 text-[11px] leading-relaxed italic mb-6 flex-grow">
                                "{review.comment.length > 80 && Math.random() > 0.5 ? review.comment.substring(0, 80) + '...' : review.comment}"
                            </p>

                            {/* Review Specific Images */}
                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-1.5 mb-4 flex-wrap">
                                    {review.images.map((img: any, idx: number) => (
                                        <div onClick={() => setPreviewMedia(img as any)} key={idx} className="w-8 h-8 rounded-md overflow-hidden relative  cursor-zoom-in border border-white/10 hover:border-neon-purple transition-colors">
                                            {img.media_type === "video" ? (
                                                <div className="w-full h-full bg-space-black flex items-center justify-center">
                                                    <FiPlay size={8} className="text-white/50" />
                                                </div>
                                            ) : (
                                                <Image src={img.file} alt="review media" fill className="object-cover" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">{review.author}</p>
                                    <p className="text-[7px] text-white/30 uppercase tracking-[0.2em]">{review.state || (review.author.includes('Sharma') ? 'Delhi' : 'Mumbai')}</p>
                                    {review.is_verified && (
                                        <p className="text-[7px] text-electric-blue font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                                            <span className="w-1 h-1 rounded-full bg-electric-blue" /> Verified Buyer
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={handleReadAllReviews}
                        className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 hover:text-neon-purple transition-all underline outline-offset-8"
                    >
                        Read All {product.reviews.length + randomNumberWithHours + 5} Reviews
                    </button>
                </div>
            </section>

            {/* WhatsApp Floating Sync */}
            <WhatsAppCTA productName={product.name} productId={product.id} />
        </div>
    );
}
