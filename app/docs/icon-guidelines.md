# CauldronOS Icon Guidelines

## Introduction

This document outlines the official icon guidelines for CauldronOS. Consistent application of these guidelines ensures a cohesive and recognizable visual language across all touchpoints.

## Icon Design Principles

### Geometric Precision

CauldronOS icons are built on a foundation of geometric shapes and clean lines. They should feel precise, intentional, and technically sophisticated.

- Use basic geometric shapes as the foundation (circles, squares, hexagons)
- Maintain consistent stroke weights
- Align elements to a grid
- Use sharp corners for technical elements and subtle rounded corners for organic elements

### Visual Consistency

Icons should feel like part of the same family, regardless of their function.

- Maintain consistent proportions across the icon set
- Use a consistent perspective (primarily flat/front-facing)
- Apply consistent padding within the bounding box
- Use the same corner radius treatment across icons

### Minimalist Clarity

Icons should communicate their meaning clearly with minimal visual elements.

- Remove unnecessary details
- Focus on the most recognizable and distinctive aspects of what's being represented
- Ensure icons are recognizable at small sizes
- Maintain good negative space for clarity

## Technical Specifications

### Grid System

All icons are designed on a 24×24 pixel grid with a 1px minimum stroke weight.

- Primary grid: 24×24 pixels
- Secondary grid: 16×16 pixels (for smaller UI elements)
- Keyline shapes: Use circles, squares, and rectangles as the foundation
- Safe area: Keep critical elements within the central 20×20 area for 24×24 icons

### Stroke Weight

Consistent stroke weights help maintain visual harmony across the icon set.

- Primary stroke: 1.5px for 24×24 icons
- Secondary stroke: 1px for fine details or 16×16 icons
- Maintain consistent stroke width throughout an icon
- Use center-aligned strokes

### Corner Treatment

- Primary corners: 1px radius for most elements
- Secondary corners: Sharp (0px) for technical or precise elements
- Maintain consistent corner treatment within each icon

## Color Usage

CauldronOS icons use a limited color palette to ensure they feel part of the same system.

### Primary Icon Colors

| Usage | Light Mode | Dark Mode |
|-------|------------|-----------|
| Primary | Void Purple (#2E1A47) | Flux Aqua (#00B2C9) |
| Secondary | Flux Aqua (#00B2C9) | Void Purple Light (#4A2D6D) |
| Accent | Growth Green (#00B67F) | Growth Green Light (#00E29E) |

### Functional Icon Colors

| Function | Color |
|----------|-------|
| Success | Growth Green (#00B67F) |
| Warning | Accent Yellow (#FFD166) |
| Error | Accent Red (#EF476F) |
| Information | Flux Aqua (#00B2C9) |
| Disabled | Gray (#9E9E9E) |

### Color Application Guidelines

- Use monochromatic icons for navigation and common UI elements
- Use color sparingly and purposefully to indicate state or importance
- Ensure sufficient contrast against backgrounds
- When using multiple colors in a single icon, limit to 2-3 colors maximum

## Icon Categories

### UI Icons

Used for navigation, actions, and interface elements.

- Simple, clear, and universally recognizable
- Primarily line-based (outlined) with consistent stroke weights
- Monochromatic in most cases

### Feature Icons

Represent specific features or modules within CauldronOS.

- More distinctive and slightly more detailed than UI icons
- Can incorporate the primary brand colors
- May use a combination of outline and fill

### Status Icons

Indicate system status, notifications, or alerts.

- Clear and immediately recognizable
- Use appropriate functional colors
- Consistent with their meaning across the platform

## Implementation Guidelines

### SVG Format

All icons should be delivered in SVG format for maximum scalability and performance.

- Optimize SVGs for web use
- Use descriptive IDs and class names
- Include appropriate ARIA attributes for accessibility
- Remove unnecessary metadata

### Responsive Scaling

Icons should scale appropriately across different device sizes.

- Test icons at multiple sizes (16px, 24px, 32px, 48px)
- Ensure details remain clear at smaller sizes
- Adjust stroke weights proportionally when scaling

### Accessibility Considerations

- Maintain a minimum contrast ratio of 3:1 against backgrounds
- Always pair icons with text labels or tooltips where appropriate
- Include appropriate ARIA attributes in SVG markup
- Ensure interactive icons have appropriate focus states

## Animation Guidelines

When animating icons, follow these principles:

- Keep animations subtle and purposeful
- Use smooth easing functions (ease-in-out)
- Limit animation duration to 200-300ms for UI interactions
- Ensure animations don't distract from the primary content
- Consider reduced motion preferences

## Example Icons

Below are examples of CauldronOS icons that demonstrate the guidelines in action:

### UI Icons
- Home
- Settings
- Search
- Notifications
- User
- Menu

### Feature Icons
- Dashboard
- Analytics
- Messaging
- Calendar
- Files
- Projects

### Status Icons
- Success
- Warning
- Error
- Information
- Loading
- Locked/Unlocked

## Conclusion

Consistent application of these icon guidelines will help establish and maintain a strong, recognizable visual language for CauldronOS. For questions or clarifications about these guidelines, please contact the design team.
