import type { APIRoute } from 'astro';

// Backward compatibility redirect
// This endpoint forwards requests to the new unified endpoint

export const POST: APIRoute = async ({ request }) => {
  // Forward to new endpoint
  const newUrl = new URL('/api/submit-form', request.url);
  return fetch(newUrl.toString(), {
    method: 'POST',
    headers: request.headers,
    body: await request.text(),
  });
};
