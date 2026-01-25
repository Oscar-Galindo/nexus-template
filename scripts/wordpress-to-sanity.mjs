#!/usr/bin/env node

/**
 * WordPress to Sanity Migration Script
 * 
 * Migrates posts, pages, and media from WordPress to Sanity CMS
 * 
 * Requirements:
 *   npm install @sanity/client axios dotenv
 * 
 * Environment Variables:
 *   WORDPRESS_URL=https://oldsite.com
 *   SANITY_PROJECT_ID=your_project_id
 *   SANITY_DATASET=production
 *   SANITY_TOKEN=your_write_token
 */

import { createClient } from '@sanity/client';
import axios from 'axios';
import 'dotenv/config';
import fs from 'fs';

// Configuration
const config = {
  wordpressUrl: process.env.WORDPRESS_URL,
  sanityProjectId: process.env.SANITY_PROJECT_ID,
  sanityDataset: process.env.SANITY_DATASET || 'production',
  sanityToken: process.env.SANITY_TOKEN,
};

// Validate configuration
function validateConfig() {
  const missing = [];

  if (!config.wordpressUrl) missing.push('WORDPRESS_URL');
  if (!config.sanityProjectId) missing.push('SANITY_PROJECT_ID');
  if (!config.sanityToken) missing.push('SANITY_TOKEN');

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.log('\n📝 Add to your .env file:');
    console.log('WORDPRESS_URL=https://yoursite.com');
    console.log('SANITY_PROJECT_ID=your_project_id');
    console.log('SANITY_DATASET=production');
    console.log('SANITY_TOKEN=your_write_token');
    console.log('\n💡 Get Sanity token: sanity.io/manage → Your Project → API → Add Token');
    console.log('   Required permissions: Editor or Admin');
    process.exit(1);
  }

  console.log('✅ Configuration validated\n');
}

// Initialize Sanity client
const sanityClient = createClient({
  projectId: config.sanityProjectId,
  dataset: config.sanityDataset,
  token: config.sanityToken,
  apiVersion: '2024-01-01',
  useCdn: false,
});

let stats = {
  posts: { total: 0, migrated: 0, failed: 0 },
  pages: { total: 0, migrated: 0, failed: 0 },
  media: { total: 0, migrated: 0, skipped: 0, failed: 0 },
  errors: [],
};

/**
 * Fetch from WordPress REST API
 */
async function fetchWordPress(endpoint, params = {}) {
  try {
    const response = await axios.get(`${config.wordpressUrl}/wp-json/wp/v2/${endpoint}`, {
      params: { per_page: 100, ...params },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error.message);
    return [];
  }
}

/**
 * Convert WordPress HTML to Sanity Portable Text (simplified)
 */
function htmlToPortableText(html) {
  if (!html) return [];

  // Very basic conversion - you may want to use a proper HTML to Portable Text library
  // For production, consider: @sanity/block-tools
  
  const blocks = [];
  
  // Split by paragraphs
  const paragraphs = html.split(/<\/?p>/gi).filter(p => p.trim());
  
  paragraphs.forEach(para => {
    // Remove other HTML tags for now
    const text = para.replace(/<[^>]+>/g, '').trim();
    
    if (text) {
      blocks.push({
        _type: 'block',
        _key: `block-${Date.now()}-${Math.random()}`,
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: text,
            marks: [],
          },
        ],
      });
    }
  });

  return blocks;
}

/**
 * Upload image to Sanity
 */
async function uploadImage(imageUrl, title) {
  try {
    // Download image from WordPress
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(imageResponse.data);

    // Upload to Sanity
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: title || imageUrl.split('/').pop(),
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`   ⚠️  Image upload failed: ${error.message}`);
    return null;
  }
}

/**
 * Migrate WordPress posts to Sanity
 */
async function migratePosts() {
  console.log('📰 Migrating Blog Posts...\n');

  const wpPosts = await fetchWordPress('posts', { status: 'publish' });
  stats.posts.total = wpPosts.length;

  if (wpPosts.length === 0) {
    console.log('   No posts found\n');
    return;
  }

  for (const wpPost of wpPosts) {
    const slug = wpPost.slug;
    process.stdout.write(`   [${stats.posts.migrated + 1}/${wpPosts.length}] ${wpPost.title.rendered}...`);

    try {
      // Check if already exists
      const existing = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug }
      );

      if (existing) {
        console.log(' ⏭️  SKIPPED (exists)');
        stats.posts.migrated++;
        continue;
      }

      // Upload featured image if exists
      let featuredImage = null;
      if (wpPost.featured_media && wpPost.featured_media > 0) {
        try {
          const media = await fetchWordPress(`media/${wpPost.featured_media}`);
          featuredImage = await uploadImage(media[0]?.source_url, wpPost.title.rendered);
        } catch (e) {
          // Skip image if fails
        }
      }

      // Create post in Sanity
      const sanityPost = {
        _type: 'post',
        title: wpPost.title.rendered,
        slug: {
          _type: 'slug',
          current: slug,
        },
        excerpt: wpPost.excerpt.rendered?.replace(/<[^>]+>/g, '').trim() || '',
        body: htmlToPortableText(wpPost.content.rendered),
        publishedAt: wpPost.date,
        ...(featuredImage && { featuredImage }),
      };

      await sanityClient.create(sanityPost);
      console.log(' ✅ MIGRATED');
      stats.posts.migrated++;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.log(` ❌ ERROR: ${error.message}`);
      stats.posts.failed++;
      stats.errors.push({ type: 'post', title: wpPost.title.rendered, error: error.message });
    }
  }

  console.log(`\n✅ Migrated ${stats.posts.migrated}/${stats.posts.total} posts\n`);
}

/**
 * Migrate WordPress pages to Sanity
 */
async function migratePages() {
  console.log('📄 Migrating Pages...\n');

  const wpPages = await fetchWordPress('pages', { status: 'publish' });
  stats.pages.total = wpPages.length;

  if (wpPages.length === 0) {
    console.log('   No pages found\n');
    return;
  }

  for (const wpPage of wpPages) {
    const slug = wpPage.slug;
    process.stdout.write(`   [${stats.pages.migrated + 1}/${wpPages.length}] ${wpPage.title.rendered}...`);

    try {
      // Check if already exists
      const existing = await sanityClient.fetch(
        `*[_type == "page" && slug.current == $slug][0]`,
        { slug }
      );

      if (existing) {
        console.log(' ⏭️  SKIPPED (exists)');
        stats.pages.migrated++;
        continue;
      }

      // Create page in Sanity
      const sanityPage = {
        _type: 'page',
        title: wpPage.title.rendered,
        slug: {
          _type: 'slug',
          current: slug,
        },
        sections: htmlToPortableText(wpPage.content.rendered),
      };

      await sanityClient.create(sanityPage);
      console.log(' ✅ MIGRATED');
      stats.pages.migrated++;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.log(` ❌ ERROR: ${error.message}`);
      stats.pages.failed++;
      stats.errors.push({ type: 'page', title: wpPage.title.rendered, error: error.message });
    }
  }

  console.log(`\n✅ Migrated ${stats.pages.migrated}/${stats.pages.total} pages\n`);
}

/**
 * Migrate WordPress media to Sanity
 */
async function migrateMedia() {
  console.log('🖼️  Migrating Media...\n');

  const wpMedia = await fetchWordPress('media');
  stats.media.total = wpMedia.length;

  if (wpMedia.length === 0) {
    console.log('   No media found\n');
    return;
  }

  console.log(`   Found ${wpMedia.length} media items`);
  console.log('   This may take a while...\n');

  for (let i = 0; i < wpMedia.length; i++) {
    const media = wpMedia[i];
    const title = media.title?.rendered || media.slug || 'Untitled';
    
    process.stdout.write(`   [${i + 1}/${wpMedia.length}] ${title}...`);

    // Skip non-images
    if (!media.mime_type.startsWith('image/')) {
      console.log(' ⏭️  SKIPPED (not image)');
      stats.media.skipped++;
      continue;
    }

    try {
      const imageAsset = await uploadImage(media.source_url, title);
      
      if (imageAsset) {
        console.log(' ✅ UPLOADED');
        stats.media.migrated++;
      } else {
        console.log(' ⚠️  FAILED');
        stats.media.failed++;
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.log(` ❌ ERROR: ${error.message}`);
      stats.media.failed++;
      stats.errors.push({ type: 'media', title, error: error.message });
    }

    // Progress update every 50 items
    if ((i + 1) % 50 === 0) {
      console.log(`\n   --- Progress: ${i + 1}/${wpMedia.length} processed ---\n`);
    }
  }

  console.log(`\n✅ Migrated ${stats.media.migrated}/${stats.media.total} media items\n`);
}

/**
 * Main migration
 */
async function migrate() {
  console.log('\n🚀 WordPress to Sanity Migration\n');
  console.log('='.repeat(60) + '\n');

  validateConfig();

  // Test Sanity connection
  console.log('🔌 Testing Sanity connection...');
  try {
    const projects = await sanityClient.request({ uri: '/projects' });
    console.log('✅ Connected to Sanity\n');
  } catch (error) {
    console.error('❌ Cannot connect to Sanity:', error.message);
    console.log('\n🔧 Check:');
    console.log('1. SANITY_PROJECT_ID is correct');
    console.log('2. SANITY_TOKEN has write permissions');
    console.log('3. SANITY_DATASET exists\n');
    process.exit(1);
  }

  // Run migrations
  await migratePosts();
  await migratePages();
  await migrateMedia();

  // Final summary
  console.log('='.repeat(60));
  console.log('📊 MIGRATION COMPLETE!\n');
  console.log(`Blog Posts: ${stats.posts.migrated}/${stats.posts.total} migrated`);
  console.log(`Pages: ${stats.pages.migrated}/${stats.pages.total} migrated`);
  console.log(`Media: ${stats.media.migrated}/${stats.media.total} migrated`);
  console.log(`       ${stats.media.skipped} skipped, ${stats.media.failed} failed`);

  if (stats.errors.length > 0) {
    console.log(`\n⚠️  ${stats.errors.length} errors occurred`);
    console.log('\nFirst 5 errors:');
    stats.errors.slice(0, 5).forEach(err => {
      console.log(`   - ${err.type}: ${err.title} - ${err.error}`);
    });
  }

  // Save log
  const logFile = `sanity-migration-${Date.now()}.json`;
  fs.writeFileSync(logFile, JSON.stringify(stats, null, 2));
  console.log(`\n📄 Migration log saved: ${logFile}`);

  console.log('\n✅ Migration complete!');
  console.log('💡 Check your Sanity Studio: https://your-project.sanity.studio\n');
  console.log('⚠️  Note: You may need to create content schemas in Sanity first.');
  console.log('   See: sanity-schemas-example.js for schema definitions\n');
}

migrate().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
