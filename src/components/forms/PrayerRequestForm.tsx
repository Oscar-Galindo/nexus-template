import { useState } from 'react';
import type { FormSubmission, FormResponse } from '@/lib/forms';

export default function PrayerRequestForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<FormResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    
    const submission: FormSubmission = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || undefined,
      type: 'prayer',
      prayerRequest: formData.get('prayerRequest') as string,
      isPrivate: formData.get('isPrivate') === 'on',
      needsPastoralCare: formData.get('needsPastoralCare') === 'on',
      source: 'website-prayer-form',
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      const result: FormResponse = await res.json();
      setResponse(result);

      if (result.success) {
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResponse({
        success: false,
        message: 'Failed to submit prayer request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="prayerRequest" className="block text-sm font-medium mb-1">
          Prayer Request <span className="text-red-500">*</span>
        </label>
        <textarea
          id="prayerRequest"
          name="prayerRequest"
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Share your prayer request with us..."
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPrivate"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm">Keep this request private (will not be shared with prayer team)</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="needsPastoralCare"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm">I would like pastoral care</span>
        </label>
      </div>

      {response && (
        <div
          className={`p-4 rounded-lg ${
            response.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {response.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Submitting...' : 'Submit Prayer Request'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Your prayer request is important to us. We will be praying for you.
      </p>
    </form>
  );
}
