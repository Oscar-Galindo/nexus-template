export interface FormSubmission {
  // Common fields (always present)
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  type: 'contact' | 'quote' | 'prayer' | 'newsletter';
  message?: string;
  
  // Business-specific fields
  businessName?: string;
  websiteUrl?: string;
  budget?: string;
  service?: string;
  timeline?: string;
  
  // Church-specific fields
  prayerRequest?: string;
  isPrivate?: boolean;
  needsPastoralCare?: boolean;
  requestType?: string;
  
  // Tracking/metadata
  source?: string;
  pageUrl?: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

export interface FormResponse {
  success: boolean;
  message: string;
  contactId?: string;
  isExisting?: boolean;
  errors?: Record<string, string>;
}

export interface FormClient {
  submit(data: FormSubmission): Promise<FormResponse>;
}

// Helper type for form field validation
export interface FormFieldConfig {
  name: keyof FormSubmission;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

// Predefined field configs for different form types
export const businessFormFields: FormFieldConfig[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'businessName', label: 'Business Name', type: 'text' },
  { name: 'service', label: 'Service Interested In', type: 'select', options: [
    { value: 'web-design', label: 'Web Design' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'seo', label: 'SEO' },
    { value: 'other', label: 'Other' },
  ]},
  { name: 'budget', label: 'Budget', type: 'select', options: [
    { value: '1k-5k', label: '$1,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k+', label: '$10,000+' },
  ]},
  { name: 'message', label: 'Message', type: 'textarea' },
];

export const churchFormFields: FormFieldConfig[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'prayerRequest', label: 'Prayer Request', type: 'textarea', required: true },
  { name: 'isPrivate', label: 'Keep this request private', type: 'checkbox' },
  { name: 'needsPastoralCare', label: 'I would like pastoral care', type: 'checkbox' },
];
