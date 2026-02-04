/**
 * Cloudinary Image Helpers - Online Nexus Marketing
 * 
 * Transform and optimize images through Cloudinary's fetch API
 */

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  aspectRatio?: string; // e.g., "16:9", "4:3", "1:1"
  dpr?: 1 | 2 | 3 | 'auto'; // Device pixel ratio
  blur?: number; // Blur strength (1-2000)
  sharpen?: boolean;
}

/**
 * Build Cloudinary transformation string
 */
function buildTransformString(options: CloudinaryOptions): string {
  const transforms: string[] = [];
  
  // Format (always use auto for best format selection)
  transforms.push(`f_${options.format || 'auto'}`);
  
  // Quality
  transforms.push(`q_${options.quality || 'auto'}`);
  
  // Width
  if (options.width) {
    transforms.push(`w_${options.width}`);
  }
  
  // Height
  if (options.height) {
    transforms.push(`h_${options.height}`);
  }
  
  // Aspect Ratio
  if (options.aspectRatio) {
    transforms.push(`ar_${options.aspectRatio.replace(':', '_')}`);
  }
  
  // Crop/Fit
  if (options.crop) {
    transforms.push(`c_${options.crop}`);
  }
  
  // Gravity (for cropping)
  if (options.gravity) {
    transforms.push(`g_${options.gravity}`);
  }
  
  // Device Pixel Ratio
  if (options.dpr) {
    transforms.push(`dpr_${options.dpr}`);
  }
  
  // Effects
  if (options.blur) {
    transforms.push(`e_blur:${options.blur}`);
  }
  
  if (options.sharpen) {
    transforms.push('e_sharpen');
  }
  
  return transforms.join(',');
}

/**
 * Get Cloudinary URL for an image
 * 
 * @param src - Source image URL (can be Contentful URL or any external URL)
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(
  src: string,
  options: CloudinaryOptions = {}
): string {
  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 
                     import.meta.env.CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.warn('Cloudinary cloud name not configured, returning original URL');
    return src;
  }
  
  // Build transformation string
  const transforms = buildTransformString(options);
  
  // Encode the source URL
  const encodedSrc = encodeURIComponent(src);
  
  // Build Cloudinary fetch URL
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodedSrc}`;
}

/**
 * Generate responsive srcset for an image
 * 
 * @param src - Source image URL
 * @param widths - Array of widths to generate (defaults to common breakpoints)
 * @param options - Base transformation options
 * @returns srcset string
 */
export function getResponsiveSrcSet(
  src: string,
  widths: number[] = [640, 768, 1024, 1280, 1536, 1920],
  options: CloudinaryOptions = {}
): string {
  return widths
    .map(width => {
      const url = getCloudinaryUrl(src, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Preset transformations for common use cases
 */
export const CloudinaryPresets = {
  /**
   * Hero/Banner images (large, high quality)
   */
  hero: (src: string, width?: number): string => 
    getCloudinaryUrl(src, {
      width: width || 1920,
      quality: 'auto:good',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
    }),
  
  /**
   * Card/Thumbnail images (medium, optimized)
   */
  card: (src: string, width = 600): string => 
    getCloudinaryUrl(src, {
      width,
      aspectRatio: '4:3',
      quality: 'auto:good',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
    }),
  
  /**
   * Avatar/Profile images (small, square)
   */
  avatar: (src: string, size = 200): string => 
    getCloudinaryUrl(src, {
      width: size,
      height: size,
      aspectRatio: '1:1',
      quality: 'auto',
      format: 'auto',
      crop: 'fill',
      gravity: 'face',
    }),
  
  /**
   * Logo images (maintain aspect, transparent bg)
   */
  logo: (src: string, height = 100): string => 
    getCloudinaryUrl(src, {
      height,
      quality: 'auto:best',
      format: 'auto',
      crop: 'scale',
    }),
  
  /**
   * Background images (large, lower quality ok)
   */
  background: (src: string): string => 
    getCloudinaryUrl(src, {
      width: 1920,
      quality: 'auto:eco',
      format: 'auto',
      crop: 'fill',
      blur: 20, // Slight blur for backgrounds
    }),
  
  /**
   * Thumbnail images (very small, fast loading)
   */
  thumbnail: (src: string, size = 150): string => 
    getCloudinaryUrl(src, {
      width: size,
      height: size,
      aspectRatio: '1:1',
      quality: 60,
      format: 'auto',
      crop: 'thumb',
      gravity: 'auto',
    }),
  
  /**
   * Open Graph / Social Share images
   */
  socialShare: (src: string): string => 
    getCloudinaryUrl(src, {
      width: 1200,
      height: 630,
      aspectRatio: '1.91:1',
      quality: 'auto:good',
      format: 'jpg',
      crop: 'fill',
      gravity: 'auto',
    }),
};

/**
 * Get placeholder image (low quality, for blur-up effect)
 */
export function getPlaceholderUrl(src: string): string {
  return getCloudinaryUrl(src, {
    width: 50,
    quality: 30,
    format: 'auto',
    blur: 100,
  });
}

/**
 * Generate sizes attribute for responsive images
 * 
 * Common breakpoints: sm(640), md(768), lg(1024), xl(1280), 2xl(1536)
 */
export function getSizesAttribute(config: {
  mobile?: string;    // Default: 100vw
  tablet?: string;    // Default: 100vw
  desktop?: string;   // Default: 100vw
  maxWidth?: string;  // e.g., "1280px"
}): string {
  const {
    mobile = '100vw',
    tablet = '100vw',
    desktop = '100vw',
    maxWidth,
  } = config;
  
  const sizes: string[] = [];
  
  if (maxWidth) {
    sizes.push(`(min-width: 1536px) ${maxWidth}`);
  }
  
  if (desktop !== tablet) {
    sizes.push(`(min-width: 1024px) ${desktop}`);
  }
  
  if (tablet !== mobile) {
    sizes.push(`(min-width: 768px) ${tablet}`);
  }
  
  sizes.push(mobile);
  
  return sizes.join(', ');
}

/**
 * Common sizes configurations
 */
export const CommonSizes = {
  fullWidth: getSizesAttribute({ mobile: '100vw', tablet: '100vw', desktop: '100vw' }),
  hero: getSizesAttribute({ mobile: '100vw', tablet: '100vw', desktop: '100vw', maxWidth: '1920px' }),
  content: getSizesAttribute({ mobile: '100vw', tablet: '100vw', desktop: '1280px' }),
  card: getSizesAttribute({ mobile: '100vw', tablet: '50vw', desktop: '33vw' }),
  thumbnail: getSizesAttribute({ mobile: '150px', tablet: '200px', desktop: '200px' }),
};
