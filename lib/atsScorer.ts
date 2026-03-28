export interface ATSResult {
  score: number;
  suggestions: string[];
}

export const calculateATSScore = (data: any): ATSResult => {
  let score = 0;
  const suggestions: string[] = [];

  // Personal Info (15 points)
  if (data.personalInfo.name) score += 5;
  if (data.personalInfo.email) score += 5;
  if (data.personalInfo.phone) score += 5;
  
  if (!data.personalInfo.location) suggestions.push("Add your location to help recruiters find you.");
  if (!data.personalInfo.linkedin) suggestions.push("Include your LinkedIn profile for professional networking.");

  // Summary (10 points)
  if (data.summary && data.summary.length > 50) {
    score += 10;
    if (data.summary.length < 100) suggestions.push("Expand your professional summary to highlight your key achievements.");
  } else {
    suggestions.push("Write a professional summary (at least 50 characters).");
  }

  // Experience (35 points)
  if (data.experience && data.experience.length > 0) {
    score += 15;
    
    // Check for descriptions
    const hasDescriptions = data.experience.every((exp: any) => exp.description && exp.description.length > 30);
    if (hasDescriptions) {
      score += 10;
    } else {
      suggestions.push("Add detailed descriptions for each work experience.");
    }

    // Check for quantifiable results (e.g., %, $, numbers)
    const hasQuantifiable = data.experience.some((exp: any) => 
      /[\d%]|(\d+\+)|(\$\d+)/.test(exp.description)
    );
    if (hasQuantifiable) {
      score += 10;
    } else {
      suggestions.push("Include quantifiable results in your experience (e.g., 'Increased sales by 25%', 'Managed a team of 10').");
    }

    // Check for action verbs
    const actionVerbs = ['managed', 'led', 'developed', 'created', 'increased', 'reduced', 'improved', 'implemented', 'designed', 'coordinated'];
    const hasActionVerbs = data.experience.some((exp: any) => 
      actionVerbs.some(verb => exp.description.toLowerCase().includes(verb))
    );
    if (!hasActionVerbs) {
      suggestions.push("Use more strong action verbs (e.g., 'Developed', 'Managed', 'Improved') in your experience descriptions.");
    }

  } else {
    suggestions.push("Add at least one work experience to demonstrate your professional background.");
  }

  // Education (15 points)
  if (data.education && data.education.length > 0) {
    score += 15;
  } else {
    suggestions.push("Add your educational background.");
  }

  // Skills (15 points)
  if (data.skills && data.skills.length >= 8) {
    score += 15;
  } else if (data.skills && data.skills.length >= 5) {
    score += 10;
    suggestions.push("Add at least 8 relevant skills to better match job descriptions.");
  } else if (data.skills && data.skills.length > 0) {
    score += 5;
    suggestions.push("Add more relevant skills to improve your ATS ranking.");
  } else {
    suggestions.push("Add your key technical and soft skills.");
  }

  // Projects/Certifications/Languages (10 points)
  let extraPoints = 0;
  if (data.projects && data.projects.length > 0) extraPoints += 5;
  if (data.certifications && data.certifications.length > 0) extraPoints += 5;
  if (data.languages && data.languages.length > 0) extraPoints += 5;
  
  score += Math.min(extraPoints, 10);
  
  if (extraPoints === 0) {
    suggestions.push("Add projects, certifications, or languages to make your CV more competitive.");
  }

  return {
    score: Math.min(score, 100),
    suggestions
  };
};
