import type { Asset, Entry } from 'contentful';
import type {
  CMSClient,
  CMSImage,
  Page,
  BlogPost,
  Event,
  TeamMember,
  Service,
  Testimonial,
  SiteSettings,
} from '../types';

// Import Contentful API functions (create lib/api/contentful.ts if it doesn't exist)
// import {
//   getPage,
//   getBlogPosts,
//   getBlogPost,
//   getEvents,
//   getTeamMembers,
//   getServices,
//   getTestimonials,
//   getSiteSettings,
// } from '@/lib/api/contentful';

// Transform functions to convert Contentful responses to shared types

function transformImage(asset: Asset | undefined): CMSImage | undefined {
  if (!asset?.fields) return undefined;
  
  return {
    url: asset.fields.file?.url ? `https:${asset.fields.file.url}` : '',
    alt: asset.fields.title || asset.fields.description || '',
    width: asset.fields.file?.details?.image?.width,
    height: asset.fields.file?.details?.image?.height,
  };
}

function transformPage(entry: Entry<any>): Page {
  const fields = entry.fields;
  
  return {
    slug: fields.slug,
    title: fields.title,
    seo: fields.seo ? {
      title: fields.seo.fields?.title || fields.title,
      description: fields.seo.fields?.description || '',
      ogImage: transformImage(fields.seo.fields?.ogImage),
    } : undefined,
    sections: fields.sections || [],
  };
}

function transformBlogPost(entry: Entry<any>): BlogPost {
  const fields = entry.fields;
  
  return {
    slug: fields.slug,
    title: fields.title,
    excerpt: fields.excerpt || '',
    content: fields.content,
    featuredImage: transformImage(fields.featuredImage),
    publishedAt: new Date(fields.publishedAt || entry.sys.createdAt),
    author: fields.author?.fields?.name || fields.author,
    category: fields.category?.fields?.name || fields.category,
    tags: fields.tags?.map((tag: any) => tag.fields?.name || tag) || [],
  };
}

function transformEvent(entry: Entry<any>): Event {
  const fields = entry.fields;
  
  return {
    slug: fields.slug,
    title: fields.title,
    description: fields.description || '',
    startDate: new Date(fields.startDate),
    endDate: fields.endDate ? new Date(fields.endDate) : undefined,
    location: fields.location,
    image: transformImage(fields.image),
    featured: fields.featured || false,
    category: fields.category?.fields?.name || fields.category,
  };
}

function transformTeamMember(entry: Entry<any>): TeamMember {
  const fields = entry.fields;
  
  return {
    slug: fields.slug,
    name: fields.name,
    role: fields.role || '',
    bio: fields.bio,
    image: transformImage(fields.image),
    department: fields.department?.fields?.name || fields.department,
    order: fields.order,
  };
}

function transformService(entry: Entry<any>): Service {
  const fields = entry.fields;
  
  return {
    slug: fields.slug,
    title: fields.title,
    description: fields.description || '',
    icon: fields.icon,
    image: transformImage(fields.image),
    featured: fields.featured || false,
  };
}

function transformTestimonial(entry: Entry<any>): Testimonial {
  const fields = entry.fields;
  
  return {
    id: entry.sys.id,
    quote: fields.quote || '',
    author: fields.author || '',
    role: fields.role,
    company: fields.company,
    image: transformImage(fields.image),
    featured: fields.featured || false,
  };
}

function transformSiteSettings(entry: Entry<any>): SiteSettings {
  const fields = entry.fields;
  
  return {
    siteName: fields.siteName || '',
    tagline: fields.tagline,
    logo: transformImage(fields.logo),
    socialLinks: {
      facebook: fields.socialLinks?.facebook || fields.facebook,
      twitter: fields.socialLinks?.twitter || fields.twitter,
      instagram: fields.socialLinks?.instagram || fields.instagram,
      youtube: fields.socialLinks?.youtube || fields.youtube,
      linkedin: fields.socialLinks?.linkedin || fields.linkedin,
    },
    contactInfo: {
      email: fields.contactInfo?.email || fields.email,
      phone: fields.contactInfo?.phone || fields.phone,
      address: fields.contactInfo?.address || fields.address,
    },
  };
}

// Contentful adapter implementing CMSClient interface
export const contentfulAdapter: CMSClient = {
  async getPage(slug) {
    // Uncomment when lib/api/contentful.ts is created
    // const page = await getPage(slug);
    // return page ? transformPage(page) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getPage not implemented yet');
    return null;
  },
  
  async getBlogPosts(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const posts = await getBlogPosts(
    //   options?.limit,
    //   options?.category,
    //   options?.tag,
    //   options?.excludeSlug
    // );
    // return posts.map(transformBlogPost);
    
    // Temporary stub
    console.warn('Contentful adapter: getBlogPosts not implemented yet');
    return [];
  },
  
  async getBlogPost(slug) {
    // Uncomment when lib/api/contentful.ts is created
    // const post = await getBlogPost(slug);
    // return post ? transformBlogPost(post) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getBlogPost not implemented yet');
    return null;
  },
  
  async getEvents(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const events = await getEvents(
    //   options?.limit,
    //   options?.featured,
    //   options?.category,
    //   options?.upcoming
    // );
    // return events.map(transformEvent);
    
    // Temporary stub
    console.warn('Contentful adapter: getEvents not implemented yet');
    return [];
  },
  
  async getEvent(slug) {
    // Uncomment when lib/api/contentful.ts is created
    // If there's no getEvent in contentful.ts, filter from getEvents
    // const events = await getEvents();
    // const event = events.find(e => e.fields?.slug === slug);
    // return event ? transformEvent(event) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getEvent not implemented yet');
    return null;
  },
  
  async getTeamMembers(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const members = await getTeamMembers(options?.limit, options?.department);
    // return members.map(transformTeamMember);
    
    // Temporary stub
    console.warn('Contentful adapter: getTeamMembers not implemented yet');
    return [];
  },
  
  async getServices(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const services = await getServices(options?.limit, options?.featured);
    // return services.map(transformService);
    
    // Temporary stub
    console.warn('Contentful adapter: getServices not implemented yet');
    return [];
  },
  
  async getTestimonials(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const testimonials = await getTestimonials(options?.limit, options?.featured);
    // return testimonials.map(transformTestimonial);
    
    // Temporary stub
    console.warn('Contentful adapter: getTestimonials not implemented yet');
    return [];
  },
  
  async getSiteSettings() {
    // Uncomment when lib/api/contentful.ts is created
    // const settings = await getSiteSettings();
    // return settings ? transformSiteSettings(settings) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getSiteSettings not implemented yet');
    return null;
  },
};
