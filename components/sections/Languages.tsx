'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface LanguagesProps {
  data: string[];
  onChange: (val: string[]) => void;
}

export const Languages: React.FC<LanguagesProps> = ({ data, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !data.includes(inputValue.trim())) {
      onChange([...data, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (lang: string) => {
    onChange(data.filter(l => l !== lang));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          label="Add Language"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. English"
          className="flex-1"
        />
        <Button variant="primary" className="mt-6 h-12 w-12 rounded-xl" onClick={handleAdd}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((lang, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm border-2 border-blue-100"
          >
            {lang}
            <button onClick={() => handleRemove(lang)} className="hover:text-blue-800">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
