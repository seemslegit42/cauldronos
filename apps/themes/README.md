# CauldronOS Themes

This directory contains the UI themes for CauldronOS, similar to WordPress themes. Themes control the visual appearance and layout of the platform and can be switched without affecting functionality.

## Theme Structure

Each theme follows a standardized structure:

```
theme-name/
├── components/         # Theme-specific component overrides
├── styles/             # Theme-specific styles
│   ├── variables.ts    # Theme variables
│   ├── colors.ts       # Color definitions
│   ├── typography.ts   # Typography definitions
│   └── index.ts        # Main style entry point
├── layouts/            # Theme-specific layouts
├── index.ts            # Main theme entry point
├── manifest.json       # Theme metadata and configuration
└── README.md           # Documentation
```

## Theme Manifest

Each theme must include a `manifest.json` file that defines its metadata and configuration:

```json
{
  "name": "Theme Name",
  "slug": "theme-slug",
  "description": "Theme description",
  "version": "1.0.0",
  "author": "Author Name",
  "preview": "preview.png",
  "colors": {
    "primary": "#00B67F",
    "secondary": "#00B2C9",
    "background": "#2E1A47",
    "text": "#FFFFFF",
    "border": "#4A3A5A"
  },
  "fonts": {
    "heading": "Manrope",
    "body": "Inter",
    "code": "JetBrains Mono"
  },
  "spacing": {
    "base": 4,
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "xxl": 48
  },
  "breakpoints": {
    "xs": 480,
    "sm": 576,
    "md": 768,
    "lg": 992,
    "xl": 1200,
    "xxl": 1600
  }
}
```

## Available Themes

### Corporate

A professional theme designed for corporate environments, featuring a clean, minimal design with a focus on readability and usability.

### Startup

A modern, vibrant theme designed for startups and small businesses, featuring bold colors and dynamic layouts.

### Enterprise

A robust, feature-rich theme designed for large enterprises, featuring a comprehensive set of components and layouts for complex applications.

## Creating a New Theme

To create a new theme, use the theme creator tool:

```bash
pnpm create:theme my-theme
```

This will create a new theme with the standard structure and boilerplate code.

## Theme Registration

Themes are automatically registered when they are installed. The theme registration process is handled by the ThemeRegistry, which scans the themes directory and loads the themes based on their manifest files.

## Theme Switching

Themes can be switched at runtime through the platform's theme switcher. The theme switcher is available in the user settings and allows users to preview and select themes.

## Theme Customization

Themes can be customized by users through the platform's theme customizer. The theme customizer allows users to adjust theme variables such as colors, fonts, and spacing.

## Theme Development Guidelines

1. **Consistency**: Maintain consistent visual language throughout the theme.
2. **Accessibility**: Ensure the theme meets WCAG accessibility standards.
3. **Performance**: Optimize for performance, especially for themes with complex styles.
4. **Responsiveness**: Ensure the theme works well on all screen sizes.
5. **Dark Mode**: Support both light and dark modes.
6. **Customization**: Allow for easy customization through theme variables.
7. **Documentation**: Provide comprehensive documentation for the theme.
8. **Testing**: Test the theme across different browsers and devices.

For more detailed information, see the [Theme Development Guide](/docs/theme-development-guide.md).# CauldronOS Themes

This directory contains the UI themes for CauldronOS, similar to WordPress themes. Themes control the visual appearance and layout of the platform and can be switched without affecting functionality.

## Theme Structure

Each theme follows a standardized structure:

```
theme-name/
├── components/         # Theme-specific component overrides
├── styles/             # Theme-specific styles
│   ├── variables.ts    # Theme variables
│   ├── colors.ts       # Color definitions
│   ├── typography.ts   # Typography definitions
│   └── index.ts        # Main style entry point
├── layouts/            # Theme-specific layouts
├── index.ts            # Main theme entry point
├── manifest.json       # Theme metadata and configuration
└── README.md           # Documentation
```

## Theme Manifest

Each theme must include a `manifest.json` file that defines its metadata and configuration:

```json
{
  "name": "Theme Name",
  "slug": "theme-slug",
  "description": "Theme description",
  "version": "1.0.0",
  "author": "Author Name",
  "preview": "preview.png",
  "colors": {
    "primary": "#00B67F",
    "secondary": "#00B2C9",
    "background": "#2E1A47",
    "text": "#FFFFFF",
    "border": "#4A3A5A"
  },
  "fonts": {
    "heading": "Manrope",
    "body": "Inter",
    "code": "JetBrains Mono"
  },
  "spacing": {
    "base": 4,
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "xxl": 48
  },
  "breakpoints": {
    "xs": 480,
    "sm": 576,
    "md": 768,
    "lg": 992,
    "xl": 1200,
    "xxl": 1600
  }
}
```

## Available Themes

### Corporate

A professional theme designed for corporate environments, featuring a clean, minimal design with a focus on readability and usability.

### Startup

A modern, vibrant theme designed for startups and small businesses, featuring bold colors and dynamic layouts.

### Enterprise

A robust, feature-rich theme designed for large enterprises, featuring a comprehensive set of components and layouts for complex applications.

## Creating a New Theme

To create a new theme, use the theme creator tool:

```bash
pnpm create:theme my-theme
```

This will create a new theme with the standard structure and boilerplate code.

## Theme Registration

Themes are automatically registered when they are installed. The theme registration process is handled by the ThemeRegistry, which scans the themes directory and loads the themes based on their manifest files.

## Theme Switching

Themes can be switched at runtime through the platform's theme switcher. The theme switcher is available in the user settings and allows users to preview and select themes.

## Theme Customization

Themes can be customized by users through the platform's theme customizer. The theme customizer allows users to adjust theme variables such as colors, fonts, and spacing.

## Theme Development Guidelines

1. **Consistency**: Maintain consistent visual language throughout the theme.
2. **Accessibility**: Ensure the theme meets WCAG accessibility standards.
3. **Performance**: Optimize for performance, especially for themes with complex styles.
4. **Responsiveness**: Ensure the theme works well on all screen sizes.
5. **Dark Mode**: Support both light and dark modes.
6. **Customization**: Allow for easy customization through theme variables.
7. **Documentation**: Provide comprehensive documentation for the theme.
8. **Testing**: Test the theme across different browsers and devices.

For more detailed information, see the [Theme Development Guide](/docs/theme-development-guide.md).# CauldronOS Themes

This directory contains the UI themes for CauldronOS, similar to WordPress themes. Themes control the visual appearance and layout of the platform and can be switched without affecting functionality.

## Theme Structure

Each theme follows a standardized structure:

```
theme-name/
├── components/         # Theme-specific component overrides
├── styles/             # Theme-specific styles
│   ├── variables.ts    # Theme variables
│   ├── colors.ts       # Color definitions
│   ├── typography.ts   # Typography definitions
│   └── index.ts        # Main style entry point
├── layouts/            # Theme-specific layouts
├── index.ts            # Main theme entry point
├── manifest.json       # Theme metadata and configuration
└── README.md           # Documentation
```

## Theme Manifest

Each theme must include a `manifest.json` file that defines its metadata and configuration:

```json
{
  "name": "Theme Name",
  "slug": "theme-slug",
  "description": "Theme description",
  "version": "1.0.0",
  "author": "Author Name",
  "preview": "preview.png",
  "colors": {
    "primary": "#00B67F",
    "secondary": "#00B2C9",
    "background": "#2E1A47",
    "text": "#FFFFFF",
    "border": "#4A3A5A"
  },
  "fonts": {
    "heading": "Manrope",
    "body": "Inter",
    "code": "JetBrains Mono"
  },
  "spacing": {
    "base": 4,
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "xxl": 48
  },
  "breakpoints": {
    "xs": 480,
    "sm": 576,
    "md": 768,
    "lg": 992,
    "xl": 1200,
    "xxl": 1600
  }
}
```

## Available Themes

### Corporate

A professional theme designed for corporate environments, featuring a clean, minimal design with a focus on readability and usability.

### Startup

A modern, vibrant theme designed for startups and small businesses, featuring bold colors and dynamic layouts.

### Enterprise

A robust, feature-rich theme designed for large enterprises, featuring a comprehensive set of components and layouts for complex applications.

## Creating a New Theme

To create a new theme, use the theme creator tool:

```bash
pnpm create:theme my-theme
```

This will create a new theme with the standard structure and boilerplate code.

## Theme Registration

Themes are automatically registered when they are installed. The theme registration process is handled by the ThemeRegistry, which scans the themes directory and loads the themes based on their manifest files.

## Theme Switching

Themes can be switched at runtime through the platform's theme switcher. The theme switcher is available in the user settings and allows users to preview and select themes.

## Theme Customization

Themes can be customized by users through the platform's theme customizer. The theme customizer allows users to adjust theme variables such as colors, fonts, and spacing.

## Theme Development Guidelines

1. **Consistency**: Maintain consistent visual language throughout the theme.
2. **Accessibility**: Ensure the theme meets WCAG accessibility standards.
3. **Performance**: Optimize for performance, especially for themes with complex styles.
4. **Responsiveness**: Ensure the theme works well on all screen sizes.
5. **Dark Mode**: Support both light and dark modes.
6. **Customization**: Allow for easy customization through theme variables.
7. **Documentation**: Provide comprehensive documentation for the theme.
8. **Testing**: Test the theme across different browsers and devices.

For more detailed information, see the [Theme Development Guide](/docs/theme-development-guide.md).