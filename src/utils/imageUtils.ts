/**
 * Utility functions for handling image URLs in the application
 */

// Backend base URL for API calls
const backendBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * Ensures a URL is absolute (full URL) rather than relative
 * Handles various formats of URLs returned from the backend
 * 
 * @param urlField - The URL field value from API response
 * @param pathField - The path field value from API response (fallback)
 * @param fileType - The type of file (signatures or sketches)
 * @returns A properly formatted absolute URL
 */
export const ensureAbsoluteUrl = (
  urlField: string | null,
  pathField: string | null,
  fileType: 'signatures' | 'sketches'
): string | null => {
  // Return null for null inputs
  if (!urlField && !pathField) {
    return null;
  }
  
  // Try to use urlField first, fallback to pathField
  const fieldToUse = urlField || pathField;
  if (!fieldToUse) return null;
  
  // If it's already an absolute URL, return it
  if (fieldToUse.startsWith('http')) {
    return fieldToUse;
  }
  
  // Handle various formats of relative URLs
  if (fieldToUse.startsWith('/storage/')) {
    return `${backendBaseUrl}${fieldToUse}`;
  }
  
  if (fieldToUse.startsWith('storage/')) {
    return `${backendBaseUrl}/${fieldToUse}`;
  }
  
  if (fieldToUse.startsWith(`${fileType}/`)) {
    return `${backendBaseUrl}/storage/${fieldToUse}`;
  }
  
  // For just a filename, construct the proper path
  if (!fieldToUse.includes('/')) {
    return `${backendBaseUrl}/storage/${fileType}/${fieldToUse}`;
  }
  
  // Default: assume it's a path relative to the storage directory
  return `${backendBaseUrl}/storage/${fieldToUse}`;
};

/**
 * Convert a storage URL to a direct-access URL for cases where
 * the symlink isn't working properly
 */
export const getDirectAccessUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  // If it's already a direct access URL, return it as is
  if (url.includes('/direct-access/')) {
    return url;
  }
  
  // Convert storage URL to direct access URL
  return url.replace('/storage/', '/direct-access/');
};

/**
 * Fallback URL generator that tries multiple URL formats
 * Useful when you're not sure which format will work
 */
export const getFallbackUrls = (
  urlField: string | null,
  pathField: string | null,
  fileType: 'signatures' | 'sketches'
): string[] => {
  const urls: string[] = [];
  
  // Try the standard URL
  const standardUrl = ensureAbsoluteUrl(urlField, pathField, fileType);
  if (standardUrl) urls.push(standardUrl);
  
  // Try direct access URL
  if (standardUrl) {
    const directUrl = getDirectAccessUrl(standardUrl);
    if (directUrl) urls.push(directUrl);
  }
  
  // Try a serve-image.php URL if both above approaches fail
  if (pathField) {
    // Convert the path to a format suitable for serve-image.php
    const serveParam = pathField.startsWith(`${fileType}/`) 
      ? pathField 
      : `${fileType}/${pathField}`;
    
    urls.push(`${backendBaseUrl}/serve-image.php?path=${encodeURIComponent(serveParam)}`);
  }
  
  return urls;
}; 