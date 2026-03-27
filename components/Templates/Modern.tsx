'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: any;
  theme: string;
  fontSize: 'small' | 'medium' | 'large';
  rtl: boolean;
}

const SectionTitle = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <div className="mb-6 border-b-2 pb-2" style={{ borderColor: color }}>
    <h2 className="text-xl font-black uppercase tracking-widest" style={{ color: color }}>
      {children}
    </h2>
  </div>
);

export const Modern: React.FC<TemplateProps> = ({ data, theme, fontSize, rtl }) => {
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
    <div className={`flex h-full min-h-[1123px] ${baseFontSize} font-sans text-gray-800 leading-relaxed ${rtl ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Sidebar */}
      <div 
        className={`w-[35%] p-10 text-white space-y-10 ${rtl ? 'border-l' : 'border-r'}`}
        style={{ backgroundColor: primaryColor }}
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
            {personalInfo.name}
          </h1>
          <p className="text-lg font-bold opacity-80 uppercase tracking-widest">
            {personalInfo.title}
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/20 pb-2">
            {labels.personalInfo}
          </h3>
          <div className="space-y-4 text-sm font-medium">
            {personalInfo.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 opacity-70" /> {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 opacity-70" /> {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 opacity-70" /> {personalInfo.location}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 opacity-70" /> {personalInfo.website}
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/20 pb-2">
              {labels.skills}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, i: number) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/20 pb-2">
              {labels.languages}
            </h3>
            <div className="space-y-2">
              {languages.map((lang: string, i: number) => (
                <div key={i} className="text-sm font-bold">{lang}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-12 bg-white">
        {summary && (
          <section>
            <SectionTitle color={primaryColor}>{labels.summary}</SectionTitle>
            <p className="text-gray-700 font-medium italic">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <SectionTitle color={primaryColor}>{labels.experience}</SectionTitle>
            <div className="space-y-8">
              {experience.map((exp: any, i: number) => (
                <div key={i} className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-600" style={{ backgroundColor: primaryColor }} />
                  <div className="space-y-1">
                    <div className="flex justify-between font-black text-gray-900 uppercase tracking-tight">
                      <span>{exp.role}</span>
                      <span className="text-xs font-bold text-gray-400">{exp.duration}</span>
                    </div>
                    <div className="font-bold text-gray-500 uppercase text-xs tracking-widest">{exp.company}</div>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionTitle color={primaryColor}>{labels.education}</SectionTitle>
            <div className="space-y-6">
              {education.map((edu: any, i: number) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-black text-gray-900 uppercase tracking-tight">
                    <span>{edu.institution}</span>
                    <span className="text-xs font-bold text-gray-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-gray-600 font-bold text-sm">{edu.degree} in {edu.field}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SectionTitle color={primaryColor}>{labels.projects}</SectionTitle>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((proj: any, i: number) => (
                <div key={i} className="space-y-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="font-black text-gray-900 uppercase tracking-tight">{proj.name}</div>
                  <p className="text-sm text-gray-700">{proj.description}</p>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest" style={{ color: primaryColor }}>
                    Tech: {proj.techStack}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
