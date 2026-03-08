"use client";

import Image from "next/image";
import { useSiteMedia } from "@/hooks/useSiteMedia";

interface BlogImageProps {
    index?: number;
    thumbnail?: string;
    mediaKey?: string;
    alt: string;
    className?: string;
    fill?: boolean;
    priority?: boolean;
}

export default function BlogImage({
    index = 0,
    thumbnail,
    mediaKey,
    alt,
    className,
    fill = true,
    priority = false
}: BlogImageProps) {
    // Determine if it's an API-fetched blog or a static one.
    // API blogs have a thumbnail URL but NO mediaKey.
    const isApiBlog = thumbnail && (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) && !mediaKey;

    if (isApiBlog) {
        return (
            <Image
                src={thumbnail}
                alt={alt}
                fill={fill}
                className={className}
                priority={priority}
            />
        );
    }

    // For static/hardcoded blogs:
    // We prioritize mediaKey. If missing, we fallback to index + 100 pattern.
    // e.g., index 0 -> blog_img_100
    const key = mediaKey || `blog_img_${index + 100}`;
    const { mediaUrl: cloudinaryUrl } = useSiteMedia(key, 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=1000');

    return (
        <Image
            src={cloudinaryUrl}
            alt={alt}
            fill={fill}
            className={className}
            priority={priority}
        />
    );
}
