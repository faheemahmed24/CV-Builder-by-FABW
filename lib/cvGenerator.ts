import { LanguageCode, TRANSLATIONS } from './translations';
import { ACTION_VERBS } from './actionVerbs';
import { ParsedData } from './parser';

export const generateCVText = (data: ParsedData, targetLang: LanguageCode): any => {
  const trans = TRANSLATIONS[targetLang];
  const verbs = ACTION_VERBS[targetLang];
  
  // Generate professional summary
  const summary = trans.summaryTemplate
    .replace('{role}', data.personalInfo.title || "Professional")
    .replace('{years}', data.experience[0]?.duration || "3")
    .replace('{skills}', data.skills.slice(0, 3).join(', '))
    .replace('{institution}', data.education[0]?.institution || "University")
    .replace('{field}', data.education[0]?.field || "Computer Science")
    .replace('{industry}', "the industry");

  // Generate professional bullet points for experience
  const experience = data.experience.map((exp, i) => {
    const verb = verbs[i % verbs.length];
    const description = `${verb} ${exp.role} at ${exp.company} and contributed to key projects.`;
    return { ...exp, description };
  });

  // Generate professional bullet points for projects
  const projects = data.projects.map((proj, i) => {
    const verb = verbs[(i + 1) % verbs.length];
    const description = `${verb} ${proj.name} using ${proj.techStack}.`;
    return { ...proj, description };
  });

  return {
    ...data,
    summary,
    experience,
    projects,
    labels: trans
  };
};
