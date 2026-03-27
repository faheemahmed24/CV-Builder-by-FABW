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
  <div className="mb-4 border-b-2 pb-1" style={{ borderColor: color }}>
    <h2 className="text-lg font-black uppercase tracking-widest" style={{ color: color }}>
      {children}
    </h2>
  </div>
);

export const Classic: React.FC<TemplateProps> = ({ data, theme, fontSize, rtl }) => {
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
    <div className={`space-y-8 ${baseFontSize} font-serif text-gray-800 leading-relaxed`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>
          {personalInfo.name}
        </h1>
        <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">
          {personalInfo.title}
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" /> {personalInfo.website}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" /> GitHub
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section>
          <SectionTitle color={primaryColor}>{labels.summary}</SectionTitle>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section>
          <SectionTitle color={primaryColor}>{labels.experience}</SectionTitle>
          <div className="space-y-6">
            {experience.map((exp: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{exp.role}</span>
                  <span className="text-gray-500">{exp.duration}</span>
                </div>
                <div className="font-bold italic text-gray-600">{exp.company}</div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <SectionTitle color={primaryColor}>{labels.education}</SectionTitle>
          <div className="space-y-4">
            {education.map((edu: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{edu.institution}</span>
                  <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-gray-700">{edu.degree} in {edu.field}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <SectionTitle color={primaryColor}>{labels.skills}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, i: number) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-full text-sm font-bold border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <SectionTitle color={primaryColor}>{labels.projects}</SectionTitle>
          <div className="space-y-4">
            {projects.map((proj: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="font-bold text-gray-900">{proj.name}</div>
                <p className="text-gray-700">{proj.description}</p>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tech: {proj.techStack}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <SectionTitle color={primaryColor}>{labels.languages}</SectionTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {languages.map((lang: string, i: number) => (
              <span key={i} className="font-bold text-gray-700">{lang}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
