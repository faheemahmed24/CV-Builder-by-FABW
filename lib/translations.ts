export type LanguageCode = 'en' | 'ur' | 'ar' | 'hi' | 'fr' | 'es' | 'de' | 'tr' | 'zh' | 'fa';

export interface Translations {
  personalInfo: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
  languages: string;
  references: string;
  summaryTemplate: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    personalInfo: "Personal Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    references: "References",
    summaryTemplate: "A dedicated {role} with {years} years of experience in {skills}. Graduated from {institution} with a degree in {field}. Passionate about {industry} and committed to delivering quality results."
  },
  ur: {
    personalInfo: "ذاتی معلومات",
    summary: "پیشہ ورانہ خلاصہ",
    experience: "کام کا تجربہ",
    education: "تعلیم",
    skills: "مہارتیں",
    projects: "پروجیکٹس",
    certifications: "سرٹیفیکیشنز",
    languages: "زبانیں",
    references: "حوالہ جات",
    summaryTemplate: "ایک محنتی {role} جن کے پاس {skills} میں {years} سال کا تجربہ ہے۔ {institution} سے {field} میں ڈگری حاصل کی۔"
  },
  ar: {
    personalInfo: "المعلومات الشخصية",
    summary: "الملخص المهني",
    experience: "الخبرة العملية",
    education: "التعليم",
    skills: "المهارات",
    projects: "المشاريع",
    certifications: "الشهادات",
    languages: "اللغات",
    references: "المراجع",
    summaryTemplate: "محترف {role} يتمتع بخبرة {years} سنوات في مجال {skills}، حاصل على درجة {field} من {institution}."
  },
  hi: {
    personalInfo: "व्यक्तिगत जानकारी",
    summary: "पेशेवर सारांश",
    experience: "कार्य अनुभव",
    education: "शिक्षा",
    skills: "कौशल",
    projects: "परियोजनाएं",
    certifications: "प्रमाणन",
    languages: "भाषाएं",
    references: "संदर्भ",
    summaryTemplate: "{skills} में {years} वर्षों के अनुभव के साथ एक समर्पित {role}। {institution} से {field} में डिग्री प्राप्त की।"
  },
  fr: {
    personalInfo: "Informations Personnelles",
    summary: "Résumé Professionnel",
    experience: "Expérience Professionnelle",
    education: "Éducation",
    skills: "Compétences",
    projects: "Projets",
    certifications: "Certifications",
    languages: "Langues",
    references: "Références",
    summaryTemplate: "Un {role} dédié avec {years} ans d'expérience en {skills}. Diplômé de {institution} avec un diplôme en {field}."
  },
  es: {
    personalInfo: "Información Personal",
    summary: "Resumen Profesional",
    experience: "Experiencia Laboral",
    education: "Educación",
    skills: "Habilidades",
    projects: "Proyectos",
    certifications: "Certificaciones",
    languages: "Idiomas",
    references: "Referencias",
    summaryTemplate: "Un {role} dedicado con {years} años de experiencia en {skills}. Graduado de {institution} con un título en {field}."
  },
  de: {
    personalInfo: "Persönliche Informationen",
    summary: "Berufliche Zusammenfassung",
    experience: "Berufserfahrung",
    education: "Ausbildung",
    skills: "Fähigkeiten",
    projects: "Projekte",
    certifications: "Zertifizierungen",
    languages: "Sprachen",
    references: "Referenzen",
    summaryTemplate: "Ein engagierter {role} mit {years} Jahren Erfahrung in {skills}. Absolvent der {institution} mit einem Abschluss in {field}."
  },
  tr: {
    personalInfo: "Kişisel Bilgiler",
    summary: "Profesyonel Özet",
    experience: "İş Deneyimi",
    education: "Eğitim",
    skills: "Yetenekler",
    projects: "Projeler",
    certifications: "Sertifikalar",
    languages: "Diller",
    references: "Referanslar",
    summaryTemplate: "{skills} alanında {years} yıllık deneyime sahip, kendini işine adamış bir {role}. {institution} kurumundan {field} derecesiyle mezun oldu."
  },
  zh: {
    personalInfo: "个人信息",
    summary: "职业总结",
    experience: "工作经验",
    education: "教育背景",
    skills: "技能",
    projects: "项目",
    certifications: "证书",
    languages: "语言",
    references: "推荐人",
    summaryTemplate: "一位在 {skills} 领域拥有 {years} 年经验的资深 {role}。毕业于 {institution}，获得 {field} 学位。"
  },
  fa: {
    personalInfo: "اطلاعات شخصی",
    summary: "خلاصه حرفه‌ای",
    experience: "تجربه کاری",
    education: "تحصیلات",
    skills: "مهارت‌ها",
    projects: "پروژه‌ها",
    certifications: "گواهینامه‌ها",
    languages: "زبان‌ها",
    references: "منابع",
    summaryTemplate: "یک {role} متعهد با {years} سال تجربه در {skills}. فارغ‌التحصیل از {institution} در رشته {field}."
  }
};
