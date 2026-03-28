import skillsData from './data/skillsSuggestions.json';

const SKILLS_DATABASE: Record<string, string[]> = skillsData;

export const suggestSkills = (jobTitle: string): string[] => {
  if (!jobTitle) return [];

  const normalizedTitle = jobTitle.toLowerCase().trim();
  
  // Try exact match first
  for (const [title, skills] of Object.entries(SKILLS_DATABASE)) {
    if (title.toLowerCase() === normalizedTitle) {
      return skills;
    }
  }

  // Try partial match (if jobTitle contains database title or vice-versa)
  for (const [title, skills] of Object.entries(SKILLS_DATABASE)) {
    const dbTitle = title.toLowerCase();
    if (normalizedTitle.includes(dbTitle) || dbTitle.includes(normalizedTitle)) {
      return skills;
    }
  }

  // Try matching individual words
  const titleWords = normalizedTitle.split(/\s+/);
  for (const [title, skills] of Object.entries(SKILLS_DATABASE)) {
    const dbTitle = title.toLowerCase();
    if (titleWords.some(word => word.length > 3 && dbTitle.includes(word))) {
      return skills;
    }
  }

  return [];
};

export const getAllJobTitles = (): string[] => {
  return Object.keys(SKILLS_DATABASE);
};
