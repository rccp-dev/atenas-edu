'use client';

import React from 'react';
import Link from 'next/link'

// Tipagem das propriedades
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Componente Funcional
export const Button = ({
  children,
  onClick,
  href,
  variant = 'primary',
  disabled = false,
}: ButtonProps) => {
  
  // Estilo
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-all';
  const variants = {
    primary: 'bg-primary text-light hover:bg-accent',
    secondary: 'bg-secondary text-light hover:bg-accent',
  };

  const className = `${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if(href) {
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};
