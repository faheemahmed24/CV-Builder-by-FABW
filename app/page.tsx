'use client';

import React, { useState, useEffect } from 'react';
import { InputScreen } from '../components/InputScreen';
import { CVBuilder } from '../components/CVBuilder';
import { parseParagraph } from '../lib/parser';
import { generateCVText } from '../lib/cvGenerator';
import { loadFromUrl, loadFromStorage } from '../lib/storage';
import { LanguageCode } from '../lib/translations';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export default function Home() {
  const [cvData, setCvData] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
      const data = loadFromUrl() || loadFromStorage();
      if (data) {
        setCvData(data);
      }
    }, 0);
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
    setIsBackModalOpen(true);
  };

  const confirmBack = () => {
    setCvData(null);
    setIsBackModalOpen(false);
  };

  if (!isMounted) {
    return null;
  }

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

  return (
    <>
      {!cvData ? (
        <InputScreen onBuild={handleBuild} />
      ) : (
        <CVBuilder initialData={cvData} onBack={handleBack} />
      )}

      <Modal
        isOpen={isBackModalOpen}
        onClose={() => setIsBackModalOpen(false)}
        title="Go Back?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsBackModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmBack}>Yes, Go Back</Button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to go back to the input screen? Your current CV data will be cleared from the editor.
        </p>
      </Modal>
    </>
  );
}
