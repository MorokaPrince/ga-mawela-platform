'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const lineageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  ancestors: z.array(z.string().min(1, 'Ancestor name is required')).min(1, 'At least one ancestor is required'),
  documents: z.any().optional(),
});

type LineageFormData = z.infer<typeof lineageSchema>;

export default function LineageRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LineageFormData>({
    resolver: zodResolver(lineageSchema),
    defaultValues: {
      ancestors: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ancestors',
  });

  const onSubmit = async (data: LineageFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('ancestors', JSON.stringify(data.ancestors));

      if (data.documents && (data.documents as FileList).length > 0) {
        Array.from(data.documents as FileList).forEach((file: File) => {
          formData.append('documents', file);
        });
      }

      const response = await fetch('/api/lineage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', message: 'Lineage registered successfully!' });
        reset();
      } else {
        const errorData = await response.json();
        setSubmitMessage({ type: 'error', message: errorData.error || 'Failed to register lineage' });
      }
    } catch {
      setSubmitMessage({ type: 'error', message: 'An error occurred while submitting the form' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gm-50 to-gm-100 py-12 px-4">
      {/* Skip link for screen readers */}
      <a
        href="#lineage-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gm-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-gm-500"
      >
        Skip to lineage registration form
      </a>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-soft p-6 sm:p-8 border border-gm-200">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold text-gm-900 mb-2">Lineage Registration</h1>
            <p className="text-gm-700 mb-8 text-sm sm:text-base">Register your family lineage with supporting documents.</p>
          </header>

          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {submitMessage.message}
            </div>
          )}

          <form id="lineage-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form" aria-labelledby="lineage-form-title">
            {/* Personal Information */}
            <fieldset>
              <legend className="text-xl font-semibold text-gm-900 mb-4">Personal Information</legend>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gm-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full px-3 py-2 border border-gm-300 rounded-lg focus:ring-2 focus:ring-gm-500 focus:border-transparent"
                    aria-describedby={errors.name ? 'name-error' : 'name-help'}
                    aria-required="true"
                  />
                  <div id="name-help" className="sr-only">Enter your full legal name</div>
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gm-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border border-gm-300 rounded-lg focus:ring-2 focus:ring-gm-500 focus:border-transparent"
                    aria-describedby={errors.email ? 'email-error' : 'email-help'}
                    aria-required="true"
                  />
                  <div id="email-help" className="sr-only">Enter a valid email address for contact purposes</div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gm-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="w-full px-3 py-2 border border-gm-300 rounded-lg focus:ring-2 focus:ring-gm-500 focus:border-transparent"
                    aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                    aria-required="true"
                  />
                  <div id="phone-help" className="sr-only">Enter your phone number for contact purposes</div>
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* Lineage Details */}
            <fieldset>
              <legend className="text-xl font-semibold text-gm-900 mb-4">Lineage Details</legend>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gm-700 mb-2">
                    Ancestors <span className="text-red-500">*</span>
                  </label>
                  <div role="group" aria-labelledby="ancestors-label">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          {...register(`ancestors.${index}`)}
                          placeholder={`Ancestor ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gm-300 rounded-lg focus:ring-2 focus:ring-gm-500 focus:border-transparent"
                          aria-describedby={errors.ancestors?.[index] ? `ancestor-${index}-error` : `ancestor-${index}-help`}
                          aria-required="true"
                        />
                        <div id={`ancestor-${index}-help`} className="sr-only">Enter the name of ancestor {index + 1}</div>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            aria-label={`Remove ancestor ${index + 1}`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.ancestors && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.ancestors.message}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => append('')}
                    className="mt-2 px-4 py-2 bg-gm-100 text-gm-700 rounded-lg hover:bg-gm-200 focus:bg-gm-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gm-500 focus:ring-offset-2"
                    aria-describedby="add-ancestor-desc"
                  >
                    Add Another Ancestor
                  </button>
                  <div id="add-ancestor-desc" className="sr-only">Add another ancestor field to the form</div>
                </div>
              </div>
            </fieldset>

            {/* File Upload */}
            <fieldset>
              <legend className="text-xl font-semibold text-gm-900 mb-4">Supporting Documents</legend>
              <div>
                <label htmlFor="documents" className="block text-sm font-medium text-gm-700 mb-1">
                  Upload Documents (optional)
                </label>
                <input
                  type="file"
                  id="documents"
                  {...register('documents')}
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-gm-300 rounded-lg focus:ring-2 focus:ring-gm-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gm-50 file:text-gm-700 hover:file:bg-gm-100 focus:outline-none focus:ring-2 focus:ring-gm-500 focus:ring-offset-2"
                  aria-describedby="documents-help"
                />
                <div id="documents-help" className="mt-1 text-sm text-gm-600">
                  Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG. Multiple files can be selected.
                </div>
              </div>
            </fieldset>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gm-600 hover:bg-gm-700 focus:bg-gm-700 disabled:bg-gm-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-soft disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gm-500 focus:ring-offset-2"
                aria-describedby="submit-button-desc"
              >
                {isSubmitting ? 'Registering...' : 'Register Lineage'}
              </button>
              <div id="submit-button-desc" className="sr-only">Submit your lineage registration form</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}