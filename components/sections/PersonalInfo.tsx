'use client';

import React from 'react';
import { Input } from '../ui/Input';

interface PersonalInfoProps {
  data: any;
  onChange: (val: any) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Full Name"
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="e.g. Ahmed Khan"
      />
      <Input
        label="Professional Title"
        value={data.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="e.g. Software Engineer"
      />
      <Input
        label="Email Address"
        value={data.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="e.g. ahmed@gmail.com"
      />
      <Input
        label="Phone Number"
        value={data.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        placeholder="e.g. +92 300 1234567"
      />
      <Input
        label="Location"
        value={data.location}
        onChange={(e) => handleChange('location', e.target.value)}
        placeholder="e.g. Karachi, Pakistan"
      />
      <Input
        label="Website"
        value={data.website}
        onChange={(e) => handleChange('website', e.target.value)}
        placeholder="e.g. https://ahmed.com"
      />
      <Input
        label="LinkedIn"
        value={data.linkedin}
        onChange={(e) => handleChange('linkedin', e.target.value)}
        placeholder="e.g. linkedin.com/in/ahmed"
      />
      <Input
        label="GitHub"
        value={data.github}
        onChange={(e) => handleChange('github', e.target.value)}
        placeholder="e.g. github.com/ahmed"
      />
    </div>
  );
};
