/**
 * Reusable Form Submission Component
 * Handles form submission with validation and feedback
 */

'use client';

import React, { useState } from 'react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormSubmissionComponentProps {
  title: string;
  description?: string;
  fields: FormField[];
  endpoint: string;
  submitButtonText?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function FormSubmissionComponent({
  title,
  description,
  fields,
  endpoint,
  submitButtonText = 'Submit',
  onSuccess,
  onError,
}: FormSubmissionComponentProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { loading, error, success, message, submit, reset } = useFormSubmit({
    endpoint,
    onSuccess,
    onError,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        alert(`${field.label} is required`);
        return;
      }
    }

    await submit(formData);

    if (success) {
      setFormData({});
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      {description && <p className="text-gray-300 mb-6">{description}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-white mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
            )}
          </div>
        ))}

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Submitting...' : submitButtonText}
        </button>
      </form>
    </div>
  );
}

