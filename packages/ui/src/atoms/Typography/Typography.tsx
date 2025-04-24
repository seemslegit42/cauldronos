import React from 'react';
import { Typography as AntTypography, TypographyProps as AntTypographyProps } from 'antd';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';

const { Title: AntTitle, Text: AntText, Paragraph: AntParagraph, Link: AntLink } = AntTypography;

export interface TypographyProps extends AntTypographyProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to animate the typography on mount
   * @default false
   */
  animated?: boolean;
  
  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number;
  
  /**
   * Whether to apply a glow effect
   * @default false
   */
  glow?: boolean;
  
  /**
   * Whether to apply a glitch effect
   * @default false
   */
  glitch?: boolean;
}

export interface TitleProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface TextProps extends TypographyProps {
  code?: boolean;
  copyable?: boolean | { text: string; onCopy: () => void };
  delete?: boolean;
  disabled?: boolean;
  editable?: boolean | { editing: boolean; onStart: () => void; onChange: (value: string) => void };
  ellipsis?: boolean | { rows: number; expandable: boolean; onExpand: () => void };
  keyboard?: boolean;
  mark?: boolean;
  strong?: boolean;
  italic?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  underline?: boolean;
}

export interface ParagraphProps extends TextProps {}

export interface LinkProps extends TextProps {
  href?: string;
  target?: string;
}

/**
 * Enhanced Typography component with animation and styling options
 */
export const Typography: React.FC<TypographyProps> & {
  Title: React.FC<TitleProps>;
  Text: React.FC<TextProps>;
  Paragraph: React.FC<ParagraphProps>;
  Link: React.FC<LinkProps>;
} = ({ children, ...props }) => {
  return <AntTypography {...props}>{children}</AntTypography>;
};

/**
 * Enhanced Title component with animation and styling options
 */
export const Title: React.FC<TitleProps> = ({ 
  cyberpunk = false, 
  animated = false, 
  delay = 0,
  glow = false,
  glitch = false,
  className = '',
  children,
  ...props 
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  const titleClassName = `
    ${className} 
    ${cyberpunk ? 'cyberpunk-title' : ''} 
    ${glow ? 'glow-effect' : ''}
    ${glitch ? 'glitch-effect' : ''}
  `;
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <AntTitle
        className={titleClassName}
        {...props}
      >
        {children}
      </AntTitle>
    );
  }
  
  // Use motion for animated titles
  const MotionTitle = motion(AntTitle);
  
  return (
    <MotionTitle
      className={titleClassName}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </MotionTitle>
  );
};

/**
 * Enhanced Text component with animation and styling options
 */
export const Text: React.FC<TextProps> = ({ 
  cyberpunk = false, 
  animated = false, 
  delay = 0,
  glow = false,
  glitch = false,
  className = '',
  children,
  ...props 
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  const textClassName = `
    ${className} 
    ${cyberpunk ? 'cyberpunk-text' : ''} 
    ${glow ? 'glow-effect' : ''}
    ${glitch ? 'glitch-effect' : ''}
  `;
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <AntText
        className={textClassName}
        {...props}
      >
        {children}
      </AntText>
    );
  }
  
  // Use motion for animated text
  const MotionText = motion(AntText);
  
  return (
    <MotionText
      className={textClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </MotionText>
  );
};

/**
 * Enhanced Paragraph component with animation and styling options
 */
export const Paragraph: React.FC<ParagraphProps> = ({ 
  cyberpunk = false, 
  animated = false, 
  delay = 0,
  glow = false,
  glitch = false,
  className = '',
  children,
  ...props 
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  const paragraphClassName = `
    ${className} 
    ${cyberpunk ? 'cyberpunk-paragraph' : ''} 
    ${glow ? 'glow-effect' : ''}
    ${glitch ? 'glitch-effect' : ''}
  `;
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <AntParagraph
        className={paragraphClassName}
        {...props}
      >
        {children}
      </AntParagraph>
    );
  }
  
  // Use motion for animated paragraphs
  const MotionParagraph = motion(AntParagraph);
  
  return (
    <MotionParagraph
      className={paragraphClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </MotionParagraph>
  );
};

/**
 * Enhanced Link component with animation and styling options
 */
export const Link: React.FC<LinkProps> = ({ 
  cyberpunk = false, 
  animated = false, 
  delay = 0,
  glow = false,
  glitch = false,
  className = '',
  children,
  ...props 
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  const linkClassName = `
    ${className} 
    ${cyberpunk ? 'cyberpunk-link' : ''} 
    ${glow ? 'glow-effect' : ''}
    ${glitch ? 'glitch-effect' : ''}
  `;
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <AntLink
        className={linkClassName}
        {...props}
      >
        {children}
      </AntLink>
    );
  }
  
  // Use motion for animated links
  const MotionLink = motion(AntLink);
  
  return (
    <MotionLink
      className={linkClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05, color: token.colorPrimary }}
      transition={{ duration: 0.3, delay }}
      {...props}
    >
      {children}
    </MotionLink>
  );
};

// Assign components to Typography
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.Link = Link;

Typography.displayName = 'Typography';
Title.displayName = 'Title';
Text.displayName = 'Text';
Paragraph.displayName = 'Paragraph';
Link.displayName = 'Link';

export default Typography;
