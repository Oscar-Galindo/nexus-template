#!/usr/bin/env node

/**
 * WordPress to Markdown Migration Script
 * 
 * Fetches posts, pages, and media from WordPress REST API
 * and converts them to markdown files for the Nexus template.
 * 
 * Usage:
 *   node scripts/migrate/wordpress-to-markdown.js
 * 
 * Requirements:
 *   - WORDPRESS_URL set in .env
 *   - WordPress site must have REST API enabled (default)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Load WordPress URL from environment
const WORDPRESS_URL = process.env.WORDPRESS_URL;

if (!WORDPRESS_URL) {
  log('❌ Error: WORDPRESS_URL not set in .env file', 'red');
  log('\nAdd this to your .env file:', 'yellow');
  log('WORDPRESS_URL=https://youroldsite.com', 'cyan');
  process.exit(1);
}

// WordPress REST API endpoints
const API_BASE = `${WORDPRESS_URL}/wp-json/wp/v2`;
const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');

// Ensure content directories exist
const dirs = ['blog', 'pages', 'events'];
dirs.forEach(dir => {
  const dirPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

/**
 * Fetch data from WordPress REST API
 */
async function fetchFromWordPress(endpoint, params = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`);
  
  // Add default params
  params.per_page = params.per_page || 100;
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    log(`Fetching: ${endpoint}...`, 'blue');
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    log(`❌ Error fetching ${endpoint}: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Convert WordPress HTML to Markdown
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  // Basic HTML to Markdown conversion
  let markdown = html
    // Remove WordPress blocks and comments
    .replace(/<!-- wp:.*?-->/g, '')
    .replace(/<!-- \/wp:.*?-->/g, '')
    // Convert headings
    .replace(/<h1>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4>(.*?)<\/h4>/gi, '\n#### $1\n')
    // Convert paragraphs
    .replace(/<p>(.*?)<\/p>/gi, '\n$1\n')
    // Convert bold and italic
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    // Convert links
    .replace(/<a href="(.*?)".*?>(.*?)<\/a>/gi, '[$2]($1)')
    // Convert lists
    .replace(/<li>(.*?)<\/li>/gi, '- $1')
    .replace(/<ul>|<\/ul>|<ol>|<\/ol>/gi, '')
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Clean up extra whitespace
    .replace(/\n\n\n+/g, '\n\n')
    .trim();

  return markdown;
}

/**
 * Create slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Migrate WordPress posts to markdown
 */
async function migratePosts() {
  log('\n📰 Migrating Blog Posts...', 'cyan');
  
  const posts = await fetchFromWordPress('posts', { 
    status: 'publish',
    per_page: 100 
  });
  
  if (!posts.length) {
    log('No posts found', 'yellow');
    return;
  }

  let migrated = 0;

  for (const post of posts) {
    const slug = post.slug || createSlug(post.title.rendered);
    const filename = `${slug}.md`;
    const filepath = path.join(CONTENT_DIR, 'blog', filename);

    // Get excerpt
    const excerpt = post.excerpt.rendered
      ? htmlToMarkdown(post.excerpt.rendered)
      : post.title.rendered;

    // Get featured image
    let featuredImage = '';
    if (post.featured_media && post.featured_media > 0) {
      try {
        const media = await fetchFromWordPress(`media/${post.featured_media}`);
        featuredImage = media.source_url || '';
      } catch (error) {
        // Skip if media fetch fails
      }
    }

    // Get categories
    let category = '';
    if (post.categories && post.categories.length > 0) {
      try {
        const cat = await fetchFromWordPress(`categories/${post.categories[0]}`);
        category = cat.slug || '';
      } catch (error) {
        // Skip if category fetch fails
      }
    }

    // Get tags
    let tags = [];
    if (post.tags && post.tags.length > 0) {
      for (const tagId of post.tags.slice(0, 5)) {
        try {
          const tag = await fetchFromWordPress(`tags/${tagId}`);
          tags.push(tag.slug);
        } catch (error) {
          // Skip if tag fetch fails
        }
      }
    }

    // Create frontmatter
    const frontmatter = {
      title: post.title.rendered,
      excerpt: excerpt.substring(0, 160),
      publishedAt: post.date.split('T')[0],
      author: post.author || 'Admin',
      ...(category && { category }),
      ...(tags.length && { tags }),
      ...(featuredImage && { featuredImage }),
    };

    // Convert content to markdown
    const content = htmlToMarkdown(post.content.rendered);

    // Create markdown file
    const fileContent = `---
title: "${frontmatter.title}"
excerpt: "${frontmatter.excerpt}"
publishedAt: ${frontmatter.publishedAt}
author: "${frontmatter.author}"
${frontmatter.category ? `category: "${frontmatter.category}"` : ''}
${frontmatter.tags?.length ? `tags: [${frontmatter.tags.map(t => `"${t}"`).join(', ')}]` : ''}
${frontmatter.featuredImage ? `featuredImage: "${frontmatter.featuredImage}"` : ''}
---

${content}
`;

    fs.writeFileSync(filepath, fileContent, 'utf-8');
    migrated++;
    log(`  ✅ Migrated: ${post.title.rendered}`, 'green');
  }

  log(`\n✅ Migrated ${migrated} blog posts!`, 'green');
}

/**
 * Migrate WordPress pages to markdown
 */
async function migratePages() {
  log('\n📄 Migrating Pages...', 'cyan');
  
  const pages = await fetchFromWordPress('pages', { 
    status: 'publish',
    per_page: 100 
  });
  
  if (!pages.length) {
    log('No pages found', 'yellow');
    return;
  }

  let migrated = 0;

  for (const page of pages) {
    const slug = page.slug || createSlug(page.title.rendered);
    const filename = `${slug}.md`;
    const filepath = path.join(CONTENT_DIR, 'pages', filename);

    // Convert content to markdown
    const content = htmlToMarkdown(page.content.rendered);

    // Create markdown file
    const fileContent = `---
title: "${page.title.rendered}"
---

${content}
`;

    fs.writeFileSync(filepath, fileContent, 'utf-8');
    migrated++;
    log(`  ✅ Migrated: ${page.title.rendered}`, 'green');
  }

  log(`\n✅ Migrated ${migrated} pages!`, 'green');
}

/**
 * Download images
 */
async function downloadImages() {
  log('\n🖼️  Downloading Images...', 'cyan');
  log('Note: Images will be referenced by their original URLs', 'yellow');
  log('You can manually download them later if needed', 'yellow');
  
  // For now, we keep the original WordPress URLs
  // You can extend this to download images to public/images/
}

/**
 * Main migration function
 */
async function migrate() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║                                                           ║', 'cyan');
  log('║   🔄 WORDPRESS TO MARKDOWN MIGRATION                      ║', 'cyan');
  log('║                                                           ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝', 'cyan');
  
  log(`\nSource: ${WORDPRESS_URL}`, 'blue');
  log(`Target: ${CONTENT_DIR}`, 'blue');
  
  try {
    await migratePosts();
    await migratePages();
    await downloadImages();
    
    log('\n╔═══════════════════════════════════════════════════════════╗', 'green');
    log('║                                                           ║', 'green');
    log('║   ✅ MIGRATION COMPLETE!                                  ║', 'green');
    log('║                                                           ║', 'green');
    log('╚═══════════════════════════════════════════════════════════╝', 'green');
    
    log('\n📋 Next steps:', 'yellow');
    log('  1. Review migrated files in src/content/', 'blue');
    log('  2. Fix any formatting issues', 'blue');
    log('  3. Download images manually if needed', 'blue');
    log('  4. Update image paths in markdown files', 'blue');
    log('  5. Test your site: npm run dev\n', 'blue');
    
  } catch (error) {
    log(`\n❌ Migration failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run migration
migrate();
