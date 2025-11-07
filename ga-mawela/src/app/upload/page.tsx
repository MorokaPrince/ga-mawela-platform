'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Uploader from '@/components/Uploader';

export default function UploadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    investigationId: '',
    lineageId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = (files: File[]) => {
    // TODO: Send form data along with files
    console.log('Files uploaded:', files);
    console.log('Form data:', formData);

    // Redirect to investigations or show success message
    router.push('/investigations');
  };

  return (
    <div className="min-h-screen bg-gm-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Skip link for screen readers */}
      <a
        href="#upload-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gm-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-gm-500"
      >
        Skip to upload form
      </a>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-soft rounded-xl overflow-hidden">
          <header className="px-6 py-8 sm:px-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Upload Evidence
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Upload documents, images, and other evidence files for your investigations.
              </p>
            </div>
          </header>

            <form id="upload-form" className="space-y-6 px-6 pb-8 sm:px-10" role="form" aria-labelledby="upload-form-title">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the evidence being uploaded..."
                  className="w-full px-3 py-2 border border-gm-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gm-500 focus:border-gm-500"
                  required
                  aria-describedby="description-help"
                />
                <div id="description-help" className="sr-only">Provide a detailed description of the evidence you are uploading</div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gm-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gm-500 focus:border-gm-500"
                  required
                  aria-describedby="category-help"
                >
                  <option value="">Select a category</option>
                  <option value="document">Document</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="other">Other</option>
                </select>
                <div id="category-help" className="sr-only">Select the category that best describes your uploaded evidence</div>
              </div>

              <div>
                <label htmlFor="investigationId" className="block text-sm font-medium text-gray-700 mb-2">
                  Related Investigation (Optional)
                </label>
                <input
                  type="text"
                  id="investigationId"
                  name="investigationId"
                  value={formData.investigationId}
                  onChange={handleInputChange}
                  placeholder="Investigation ID or title"
                  className="w-full px-3 py-2 border border-gm-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gm-500 focus:border-gm-500"
                  aria-describedby="investigation-help"
                />
                <div id="investigation-help" className="sr-only">Optionally link this upload to a specific investigation</div>
              </div>

              <div>
                <label htmlFor="lineageId" className="block text-sm font-medium text-gray-700 mb-2">
                  Related Lineage (Optional)
                </label>
                <input
                  type="text"
                  id="lineageId"
                  name="lineageId"
                  value={formData.lineageId}
                  onChange={handleInputChange}
                  placeholder="Lineage ID or name"
                  className="w-full px-3 py-2 border border-gm-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gm-500 focus:border-gm-500"
                  aria-describedby="lineage-help"
                />
                <div id="lineage-help" className="sr-only">Optionally link this upload to a specific lineage record</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Files
                </label>
                <Uploader onUpload={handleUpload} />
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}