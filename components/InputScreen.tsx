'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Languages, Layout, Palette, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { LanguageCode } from '../lib/translations';
import { detectLanguage } from '../lib/textUtils';

interface InputScreenProps {
  onBuild: (text: string, lang: LanguageCode, template: string, theme: string) => void;
}

const PLACEHOLDERS = [
  "Tell us about yourself...",
  "اپنے بارے میں بتائیں...",
  "أخبرنا عن نفسك...",
  "Parlez-nous de vous...",
  "Cuéntanos sobre ti...",
  "Erzähl uns von dir...",
  "Kendinizden bahsedin...",
  "介绍一下你自己...",
  "درباره خودتان بگویید..."
];

const EXAMPLE_PARAGRAPH = "My name is Ahmed Khan, I am 28 years old from Karachi. I work as a React developer at TechCorp for 3 years. I graduated from FAST University in Computer Science in 2019. I know JavaScript, TypeScript, React, Node.js and MongoDB. My email is ahmed@gmail.com and phone is 0300-1234567. I also built a food delivery app and an e-commerce website.";

export const InputScreen: React.FC<InputScreenProps> = ({ onBuild }) => {
  const [text, setText] = useState('');
  const [outputLang, setOutputLang] = useState<LanguageCode>('en');
  const [template, setTemplate] = useState('classic');
  const [theme, setTheme] = useState('blue');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const detectedLang = React.useMemo(() => {
    if (text.length > 10) {
      return detectLanguage(text);
    }
    return 'en';
  }, [text]);

  const handleBuild = () => {
    if (text.trim().length < 20) {
      alert("Please provide a bit more information about yourself.");
      return;
    }
    onBuild(text, outputLang, template, theme);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 mb-4">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900">CV Builder ✨</h1>
          <p className="text-gray-500 font-medium">Type one paragraph, get a professional CV instantly.</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              className="min-h-[300px] border-none focus-visible:ring-0 text-lg p-8 leading-relaxed placeholder:text-gray-300"
            />
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Languages className="h-4 w-4" />
                Detected: <span className="text-blue-600">{detectedLang.toUpperCase()}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs font-bold uppercase tracking-wider text-gray-500 gap-2"
                onClick={() => setText(EXAMPLE_PARAGRAPH)}
              >
                <Lightbulb className="h-4 w-4" />
                See Example
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Output Language
            </label>
            <select 
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value as LanguageCode)}
              className="w-full h-12 rounded-xl border-2 border-gray-100 bg-white px-4 text-sm font-bold focus:border-blue-600 focus:outline-none transition-all"
            >
              <option value="en">English</option>
              <option value="ur">Urdu (اردو)</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="fr">French (Français)</option>
              <option value="es">Spanish (Español)</option>
              <option value="de">German (Deutsch)</option>
              <option value="tr">Turkish (Türkçe)</option>
              <option value="zh">Chinese (中文)</option>
              <option value="fa">Persian (فارسی)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['classic', 'modern', 'minimal'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`h-12 rounded-xl border-2 text-[10px] font-black uppercase tracking-wider transition-all ${
                    template === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Theme Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['blue', 'gray', 'green', 'purple'].map((c) => (
                <button
                  key={c}
                  onClick={() => setTheme(c)}
                  className={`h-12 rounded-xl border-2 transition-all ${
                    theme === c ? 'border-blue-600' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c === 'blue' ? '#2563eb' : c === 'gray' ? '#374151' : c === 'green' ? '#15803d' : '#7e22ce' }}
                />
              ))}
            </div>
          </div>
        </div>

        <Button 
          onClick={handleBuild}
          className="w-full h-16 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-blue-200 gap-4"
        >
          Build My CV ✨
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
