export function useSiteMedia(key: string, defaultUrl: string) {
    const cloudName = 'dyt8amitd';
    if (process.env.NEXT_PUBLIC_DOMAIN === 'http://localhost:3000') {
        return { mediaUrl: "https://media.istockphoto.com/id/133729550/photo/over-packed-suitcase.jpg?s=612x612&w=0&k=20&c=bAjsG4u49alVLMWCsxFNRd9ik1p41Id_Y0iQLdgK7PQ=", loading: false };
    }
    // Construct the URL directly based on the expected folder and key
    const mediaUrl = `https://res.cloudinary.com/${cloudName}/image/upload/site_media/${key}`;

    // Direct construction is instant, so loading is always false
    return { mediaUrl, loading: false };
}
