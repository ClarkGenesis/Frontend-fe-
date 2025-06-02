import React, { useState, useEffect } from 'react';
import { getFallbackUrls } from '../utils/imageUtils';

interface ImageWithFallbackProps {
  urlField: string | null;
  pathField?: string | null;
  fileType: 'signatures' | 'sketches';
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  urlField,
  pathField = null,
  fileType,
  alt,
  className = '',
  style = {},
}) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [fallbackUrls, setFallbackUrls] = useState<string[]>([]);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [attemptingFallback, setAttemptingFallback] = useState(false);

  // Initialize the list of URLs to try
  useEffect(() => {
    const urls = getFallbackUrls(urlField, pathField, fileType);
    setFallbackUrls(urls);
    
    // Reset state when inputs change
    setLoaded(false);
    setError(false);
    setAttemptingFallback(false);
    setFallbackIndex(0);
    
    // Set the first URL to try
    if (urls.length > 0) {
      setCurrentUrl(urls[0]);
    } else {
      setCurrentUrl(null);
      setError(true);
    }
  }, [urlField, pathField, fileType]);

  // Update current URL when fallbackIndex changes
  useEffect(() => {
    if (fallbackIndex < fallbackUrls.length) {
      setCurrentUrl(fallbackUrls[fallbackIndex]);
      setAttemptingFallback(fallbackIndex > 0);
    } else {
      setCurrentUrl(null);
      setError(true);
      setAttemptingFallback(false);
    }
  }, [fallbackIndex, fallbackUrls]);

  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${currentUrl}`);
    
    // Try the next fallback URL
    if (fallbackIndex < fallbackUrls.length - 1) {
      setFallbackIndex(prevIndex => prevIndex + 1);
      setAttemptingFallback(true);
    } else {
      setError(true);
      setAttemptingFallback(false);
    }
  };

  // Handle successful load
  const handleLoad = () => {
    setLoaded(true);
    setError(false);
    console.log(`Successfully loaded image for ${alt}:`, currentUrl);
  };

  // Default style for the container
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...style,
  };

  // Default style for the image
  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    objectFit: 'contain',
    border: loaded ? '1px solid #ddd' : error ? '1px solid #f56565' : '1px solid #ddd',
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {currentUrl ? (
        <>
          <img
            src={currentUrl}
            alt={alt}
            onError={handleError}
            onLoad={handleLoad}
            style={imageStyle}
          />
          {/* Error message has been removed since we're successfully loading images through fallbacks */}
        </>
      ) : (
        <div style={{ 
          color: '#718096', 
          padding: '1rem', 
          textAlign: 'center',
          border: '1px dashed #cbd5e0',
          borderRadius: '0.25rem',
          backgroundColor: '#f7fafc',
          width: '100%',
        }}>
          {error && !attemptingFallback ? `No image available` : 'Loading...'}
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback; 