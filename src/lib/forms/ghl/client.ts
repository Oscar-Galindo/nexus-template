import type { FormClient, FormSubmission, FormResponse } from '../types';

// Note: GHLClient will need to be created at src/lib/api/ghl.ts
// Uncomment the import below when the GHL client is implemented:
// import { GHLClient } from '@/lib/api/ghl';

// Temporary stub - remove when GHLClient is implemented
class GHLClient {
  async createOrUpdateContact(data: any) {
    console.warn('GHLClient.createOrUpdateContact not implemented yet');
    return { id: 'temp-id', isExisting: false };
  }
  async addContactNote(contactId: string, note: string) {
    console.warn('GHLClient.addContactNote not implemented yet');
  }
  async createOpportunity(contactId: string, data: any) {
    console.warn('GHLClient.createOpportunity not implemented yet');
  }
  async triggerWorkflow(workflowId: string, contactId: string) {
    console.warn('GHLClient.triggerWorkflow not implemented yet');
  }
}

const ghl = new GHLClient();

export const ghlFormClient: FormClient = {
  async submit(data: FormSubmission): Promise<FormResponse> {
    try {
      // Build contact data for GHL
      const contactData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        source: data.source || 'website',
        tags: [] as string[],
        customFields: {} as Record<string, any>,
      };

      // Add type-specific tags
      if (data.type === 'prayer') {
        contactData.tags.push('prayer-request');
        if (data.isPrivate) contactData.tags.push('private-prayer-request');
        if (data.needsPastoralCare) contactData.tags.push('needs-pastoral-care');
        contactData.customFields.prayerRequest = data.prayerRequest;
        contactData.customFields.requestType = data.requestType;
      } else if (data.type === 'quote') {
        contactData.tags.push('lead');
        contactData.customFields.businessName = data.businessName;
        contactData.customFields.websiteUrl = data.websiteUrl;
        contactData.customFields.budget = data.budget;
        contactData.customFields.service = data.service;
        contactData.customFields.timeline = data.timeline;
      } else if (data.type === 'newsletter') {
        contactData.tags.push('newsletter-subscriber');
      } else {
        contactData.tags.push('contact-form');
      }

      // Add UTM params if present
      if (data.utmParams) {
        Object.entries(data.utmParams).forEach(([key, value]) => {
          if (value) contactData.customFields[key] = value;
        });
      }

      // Create or update contact (prevents duplicates)
      const contact = await ghl.createOrUpdateContact(contactData);

      // Add note with message if present
      if (data.message) {
        await ghl.addContactNote(contact.id, `Form submission (${data.type}):\n${data.message}`);
      }

      // Create opportunity for business leads
      if (data.type === 'quote' && contact.id) {
        await ghl.createOpportunity(contact.id, {
          name: `${data.firstName} ${data.lastName} - ${data.service || 'Website Inquiry'}`,
          pipelineId: import.meta.env.GHL_PIPELINE_ID,
          status: 'open',
          monetaryValue: data.budget === '10k+' ? 10000 : data.budget === '5k-10k' ? 7500 : 3000,
        });
      }

      // Trigger workflow if configured
      const workflowId = import.meta.env[`GHL_WORKFLOW_${data.type.toUpperCase()}`];
      if (workflowId && contact.id) {
        await ghl.triggerWorkflow(workflowId, contact.id);
      }

      return {
        success: true,
        message: 'Form submitted successfully',
        contactId: contact.id,
        isExisting: contact.isExisting || false,
      };
    } catch (error) {
      console.error('GHL form submission error:', error);
      return {
        success: false,
        message: 'Failed to submit form. Please try again.',
      };
    }
  },
};
