import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for conditionally joining class names
 * Combines clsx and tailwind-merge for optimal class name handling
 * 
 * @param inputs Class values to be conditionally joined
 * @returns Merged class string
 * 
 * @example
 * // Basic usage
 * cn('text-red-500', isActive && 'bg-blue-500')
 * 
 * // With objects
 * cn({
 *   'text-red-500': true,
 *   'bg-blue-500': isActive,
 *   'p-4': size === 'large'
 * })
 * 
 * // With arrays
 * cn(['text-red-500', isActive && 'bg-blue-500'])
 * 
 * // With tailwind classes that would normally conflict
 * cn('px-2 py-1', 'p-4') // 'p-4' will override 'px-2 py-1'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;