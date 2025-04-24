/**
 * CSS Variables for Cyberpunk Theme
 * 
 * This file generates CSS variables from our theme tokens for use in CSS/SCSS.
 */

import { tokens, cyberpunkColors, cyberpunkLightColors } from './tokens';

/**
 * Flatten a nested object into a single-level object with dot notation keys
 * @param obj - The object to flatten
 * @param prefix - The prefix for the keys
 * @returns The flattened object
 */
const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, string> => {
  return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
    const pre = prefix.length ? `${prefix}-` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], `${pre}${k}`));
    } else {
      acc[`${pre}${k}`] = obj[k];
    }
    return acc;
  }, {});
};

/**
 * Convert a flattened object to CSS variables
 * @param obj - The flattened object
 * @param prefix - The prefix for the CSS variables
 * @returns An object with CSS variable names as keys and values
 */
const toCssVariables = (obj: Record<string, string>, prefix = '--cauldron'): Record<string, string> => {
  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    acc[`${prefix}-${key}`] = obj[key];
    return acc;
  }, {});
};

/**
 * Generate CSS variables for the dark theme
 * @returns An object with CSS variable names as keys and values
 */
export const getDarkCssVariables = (): Record<string, string> => {
  // Flatten the tokens
  const flatColors = flattenObject(cyberpunkColors, 'color');
  const flatTypography = flattenObject(tokens.typography, 'typography');
  const flatSpacing = flattenObject(tokens.spacing, 'spacing');
  const flatBorderRadius = flattenObject(tokens.borderRadius, 'radius');
  const flatShadows = flattenObject(tokens.shadows, 'shadow');
  const flatZIndex = flattenObject(tokens.zIndex, 'z');
  const flatTransitions = flattenObject(tokens.transitions, 'transition');
  const flatBreakpoints = flattenObject(tokens.breakpoints, 'breakpoint');

  // Combine all flattened objects
  const flatTokens = {
    ...flatColors,
    ...flatTypography,
    ...flatSpacing,
    ...flatBorderRadius,
    ...flatShadows,
    ...flatZIndex,
    ...flatTransitions,
    ...flatBreakpoints,
  };

  // Convert to CSS variables
  return toCssVariables(flatTokens);
};

/**
 * Generate CSS variables for the light theme
 * @returns An object with CSS variable names as keys and values
 */
export const getLightCssVariables = (): Record<string, string> => {
  // Flatten the tokens
  const flatColors = flattenObject(cyberpunkLightColors, 'color');
  const flatTypography = flattenObject(tokens.typography, 'typography');
  const flatSpacing = flattenObject(tokens.spacing, 'spacing');
  const flatBorderRadius = flattenObject(tokens.borderRadius, 'radius');
  const flatShadows = flattenObject(tokens.shadows, 'shadow');
  const flatZIndex = flattenObject(tokens.zIndex, 'z');
  const flatTransitions = flattenObject(tokens.transitions, 'transition');
  const flatBreakpoints = flattenObject(tokens.breakpoints, 'breakpoint');

  // Combine all flattened objects
  const flatTokens = {
    ...flatColors,
    ...flatTypography,
    ...flatSpacing,
    ...flatBorderRadius,
    ...flatShadows,
    ...flatZIndex,
    ...flatTransitions,
    ...flatBreakpoints,
  };

  // Convert to CSS variables
  return toCssVariables(flatTokens);
};

/**
 * Get CSS variables based on the theme mode
 * @param mode - The theme mode ('light' or 'dark')
 * @returns An object with CSS variable names as keys and values
 */
export const getCssVariables = (mode: 'light' | 'dark'): Record<string, string> => {
  return mode === 'dark' ? getDarkCssVariables() : getLightCssVariables();
};

export default getCssVariables;
