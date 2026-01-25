import type { APIRoute } from 'astro';
import { getFormClient, type FormSubmission } from '@/lib/forms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as FormSubmission;
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields',
          errors: {
            firstName: !data.firstName ? 'First name is required' : undefined,
            lastName: !data.lastName ? 'Last name is required' : undefined,
            email: !data.email ? 'Email is required' : undefined,
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email format',
          errors: { email: 'Please enter a valid email address' },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Submit via the configured provider
    const client = await getFormClient();
    const result = await client.submit(data);
    
    return new Response(
      JSON.stringify(result),
      { 
        status: result.success ? 200 : 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
