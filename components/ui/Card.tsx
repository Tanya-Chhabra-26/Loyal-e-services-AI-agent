'use client';

import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string; // allow custom styling
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full bg-white rounded-lg shadow-[-1px_1px_13px_-1px_rgba(0,0,0,0.56)] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
