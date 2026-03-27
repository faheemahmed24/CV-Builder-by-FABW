'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface CustomSectionProps {
  data: any[];
  onChange: (val: any[]) => void;
}

export const CustomSection: React.FC<CustomSectionProps> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        title: '',
        content: ''
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
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Custom Section</h3>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleRemove(item.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <Input
            label="Section Title"
            value={item.title}
            onChange={(e) => handleChange(item.id, 'title', e.target.value)}
            placeholder="e.g. Hobbies or References"
          />

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Content</label>
            <Textarea
              value={item.content}
              onChange={(e) => handleChange(item.id, 'content', e.target.value)}
              placeholder="Enter details for this section..."
              className="min-h-[120px]"
            />
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-16 border-dashed border-2 gap-2" onClick={handleAdd}>
        <Plus className="h-5 w-5" />
        Add Custom Section
      </Button>
    </div>
  );
};
