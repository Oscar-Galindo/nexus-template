import type { MiddlewareHandler } from 'astro';
import { isInternalMode } from './lib/config/mode';

export const onRequest: MiddlewareHandler = async (context, next) => {
  // Skip license validation in internal mode
  if (isInternalMode()) {
    return next();
  }

  // Add your license validation logic here for licensed mode
  // Example:
  // const licenseKey = context.request.headers.get('x-license-key');
  // if (!isValidLicense(licenseKey)) {
  //   return new Response(
  //     JSON.stringify({ error: 'Invalid or missing license' }),
  //     { status: 401, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }

  return next();
};
