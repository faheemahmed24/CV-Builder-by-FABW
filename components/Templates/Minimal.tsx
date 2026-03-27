'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: any;
  theme: string;
  fontSize: 'small' | 'medium' | 'large';
  rtl: boolean;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 border-b border-gray-100 pb-2">
    <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
      {children}
    </h2>
  </div>
);

export const Minimal: React.FC<TemplateProps> = ({ data, theme, fontSize, rtl }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, labels } = data;

  const themeColors: Record<string, string> = {
    blue: '#2563eb',
    gray: '#374151',
    green: '#15803d',
    purple: '#7e22ce'
  };

  const fontSizes: Record<string, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const primaryColor = themeColors[theme] || themeColors.blue;
  const baseFontSize = fontSizes[fontSize] || fontSizes.medium;

  return (
    <div className={`space-y-12 ${baseFontSize} font-sans text-gray-800 leading-relaxed max-w-3xl mx-auto`}>
      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none text-gray-900">
            {personalInfo.name}
          </h1>
          <p className="text-xl font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
            {personalInfo.title}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-black uppercase tracking-widest text-gray-400">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section>
          <SectionTitle>{labels.summary}</SectionTitle>
          <p className="text-lg font-medium text-gray-600 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section>
          <SectionTitle>{labels.experience}</SectionTitle>
          <div className="space-y-10">
            {experience.map((exp: any, i: number) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-xs font-black uppercase tracking-widest text-gray-400 pt-1">
                  {exp.duration}
                </div>
                <div className="md:col-span-3 space-y-2">
                  <div className="font-black text-xl text-gray-900 uppercase tracking-tight leading-none">
                    {exp.role}
                  </div>
                  <div className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    {exp.company}
                  </div>
                  <p className="text-gray-700 mt-4">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <SectionTitle>{labels.education}</SectionTitle>
          <div className="space-y-8">
            {education.map((edu: any, i: number) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-xs font-black uppercase tracking-widest text-gray-400 pt-1">
                  {edu.startDate} - {edu.endDate}
                </div>
                <div className="md:col-span-3 space-y-1">
                  <div className="font-black text-xl text-gray-900 uppercase tracking-tight leading-none">
                    {edu.institution}
                  </div>
                  <div className="text-gray-600 font-bold text-sm uppercase tracking-widest">
                    {edu.degree} in {edu.field}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <SectionTitle>{labels.skills}</SectionTitle>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {skills.map((skill: string, i: number) => (
              <span 
                key={i} 
                className="text-sm font-black uppercase tracking-widest text-gray-900"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <SectionTitle>{labels.languages}</SectionTitle>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {languages.map((lang: string, i: number) => (
              <span key={i} className="text-sm font-black uppercase tracking-widest text-gray-900">{lang}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
