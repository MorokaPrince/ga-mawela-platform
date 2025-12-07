/**
 * Custom Hook: useFormSubmit
 * Handles form submission to backend API
 */

import { useState } from 'react';

interface FormSubmitOptions {
  endpoint: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface FormSubmitState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}

export function useFormSubmit(options: FormSubmitOptions) {
  const {
    endpoint,
    method = 'POST',
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<FormSubmitState>({
    loading: false,
    error: null,
    success: false,
    message: null,
  });

  const submit = async (data: Record<string, any>) => {
    setState({ loading: true, error: null, success: false, message: null });

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error || 'An error occurred';
        setState({
          loading: false,
          error: errorMessage,
          success: false,
          message: null,
        });
        onError?.(errorMessage);
        return;
      }

      setState({
        loading: false,
        error: null,
        success: true,
        message: result.message || 'Success',
      });

      onSuccess?.(result.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({
        loading: false,
        error: errorMessage,
        success: false,
        message: null,
      });
      onError?.(errorMessage);
    }
  };

  const reset = () => {
    setState({
      loading: false,
      error: null,
      success: false,
      message: null,
    });
  };

  return {
    ...state,
    submit,
    reset,
  };
}

