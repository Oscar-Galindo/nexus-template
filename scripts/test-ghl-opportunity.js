#!/usr/bin/env node

/**
 * Test GoHighLevel Opportunity Creation
 * 
 * Tests creating a contact and adding an opportunity (for quote forms)
 */

import 'dotenv/config';

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;

if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  console.error('❌ Missing GHL_API_KEY or GHL_LOCATION_ID in .env');
  process.exit(1);
}

if (!GHL_PIPELINE_ID) {
  console.warn('⚠️  Warning: GHL_PIPELINE_ID not set - will try to use default pipeline');
}

async function testOpportunityCreation() {
  console.log('💼 Testing GHL Opportunity Creation...\n');

  try {
    // Create test contact first
    console.log('1️⃣ Creating test contact...');
    const testContact = {
      firstName: 'Opportunity',
      lastName: 'Test',
      email: `opp-test-${Date.now()}@example.com`,
      phone: '+1234567890',
      source: 'nexus-template-test',
      tags: ['test-opportunity'],
      locationId: GHL_LOCATION_ID,
    };

    const contactResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testContact),
      }
    );

    if (!contactResponse.ok) {
      const error = await contactResponse.json();
      throw new Error(`Failed to create contact: ${JSON.stringify(error)}`);
    }

    const contact = await contactResponse.json();
    const contactId = contact.contact?.id || contact.id;
    console.log('✅ Contact created!');
    console.log('   Contact ID:', contactId);
    console.log('');

    // Create opportunity
    console.log('2️⃣ Creating opportunity...');
    const opportunityData = {
      contactId: contactId,
      locationId: GHL_LOCATION_ID,
      name: 'Test Quote - Website Design',
      monetaryValue: 5000,
      status: 'open',
      source: 'nexus-template-test',
    };

    // Add pipeline ID if available
    if (GHL_PIPELINE_ID) {
      opportunityData.pipelineId = GHL_PIPELINE_ID;
    }

    const oppResponse = await fetch(
      `https://rest.gohighlevel.com/v1/opportunities/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opportunityData),
      }
    );

    if (!oppResponse.ok) {
      const error = await oppResponse.json();
      throw new Error(`Failed to create opportunity: ${JSON.stringify(error)}`);
    }

    const opportunity = await oppResponse.json();
    console.log('✅ Opportunity created!');
    console.log('   Opportunity ID:', opportunity.id);
    console.log('   Value: $5,000');
    console.log('');

    console.log('='.repeat(50));
    console.log('✅ OPPORTUNITY TEST PASSED!');
    console.log('='.repeat(50));
    console.log('\nYour GHL opportunity creation is working correctly.');
    console.log('\n💡 Next:');
    console.log('1. Check your GHL dashboard for the test contact');
    console.log('2. Check the pipeline for the test opportunity');
    console.log('3. Delete the test data from GHL');
    console.log(`\n📧 Test contact email: ${testContact.email}\n`);

  } catch (error) {
    console.log('\n' + '='.repeat(50));
    console.error('❌ TEST FAILED!');
    console.log('='.repeat(50));
    console.error('\nError:', error.message);
    console.log('\n🔧 Check:');
    console.log('1. API key has opportunities.write scope');
    console.log('2. Pipeline ID is correct (if set)');
    console.log('3. Run: npm run test:ghl:connection first\n');
    process.exit(1);
  }
}

testOpportunityCreation();
