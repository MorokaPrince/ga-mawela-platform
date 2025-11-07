'use client';

import { useState, useCallback, DragEvent, ChangeEvent } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react';

interface UploadFile extends File {
  preview?: string;
}

interface UploaderProps {
  onUpload?: (files: UploadFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export default function Uploader({
  onUpload,
  maxFiles = 5,
  maxSize = 10,
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.txt']
}: UploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File ${file.name} is too large. Maximum size is ${maxSize}MB.`;
    }

    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.match(type.replace('*', '.*'));
    });

    if (!isAccepted) {
      return `File ${file.name} is not an accepted file type.`;
    }

    return null;
  };

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList) as UploadFile[];
    const validFiles: UploadFile[] = [];
    const newErrors: string[] = [];

    for (const file of newFiles) {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    }

    if (files.length + validFiles.length > maxFiles) {
      newErrors.push(`Cannot upload more than ${maxFiles} files at once.`);
      return;
    }

    setErrors(newErrors);
    setFiles(prev => [...prev, ...validFiles]);
  }, [files.length, maxFiles]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const { files: droppedFiles } = e.dataTransfer;
    if (droppedFiles) {
      handleFiles(droppedFiles);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target;
    if (selectedFiles) {
      handleFiles(selectedFiles);
    }
  }, [handleFiles]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setErrors([]);

    try {
      for (const file of files) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

        const formData = new FormData();
        formData.append('file', file);
        // Add metadata (these would come from form fields)
        formData.append('description', 'Uploaded evidence');
        formData.append('category', 'evidence');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const result = await response.json();
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      }

      onUpload?.(files);
      setFiles([]);
      setUploadProgress({});
    } catch (error) {
      console.error('Upload error:', error);
      setErrors([error instanceof Error ? error.message : 'Upload failed. Please try again.']);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors focus-within:ring-2 focus-within:ring-gm-500 focus-within:ring-offset-2 ${
          isDragOver
            ? 'border-gm-500 bg-gm-50'
            : 'border-gm-300 hover:border-gm-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="File upload area"
        tabIndex={0}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" aria-hidden="true" />
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Support for images, PDFs, and documents up to {maxSize}MB each
          </p>
        </div>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
          aria-describedby="file-upload-help"
        />
        <label
          htmlFor="file-upload"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gm-600 hover:bg-gm-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gm-500"
        >
          Choose Files
        </label>
        <div id="file-upload-help" className="sr-only">
          Select files to upload. Supported formats: {acceptedTypes.join(', ')}. Maximum file size: {maxSize}MB per file.
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Errors</h3>
              <ul className="mt-2 text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2" role="region" aria-label="Selected files">
          <h3 className="text-lg font-medium text-white">Selected Files</h3>
          <div role="list" aria-label="File list">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-md focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2 border border-slate-600"
                role="listitem"
              >
                <div className="flex items-center flex-1">
                  <File className="h-5 w-5 text-gray-300 mr-3" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {uploadProgress[file.name] !== undefined && (() => {
                      const progress = Math.round(uploadProgress[file.name] || 0);
                      return (
                        <div className="mt-1">
                          <div
                            className="w-full bg-gm-200 rounded-full h-2"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Upload progress for ${file.name}`}
                          >
                            <div
                              className="bg-gm-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.name] || 0}%` } as React.CSSProperties}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {uploadProgress[file.name] === 100 ? 'Complete' : 'Uploading...'}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-300 focus:text-red-300 ml-3 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Remove ${file.name}`}
                  disabled={uploading}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={uploadFiles}
            disabled={uploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            aria-describedby="upload-button-desc"
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
          <div id="upload-button-desc" className="sr-only">
            Upload all selected files to the server
          </div>
        </div>
      )}
    </div>
  );
}