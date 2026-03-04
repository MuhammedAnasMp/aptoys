export function useSiteMedia(key: string, defaultUrl: string) {
    const cloudName = 'dyt8amitd';
    // Construct the URL directly based on the expected folder and key
    const mediaUrl = `https://res.cloudinary.com/${cloudName}/image/upload/site_media/${key}`;

    // Direct construction is instant, so loading is always false
    return { mediaUrl, loading: false };
}
