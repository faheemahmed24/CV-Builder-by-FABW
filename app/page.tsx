'use client';

import React, { useState, useEffect } from 'react';
import { InputScreen } from '../components/InputScreen';
import { CVBuilder } from '../components/CVBuilder';
import { parseParagraph } from '../lib/parser';
import { generateCVText } from '../lib/cvGenerator';
import { loadFromUrl, loadFromStorage } from '../lib/storage';
import { LanguageCode } from '../lib/translations';

export default function Home() {
  const [cvData, setCvData] = useState<any | null>(() => {
    if (typeof window !== 'undefined') {
      return loadFromUrl() || loadFromStorage();
    }
    return null;
  });
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    // No longer needed here as it's in the initializer
  }, []);

  const handleBuild = (text: string, targetLang: LanguageCode, template: string, theme: string) => {
    setIsBuilding(true);
    
    // Simulate a small delay for "building" effect
    setTimeout(() => {
      const parsed = parseParagraph(text);
      const generated = generateCVText(parsed, targetLang);
      setCvData(generated);
      setIsBuilding(false);
    }, 1500);
  };

  const handleBack = () => {
    if (confirm("Are you sure? You will go back to the input screen.")) {
      setCvData(null);
    }
  };

  if (isBuilding) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Building Your CV...</h2>
          <p className="text-gray-400 font-medium">Extracting information and generating professional text.</p>
        </div>
      </div>
    );
  }

  if (!cvData) {
    return <InputScreen onBuild={handleBuild} />;
  }

  return <CVBuilder initialData={cvData} onBack={handleBack} />;
}
