# @cauldronos/utils

This package contains pure utility functions for the CauldronOS platform.

## Categories

- **String Utilities**: String manipulation, formatting, and transformation
- **Date Utilities**: Date formatting, parsing, and manipulation
- **Number Utilities**: Number formatting and calculations
- **Object Utilities**: Object manipulation and transformation
- **Array Utilities**: Array manipulation and transformation
- **Validation Utilities**: Data validation functions
- **Format Utilities**: Formatting for various data types
- **Logger Utilities**: Logging utilities for consistent logging

## Usage

```ts
import { 
  capitalize, 
  truncate, 
  formatDate, 
  getRelativeTime 
} from '@cauldronos/utils';

// String utilities
const title = capitalize('hello world'); // 'Hello world'
const shortText = truncate('This is a long text', 10); // 'This is a...'

// Date utilities
const formattedDate = formatDate(new Date(), { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
}); // 'Jan 1, 2023'

const timeAgo = getRelativeTime(new Date('2023-01-01')); // '3 months ago'
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode during development
pnpm dev
```