# Image Loading Utilities and Components

This directory contains utilities and components for handling image loading from the Laravel backend storage, with fallback mechanisms in case the primary method fails.

## The problem

In a Laravel + React application, storage images can sometimes fail to load due to several reasons:
- Symlinks not properly set up between `public/storage` and `storage/app/public`
- CORS issues when accessing images from a different origin
- Permissions issues on storage directories
- URLs being returned in different formats from the API

## Our solution

We've implemented a comprehensive solution with multiple fallback methods:

### 1. ImageUtils

The `imageUtils.ts` file provides utilities for handling image URLs:

- **ensureAbsoluteUrl**: Converts relative URLs to absolute URLs
- **getDirectAccessUrl**: Converts storage URLs to direct-access URLs
- **getFallbackUrls**: Generates multiple URL formats for an image to try in sequence

### 2. ImageWithFallback Component

This React component tries multiple methods to load an image:
1. First, it attempts the standard URL format via Laravel's storage
2. If that fails, it tries the direct-access URL (copying files to public/direct-access)
3. Finally, it tries a PHP script fallback (serve-image.php)

### 3. Backend Scripts

Several scripts in the backend help with image loading issues:

- **check-storage-symlink.php**: Verifies if the storage symlink is properly set up
- **serve-image.php**: Serves images directly from the storage directory
- **fix-images.php**: Creates a direct-access directory and copies images from storage
- **test-all-image-methods.php**: Tests all image loading methods to see which ones work

## How to use

### 1. Using the ImageWithFallback component

```tsx
import ImageWithFallback from '../components/ImageWithFallback';

// In your component:
<ImageWithFallback
  urlField={imageUrl}
  pathField={imagePath}
  fileType="signatures" // or "sketches"
  alt="Your image description"
  className="your-css-class"
/>
```

### 2. Setting up backend files

1. Navigate to `http://yoursite.com/check-storage-symlink.php` to check if your storage symlink is properly configured
2. If it's not, run `php artisan storage:link` or visit `http://yoursite.com/fix-images.php` to set up the direct-access directory

## Troubleshooting

If images still won't load:

1. Check if `storage:link` has been properly created
2. Verify folder permissions (755 for directories, 644 for files)
3. Ensure PHP has permission to read the storage directory
4. Try each method individually using `http://yoursite.com/test-all-image-methods.php`

## Note

This system uses progressive enhancement - it will try the standard Laravel method first, and only fall back to other methods if needed. 