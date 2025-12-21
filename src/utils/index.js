export const isMobile = () => {
    return /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry/i.test(navigator.userAgent);
}

/**
 * Safely extract the first image URL/path from a possibly concatenated string.
 * Handles single-image strings that contain spaces (e.g. file names with spaces)
 * and multi-image concatenated strings by returning the first match that ends
 * with a common image extension.
 */
export function getFirstImage(images) {
    if (!images) return "";
    if (Array.isArray(images) && images.length > 0) {
        return encodeURI(String(images[0]));
    }
    const str = String(images).trim();
    // Capture up to the first occurrence of a common image file extension, including spaces
    const m = str.match(/(.+?\.(?:png|jpe?g|gif|webp|svg))/i);
    if (m && m[1]) return encodeURI(m[1].trim());
    return encodeURI(str);
} 