import type { CMSClient } from './types';

const CMS_PROVIDER = import.meta.env.CMS_PROVIDER || 'contentful';

let cachedClient: CMSClient | null = null;

export async function getCMSClient(): Promise<CMSClient> {
  if (cachedClient) return cachedClient;
  
  switch (CMS_PROVIDER) {
    case 'sanity': {
      const { sanityAdapter } = await import('./sanity/adapter');
      cachedClient = sanityAdapter;
      break;
    }
    case 'markdown': {
      const { markdownAdapter } = await import('./markdown/adapter');
      cachedClient = markdownAdapter;
      break;
    }
    case 'contentful':
    default: {
      const { contentfulAdapter } = await import('./contentful/adapter');
      cachedClient = contentfulAdapter;
      break;
    }
  }
  
  return cachedClient;
}

// Re-export all types for convenience
export * from './types';

// Optional: Export a singleton for simpler usage in components
// This works because Astro builds are static
export const cms = {
  async getPage(slug: string) {
    const client = await getCMSClient();
    return client.getPage(slug);
  },
  async getBlogPosts(options?: Parameters<CMSClient['getBlogPosts']>[0]) {
    const client = await getCMSClient();
    return client.getBlogPosts(options);
  },
  async getBlogPost(slug: string) {
    const client = await getCMSClient();
    return client.getBlogPost(slug);
  },
  async getEvents(options?: Parameters<CMSClient['getEvents']>[0]) {
    const client = await getCMSClient();
    return client.getEvents(options);
  },
  async getEvent(slug: string) {
    const client = await getCMSClient();
    return client.getEvent(slug);
  },
  async getTeamMembers(options?: Parameters<CMSClient['getTeamMembers']>[0]) {
    const client = await getCMSClient();
    return client.getTeamMembers(options);
  },
  async getServices(options?: Parameters<CMSClient['getServices']>[0]) {
    const client = await getCMSClient();
    return client.getServices(options);
  },
  async getTestimonials(options?: Parameters<CMSClient['getTestimonials']>[0]) {
    const client = await getCMSClient();
    return client.getTestimonials(options);
  },
  async getSiteSettings() {
    const client = await getCMSClient();
    return client.getSiteSettings();
  },
};
