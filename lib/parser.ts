import { SKILLS_DATABASE } from './skillsDatabase';
import { CITY_DATABASE } from './cityDatabase';
import { LanguageCode, detectLanguage } from './textUtils';

export interface ParsedData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    age: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: any[];
  education: any[];
  skills: string[];
  projects: any[];
  certifications: any[];
  languages: string[];
  inputLanguage: LanguageCode;
}

export const parseParagraph = (text: string): ParsedData => {
  const inputLanguage = detectLanguage(text);
  
  // Regex patterns
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phonePattern = /(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4,6}/;
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // Extraction logic
  const email = text.match(emailPattern)?.[0] || '';
  const phone = text.match(phonePattern)?.[0] || '';
  const urls = text.match(urlPattern) || [];
  const linkedin = urls.find(u => u.includes('linkedin.com')) || '';
  const github = urls.find(u => u.includes('github.com')) || '';
  const website = urls.find(u => !u.includes('linkedin.com') && !u.includes('github.com')) || '';

  // Name extraction
  let name = '';
  const namePatterns = [
    /I am ([A-Z][a-z]+ [A-Z][a-z]+)/,
    /My name is ([A-Z][a-z]+ [A-Z][a-z]+)/,
    /mera naam ([^ ]+ [^ ]+) hai/i,
    /اسمی ([^ ]+ [^ ]+)/,
    /Je m'appelle ([A-Z][a-z]+ [A-Z][a-z]+)/i
  ];
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      name = match[1];
      break;
    }
  }

  // Age extraction
  let age = '';
  const agePatterns = [
    /(\d+) years old/,
    /(\d+) saal ka/,
    /عمری (\d+)/,
    /age de (\d+) ans/i
  ];
  for (const pattern of agePatterns) {
    const match = text.match(pattern);
    if (match) {
      age = match[1];
      break;
    }
  }

  // Location extraction
  let location = '';
  const locationPatterns = [
    /from ([A-Z][a-z]+)/,
    /in ([A-Z][a-z]+)/,
    /([^ ]+) se hoon/i,
    /من ([^ ]+)/
  ];
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match && CITY_DATABASE.includes(match[1])) {
      location = match[1];
      break;
    }
  }
  if (!location) {
    location = CITY_DATABASE.find(city => text.includes(city)) || '';
  }

  // Skills extraction
  const skills = SKILLS_DATABASE.filter(skill => 
    new RegExp(`\\b${skill}\\b`, 'i').test(text)
  );

  // Experience extraction (Basic pattern matching)
  const experience: any[] = [];
  const expMatch = text.match(/([A-Z][a-z]+ [A-Z][a-z]+) at ([A-Z][a-z]+) for (\d+) years/i);
  if (expMatch) {
    experience.push({
      id: '1',
      role: expMatch[1],
      company: expMatch[2],
      duration: `${expMatch[3]} years`,
      description: `Worked as ${expMatch[1]} at ${expMatch[2]}.`
    });
  } else {
    // Fallback for keywords like "software engineer", "developer"
    const roles = ["Software Engineer", "Developer", "Designer", "Manager", "Analyst"];
    const role = roles.find(r => text.toLowerCase().includes(r.toLowerCase())) || "";
    if (role) {
      experience.push({
        id: '1',
        role: role,
        company: "Company Name",
        duration: "3 years",
        description: `Experienced ${role} with expertise in ${skills.slice(0, 3).join(', ')}.`
      });
    }
  }

  // Education extraction
  const education: any[] = [];
  const eduMatch = text.match(/(Bachelor|Master|Degree|Graduated) from ([A-Z][a-z]+ University)/i);
  if (eduMatch) {
    education.push({
      id: '1',
      institution: eduMatch[2],
      degree: eduMatch[1],
      field: "Computer Science", // Default or extract
      startDate: "2017",
      endDate: "2021"
    });
  }

  // Languages extraction
  const languagesList = ["English", "Urdu", "Arabic", "Hindi", "French", "Spanish", "German", "Turkish", "Chinese", "Persian"];
  const languages = languagesList.filter(lang => 
    new RegExp(`\\b${lang}\\b`, 'i').test(text)
  );
  
  // Auto-add input language if not detected
  const inputLangName = languagesList.find(l => l.toLowerCase().startsWith(inputLanguage.slice(0, 2)));
  if (inputLangName && !languages.includes(inputLangName)) {
    languages.push(inputLangName);
  }

  // Projects extraction
  const projects: any[] = [];
  const projectKeywords = ["built", "created", "developed", "made a", "project", "banaya", "أنشأت"];
  for (const keyword of projectKeywords) {
    const index = text.toLowerCase().indexOf(keyword);
    if (index !== -1) {
      const sentence = text.slice(index).split(/[.!?]/)[0];
      projects.push({
        id: Date.now().toString(),
        name: "Project",
        description: sentence,
        techStack: skills.slice(0, 2).join(', ')
      });
      break;
    }
  }

  return {
    personalInfo: {
      name: name || "Your Name",
      title: experience[0]?.role || "Professional",
      email,
      phone,
      location,
      age,
      website,
      linkedin,
      github,
    },
    summary: "", // Will be generated by cvGenerator
    experience,
    education,
    skills,
    projects,
    certifications: [],
    languages,
    inputLanguage,
  };
};
