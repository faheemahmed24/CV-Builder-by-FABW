'use client';

import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  label, 
  color = 'bg-blue-600' 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
        <div 
          className={`h-full transition-all duration-500 ease-out ${color}`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
};
