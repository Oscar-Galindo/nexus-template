import { defineCollection, z } from 'astro:content';

const pageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
    }).optional(),
    sections: z.array(z.any()).optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    featuredImage: z.string().optional(),
    publishedAt: z.coerce.date(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const eventCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    category: z.string().optional(),
  }),
});

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    department: z.string().optional(),
    order: z.number().optional(),
  }),
});

const serviceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

const testimonialCollection = defineCollection({
  type: 'content',
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  pages: pageCollection,
  blog: blogCollection,
  events: eventCollection,
  team: teamCollection,
  services: serviceCollection,
  testimonials: testimonialCollection,
};
