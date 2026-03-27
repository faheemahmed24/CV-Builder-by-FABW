'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface ProjectsProps {
  data: any[];
  onChange: (val: any[]) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        techStack: '',
        link: ''
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
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Project</h3>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleRemove(item.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Project Name"
              value={item.name}
              onChange={(e) => handleChange(item.id, 'name', e.target.value)}
              placeholder="e.g. E-commerce App"
            />
            <Input
              label="Tech Stack"
              value={item.techStack}
              onChange={(e) => handleChange(item.id, 'techStack', e.target.value)}
              placeholder="e.g. React, Node.js"
            />
            <Input
              label="Project Link"
              value={item.link}
              onChange={(e) => handleChange(item.id, 'link', e.target.value)}
              placeholder="e.g. github.com/ahmed/ecommerce"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
            <Textarea
              value={item.description}
              onChange={(e) => handleChange(item.id, 'description', e.target.value)}
              placeholder="Describe what you built and your role..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-16 border-dashed border-2 gap-2" onClick={handleAdd}>
        <Plus className="h-5 w-5" />
        Add Project
      </Button>
    </div>
  );
};
