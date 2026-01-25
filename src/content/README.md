# Content Directory

This directory contains markdown files and configurations for the local CMS adapter.

## Folder Structure

```
src/content/
├── config.ts             # Astro content collections schema
├── settings.json         # Global site settings
├── pages/               # Static pages
│   ├── about.md
│   └── contact.md
├── blog/                # Blog posts
│   └── example-post.md
├── events/              # Events
│   └── summer-retreat.md
├── team/                # Team members
│   └── john-doe.md
├── services/            # Services
│   └── web-design.md
└── testimonials/        # Testimonials
    └── client-a.md
```

## Frontmatter Examples

### Blog Post

```yaml
---
title: "My First Post"
excerpt: "A short description"
featuredImage: "/images/blog/first-post.jpg"
publishedAt: 2025-01-15
author: "John Doe"
category: "news"
tags: ["announcement", "update"]
---
```

### Event

```yaml
---
title: "Summer Retreat 2025"
description: "Join us for our annual summer retreat"
startDate: 2025-07-15
endDate: 2025-07-17
location: "Mountain View Resort"
image: "/images/events/summer-retreat.jpg"
featured: true
category: "retreat"
---
```

### Team Member

```yaml
---
name: "John Doe"
role: "Lead Developer"
image: "/images/team/john-doe.jpg"
department: "engineering"
order: 1
---
```

### Service

```yaml
---
title: "Web Design"
description: "Beautiful, modern website design services"
icon: "palette"
image: "/images/services/web-design.jpg"
featured: true
---
```

### Testimonial

```yaml
---
author: "Sarah Johnson"
role: "CEO"
company: "Tech Startup Inc"
image: "/images/testimonials/sarah.jpg"
featured: true
---
```

## Settings.json

Global site settings are stored in `settings.json`:

```json
{
  "siteName": "Nexus Starter",
  "tagline": "Build amazing websites with ease",
  "logo": "/images/logo.svg",
  "socialLinks": {
    "facebook": "https://facebook.com/yourpage",
    "twitter": "https://twitter.com/yourhandle",
    "instagram": "https://instagram.com/yourprofile",
    "youtube": "https://youtube.com/yourchannel",
    "linkedin": "https://linkedin.com/company/yourcompany"
  },
  "contactInfo": {
    "email": "hello@example.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St, City, State 12345"
  }
}
```

## Usage

The markdown adapter is automatically used when `CMS_PROVIDER=markdown` is set in your environment variables.
