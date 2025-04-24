import { message } from 'antd';

/**
 * API error interface
 */
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

/**
 * Handles API errors
 * @param error The error object
 * @returns The API error
 */
export const handleError = (error: any): ApiError => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    const errorMessage = data?.message || 'An error occurred';
    
    // Show error message
    message.error(errorMessage);
    
    return {
      status,
      message: errorMessage,
      details: data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    message.error('No response from server');
    
    return {
      status: 0,
      message: 'No response from server',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    message.error(error.message || 'An error occurred');
    
    return {
      status: 0,
      message: error.message || 'An error occurred',
    };
  }
};