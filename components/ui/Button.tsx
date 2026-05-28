'use client';

import React from 'react';
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  disabled = false,
}: ButtonProps) => {
  
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-all';
  const variants = {
    primary: 'bg-primary text-light hover:bg-accent',
    secondary: 'bg-secondary text-light hover:bg-accent',
  };

  const className = `${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  if(href) {
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};
