export interface CMSImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SEOFields {
  title: string;
  description: string;
  ogImage?: CMSImage;
}

export interface Page {
  slug: string;
  title: string;
  seo?: SEOFields;
  sections: any[]; // Section data varies by CMS
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: any; // Rich text format varies by CMS
  featuredImage?: CMSImage;
  publishedAt: Date;
  author?: string;
  category?: string;
  tags?: string[];
}

export interface Event {
  slug: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  image?: CMSImage;
  featured?: boolean;
  category?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  image?: CMSImage;
  department?: string;
  order?: number;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  image?: CMSImage;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  image?: CMSImage;
  featured?: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: CMSImage;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

// The interface all CMS adapters must implement
export interface CMSClient {
  // Pages
  getPage(slug: string): Promise<Page | null>;
  
  // Blog
  getBlogPosts(options?: { 
    limit?: number; 
    category?: string; 
    tag?: string; 
    excludeSlug?: string 
  }): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | null>;
  
  // Events
  getEvents(options?: { 
    limit?: number; 
    featured?: boolean; 
    category?: string; 
    upcoming?: boolean 
  }): Promise<Event[]>;
  getEvent(slug: string): Promise<Event | null>;
  
  // Team
  getTeamMembers(options?: { 
    limit?: number; 
    department?: string 
  }): Promise<TeamMember[]>;
  
  // Services
  getServices(options?: { 
    limit?: number; 
    featured?: boolean 
  }): Promise<Service[]>;
  
  // Testimonials
  getTestimonials(options?: { 
    limit?: number; 
    featured?: boolean 
  }): Promise<Testimonial[]>;
  
  // Settings
  getSiteSettings(): Promise<SiteSettings | null>;
}
