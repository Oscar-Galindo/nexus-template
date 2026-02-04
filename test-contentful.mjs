/**
 * Test Contentful Connection
 * Run: node test-contentful.mjs
 */

import { createClient } from 'contentful';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

console.log('🔌 Testing Contentful Connection...\n');
console.log('Space ID:', spaceId);
console.log('Access Token:', accessToken ? `${accessToken.substring(0, 10)}...` : '❌ MISSING');
console.log('Environment:', environment);
console.log('\n---\n');

if (!spaceId || !accessToken) {
  console.error('❌ Missing credentials in .env file!');
  process.exit(1);
}

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
});

async function testConnection() {
  try {
    // Test 1: Try to fetch the specific entry
    console.log('📝 Test 1: Fetching Homepage V2 entry (3JPGMyDDNZHXDgcyp3ioxr)...');
    try {
      const entry = await client.getEntry('3JPGMyDDNZHXDgcyp3ioxr');
      console.log('✅ Entry found!');
      console.log('   Title:', entry.fields.title);
      console.log('   Fields:', Object.keys(entry.fields).join(', '));
    } catch (error) {
      console.log('❌ Entry not found or error:', error.message);
    }

    console.log('\n---\n');

    // Test 2: List all entries to see what exists
    console.log('📝 Test 2: Listing all entries in space...');
    const allEntries = await client.getEntries({ limit: 20 });
    console.log(`Found ${allEntries.total} total entries\n`);

    allEntries.items.forEach((entry, i) => {
      console.log(`${i + 1}. ${entry.sys.contentType.sys.id}`);
      console.log(`   ID: ${entry.sys.id}`);
      console.log(`   Title/Name: ${entry.fields.title || entry.fields.name || entry.fields.headline || 'N/A'}`);
      console.log('');
    });

    console.log('\n---\n');

    // Test 3: Check for content types matching V2 spec
    console.log('📝 Test 3: Checking for V2 content types...');
    
    const contentTypes = [
      { name: 'Homepage v2', id: '3JPGMyDDNZHXDgcyp3ioxr' },
      { name: 'Problem Card v2', id: '4JTafNN1zX9FfPeN2LONmu' },
      { name: 'Process Step v2', id: '582z0MO83I7J3bsyxvYbId' },
      { name: 'Disqualifier v2', id: '5jZFz4ma5WldqPAz69CNo9' },
    ];

    for (const ct of contentTypes) {
      try {
        const entries = await client.getEntries({ content_type: ct.id, limit: 1 });
        console.log(`✅ ${ct.name}: ${entries.total} entries found`);
      } catch (error) {
        console.log(`❌ ${ct.name}: Not found or error`);
      }
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
