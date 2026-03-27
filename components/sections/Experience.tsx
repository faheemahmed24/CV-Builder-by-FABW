'use client';

import React from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface ExperienceProps {
  data: any[];
  onChange: (val: any[]) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        role: '',
        company: '',
        duration: '',
        description: ''
      }
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: string, value: string) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-8">
      {data.map((item, index) => (
        <div key={item.id} className="relative p-6 rounded-2xl border-2 border-gray-100 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-black">
                {index + 1}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Experience</h3>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleRemove(item.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Role / Position"
              value={item.role}
              onChange={(e) => handleChange(item.id, 'role', e.target.value)}
              placeholder="e.g. Software Engineer"
            />
            <Input
              label="Company Name"
              value={item.company}
              onChange={(e) => handleChange(item.id, 'company', e.target.value)}
              placeholder="e.g. TechCorp"
            />
            <Input
              label="Duration"
              value={item.duration}
              onChange={(e) => handleChange(item.id, 'duration', e.target.value)}
              placeholder="e.g. 2021 - Present"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-wider text-blue-600 gap-1">
                <Sparkles className="h-3 w-3" />
                Improve Text
              </Button>
            </div>
            <Textarea
              value={item.description}
              onChange={(e) => handleChange(item.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              className="min-h-[120px]"
            />
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-16 border-dashed border-2 gap-2" onClick={handleAdd}>
        <Plus className="h-5 w-5" />
        Add Experience
      </Button>
    </div>
  );
};
