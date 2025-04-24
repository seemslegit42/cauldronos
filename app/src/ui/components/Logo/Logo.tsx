import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export interface LogoProps {
  type?: 'full' | 'mark' | 'wordmark' | 'glyph';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  linkTo?: string;
  onClick?: () => void;
}

/**
 * Logo component that displays the CauldronOS logo in different variations
 */
const Logo: React.FC<LogoProps> = ({
  type = 'full',
  size = 'medium',
  className,
  linkTo = '/',
  onClick,
}) => {
  const logoSrc = {
    full: '/logo.svg',
    mark: '/logo-mark.svg',
    wordmark: '/logo-wordmark.svg',
    glyph: '/glyph.svg',
  }[type];

  const sizeClasses = {
    small: 'h-6 md:h-8',
    medium: 'h-8 md:h-10',
    large: 'h-12 md:h-16',
  }[size];

  const logoElement = (
    <img
      src={logoSrc}
      alt="CauldronOS"
      className={classNames(sizeClasses, className)}
      draggable={false}
    />
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="flex items-center" onClick={onClick}>
        {logoElement}
      </Link>
    );
  }

  return logoElement;
};

export default Logo;
