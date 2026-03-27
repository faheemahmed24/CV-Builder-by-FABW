'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface CertificationsProps {
  data: any[];
  onChange: (val: any[]) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        date: ''
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
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Certification</h3>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleRemove(item.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Certification Name"
              value={item.name}
              onChange={(e) => handleChange(item.id, 'name', e.target.value)}
              placeholder="e.g. AWS Certified Developer"
            />
            <Input
              label="Issuer"
              value={item.issuer}
              onChange={(e) => handleChange(item.id, 'issuer', e.target.value)}
              placeholder="e.g. Amazon Web Services"
            />
            <Input
              label="Date"
              value={item.date}
              onChange={(e) => handleChange(item.id, 'date', e.target.value)}
              placeholder="e.g. 2022"
            />
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-16 border-dashed border-2 gap-2" onClick={handleAdd}>
        <Plus className="h-5 w-5" />
        Add Certification
      </Button>
    </div>
  );
};
