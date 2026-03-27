'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  className, 
  label, 
  error, 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full h-12 rounded-xl border-2 border-gray-100 bg-white px-4 text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:border-blue-600 focus:outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
