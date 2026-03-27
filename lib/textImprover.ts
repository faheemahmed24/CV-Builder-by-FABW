const WEAK_VERBS_MAP: Record<string, string> = {
  'did': 'executed',
  'made': 'developed',
  'helped': 'supported',
  'worked on': 'contributed to',
  'got': 'obtained',
  'went': 'navigated',
  'thought': 'conceptualized',
  'said': 'communicated',
  'showed': 'demonstrated',
  'used': 'leveraged',
  'started': 'initiated',
  'finished': 'completed',
};

const FILLER_WORDS = ['basically', 'just', 'very', 'really', 'actually', 'literally', 'simply'];

export const improveText = (text: string): string => {
  if (!text) return '';

  let improved = text;

  // Replace weak verbs (case insensitive)
  Object.entries(WEAK_VERBS_MAP).forEach(([weak, strong]) => {
    const regex = new RegExp(`\\b${weak}\\b`, 'gi');
    improved = improved.replace(regex, (match) => {
      // Preserve capitalization
      if (match[0] === match[0].toUpperCase()) {
        return strong.charAt(0).toUpperCase() + strong.slice(1);
      }
      return strong;
    });
  });

  // Remove filler words
  FILLER_WORDS.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    improved = improved.replace(regex, '');
  });

  // Capitalize first letter of each bullet/line
  improved = improved
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      // If it's a bullet point like "- text" or "* text"
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const content = trimmed.slice(1).trim();
        if (!content) return trimmed;
        return `${trimmed[0]} ${content.charAt(0).toUpperCase() + content.slice(1)}`;
      }
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .join('\n');

  // Clean up double spaces
  improved = improved.replace(/\s\s+/g, ' ').trim();

  return improved;
};

export const checkQuantification = (text: string): boolean => {
  // Check if text contains any numbers
  return /\d+/.test(text);
};

export const getImprovementSuggestions = (text: string): string[] => {
  const suggestions: string[] = [];
  if (!text) return [];

  if (!checkQuantification(text)) {
    suggestions.push('Try adding metrics or numbers to quantify your impact (e.g., "Increased sales by 20%").');
  }

  const foundWeakVerbs = Object.keys(WEAK_VERBS_MAP).filter(v => 
    new RegExp(`\\b${v}\\b`, 'gi').test(text)
  );
  if (foundWeakVerbs.length > 0) {
    suggestions.push(`Consider replacing weak verbs like "${foundWeakVerbs.join(', ')}" with stronger action verbs.`);
  }

  const foundFillers = FILLER_WORDS.filter(w => 
    new RegExp(`\\b${w}\\b`, 'gi').test(text)
  );
  if (foundFillers.length > 0) {
    suggestions.push(`Remove filler words like "${foundFillers.join(', ')}" for more concise writing.`);
  }

  return suggestions;
};
