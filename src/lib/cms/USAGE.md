# CMS Abstraction Layer Usage

The CMS abstraction layer allows you to switch between different CMS providers (Contentful, Sanity, Markdown) without changing your component code.

## Configuration

Set the `CMS_PROVIDER` environment variable in your `.env` file:

```env
# Choose: contentful | sanity | markdown
CMS_PROVIDER=contentful
```

## Import Methods

### Method 1: Using the `cms` singleton (Recommended)

```typescript
import { cms } from '@/lib/cms';

// In your Astro component or page
const posts = await cms.getBlogPosts({ limit: 5 });
const page = await cms.getPage('about');
const settings = await cms.getSiteSettings();
```

### Method 2: Using `getCMSClient()`

```typescript
import { getCMSClient } from '@/lib/cms';

const client = await getCMSClient();
const posts = await client.getBlogPosts({ limit: 5 });
```

## Usage Examples

### Astro Page - Blog Listing

```astro
---
// src/pages/blog.astro
import { cms } from '@/lib/cms';

const posts = await cms.getBlogPosts({ limit: 10 });
const settings = await cms.getSiteSettings();
---

<html>
  <head>
    <title>Blog - {settings?.siteName}</title>
  </head>
  <body>
    <h1>Blog Posts</h1>
    <div class="posts">
      {posts.map(post => (
        <article>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <a href={`/blog/${post.slug}`}>Read more</a>
        </article>
      ))}
    </div>
  </body>
</html>
```

### Astro Page - Single Blog Post

```astro
---
// src/pages/blog/[slug].astro
import { cms } from '@/lib/cms';

export async function getStaticPaths() {
  const posts = await cms.getBlogPosts();
  return posts.map(post => ({
    params: { slug: post.slug },
  }));
}

const { slug } = Astro.params;
const post = await cms.getBlogPost(slug);

if (!post) {
  return Astro.redirect('/404');
}
---

<html>
  <head>
    <title>{post.title}</title>
    <meta name="description" content={post.excerpt} />
  </head>
  <body>
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt.toLocaleDateString()}</time>
      {post.featuredImage && (
        <img src={post.featuredImage.url} alt={post.featuredImage.alt} />
      )}
      <div set:html={post.content} />
    </article>
  </body>
</html>
```

### Astro Component - Events List

```astro
---
// src/components/UpcomingEvents.astro
import { cms } from '@/lib/cms';

const events = await cms.getEvents({ 
  upcoming: true, 
  limit: 3,
  featured: true 
});
---

<section class="upcoming-events">
  <h2>Upcoming Events</h2>
  <div class="events-grid">
    {events.map(event => (
      <div class="event-card">
        {event.image && (
          <img src={event.image.url} alt={event.image.alt} />
        )}
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <time>{event.startDate.toLocaleDateString()}</time>
        {event.location && <p>📍 {event.location}</p>}
      </div>
    ))}
  </div>
</section>
```

### Astro Component - Team Section

```astro
---
// src/components/TeamSection.astro
import { cms } from '@/lib/cms';

const teamMembers = await cms.getTeamMembers({ 
  department: 'engineering',
  limit: 6 
});
---

<section class="team">
  <h2>Our Team</h2>
  <div class="team-grid">
    {teamMembers.map(member => (
      <div class="team-member">
        {member.image && (
          <img src={member.image.url} alt={member.name} />
        )}
        <h3>{member.name}</h3>
        <p class="role">{member.role}</p>
        {member.bio && <p class="bio">{member.bio}</p>}
      </div>
    ))}
  </div>
</section>
```

### Astro Component - Services

```astro
---
// src/components/Services.astro
import { cms } from '@/lib/cms';

const services = await cms.getServices({ featured: true });
---

<section class="services">
  <h2>Our Services</h2>
  <div class="services-grid">
    {services.map(service => (
      <div class="service-card">
        {service.icon && <span class="icon">{service.icon}</span>}
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    ))}
  </div>
</section>
```

### Astro Component - Testimonials

```astro
---
// src/components/Testimonials.astro
import { cms } from '@/lib/cms';

const testimonials = await cms.getTestimonials({ featured: true, limit: 3 });
---

<section class="testimonials">
  <h2>What Our Clients Say</h2>
  <div class="testimonials-slider">
    {testimonials.map(testimonial => (
      <div class="testimonial">
        <blockquote>{testimonial.quote}</blockquote>
        <div class="author">
          {testimonial.image && (
            <img src={testimonial.image.url} alt={testimonial.author} />
          )}
          <div>
            <p class="name">{testimonial.author}</p>
            {testimonial.role && <p class="role">{testimonial.role}</p>}
            {testimonial.company && <p class="company">{testimonial.company}</p>}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
```

## API Reference

### Available Methods

All methods are available through the `cms` object or via `getCMSClient()`:

#### Pages
- `getPage(slug: string): Promise<Page | null>`

#### Blog
- `getBlogPosts(options?: { limit?: number; category?: string; tag?: string; excludeSlug?: string }): Promise<BlogPost[]>`
- `getBlogPost(slug: string): Promise<BlogPost | null>`

#### Events
- `getEvents(options?: { limit?: number; featured?: boolean; category?: string; upcoming?: boolean }): Promise<Event[]>`
- `getEvent(slug: string): Promise<Event | null>`

#### Team
- `getTeamMembers(options?: { limit?: number; department?: string }): Promise<TeamMember[]>`

#### Services
- `getServices(options?: { limit?: number; featured?: boolean }): Promise<Service[]>`

#### Testimonials
- `getTestimonials(options?: { limit?: number; featured?: boolean }): Promise<Testimonial[]>`

#### Settings
- `getSiteSettings(): Promise<SiteSettings | null>`

## Type Imports

Import TypeScript types for better IDE support:

```typescript
import type { 
  BlogPost, 
  Event, 
  Page, 
  TeamMember, 
  Service, 
  Testimonial,
  SiteSettings,
  CMSImage 
} from '@/lib/cms';
```

## Benefits

1. **Provider Agnostic**: Switch between Contentful, Sanity, or Markdown without code changes
2. **Type Safe**: Full TypeScript support with shared interfaces
3. **Cached**: Client is cached after first initialization
4. **Dynamic Imports**: Only loads the adapter you're using
5. **Consistent API**: Same methods work across all providers
