import type { FormClient } from './types';

const FORM_PROVIDER = import.meta.env.FORM_PROVIDER || 'ghl';

let cachedClient: FormClient | null = null;

export async function getFormClient(): Promise<FormClient> {
  if (cachedClient) return cachedClient;
  
  switch (FORM_PROVIDER) {
    case 'simple': {
      const { simpleFormClient } = await import('./simple/client');
      cachedClient = simpleFormClient;
      break;
    }
    case 'ghl':
    default: {
      const { ghlFormClient } = await import('./ghl/client');
      cachedClient = ghlFormClient;
      break;
    }
  }
  
  return cachedClient;
}

// Re-export all types
export * from './types';

// Convenience function for direct usage
export async function submitForm(data: Parameters<FormClient['submit']>[0]) {
  const client = await getFormClient();
  return client.submit(data);
}
