import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Initialize dayjs plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Utility function to conditionally join class names
 * @example cx('base-class', { 'conditional-class': true, 'another-class': false })
 */
export const cx = classNames;

/**
 * Format a date using dayjs
 * @param date Date to format
 * @param format Format string (default: 'LL')
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date | number, format = 'LL'): string => {
  return dayjs(date).format(format);
};

/**
 * Get relative time from now
 * @param date Date to compare
 * @returns Relative time string (e.g., "2 hours ago")
 */
export const fromNow = (date: string | Date | number): string => {
  return dayjs(date).fromNow();
};

/**
 * Convert a date to the user's timezone
 * @param date Date to convert
 * @param timezone User's timezone (default: local)
 * @returns Date in user's timezone
 */
export const toUserTimezone = (date: string | Date | number, timezone?: string): dayjs.Dayjs => {
  const d = dayjs(date).utc();
  return timezone ? d.tz(timezone) : d.local();
};

/**
 * Format a date in the user's timezone
 * @param date Date to format
 * @param format Format string (default: 'LL')
 * @param timezone User's timezone (default: local)
 * @returns Formatted date string in user's timezone
 */
export const formatDateInUserTimezone = (
  date: string | Date | number,
  format = 'LL',
  timezone?: string
): string => {
  return toUserTimezone(date, timezone).format(format);
};

/**
 * Get a color based on a string (useful for avatars) using CauldronOS brand colors
 * @param str String to generate color from
 * @returns Hex color code
 */
export const getColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // CauldronOS brand colors based on guidelines
  const colors = [
    '#4A0D67', // Void Purple (primary)
    '#6A2D87', // Void Purple Light
    '#3DAA9D', // Flux Aqua (accent)
    '#5DCABD', // Flux Aqua Light
    '#B8860B', // Alchemy Gold (success)
    '#D8A62B', // Alchemy Gold Light
    '#FFD166', // Warning Amber
    '#EF476F', // Error Red
  ];
  
  // Use the hash to pick a color
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

/**
 * Get initials from a name
 * @param name Full name
 * @param maxLength Maximum number of characters (default: 2)
 * @returns Initials
 */
export const getInitials = (name: string, maxLength = 2): string => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, maxLength);
};

/**
 * Generate a hex color with opacity
 * @param hexColor Hex color code (e.g., #3DAA9D)
 * @param opacity Opacity value between 0 and 1
 * @returns RGBA color as string
 */
export const hexToRgba = (hexColor: string, opacity: number): string => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return rgba value
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Get a glow effect CSS for an element based on CauldronOS brand guidelines
 * @param color Base color for the glow (default: flux-aqua)
 * @param intensity Glow intensity (default: 0.5)
 * @returns CSS box-shadow property
 */
export const getGlowEffect = (color = '#3DAA9D', intensity = 0.5): string => {
  return `0 0 10px ${hexToRgba(color, intensity)}`;
};

/**
 * Generate a gradient string based on CauldronOS brand guidelines
 * @param startColor Start color (default: void-purple)
 * @param endColor End color (default: flux-aqua)
 * @param direction Direction in degrees (default: 135deg)
 * @returns CSS linear-gradient property
 */
export const getBrandGradient = (
  startColor = '#4A0D67',
  endColor = '#3DAA9D',
  direction = '135deg'
): string => {
  return `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`;
};

/**
 * Get a cyberpunk-style text shadow effect
 * @param color Base color for the glow (default: flux-aqua)
 * @returns CSS text-shadow property
 */
export const getTextGlowEffect = (color = '#3DAA9D'): string => {
  const colorLight = color === '#3DAA9D' ? '#5DCABD' : color;
  return `0 0 5px ${color}, 0 0 10px ${colorLight}`;
};

/**
 * Generate a witty loading message in the CauldronOS brand voice
 * @returns Random loading message
 */
export const getWittyLoadingMessage = (): string => {
  const messages = [
    "Brewing digital potions...",
    "Calibrating the flux capacitors...",
    "Channeling void energy...",
    "Aligning the digital ley lines...",
    "Consulting the silicon oracle...",
    "Transmuting bits into insights...",
    "Decanting data streams...",
    "Stirring the cauldron of computation...",
    "Distilling raw data into wisdom...",
    "Charging the arcane batteries...",
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};
