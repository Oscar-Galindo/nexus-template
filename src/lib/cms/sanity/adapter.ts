import { sanityClient, urlFor } from './client';
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

// Transform functions to convert Sanity responses to shared types

function transformImage(image: any): CMSImage | undefined {
  if (!image) return undefined;
  
  try {
    const url = urlFor(image).url();
    return {
      url,
      alt: image.alt || '',
      width: image.asset?.metadata?.dimensions?.width,
      height: image.asset?.metadata?.dimensions?.height,
    };
  } catch (error) {
    console.error('Error transforming Sanity image:', error);
    return undefined;
  }
}

function transformPage(data: any): Page {
  return {
    slug: data.slug,
    title: data.title,
    seo: data.seo ? {
      title: data.seo.title || data.title,
      description: data.seo.description || '',
      ogImage: transformImage(data.seo.ogImage),
    } : undefined,
    sections: data.sections || [],
  };
}

function transformBlogPost(data: any): BlogPost {
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt || '',
    content: data.body, // Portable Text format
    featuredImage: transformImage(data.featuredImage),
    publishedAt: new Date(data.publishedAt),
    author: data.author,
    category: data.category,
    tags: data.tags || [],
  };
}

function transformEvent(data: any): Event {
  return {
    slug: data.slug,
    title: data.title,
    description: data.description || '',
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    location: data.location,
    image: transformImage(data.image),
    featured: data.featured || false,
    category: data.category,
  };
}

function transformTeamMember(data: any): TeamMember {
  return {
    slug: data.slug,
    name: data.name,
    role: data.role || '',
    bio: data.bio,
    image: transformImage(data.image),
    department: data.department,
    order: data.order,
  };
}

function transformService(data: any): Service {
  return {
    slug: data.slug,
    title: data.title,
    description: data.description || '',
    icon: data.icon,
    image: transformImage(data.image),
    featured: data.featured || false,
  };
}

function transformTestimonial(data: any): Testimonial {
  return {
    id: data._id,
    quote: data.quote || '',
    author: data.author || '',
    role: data.role,
    company: data.company,
    image: transformImage(data.image),
    featured: data.featured || false,
  };
}

function transformSiteSettings(data: any): SiteSettings {
  return {
    siteName: data.siteName || '',
    tagline: data.tagline,
    logo: transformImage(data.logo),
    socialLinks: {
      facebook: data.socialLinks?.facebook,
      twitter: data.socialLinks?.twitter,
      instagram: data.socialLinks?.instagram,
      youtube: data.socialLinks?.youtube,
      linkedin: data.socialLinks?.linkedin,
    },
    contactInfo: {
      email: data.contactInfo?.email,
      phone: data.contactInfo?.phone,
      address: data.contactInfo?.address,
    },
  };
}

// Sanity adapter implementing CMSClient interface
export const sanityAdapter: CMSClient = {
  async getPage(slug) {
    const query = `*[_type == "page" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      seo,
      sections
    }`;
    
    const page = await sanityClient.fetch(query, { slug });
    return page ? transformPage(page) : null;
  },
  
  async getBlogPosts(options) {
    let query = `*[_type == "post"`;
    const params: Record<string, any> = {};
    
    if (options?.category) {
      query += ` && category->slug.current == $category`;
      params.category = options.category;
    }
    
    if (options?.tag) {
      query += ` && $tag in tags`;
      params.tag = options.tag;
    }
    
    if (options?.excludeSlug) {
      query += ` && slug.current != $excludeSlug`;
      params.excludeSlug = options.excludeSlug;
    }
    
    query += `] | order(publishedAt desc)`;
    
    if (options?.limit) {
      query += `[0...$limit]`;
      params.limit = options.limit - 1;
    }
    
    query += `{
      "slug": slug.current,
      title,
      excerpt,
      body,
      featuredImage,
      publishedAt,
      "author": author->name,
      "category": category->slug.current,
      tags
    }`;
    
    const posts = await sanityClient.fetch(query, params);
    return posts.map(transformBlogPost);
  },
  
  async getBlogPost(slug) {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      excerpt,
      body,
      featuredImage,
      publishedAt,
      "author": author->name,
      "category": category->slug.current,
      tags
    }`;
    
    const post = await sanityClient.fetch(query, { slug });
    return post ? transformBlogPost(post) : null;
  },
  
  async getEvents(options) {
    let query = `*[_type == "event"`;
    const params: Record<string, any> = {};
    
    if (options?.featured !== undefined) {
      query += ` && featured == $featured`;
      params.featured = options.featured;
    }
    
    if (options?.category) {
      query += ` && category->slug.current == $category`;
      params.category = options.category;
    }
    
    if (options?.upcoming) {
      query += ` && startDate >= now()`;
    }
    
    query += `] | order(startDate asc)`;
    
    if (options?.limit) {
      query += `[0...$limit]`;
      params.limit = options.limit - 1;
    }
    
    query += `{
      "slug": slug.current,
      title,
      description,
      startDate,
      endDate,
      location,
      image,
      featured,
      "category": category->slug.current
    }`;
    
    const events = await sanityClient.fetch(query, params);
    return events.map(transformEvent);
  },
  
  async getEvent(slug) {
    const query = `*[_type == "event" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      description,
      startDate,
      endDate,
      location,
      image,
      featured,
      "category": category->slug.current
    }`;
    
    const event = await sanityClient.fetch(query, { slug });
    return event ? transformEvent(event) : null;
  },
  
  async getTeamMembers(options) {
    let query = `*[_type == "teamMember"`;
    const params: Record<string, any> = {};
    
    if (options?.department) {
      query += ` && department->slug.current == $department`;
      params.department = options.department;
    }
    
    query += `] | order(order asc, name asc)`;
    
    if (options?.limit) {
      query += `[0...$limit]`;
      params.limit = options.limit - 1;
    }
    
    query += `{
      "slug": slug.current,
      name,
      role,
      bio,
      image,
      "department": department->slug.current,
      order
    }`;
    
    const members = await sanityClient.fetch(query, params);
    return members.map(transformTeamMember);
  },
  
  async getServices(options) {
    let query = `*[_type == "service"`;
    const params: Record<string, any> = {};
    
    if (options?.featured !== undefined) {
      query += ` && featured == $featured`;
      params.featured = options.featured;
    }
    
    query += `] | order(_createdAt desc)`;
    
    if (options?.limit) {
      query += `[0...$limit]`;
      params.limit = options.limit - 1;
    }
    
    query += `{
      "slug": slug.current,
      title,
      description,
      icon,
      image,
      featured
    }`;
    
    const services = await sanityClient.fetch(query, params);
    return services.map(transformService);
  },
  
  async getTestimonials(options) {
    let query = `*[_type == "testimonial"`;
    const params: Record<string, any> = {};
    
    if (options?.featured !== undefined) {
      query += ` && featured == $featured`;
      params.featured = options.featured;
    }
    
    query += `] | order(_createdAt desc)`;
    
    if (options?.limit) {
      query += `[0...$limit]`;
      params.limit = options.limit - 1;
    }
    
    query += `{
      _id,
      quote,
      author,
      role,
      company,
      image,
      featured
    }`;
    
    const testimonials = await sanityClient.fetch(query, params);
    return testimonials.map(transformTestimonial);
  },
  
  async getSiteSettings() {
    const query = `*[_type == "siteSettings"][0]{
      siteName,
      tagline,
      logo,
      socialLinks,
      contactInfo
    }`;
    
    const settings = await sanityClient.fetch(query);
    return settings ? transformSiteSettings(settings) : null;
  },
};
