/**
 * Accessibility utilities for enhancing component accessibility
 */

import { KeyboardEvent } from 'react';

/**
 * Keyboard key codes for common keys
 */
export const KeyCodes = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
};

/**
 * ARIA role constants
 */
export const AriaRoles = {
  BUTTON: 'button',
  CHECKBOX: 'checkbox',
  DIALOG: 'dialog',
  GRID: 'grid',
  HEADING: 'heading',
  LINK: 'link',
  LISTBOX: 'listbox',
  MENU: 'menu',
  MENUITEM: 'menuitem',
  OPTION: 'option',
  PROGRESSBAR: 'progressbar',
  RADIO: 'radio',
  SEARCH: 'search',
  SWITCH: 'switch',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',
  TEXTBOX: 'textbox',
  TOOLBAR: 'toolbar',
  TOOLTIP: 'tooltip',
};

/**
 * Interface for keyboard event handler options
 */
export interface KeyboardEventOptions {
  stopPropagation?: boolean;
  preventDefault?: boolean;
}

/**
 * Creates a keyboard event handler for specific keys
 * 
 * @param keys - Array of keys to listen for
 * @param callback - Callback function to execute when a key is pressed
 * @param options - Options for the event handler
 * @returns - Keyboard event handler function
 */
export const createKeyboardHandler = (
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  options: KeyboardEventOptions = {}
) => {
  const { stopPropagation = false, preventDefault = false } = options;
  
  return (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      if (stopPropagation) {
        event.stopPropagation();
      }
      
      if (preventDefault) {
        event.preventDefault();
      }
      
      callback(event);
    }
  };
};

/**
 * Creates a keyboard event handler for Enter and Space keys (for button-like elements)
 * 
 * @param callback - Callback function to execute when Enter or Space is pressed
 * @param options - Options for the event handler
 * @returns - Keyboard event handler function
 */
export const createButtonKeyHandler = (
  callback: (event: KeyboardEvent) => void,
  options: KeyboardEventOptions = {}
) => {
  return createKeyboardHandler([KeyCodes.ENTER, KeyCodes.SPACE], callback, options);
};

/**
 * Creates a keyboard event handler for arrow keys (for navigation)
 * 
 * @param callback - Callback function to execute when an arrow key is pressed
 * @param options - Options for the event handler
 * @returns - Keyboard event handler function
 */
export const createArrowKeyHandler = (
  callback: (event: KeyboardEvent) => void,
  options: KeyboardEventOptions = {}
) => {
  return createKeyboardHandler(
    [KeyCodes.ARROW_UP, KeyCodes.ARROW_DOWN, KeyCodes.ARROW_LEFT, KeyCodes.ARROW_RIGHT],
    callback,
    options
  );
};

/**
 * Creates a keyboard event handler for Escape key
 * 
 * @param callback - Callback function to execute when Escape is pressed
 * @param options - Options for the event handler
 * @returns - Keyboard event handler function
 */
export const createEscapeKeyHandler = (
  callback: (event: KeyboardEvent) => void,
  options: KeyboardEventOptions = {}
) => {
  return createKeyboardHandler([KeyCodes.ESCAPE], callback, options);
};

/**
 * Creates a keyboard event handler for Tab key
 * 
 * @param callback - Callback function to execute when Tab is pressed
 * @param options - Options for the event handler
 * @returns - Keyboard event handler function
 */
export const createTabKeyHandler = (
  callback: (event: KeyboardEvent) => void,
  options: KeyboardEventOptions = {}
) => {
  return createKeyboardHandler([KeyCodes.TAB], callback, options);
};

/**
 * Interface for ARIA attributes
 */
export interface AriaAttributes {
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'dialog' | 'grid' | 'listbox' | 'menu' | 'tree';
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-busy'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-level'?: number;
  'aria-setsize'?: number;
  'aria-posinset'?: number;
  'aria-pressed'?: boolean | 'mixed';
  'aria-errormessage'?: string;
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colspan'?: number;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowspan'?: number;
  'aria-modal'?: boolean;
  'aria-activedescendant'?: string;
  'aria-keyshortcuts'?: string;
  'aria-roledescription'?: string;
  'aria-placeholder'?: string;
}

/**
 * Creates ARIA attributes for a button
 * 
 * @param label - Button label
 * @param disabled - Whether the button is disabled
 * @param pressed - Whether the button is pressed (for toggle buttons)
 * @returns - ARIA attributes object
 */
export const createButtonAriaAttributes = (
  label: string,
  disabled?: boolean,
  pressed?: boolean
): AriaAttributes => {
  return {
    role: AriaRoles.BUTTON,
    'aria-label': label,
    'aria-disabled': disabled,
    'aria-pressed': pressed,
  };
};

/**
 * Creates ARIA attributes for a dialog
 * 
 * @param label - Dialog label
 * @param describedBy - ID of the element that describes the dialog
 * @param modal - Whether the dialog is modal
 * @returns - ARIA attributes object
 */
export const createDialogAriaAttributes = (
  label: string,
  describedBy?: string,
  modal?: boolean
): AriaAttributes => {
  return {
    role: AriaRoles.DIALOG,
    'aria-label': label,
    'aria-describedby': describedBy,
    'aria-modal': modal,
  };
};

/**
 * Creates ARIA attributes for a menu
 * 
 * @param label - Menu label
 * @param expanded - Whether the menu is expanded
 * @param controls - ID of the element controlled by the menu
 * @returns - ARIA attributes object
 */
export const createMenuAriaAttributes = (
  label: string,
  expanded?: boolean,
  controls?: string
): AriaAttributes => {
  return {
    role: AriaRoles.MENU,
    'aria-label': label,
    'aria-expanded': expanded,
    'aria-controls': controls,
  };
};

/**
 * Creates ARIA attributes for a tab
 * 
 * @param label - Tab label
 * @param selected - Whether the tab is selected
 * @param controls - ID of the tabpanel controlled by the tab
 * @returns - ARIA attributes object
 */
export const createTabAriaAttributes = (
  label: string,
  selected?: boolean,
  controls?: string
): AriaAttributes => {
  return {
    role: AriaRoles.TAB,
    'aria-label': label,
    'aria-selected': selected,
    'aria-controls': controls,
  };
};

/**
 * Creates ARIA attributes for a tabpanel
 * 
 * @param labelledBy - ID of the tab that labels the tabpanel
 * @returns - ARIA attributes object
 */
export const createTabPanelAriaAttributes = (
  labelledBy: string
): AriaAttributes => {
  return {
    role: AriaRoles.TABPANEL,
    'aria-labelledby': labelledBy,
  };
};

/**
 * Creates ARIA attributes for a tooltip
 * 
 * @param label - Tooltip label
 * @returns - ARIA attributes object
 */
export const createTooltipAriaAttributes = (
  label: string
): AriaAttributes => {
  return {
    role: AriaRoles.TOOLTIP,
    'aria-label': label,
  };
};

/**
 * Creates ARIA attributes for a progressbar
 * 
 * @param label - Progressbar label
 * @param valueMin - Minimum value
 * @param valueMax - Maximum value
 * @param valueNow - Current value
 * @param valueText - Text representation of the current value
 * @returns - ARIA attributes object
 */
export const createProgressBarAriaAttributes = (
  label: string,
  valueMin: number,
  valueMax: number,
  valueNow: number,
  valueText?: string
): AriaAttributes => {
  return {
    role: AriaRoles.PROGRESSBAR,
    'aria-label': label,
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
  };
};

/**
 * Creates ARIA attributes for a search
 * 
 * @param label - Search label
 * @param expanded - Whether the search results are expanded
 * @param controls - ID of the element controlled by the search
 * @returns - ARIA attributes object
 */
export const createSearchAriaAttributes = (
  label: string,
  expanded?: boolean,
  controls?: string
): AriaAttributes => {
  return {
    role: AriaRoles.SEARCH,
    'aria-label': label,
    'aria-expanded': expanded,
    'aria-controls': controls,
  };
};

/**
 * Creates ARIA attributes for a listbox
 * 
 * @param label - Listbox label
 * @param expanded - Whether the listbox is expanded
 * @param multiselectable - Whether multiple options can be selected
 * @param activeDescendant - ID of the currently active option
 * @returns - ARIA attributes object
 */
export const createListboxAriaAttributes = (
  label: string,
  expanded?: boolean,
  multiselectable?: boolean,
  activeDescendant?: string
): AriaAttributes => {
  return {
    role: AriaRoles.LISTBOX,
    'aria-label': label,
    'aria-expanded': expanded,
    'aria-multiselectable': multiselectable,
    'aria-activedescendant': activeDescendant,
  };
};

/**
 * Creates ARIA attributes for an option
 * 
 * @param label - Option label
 * @param selected - Whether the option is selected
 * @param disabled - Whether the option is disabled
 * @returns - ARIA attributes object
 */
export const createOptionAriaAttributes = (
  label: string,
  selected?: boolean,
  disabled?: boolean
): AriaAttributes => {
  return {
    role: AriaRoles.OPTION,
    'aria-label': label,
    'aria-selected': selected,
    'aria-disabled': disabled,
  };
};

export default {
  KeyCodes,
  AriaRoles,
  createKeyboardHandler,
  createButtonKeyHandler,
  createArrowKeyHandler,
  createEscapeKeyHandler,
  createTabKeyHandler,
  createButtonAriaAttributes,
  createDialogAriaAttributes,
  createMenuAriaAttributes,
  createTabAriaAttributes,
  createTabPanelAriaAttributes,
  createTooltipAriaAttributes,
  createProgressBarAriaAttributes,
  createSearchAriaAttributes,
  createListboxAriaAttributes,
  createOptionAriaAttributes,
};
