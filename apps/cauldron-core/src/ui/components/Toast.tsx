import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CheckCircleFilled, InfoCircleFilled, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { useTheme } from '../styles/useTheme';

/**
 * Toast provider component
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: isDark ? '#1f1f1f' : '#fff',
            color: isDark ? '#fff' : '#000',
            border: `1px solid ${isDark ? '#333' : '#eee'}`,
            boxShadow: isDark 
              ? '0 4px 12px rgba(0, 0, 0, 0.5)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#00B67F',
              secondary: isDark ? '#1f1f1f' : '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4d4f',
              secondary: isDark ? '#1f1f1f' : '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#00B2C9',
              secondary: isDark ? '#1f1f1f' : '#fff',
            },
          },
        }}
      />
    </>
  );
};

/**
 * Custom toast functions with Ant Design icons
 */
export const Toast = {
  /**
   * Show a success toast
   * @param message The message to show
   */
  success: (message: string) => {
    toast.success(message, {
      icon: <CheckCircleFilled style={{ color: '#00B67F' }} />,
    });
  },
  
  /**
   * Show an error toast
   * @param message The message to show
   */
  error: (message: string) => {
    toast.error(message, {
      icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />,
    });
  },
  
  /**
   * Show an info toast
   * @param message The message to show
   */
  info: (message: string) => {
    toast(message, {
      icon: <InfoCircleFilled style={{ color: '#00B2C9' }} />,
    });
  },
  
  /**
   * Show a warning toast
   * @param message The message to show
   */
  warning: (message: string) => {
    toast(message, {
      icon: <WarningFilled style={{ color: '#faad14' }} />,
      style: { color: '#faad14' },
    });
  },
  
  /**
   * Show a loading toast
   * @param message The message to show
   * @returns A toast ID that can be used to dismiss the toast
   */
  loading: (message: string) => {
    return toast.loading(message);
  },
  
  /**
   * Dismiss a toast
   * @param toastId The ID of the toast to dismiss
   */
  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },
  
  /**
   * Show a promise toast
   * @param promise The promise to track
   * @param messages The messages to show for loading, success, and error states
   */
  promise: <T extends unknown>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },
};

export default Toast;