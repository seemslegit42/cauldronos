import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 5000,
          style: {
            background: 'var(--color-bg-toast)',
            color: 'var(--color-text-toast)',
            border: '1px solid var(--color-border-toast)',
          },
          // Custom styles for each toast type
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'white',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'white',
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />
    </>
  );
}

// Helper functions for using toast with consistent styling
export const toast = {
  success: (message: string) => import('react-hot-toast').then(({ toast }) => toast.success(message)),
  error: (message: string) => import('react-hot-toast').then(({ toast }) => toast.error(message)),
  loading: (message: string) => import('react-hot-toast').then(({ toast }) => toast.loading(message)),
  dismiss: (toastId?: string) => import('react-hot-toast').then(({ toast }) => toast.dismiss(toastId)),
  custom: (message: string, options?: any) => import('react-hot-toast').then(({ toast }) => toast(message, options)),
};
