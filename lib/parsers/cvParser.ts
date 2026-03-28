import { SKILLS_DATABASE } from '../skillsDatabase';
import { CITY_DATABASE } from '../cityDatabase';
import { LanguageCode, detectLanguage, escapeRegExp } from '../textUtils';

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

export function parseCV(text: string): ParsedData {
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

  // Name extraction (Improved)
  let name = '';
  const namePatterns = [
    /I am ([A-Z][a-z]+ [A-Z][a-z]+)/,
    /My name is ([A-Z][a-z]+ [A-Z][a-z]+)/,
    /mera naam ([^ ]+ [^ ]+) hai/i,
    /اسمی ([^ ]+ [^ ]+)/,
    /Je m'appelle ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /^([A-Z][a-z]+ [A-Z][a-z]+)$/m // First line if it's just a name
  ];
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      name = match[1];
      break;
    }
  }
  if (!name) {
    const firstLine = text.split('\n')[0].trim();
    if (firstLine.split(' ').length <= 3 && /^[A-Z]/.test(firstLine)) {
      name = firstLine;
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
    new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i').test(text)
  );

  // Experience extraction (Improved)
  const experience: any[] = [];
  const expRegex = /([A-Z][a-z]+ [A-Z][a-z]+) at ([A-Z][a-z]+) (?:for|since) ([\d\s\w-]+)/gi;
  let match;
  while ((match = expRegex.exec(text)) !== null) {
    experience.push({
      id: Math.random().toString(36).substr(2, 9),
      role: match[1],
      company: match[2],
      duration: match[3],
      description: `Worked as ${match[1]} at ${match[2]}.`
    });
  }

  if (experience.length === 0) {
    const roles = ["Software Engineer", "Developer", "Designer", "Manager", "Analyst", "Writer", "Accountant"];
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
  const eduRegex = /(Bachelor|Master|Degree|Graduated|Diploma) (?:in|of) ([\w\s]+) from ([\w\s]+ University)/gi;
  while ((match = eduRegex.exec(text)) !== null) {
    education.push({
      id: Math.random().toString(36).substr(2, 9),
      institution: match[3],
      degree: match[1],
      field: match[2],
      startDate: "2017",
      endDate: "2021"
    });
  }

  // Languages extraction
  const languagesList = ["English", "Urdu", "Arabic", "Hindi", "French", "Spanish", "German", "Turkish", "Chinese", "Persian"];
  const languages = languagesList.filter(lang => 
    new RegExp(`\\b${escapeRegExp(lang)}\\b`, 'i').test(text)
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
    summary: "", 
    experience,
    education,
    skills,
    projects,
    certifications: [],
    languages,
    inputLanguage,
  };
}
