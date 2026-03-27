'use client';

import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages,
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { PersonalInfo } from './sections/PersonalInfo';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Languages as LanguagesSection } from './sections/Languages';
import { CustomSection } from './sections/CustomSection';
import { Button } from './ui/Button';

interface EditorProps {
  data: any;
  onChange: (newData: any) => void;
}

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'languages', label: 'Languages', icon: Languages },
  { id: 'custom', label: 'Custom Section', icon: Plus },
];

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo data={data.personalInfo} onChange={(val) => onChange({ ...data, personalInfo: val })} />;
      case 'experience':
        return <Experience data={data.experience} onChange={(val) => onChange({ ...data, experience: val })} />;
      case 'education':
        return <Education data={data.education} onChange={(val) => onChange({ ...data, education: val })} />;
      case 'skills':
        return <Skills data={data.skills} onChange={(val) => onChange({ ...data, skills: val })} />;
      case 'projects':
        return <Projects data={data.projects} onChange={(val) => onChange({ ...data, projects: val })} />;
      case 'certifications':
        return <Certifications data={data.certifications} onChange={(val) => onChange({ ...data, certifications: val })} />;
      case 'languages':
        return <LanguagesSection data={data.languages} onChange={(val) => onChange({ ...data, languages: val })} />;
      case 'custom':
        return <CustomSection data={data.customSections || []} onChange={(val) => onChange({ ...data, customSections: val })} />;
      default:
        return <PersonalInfo data={data.personalInfo} onChange={(val) => onChange({ ...data, personalInfo: val })} />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800">
      {/* Section Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-100 p-2 scrollbar-none dark:border-gray-700">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
              activeSection === section.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              {SECTIONS.find(s => s.id === activeSection)?.label}
            </h2>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};
