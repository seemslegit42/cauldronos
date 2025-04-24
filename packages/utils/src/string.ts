/**
 * Capitalizes the first letter of a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str String to truncate
 * @param length Maximum length before truncation
 * @param ellipsis String to append after truncation (default: '...')
 * @returns Truncated string
 */
export const truncate = (
  str: string,
  length: number,
  ellipsis = '...'
): string => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + ellipsis;
};

/**
 * Converts a string to kebab-case
 * @param str String to convert
 * @returns Kebab-cased string
 */
export const toKebabCase = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .toLowerCase();
};

/**
 * Converts a string to camelCase
 * @param str String to convert
 * @returns Camel-cased string
 */
export const toCamelCase = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/-/g, '')
    .replace(/_/g, '');
};

/**
 * Converts a string to PascalCase
 * @param str String to convert
 * @returns Pascal-cased string
 */
export const toPascalCase = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  const camelCase = toCamelCase(str);
  return capitalize(camelCase);
};

/**
 * Converts a string to snake_case
 * @param str String to convert
 * @returns Snake-cased string
 */
export const toSnakeCase = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .replace(/-/g, '_')
    .toLowerCase();
};