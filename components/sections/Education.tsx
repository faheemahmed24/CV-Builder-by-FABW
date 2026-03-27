'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EducationProps {
  data: any[];
  onChange: (val: any[]) => void;
}

export const Education: React.FC<EducationProps> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
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
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Education</h3>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleRemove(item.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Institution"
              value={item.institution}
              onChange={(e) => handleChange(item.id, 'institution', e.target.value)}
              placeholder="e.g. Karachi University"
            />
            <Input
              label="Degree"
              value={item.degree}
              onChange={(e) => handleChange(item.id, 'degree', e.target.value)}
              placeholder="e.g. Bachelor"
            />
            <Input
              label="Field of Study"
              value={item.field}
              onChange={(e) => handleChange(item.id, 'field', e.target.value)}
              placeholder="e.g. Computer Science"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                value={item.startDate}
                onChange={(e) => handleChange(item.id, 'startDate', e.target.value)}
                placeholder="e.g. 2017"
              />
              <Input
                label="End Date"
                value={item.endDate}
                onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                placeholder="e.g. 2021"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-16 border-dashed border-2 gap-2" onClick={handleAdd}>
        <Plus className="h-5 w-5" />
        Add Education
      </Button>
    </div>
  );
};
