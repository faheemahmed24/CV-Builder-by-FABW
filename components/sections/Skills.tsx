'use client';

import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface SkillsProps {
  data: string[];
  onChange: (val: string[]) => void;
}

export const Skills: React.FC<SkillsProps> = ({ data, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !data.includes(inputValue.trim())) {
      onChange([...data, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (skill: string) => {
    onChange(data.filter(s => s !== skill));
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
          label="Add Skill"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React"
          className="flex-1"
        />
        <Button variant="primary" className="mt-6 h-12 w-12 rounded-xl" onClick={handleAdd}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm border-2 border-blue-100"
          >
            {skill}
            <button onClick={() => handleRemove(skill)} className="hover:text-blue-800">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-100 rounded-2xl text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300">
            <Wrench className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No skills added yet.</p>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-gray-50 border-2 border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
          <Sparkles className="h-4 w-4 text-blue-600" />
          Suggested Skills
        </div>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker'].map((s) => (
            <button
              key={s}
              onClick={() => !data.includes(s) && onChange([...data, s])}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                data.includes(s) 
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import { Wrench } from 'lucide-react';
