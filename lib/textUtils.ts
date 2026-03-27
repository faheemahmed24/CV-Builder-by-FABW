export { type LanguageCode } from './translations';
import { LanguageCode } from './translations';

export const isRTL = (lang: LanguageCode): boolean => {
  return ['ur', 'ar', 'fa'].includes(lang);
};

export const detectLanguage = (text: string): LanguageCode => {
  const urduArabicPattern = /[\u0600-\u06FF]/;
  const hindiPattern = /[\u0900-\u097F]/;
  const chinesePattern = /[\u4e00-\u9fa5]/;
  
  if (urduArabicPattern.test(text)) {
    if (text.includes('ہے') || text.includes('میں')) return 'ur';
    return 'ar';
  }
  if (hindiPattern.test(text)) return 'hi';
  if (chinesePattern.test(text)) return 'zh';
  
  // Default to English for simplicity in this basic detector
  return 'en';
};

export const encodeData = (data: any): string => {
  try {
    return btoa(JSON.stringify(data));
  } catch (e) {
    console.error('Encoding error:', e);
    return '';
  }
};

export const decodeData = (hash: string): any => {
  try {
    return JSON.parse(atob(hash));
  } catch (e) {
    console.error('Decoding error:', e);
    return null;
  }
};
