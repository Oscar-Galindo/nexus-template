const contentful = require('contentful-management');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Configuration - Set these in your .env file:
// CONTENTFUL_SPACE_ID=your_space_id
// CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
// CONTENTFUL_ENVIRONMENT=master
// WORDPRESS_URL=https://yoursite.com

const config = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  environmentId: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  wordpressUrl: process.env.WORDPRESS_URL
};

// Validate configuration
function validateConfig() {
  const missing = [];

  if (!config.spaceId) missing.push('CONTENTFUL_SPACE_ID');
  if (!config.managementToken) missing.push('CONTENTFUL_MANAGEMENT_TOKEN');
  if (!config.wordpressUrl) missing.push('WORDPRESS_URL');

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.log('\n📝 Create a .env file with:');
    console.log('CONTENTFUL_SPACE_ID=your_space_id');
    console.log('CONTENTFUL_MANAGEMENT_TOKEN=your_management_token');
    console.log('CONTENTFUL_ENVIRONMENT=master');
    console.log('WORDPRESS_URL=https://yoursite.com');
    process.exit(1);
  }

  console.log('✅ Configuration validated\n');
}

const client = contentful.createClient({
  accessToken: config.managementToken
});

let space, environment;
let existingAssets = new Set();
let stats = {
  total: 0,
  skipped: 0,
  uploaded: 0,
  failed: 0,
  errors: []
};

// Initialize Contentful connection
async function initContentful() {
  try {
    space = await client.getSpace(config.spaceId);
    environment = await space.getEnvironment(config.environmentId);

    // Get existing assets to avoid duplicates
    console.log('📋 Checking existing assets in Contentful...');
    const assets = await environment.getAssets({ limit: 1000 });

    assets.items.forEach(asset => {
      const title = asset.fields.title?.['en-US'] || '';
      const fileName = asset.fields.file?.['en-US']?.fileName || '';
      existingAssets.add(title);
      existingAssets.add(fileName);
    });

    console.log(`   Found ${assets.items.length} existing assets\n`);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Contentful:', error.message);
    return false;
  }
}

// Get WordPress media with better error handling
async function getWordPressMedia() {
  console.log('📥 Fetching WordPress media...');

  try {
    // First, get total count
    const countResponse = await axios.head(`${config.wordpressUrl}/wp-json/wp/v2/media`);
    const total = parseInt(countResponse.headers['x-wp-total'] || 0);
    console.log(`   Total media files in WordPress: ${total}`);

    // Calculate pages needed
    const perPage = 100;
    const totalPages = Math.ceil(total / perPage);

    let allMedia = [];

    // Fetch all pages
    for (let page = 1; page <= totalPages; page++) {
      process.stdout.write(`   Fetching page ${page}/${totalPages}...`);

      try {
        const response = await axios.get(`${config.wordpressUrl}/wp-json/wp/v2/media`, {
          params: { per_page: perPage, page: page }
        });

        allMedia = allMedia.concat(response.data);
        console.log(` ✓ (${response.data.length} items)`);

      } catch (error) {
        console.log(` ✗ Error: ${error.message}`);
      }
    }

    console.log(`   Successfully fetched ${allMedia.length} media items\n`);
    return allMedia;

  } catch (error) {
    console.error('❌ Failed to fetch WordPress media:', error.message);
    return [];
  }
}

// Upload single asset with retry logic
async function uploadAsset(mediaItem, index, total) {
  const title = mediaItem.title?.rendered || mediaItem.slug || 'Untitled';
  const fileName = mediaItem.source_url.split('/').pop();

  // Progress indicator
  process.stdout.write(`[${index}/${total}] ${title}...`);

  // Skip if already exists
  if (existingAssets.has(title) || existingAssets.has(fileName)) {
    console.log(' ⏭️  SKIPPED (already exists)');
    stats.skipped++;
    return true;
  }

  // Skip non-image files (optional - remove if you want all media)
  if (!mediaItem.mime_type.startsWith('image/')) {
    console.log(' ⏭️  SKIPPED (not an image)');
    stats.skipped++;
    return true;
  }

  try {
    // Create asset in Contentful
    const asset = await environment.createAsset({
      fields: {
        title: { 'en-US': title },
        description: { 'en-US': mediaItem.alt_text || '' },
        file: {
          'en-US': {
            contentType: mediaItem.mime_type,
            fileName: fileName,
            upload: mediaItem.source_url
          }
        }
      }
    });

    // Process the asset
    await asset.processForAllLocales();

    // Wait for processing (with timeout)
    let processed = false;
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const checkAsset = await environment.getAsset(asset.sys.id);
        if (checkAsset.fields.file?.['en-US']?.url) {
          await checkAsset.publish();
          processed = true;
          break;
        }
      } catch (e) {
        // Still processing
      }
    }

    if (processed) {
      console.log(' ✅ UPLOADED');
      stats.uploaded++;
      return true;
    } else {
      console.log(' ⚠️  PROCESSING TIMEOUT');
      stats.failed++;
      return false;
    }

  } catch (error) {
    // Add retry logic for connection errors
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      console.log(' [Retrying...]');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Retry once
      try {
        const asset = await environment.createAsset({
          fields: {
            title: { 'en-US': title },
            description: { 'en-US': mediaItem.alt_text || '' },
            file: {
              'en-US': {
                contentType: mediaItem.mime_type,
                fileName: fileName,
                upload: mediaItem.source_url
              }
            }
          }
        });

        await asset.processForAllLocales();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const checkAsset = await environment.getAsset(asset.sys.id);
        await checkAsset.publish();
        console.log(' ✅ UPLOADED (retry)');
        stats.uploaded++;
        return true;
      } catch (retryError) {
        console.log(` ❌ ERROR: ${retryError.message}`);
        stats.failed++;
        stats.errors.push({ title, error: retryError.message });
        return false;
      }
    }

    console.log(` ❌ ERROR: ${error.message}`);
    stats.failed++;
    stats.errors.push({ title, error: error.message });
    return false;
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 WordPress to Contentful Migration\n');
  console.log('=' .repeat(50) + '\n');

  // Validate configuration first
  validateConfig();

  // Initialize Contentful
  if (!await initContentful()) {
    console.log('Failed to initialize Contentful. Exiting.');
    return;
  }

  // Get WordPress media
  const wpMedia = await getWordPressMedia();
  if (wpMedia.length === 0) {
    console.log('No media found in WordPress. Exiting.');
    return;
  }

  stats.total = wpMedia.length;

  // Start migration
  console.log('📤 Starting migration...\n');
  console.log('This will take approximately ' + Math.ceil(wpMedia.length * 2 / 60) + ' minutes.\n');

  for (let i = 0; i < wpMedia.length; i++) {
    await uploadAsset(wpMedia[i], i + 1, wpMedia.length);

    // Rate limiting - wait 1 second between uploads
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Every 50 items, show progress summary
    if ((i + 1) % 50 === 0) {
      console.log(`\n--- Progress: ${i + 1}/${wpMedia.length} processed ---\n`);
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 MIGRATION COMPLETE!\n');
  console.log(`Total items: ${stats.total}`);
  console.log(`✅ Uploaded: ${stats.uploaded}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`❌ Failed: ${stats.failed}`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Errors:');
    stats.errors.slice(0, 10).forEach(err => {
      console.log(`   - ${err.title}: ${err.error}`);
    });
    if (stats.errors.length > 10) {
      console.log(`   ... and ${stats.errors.length - 10} more`);
    }
  }

  // Save stats to file
  const logFile = `migration-stats-${Date.now()}.json`;
  fs.writeFileSync(logFile, JSON.stringify(stats, null, 2));
  console.log(`\n📄 Stats saved to: ${logFile}`);
  
  console.log('\n✅ Migration complete! Check your Contentful space.\n');
}

// Run migration
migrate().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
