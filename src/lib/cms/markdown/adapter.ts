import { getCollection, getEntry } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
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

// Transform functions to convert markdown data to shared types

function transformImage(imagePath: string | undefined): CMSImage | undefined {
  if (!imagePath) return undefined;
  
  return {
    url: imagePath,
    alt: '',
  };
}

function transformPage(entry: any): Page {
  const { slug } = entry;
  const data = entry.data;
  
  return {
    slug,
    title: data.title,
    seo: data.seo ? {
      title: data.seo.title || data.title,
      description: data.seo.description || '',
      ogImage: transformImage(data.seo.ogImage),
    } : undefined,
    sections: data.sections || [],
  };
}

function transformBlogPost(entry: any): BlogPost {
  const { slug } = entry;
  const data = entry.data;
  
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt || '',
    content: entry.body, // Markdown content
    featuredImage: transformImage(data.featuredImage),
    publishedAt: new Date(data.publishedAt),
    author: data.author,
    category: data.category,
    tags: data.tags || [],
  };
}

function transformEvent(entry: any): Event {
  const { slug } = entry;
  const data = entry.data;
  
  return {
    slug,
    title: data.title,
    description: data.description || entry.body || '',
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    location: data.location,
    image: transformImage(data.image),
    featured: data.featured || false,
    category: data.category,
  };
}

function transformTeamMember(entry: any): TeamMember {
  const { slug } = entry;
  const data = entry.data;
  
  return {
    slug,
    name: data.name,
    role: data.role || '',
    bio: data.bio || entry.body,
    image: transformImage(data.image),
    department: data.department,
    order: data.order,
  };
}

function transformService(entry: any): Service {
  const { slug } = entry;
  const data = entry.data;
  
  return {
    slug,
    title: data.title,
    description: data.description || entry.body || '',
    icon: data.icon,
    image: transformImage(data.image),
    featured: data.featured || false,
  };
}

function transformTestimonial(entry: any): Testimonial {
  const { id, slug } = entry;
  const data = entry.data;
  
  return {
    id: id || slug,
    quote: data.quote || entry.body || '',
    author: data.author || '',
    role: data.role,
    company: data.company,
    image: transformImage(data.image),
    featured: data.featured || false,
  };
}

// Load site settings from JSON file
function loadSiteSettings(): SiteSettings | null {
  try {
    const settingsPath = path.join(process.cwd(), 'src/content/settings.json');
    if (!fs.existsSync(settingsPath)) {
      return null;
    }
    
    const content = fs.readFileSync(settingsPath, 'utf-8');
    const data = JSON.parse(content);
    
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
  } catch (error) {
    console.error('Error loading site settings:', error);
    return null;
  }
}

// Markdown adapter implementing CMSClient interface
export const markdownAdapter: CMSClient = {
  async getPage(slug) {
    try {
      const entry = await getEntry('pages', slug);
      return entry ? transformPage(entry) : null;
    } catch (error) {
      console.error(`Error fetching page ${slug}:`, error);
      return null;
    }
  },
  
  async getBlogPosts(options) {
    try {
      let posts = await getCollection('blog');
      
      // Apply filters
      if (options?.category) {
        posts = posts.filter(p => p.data.category === options.category);
      }
      
      if (options?.tag) {
        posts = posts.filter(p => p.data.tags?.includes(options.tag));
      }
      
      if (options?.excludeSlug) {
        posts = posts.filter(p => p.slug !== options.excludeSlug);
      }
      
      // Sort by date (newest first)
      posts.sort((a, b) => {
        const dateA = new Date(a.data.publishedAt).getTime();
        const dateB = new Date(b.data.publishedAt).getTime();
        return dateB - dateA;
      });
      
      // Apply limit
      if (options?.limit) {
        posts = posts.slice(0, options.limit);
      }
      
      return posts.map(transformBlogPost);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },
  
  async getBlogPost(slug) {
    try {
      const entry = await getEntry('blog', slug);
      return entry ? transformBlogPost(entry) : null;
    } catch (error) {
      console.error(`Error fetching blog post ${slug}:`, error);
      return null;
    }
  },
  
  async getEvents(options) {
    try {
      let events = await getCollection('events');
      
      // Apply filters
      if (options?.featured !== undefined) {
        events = events.filter(e => e.data.featured === options.featured);
      }
      
      if (options?.category) {
        events = events.filter(e => e.data.category === options.category);
      }
      
      if (options?.upcoming) {
        const now = new Date();
        events = events.filter(e => new Date(e.data.startDate) >= now);
      }
      
      // Sort by start date (earliest first)
      events.sort((a, b) => {
        const dateA = new Date(a.data.startDate).getTime();
        const dateB = new Date(b.data.startDate).getTime();
        return dateA - dateB;
      });
      
      // Apply limit
      if (options?.limit) {
        events = events.slice(0, options.limit);
      }
      
      return events.map(transformEvent);
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },
  
  async getEvent(slug) {
    try {
      const entry = await getEntry('events', slug);
      return entry ? transformEvent(entry) : null;
    } catch (error) {
      console.error(`Error fetching event ${slug}:`, error);
      return null;
    }
  },
  
  async getTeamMembers(options) {
    try {
      let members = await getCollection('team');
      
      // Apply filters
      if (options?.department) {
        members = members.filter(m => m.data.department === options.department);
      }
      
      // Sort by order, then by name
      members.sort((a, b) => {
        if (a.data.order !== undefined && b.data.order !== undefined) {
          return a.data.order - b.data.order;
        }
        return a.data.name.localeCompare(b.data.name);
      });
      
      // Apply limit
      if (options?.limit) {
        members = members.slice(0, options.limit);
      }
      
      return members.map(transformTeamMember);
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },
  
  async getServices(options) {
    try {
      let services = await getCollection('services');
      
      // Apply filters
      if (options?.featured !== undefined) {
        services = services.filter(s => s.data.featured === options.featured);
      }
      
      // Apply limit
      if (options?.limit) {
        services = services.slice(0, options.limit);
      }
      
      return services.map(transformService);
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },
  
  async getTestimonials(options) {
    try {
      let testimonials = await getCollection('testimonials');
      
      // Apply filters
      if (options?.featured !== undefined) {
        testimonials = testimonials.filter(t => t.data.featured === options.featured);
      }
      
      // Apply limit
      if (options?.limit) {
        testimonials = testimonials.slice(0, options.limit);
      }
      
      return testimonials.map(transformTestimonial);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },
  
  async getSiteSettings() {
    return loadSiteSettings();
  },
};
