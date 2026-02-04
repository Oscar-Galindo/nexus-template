/**
 * Contentful Client - Online Nexus Marketing
 * 
 * Type-safe content fetching from Contentful CMS
 */

import { createClient, type Entry, type Asset } from 'contentful';

// Initialize Contentful client
const spaceId = import.meta.env.CONTENTFUL_SPACE_ID || '';
const accessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN || '';
const environment = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';

console.log('🔌 Initializing Contentful Client:');
console.log('  Space ID:', spaceId ? `${spaceId.substring(0, 8)}...` : '❌ MISSING');
console.log('  Access Token:', accessToken ? `${accessToken.substring(0, 8)}...` : '❌ MISSING');
console.log('  Environment:', environment);

export const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
});

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface NavigationItem {
  label: string;
  url: string;
  external?: boolean;
}

export interface Navigation {
  logo: Asset;
  navLinks: NavigationItem[];
  ctaText: string;
  ctaUrl: string;
  footerLinks?: {
    services: NavigationItem[];
    company: NavigationItem[];
    legal: NavigationItem[];
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface HeroSection {
  badge?: string;
  headline: string;
  subheadline: string;
  backgroundImage?: Asset;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
}

export interface ContentBlock {
  blockType: 'features' | 'steps' | 'stats' | 'caseStudy' | 'cta' | 'text';
  title?: string;
  description?: string;
  items?: any[]; // Flexible for different block types
  image?: Asset;
  ctaText?: string;
  ctaUrl?: string;
}

export interface ServiceItem {
  icon: string; // Icon name (e.g., 'search' for lucide icons)
  title: string;
  description: string;
  url?: string;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface TestimonialItem {
  quote: string;
  rating: number;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  authorPhoto?: Asset;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string; // 'month' | 'year'
  description: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
  featured?: boolean;
  badge?: string; // e.g., "Most Popular"
}

export interface HomePage {
  hero: HeroSection;
  trustedByLogos?: Asset[];
  servicesSection?: ContentBlock;
  howItWorksSection?: ContentBlock;
  statsSection?: StatItem[];
  testimonialsSection?: TestimonialItem[];
  caseStudySection?: ContentBlock;
  pricingPreview?: PricingTier[];
  bottomCta?: HeroSection;
  seoTitle: string;
  seoDescription: string;
  seoImage?: Asset;
}

export interface StandardPage {
  title: string;
  slug: string;
  hero?: HeroSection;
  contentBlocks?: ContentBlock[];
  seoTitle: string;
  seoDescription: string;
  seoImage?: Asset;
}

export interface GlobalSettings {
  siteName: string;
  siteTagline?: string;
  logo: Asset;
  favicon?: Asset;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultSeoImage?: Asset;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// ============================================================================
// NEW CONTENT TYPES - Minimalist Homepage
// ============================================================================

export interface HomepageV2 {
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTargetAudience: string;
  heroImageUrl?: string;        // Optional URL field
  heroImage?: Asset;             // Optional asset field
  heroImageCaption?: string;
  problemSectionTitle: string;
  solutionHeadline: string;
  solutionHeadlineAccent: string;
  solutionPoint1Title: string;
  solutionPoint1Description: string;
  solutionPoint2Title: string;
  solutionPoint2Description: string;
  solutionPoint3Title: string;
  solutionPoint3Description: string;
  responsibilityHeadline: string;
  responsibilitySubheadline: string;
  processHeadline: string;
  processSubheadline: string;
  processQuote: string;
  aboutBadge: string;
  aboutName: string;
  aboutTitle: string;
  aboutBioPrimary: string;
  aboutBioSecondary: string;
  aboutImageUrl?: string;       // Optional URL field
  aboutImage?: Asset;            // Optional asset field
  disqualifierHeadline: string;
  footerHeadline: string;
  footerSubheadline: string;
  footerCtaText: string;
  footerCtaLink: string;
  logoUrl?: string;              // Optional URL field
  logo?: Asset;                  // Optional asset field
}

export interface ProblemCardV2 {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStepV2 {
  title: string;
  description: string;
  order: number;
}

export interface DisqualifierV2 {
  text: string;
}

// ============================================================================
// CONTENT FETCHERS
// ============================================================================

/**
 * Get Global Settings (singleton)
 */
export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'globalSettings',
      include: 2,
      limit: 1,
    });
    
    if (entries.items.length === 0) return null;
    
    const item = entries.items[0];
    return item.fields as unknown as GlobalSettings;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}

/**
 * Get Navigation (singleton)
 */
export async function getNavigation(): Promise<Navigation | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'navigation',
      include: 2,
      limit: 1,
    });
    
    if (entries.items.length === 0) return null;
    
    const item = entries.items[0];
    return item.fields as unknown as Navigation;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
}

/**
 * Get Homepage Content
 */
export async function getHomePage(): Promise<HomePage | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'homepageContent',
      include: 3, // Resolve nested references
      limit: 1,
    });
    
    if (entries.items.length === 0) return null;
    
    const item = entries.items[0];
    return item.fields as unknown as HomePage;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

/**
 * Get Standard Page by slug
 */
export async function getStandardPage(slug: string): Promise<StandardPage | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'standardPage',
      'fields.slug': slug,
      include: 3,
      limit: 1,
    });
    
    if (entries.items.length === 0) return null;
    
    const item = entries.items[0];
    return item.fields as unknown as StandardPage;
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return null;
  }
}

/**
 * Get all Standard Pages (for generating routes)
 */
export async function getAllStandardPages(): Promise<StandardPage[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'standardPage',
      include: 1,
    });
    
    return entries.items.map(item => item.fields as unknown as StandardPage);
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
}

/**
 * Get Pricing Tiers
 */
export async function getPricingTiers(): Promise<PricingTier[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'pricingTier',
      order: ['fields.order'] as any,
    });
    
    return entries.items.map(item => item.fields as unknown as PricingTier);
  } catch (error) {
    console.error('Error fetching pricing tiers:', error);
    return [];
  }
}

/**
 * Get Hero Section by ID or reference
 */
export async function getHeroSection(id: string): Promise<HeroSection | null> {
  try {
    const entry = await client.getEntry(id);
    return entry.fields as unknown as HeroSection;
  } catch (error) {
    console.error(`Error fetching hero section ${id}:`, error);
    return null;
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get Contentful asset URL
 */
export function getAssetUrl(asset?: Asset): string | null {
  if (!asset?.fields?.file?.url) return null;
  
  const url = asset.fields.file.url;
  // Ensure URL is absolute
  return url.startsWith('//') ? `https:${url}` : url;
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  asset?: Asset,
  options?: {
    width?: number;
    height?: number;
    format?: 'jpg' | 'png' | 'webp';
    quality?: number;
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  }
): string | null {
  const baseUrl = getAssetUrl(asset);
  if (!baseUrl) return null;
  
  const params = new URLSearchParams();
  if (options?.width) params.append('w', options.width.toString());
  if (options?.height) params.append('h', options.height.toString());
  if (options?.format) params.append('fm', options.format);
  if (options?.quality) params.append('q', options.quality.toString());
  if (options?.fit) params.append('fit', options.fit);
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Extract plain text from Contentful Rich Text
 */
export function getRichTextPlainText(richText: any): string {
  if (!richText?.content) return '';
  
  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content.map((c: any) => c.value || '').join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}

// ============================================================================
// NEW FETCHERS - Minimalist Homepage V2
// ============================================================================

/**
 * Get Homepage V2 Content (Minimalist Design)
 * Note: 3JPGMyDDNZHXDgcyp3ioxr is the CONTENT TYPE ID, not entry ID
 */
export async function getHomepageV2(): Promise<HomepageV2 | null> {
  try {
    console.log('Fetching Homepage V2 content...');
    
    const entries = await client.getEntries({
      content_type: '3JPGMyDDNZHXDgcyp3ioxr',
      include: 2,
      limit: 1,
    });
    
    if (entries.items.length === 0) {
      console.error('❌ No Homepage V2 entries found');
      return null;
    }
    
    console.log('✅ Homepage V2 entry found!');
    const entry = entries.items[0];
    return entry.fields as unknown as HomepageV2;
  } catch (error: any) {
    console.error('❌ Error fetching Homepage V2:', error.message);
    return null;
  }
}

/**
 * Get Problem Cards V2
 */
export async function getProblemCardsV2(): Promise<ProblemCardV2[]> {
  try {
    const entries = await client.getEntries({
      content_type: '4JTafNN1zX9FfPeN2LONmu',
    });
    return entries.items.map(item => item.fields as unknown as ProblemCardV2);
  } catch (error) {
    console.error('Error fetching Problem Cards V2:', error);
    return [];
  }
}

/**
 * Get Process Steps V2
 */
export async function getProcessStepsV2(): Promise<ProcessStepV2[]> {
  try {
    const entries = await client.getEntries({
      content_type: '582z0MO83I7J3bsyxvYbId',
      order: ['fields.order'] as any,
    });
    return entries.items.map(item => item.fields as unknown as ProcessStepV2);
  } catch (error) {
    console.error('Error fetching Process Steps V2:', error);
    return [];
  }
}

/**
 * Get Disqualifiers V2
 */
export async function getDisqualifiersV2(): Promise<DisqualifierV2[]> {
  try {
    const entries = await client.getEntries({
      content_type: '5jZFz4ma5WldqPAz69CNo9',
    });
    return entries.items.map(item => item.fields as unknown as DisqualifierV2);
  } catch (error) {
    console.error('Error fetching Disqualifiers V2:', error);
    return [];
  }
}
