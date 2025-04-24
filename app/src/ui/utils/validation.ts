import { z } from 'zod';
import { message } from 'antd';

/**
 * Validates data against a Zod schema
 * @param schema The Zod schema
 * @param data The data to validate
 * @returns The validated data or null if validation fails
 */
export function validateWithZod<T>(schema: z.ZodType<T>, data: unknown): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format the error messages
      const errorMessages = error.errors.map((err) => {
        const path = err.path.join('.');
        return `${path ? `${path}: ` : ''}${err.message}`;
      });
      
      // Show the first error message
      message.error(errorMessages[0]);
      
      // Log all error messages
      console.error('Validation errors:', errorMessages);
    } else {
      // Show a generic error message
      message.error('Validation failed');
      
      // Log the error
      console.error('Validation error:', error);
    }
    
    return null;
  }
}

/**
 * Validates data against a Zod schema and returns a result object
 * @param schema The Zod schema
 * @param data The data to validate
 * @returns An object with success, data, and errors properties
 */
export function validateWithResult<T>(schema: z.ZodType<T>, data: unknown): {
  success: boolean;
  data: T | null;
  errors: string[];
} {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData,
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format the error messages
      const errorMessages = error.errors.map((err) => {
        const path = err.path.join('.');
        return `${path ? `${path}: ` : ''}${err.message}`;
      });
      
      return {
        success: false,
        data: null,
        errors: errorMessages,
      };
    }
    
    return {
      success: false,
      data: null,
      errors: ['Validation failed'],
    };
  }
}

/**
 * Creates a Zod schema for pagination parameters
 * @returns A Zod schema for pagination parameters
 */
export const createPaginationSchema = () => {
  return z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(10),
  });
};

/**
 * Creates a Zod schema for sorting parameters
 * @param allowedFields The allowed fields to sort by
 * @returns A Zod schema for sorting parameters
 */
export const createSortingSchema = (allowedFields: string[]) => {
  return z.object({
    sortBy: z.enum([...allowedFields] as [string, ...string[]]).optional(),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  });
};

/**
 * Creates a Zod schema for filtering parameters
 * @param filterSchema The schema for the filter object
 * @returns A Zod schema for filtering parameters
 */
export const createFilteringSchema = <T extends z.ZodRawShape>(filterSchema: T) => {
  return z.object({
    filters: z.object(filterSchema).optional(),
  });
};

/**
 * Creates a Zod schema for search parameters
 * @returns A Zod schema for search parameters
 */
export const createSearchSchema = () => {
  return z.object({
    search: z.string().optional(),
  });
};
