export interface ATSResult {
  score: number;
  suggestions: string[];
}

export const calculateATSScore = (data: any): ATSResult => {
  let score = 0;
  const suggestions: string[] = [];

  // Personal Info (20 points)
  if (data.personalInfo.name) score += 5;
  if (data.personalInfo.email) score += 5;
  if (data.personalInfo.phone) score += 5;
  if (data.personalInfo.location) score += 5;
  else suggestions.push("Add your location to help recruiters find you.");

  // Summary (10 points)
  if (data.summary && data.summary.length > 50) score += 10;
  else suggestions.push("Write a professional summary (at least 50 characters).");

  // Experience (30 points)
  if (data.experience.length > 0) {
    score += 15;
    const hasDescriptions = data.experience.every((exp: any) => exp.description && exp.description.length > 30);
    if (hasDescriptions) score += 15;
    else suggestions.push("Add detailed descriptions for each work experience.");
  } else {
    suggestions.push("Add at least one work experience.");
  }

  // Education (15 points)
  if (data.education.length > 0) score += 15;
  else suggestions.push("Add your educational background.");

  // Skills (15 points)
  if (data.skills.length >= 5) score += 15;
  else if (data.skills.length > 0) {
    score += 10;
    suggestions.push("Add at least 5 relevant skills.");
  } else {
    suggestions.push("Add your key skills.");
  }

  // Projects/Certifications (10 points)
  if (data.projects.length > 0 || data.certifications.length > 0) score += 10;
  else suggestions.push("Add projects or certifications to stand out.");

  return {
    score: Math.min(score, 100),
    suggestions
  };
};
