/**
 * Script to create a new UI component in the UI package
 * Usage: node scripts/create-component.js <component-name> <component-type>
 * Example: node scripts/create-component.js Button atom
 */

const fs = require('fs');
const path = require('path');

// Get component name and type from command line arguments
const componentName = process.argv[2];
const componentType = process.argv[3] || 'atom'; // Default to 'atom'

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Validate component type
const validTypes = ['atom', 'molecule', 'organism', 'template'];
if (!validTypes.includes(componentType)) {
  console.error(`Invalid component type: ${componentType}. Valid types are: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Map component type to directory
const typeToDir = {
  atom: 'atoms',
  molecule: 'molecules',
  organism: 'organisms',
  template: 'templates',
};

// Determine component directory
const componentDir = path.join(process.cwd(), 'packages', 'ui', 'src', typeToDir[componentType], componentName);

// Create component directory
if (fs.existsSync(componentDir)) {
  console.error(`Component directory already exists: ${componentDir}`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// Create index.ts
fs.writeFileSync(
  path.join(componentDir, 'index.ts'),
  `export * from './${componentName}';\n`
);

// Create component file
const componentContent = `import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export interface ${componentName}Props {
  /**
   * Children elements
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Apply motion animation
   */
  animate?: boolean;
}

/**
 * ${componentName} component
 */
export const ${componentName} = ({
  children,
  className,
  animate = false,
  ...props
}: ${componentName}Props) => {
  const classes = twMerge(
    // Base styles
    '',
    // Additional classes
    className
  );

  if (animate) {
    return (
      <motion.div
        className={classes}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default ${componentName};
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentContent
);

// Update index.ts in the component type directory
const typeIndexPath = path.join(process.cwd(), 'packages', 'ui', 'src', typeToDir[componentType], 'index.ts');
if (fs.existsSync(typeIndexPath)) {
  let indexContent = fs.readFileSync(typeIndexPath, 'utf8');
  
  // Check if the export already exists
  if (!indexContent.includes(`export * from './${componentName}';`)) {
    // Add the export at the end of the file
    indexContent += `export * from './${componentName}';\n`;
    fs.writeFileSync(typeIndexPath, indexContent);
  }
}

console.log(`Created ${componentType} component '${componentName}' at ${componentDir}`);
console.log(`\nNext steps:
1. Customize the component in ${componentDir}/${componentName}.tsx
2. Import and use the component in your application
3. Run 'pnpm build' to build the UI package
`);