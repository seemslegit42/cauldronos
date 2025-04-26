CauldronOS Visual Style Guide
Based on the brand values and target audience, I'll create a detailed visual style guide for CauldronOS that balances professionalism with cyberpunk/industrial aesthetics while maintaining the relationship with Bitbrew as the parent company.

Color Palette
Primary Colors
Color Name	Hex Code	RGB	Description	Usage
Void Purple	#4A0D67	74, 13, 103	Deep, rich purple that serves as the power color for Bitbrew	Primary background color, brand identifier
Flux Aqua	#3DAA9D	61, 170, 157	Electric teal that represents clarity and intelligence	Primary accent color, call-to-actions, links
Obsidian Black	#0D1117	13, 17, 23	Deep blue-black for backgrounds	Main background color for dark mode
Secondary Colors
Color Name	Hex Code	RGB	Description	Usage
Void Purple Light	#6A2D87	106, 45, 135	Lighter variant of Void Purple	Hover states, secondary elements
Void Purple Dark	#2A0047	42, 0, 71	Darker variant of Void Purple	Active states, pressed buttons
Flux Aqua Light	#5DCABD	93, 202, 189	Lighter variant of Flux Aqua	Hover states, highlights
Flux Aqua Dark	#1D8A7D	29, 138, 125	Darker variant of Flux Aqua	Active states, pressed buttons
Accent Colors
Color Name	Hex Code	RGB	Description	Usage
Alchemy Gold	#B8860B	184, 134, 11	Muted gold that signifies profitability	Success states, profit indicators
Alchemy Gold Light	#D8A62B	216, 166, 43	Lighter variant of Alchemy Gold	Hover states for success elements
Warning Amber	#FFD166	255, 209, 102	Bright amber for warnings	Warning messages, caution indicators
Error Red	#EF476F	239, 71, 111	Vibrant red for errors	Error messages, critical alerts
Neutral Colors
Color Name	Hex Code	RGB	Description	Usage
Dark Gray 1	#121212	18, 18, 18	Darkest gray for backgrounds	Main background in dark mode
Dark Gray 2	#1E1E1E	30, 30, 30	Slightly lighter gray	Card backgrounds, elevated surfaces
Dark Gray 3	#2D2D2D	45, 45, 45	Medium dark gray	Borders, dividers
Light Gray 1	#E0E0E0	224, 224, 224	Light gray for text	Primary text on dark backgrounds
Light Gray 2	#9E9E9E	158, 158, 158	Medium light gray	Secondary text, disabled elements
Silver	#C0C0C0	192, 192, 192	Metallic silver	Subtle highlights, industrial accents
Color Usage Guidelines
Visual Hierarchy
Background Layers
Use Obsidian Black (#0D1117) as the base background
Use Dark Gray 1 (#121212) for containers
Use Dark Gray 2 (#1E1E1E) for elevated elements like cards
Create depth with subtle gradients between these colors
Content Hierarchy
Primary content: Light Gray 1 (#E0E0E0)
Secondary content: Light Gray 2 (#9E9E9E)
Tertiary/disabled content: Dark Gray 3 (#2D2D2D)
Emphasis & Interaction
Primary emphasis: Flux Aqua (#3DAA9D)
Secondary emphasis: Void Purple (#4A0D67)
Call-to-actions: Flux Aqua (#3DAA9D)
Hover states: Flux Aqua Light (#5DCABD)
Active/pressed states: Flux Aqua Dark (#1D8A7D)
Functional Color Usage
Status Indicators
Success: Alchemy Gold (#B8860B)
Warning: Warning Amber (#FFD166)
Error: Error Red (#EF476F)
Information: Flux Aqua (#3DAA9D)
Data Visualization
Primary data: Flux Aqua (#3DAA9D)
Secondary data: Void Purple (#4A0D67)
Tertiary data: Alchemy Gold (#B8860B)
Use lighter/darker variants for related data points
UI Components
Buttons (primary): Flux Aqua (#3DAA9D)
Buttons (secondary): Dark Gray 2 (#1E1E1E) with Flux Aqua border
Input fields: Dark Gray 2 (#1E1E1E) with Light Gray 2 (#9E9E9E) border
Focus states: Flux Aqua (#3DAA9D) glow effect (box-shadow)
Cyberpunk/Industrial Aesthetic Elements
Glow Effects
Apply subtle glow effects to Flux Aqua elements
Example: box-shadow: 0 0 10px rgba(61, 170, 157, 0.5);
Use sparingly for emphasis, not on all elements
Gradient Accents
Subtle gradients from Void Purple to Flux Aqua for special elements
Example: background: linear-gradient(135deg, #4A0D67 0%, #3DAA9D 100%);
Industrial Elements
Use Silver (#C0C0C0) for metallic accents
Incorporate geometric patterns with Flux Aqua for circuit-like designs
Add subtle texture to dark backgrounds (noise pattern at 2-3% opacity)
Color Accessibility Guidelines
Contrast Ratios
Maintain minimum 4.5:1 contrast ratio for normal text
Maintain minimum 3:1 contrast ratio for large text and UI components
Test all color combinations with accessibility tools
Color Blindness Considerations
Don't rely solely on color to convey information
Use additional visual cues (icons, patterns, text) alongside color
Test palette with color blindness simulators
Dark Mode Optimization
All colors are optimized for dark mode by default
If implementing light mode, adjust contrast accordingly
Reduce intensity of glow effects in light mode
Implementation Examples
Button States
Default: Flux Aqua (#3DAA9D)
Hover: Flux Aqua Light (#5DCABD)
Active/Pressed: Flux Aqua Dark (#1D8A7D)
Disabled: Dark Gray 3 (#2D2D2D)
Alert Messages
Success: Background with 10% opacity Alchemy Gold, border with 100% Alchemy Gold
Warning: Background with 10% opacity Warning Amber, border with 100% Warning Amber
Error: Background with 10% opacity Error Red, border with 100% Error Red
Info: Background with 10% opacity Flux Aqua, border with 100% Flux Aqua
Code Blocks
Background: Dark Gray 1 (#121212)
Border-left: 3px solid Flux Aqua (#3DAA9D)
Text: Light Gray 1 (#E0E0E0)
Comments: Light Gray 2 (#9E9E9E)
Keywords: Flux Aqua (#3DAA9D)
Strings: Alchemy Gold (#B8860B)
Functions: Void Purple Light (#6A2D87)
This color palette and usage guidelines create a cohesive visual system that balances professionalism with the cyberpunk/industrial aesthetic while maintaining strong accessibility standards. The colors work together to create clear visual hierarchy and functional indicators while reinforcing the brand identity of CauldronOS as a product of Bitbrew.

Imagery
Icons
Style Guidelines
Geometric Precision: Use clean, geometric shapes with consistent stroke weights
Consistent Grid: Design all icons on a 24×24 pixel grid with 1px minimum stroke weight
Monochromatic Base: Use single-color icons with Flux Aqua (#3DAA9D) as the primary color
Stroke Alignment: Use center-aligned strokes (1.5px for primary, 1px for details)
Corner Treatment: 1px radius for most elements, sharp corners for technical elements
Icon Categories
UI Icons: Navigation, actions, and interface elements
Simple, clear, and universally recognizable
Primarily line-based (outlined) with consistent stroke weights
Monochromatic in most cases
Feature Icons: Represent specific features or modules
More distinctive and slightly more detailed than UI icons
Can incorporate the primary brand colors
May use a combination of outline and fill
Status Icons: Indicate system status, notifications, or alerts
Clear and immediately recognizable
Use appropriate functional colors
Consistent with their meaning across the platform
Animation Guidelines
Keep animations subtle and purposeful
Use smooth easing functions (ease-in-out)
Limit animation duration to 200-300ms for UI interactions
Consider reduced motion preferences
Illustrations
Style Guidelines
Abstract & Geometric: Use abstract shapes and geometric patterns
Circuit-Inspired: Incorporate circuit-like patterns and node connections
Limited Color Palette: Use the primary and secondary color palette
Depth Through Layers: Create depth with overlapping elements and subtle shadows
Subtle Texture: Add minimal noise texture (2-3% opacity) for industrial feel
Usage Guidelines
Use illustrations for empty states, onboarding, and feature explanations
Maintain consistent style across all illustrations
Scale appropriately for different screen sizes
Ensure illustrations complement rather than distract from content
Animation Guidelines
Add subtle animations to illustrations where appropriate
Use animations to explain concepts or draw attention
Keep animations smooth and professional
Provide static alternatives for reduced motion settings
Photography
Style Guidelines
Authentic & Unposed: Use real, authentic imagery rather than staged stock photos
Technical Context: Show technology in use in realistic environments
Color Treatment: Apply subtle color grading to align with the brand palette
Depth of Field: Use shallow depth of field to focus on key elements
Lighting: Prefer dramatic lighting with blue/teal highlights
Usage Guidelines
Use photography sparingly and purposefully
Avoid generic stock photos of "people coding"
When showing people, represent diverse users and contexts
Apply subtle vignetting to integrate photos with the UI
Data Visualizations
Style Guidelines
Clean & Precise: Prioritize clarity and accuracy in data representation
Grid-Based: Align visualizations to the underlying grid system
Brand Colors: Use the primary and secondary color palette consistently
Minimal Decoration: Avoid chartjunk and unnecessary decorative elements
Retro-Tech Feel: Incorporate subtle "terminal" or "hacker" aesthetic elements
Chart Types
Line Charts: Use for time series data with Flux Aqua for primary metrics
Bar Charts: Use for comparisons with consistent color coding
Scatter Plots: Use for correlation analysis with size and color encoding
Heat Maps: Use for density visualization with color gradients
Gauges & Meters: Use for KPIs with clear color indicators
Interactive Elements
Provide tooltips for detailed information
Use subtle animations for transitions between data states
Implement responsive sizing for different screen sizes
Include clear legends and contextual information
Layout & Spacing
Grid System
Base Grid
8px Base Unit: All spacing should be multiples of 8px
24-Column Grid: Use a 24-column grid for flexible layouts
Gutters: 16px (2 base units) between columns
Margins: 24px (3 base units) on container edges
Responsive Breakpoints
xs: < 576px (Mobile)
sm: ≥ 576px (Tablet portrait)
md: ≥ 768px (Tablet landscape)
lg: ≥ 992px (Desktop)
xl: ≥ 1200px (Large desktop)
xxl: ≥ 1600px (Extra large screens)
Ant Design Integration
Maintain Ant Design's 24-column grid system
Use Ant Design's responsive breakpoints
Customize Ant Design's default spacing to match the 8px base unit
Tailwind CSS Integration
Configure Tailwind's spacing scale to use 8px increments
Use Tailwind's responsive utilities with the same breakpoints
Create custom Tailwind utilities for specific spacing needs
Spacing Guidelines
Component Spacing
Micro Spacing (4px): Within components (icon to text)
Small Spacing (8px): Between related elements
Medium Spacing (16px): Between distinct elements
Large Spacing (24px): Between groups of elements
Extra Large Spacing (32px+): Between major sections
Vertical Rhythm
Maintain consistent vertical spacing between elements
Use larger spacing (32px+) between major sections
Use medium spacing (16px) between related components
Use consistent line heights for text elements
White Space
Embrace negative space to create focus and clarity
Use asymmetric spacing to create visual interest
Maintain breathing room around important elements
Increase spacing for higher-level information
Layout Structure
Page Structure
Header: Fixed height (64px) with app navigation
Sidebar: Fixed or collapsible (240px expanded, 80px collapsed)
Content Area: Fluid with consistent padding (24px)
Footer: Optional, fixed height (48px) with minimal content
Card & Container Structure
Cards: Consistent padding (16px or 24px)
Section Headers: Clear visual separation (24px margin below)
Form Elements: Consistent spacing between fields (16px)
Tables: Comfortable row height (48px) with adequate cell padding
Z-Index Hierarchy
Base Content: z-index 0
Floating Elements: z-index 10
Dropdowns & Tooltips: z-index 100
Modals & Dialogs: z-index 1000
Notifications: z-index 2000
Tone & Mood
Visual Personality
Self-Aware Humor
Terminal-Style Messages: Use command-line style for loading and status messages
Witty Empty States: Add personality to empty states with subtle humor
Playful Animations: Incorporate subtle animations that feel slightly self-referential
Easter Eggs: Hide occasional easter eggs in UI interactions
Pragmatic Approach
Efficient Use of Space: Prioritize information density without overwhelming
Clear Visual Hierarchy: Make important actions and information immediately apparent
Streamlined Workflows: Reduce visual noise in task-focused interfaces
Contextual Help: Provide help and information exactly where needed
Technical Sophistication
Code Aesthetics: Incorporate code-like elements in appropriate contexts
Precision in Details: Use precise alignment and spacing
System Status Visibility: Make system processes visible when relevant
Data-Forward Design: Highlight data and metrics prominently
Visual Effects
Subtle Glitch Effects
Apply minimal glitch animations to logos or decorative elements
Use sparingly and ensure they don't interfere with usability
Example: Subtle pixel displacement or color channel separation
Implementation: transform: translate(1px, 0) with quick transitions
Retro-Tech Elements
Incorporate subtle scan lines in headers or dividers (1-2% opacity)
Use monospace fonts for technical data and metrics
Add terminal-inspired UI elements for code or system interfaces
Implementation: background: repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 2px);
Cyberpunk Industrial Touches
Add subtle hexagonal patterns to backgrounds or dividers
Use circuit-like decorative elements in empty spaces
Incorporate subtle noise texture for industrial feel
Implementation: background-image: url('noise.png'); background-blend-mode: overlay; opacity: 0.03;
Interaction Design
Responsive Feedback
Provide immediate visual feedback for all interactions
Use subtle animations to confirm actions (200-300ms duration)
Incorporate progress indicators for longer processes
Example: Button press effect with ripple and slight color shift
Intelligent Defaults
Pre-select the most likely options in forms and controls
Show smart suggestions based on context
Remember user preferences and adapt the interface accordingly
Example: Automatically focus the most likely next action
Contextual Assistance
Show help and guidance in context rather than separate documentation
Use tooltips and inline explanations for complex features
Provide examples and templates for common tasks
Example: Inline code examples with "Copy" button
Accessibility
Color Contrast
Text Contrast Requirements
Normal Text (< 18pt): Minimum 4.5:1 contrast ratio
Large Text (≥ 18pt or bold ≥ 14pt): Minimum 3:1 contrast ratio
UI Components & Graphics: Minimum 3:1 contrast ratio
Implementation Guidelines
Test all text colors against their backgrounds
Ensure focus indicators have sufficient contrast
Avoid low contrast text on textured backgrounds
Provide high contrast mode option
Testing Tools
Use WebAIM Contrast Checker during development
Implement automated contrast testing in CI/CD pipeline
Conduct regular manual reviews of contrast compliance
Typography Accessibility
Font Size Guidelines
Minimum Body Text: 14px (16px recommended)
Form Labels & Controls: 14px minimum
Error Messages: 14px minimum
Allow Text Resizing: Support up to 200% text size increase
Line Height & Spacing
Body Text Line Height: Minimum 1.5x font size
Paragraph Spacing: Minimum 1.5x font size
Letter Spacing: Normal or slightly increased for readability
Word Spacing: Normal or slightly increased for readability
Text Alternatives
Provide text alternatives for all non-text content
Use semantic HTML elements for proper text structure
Support text-to-speech with proper ARIA attributes
Avoid text in images; use actual text with styling
Keyboard Navigation
Focus Management
Ensure all interactive elements are keyboard focusable
Provide visible focus indicators (outline or highlight)
Maintain logical tab order matching visual layout
Trap focus in modal dialogs and overlays
Keyboard Shortcuts
Provide keyboard shortcuts for common actions
Document all keyboard shortcuts in an accessible manner
Allow customization of keyboard shortcuts
Avoid conflicts with browser and screen reader shortcuts
Skip Links
Implement skip links for navigation and repetitive content
Make skip links visible when focused
Ensure skip links target appropriate landmarks
Test skip links with screen readers
Screen Reader Support
Semantic Structure
Use proper heading hierarchy (H1-H6)
Implement ARIA landmarks for major page sections
Use semantic HTML elements (nav, main, article, etc.)
Provide descriptive labels for form controls
Dynamic Content
Announce dynamic content changes with ARIA live regions
Provide status updates for loading and processing
Ensure modal dialogs are properly announced
Test with popular screen readers (NVDA, JAWS, VoiceOver)
Non-Text Content
Provide alt text for all images
Describe complex visualizations and charts
Provide accessible alternatives for complex interactions
Ensure icons have text labels or aria-label attributes
Additional Accessibility Considerations
Motion & Animation
Provide options to reduce motion
Keep animations subtle and purposeful
Avoid flashing content (less than 3 flashes per second)
Ensure animations don't interfere with reading or interaction
Forms & Validation
Provide clear error messages
Associate labels with form controls
Group related form elements with fieldset and legend
Provide validation feedback in an accessible manner
Touch Targets
Minimum touch target size of 44x44 pixels
Adequate spacing between touch targets
Support both touch and pointer interactions
Test with touch screen readers
This comprehensive visual style guide provides detailed guidelines for imagery, layout, tone, and accessibility to ensure a consistent, engaging, and accessible user experience for CauldronOS. The guidelines balance professional functionality with the brand's unique personality while ensuring compliance with accessibility standards.

## Typography

### Font Families

CauldronOS uses a carefully selected combination of fonts to create a balanced, professional, and slightly futuristic appearance:

- **Manrope**: Primary heading font for key titles and important UI elements
- **JetBrains Mono**: Monospace font for code, technical content, and terminal-like elements
- **Inter**: Body text font for general content (fallback)

### Font Implementation

#### HTML Head Implementation

Add the following code to the `<head>` section of your HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Manrope:wght@200..800&display=swap" rel="stylesheet">
```

#### Manrope Font Classes

Use these CSS classes for Manrope with different weights:

```css
/* <weight>: Use a value from 200 to 800 */
/* <uniquifier>: Use a unique and descriptive class name */

.manrope-<uniquifier> {
  font-family: "Manrope", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
```

Example implementations:

```css
.manrope-heading {
  font-family: "Manrope", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.manrope-subtitle {
  font-family: "Manrope", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
```

#### JetBrains Mono Font Classes

Use these CSS classes for JetBrains Mono with different weights:

```css
/* <weight>: Use a value from 100 to 800 */
/* <uniquifier>: Use a unique and descriptive class name */

.jetbrains-mono-<uniquifier> {
  font-family: "JetBrains Mono", monospace;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
```

Example implementations:

```css
.jetbrains-mono-code {
  font-family: "JetBrains Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.jetbrains-mono-terminal {
  font-family: "JetBrains Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
```

### Typography Scale

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|------------|
| H1 (Page Title) | Manrope | 800 | 32px | 1.2 |
| H2 (Section Title) | Manrope | 700 | 24px | 1.2 |
| H3 (Subsection) | Manrope | 600 | 20px | 1.3 |
| H4 (Card Title) | Manrope | 600 | 16px | 1.4 |
| Body Text | Inter | 400 | 14px | 1.5 |
| Small Text | Inter | 400 | 12px | 1.5 |
| Code/Terminal | JetBrains Mono | 400 | 14px | 1.4 |
| Button Text | Manrope | 600 | 14px | 1.4 |
| Input Text | Inter | 400 | 14px | 1.5 |

### Font Usage Guidelines

- Use Manrope for headings, titles, and important UI elements
- Use JetBrains Mono for code blocks, terminal-like interfaces, and technical data
- Use Inter (or system fallback) for body text and general content
- Maintain consistent font weights across similar elements
- Ensure sufficient contrast between text and background colors
- Use appropriate line height for readability