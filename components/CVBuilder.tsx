'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Printer, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Moon, 
  Sun, 
  FileJson, 
  Copy, 
  Trash2,
  Settings,
  Layout,
  Type,
  Palette,
  CheckCircle2,
  AlertCircle,
  FileText,
  Share2,
  Download,
  Upload,
  ArrowLeft,
  Languages,
  Save
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Toast, ToastType } from './ui/Toast';
import { 
  saveToStorage, 
  loadFromStorage, 
  clearStorage,
  getShareUrl
} from '../lib/storage';
import { 
  createHistory, 
  pushToHistory, 
  undo, 
  redo, 
  HistoryState 
} from '../lib/undoRedo';
import { 
  exportToJson, 
  importFromJson, 
  exportToHtml, 
  copyToClipboard, 
  generatePlainText 
} from '../lib/exporters';
import { calculateATSScore } from '../lib/atsScorer';
import { LanguageCode } from '../lib/translations';
import { isRTL } from '../lib/textUtils';

interface CVBuilderProps {
  initialData: any;
  onBack: () => void;
}

export const CVBuilder: React.FC<CVBuilderProps> = ({ initialData, onBack }) => {
  const [history, setHistory] = useState<HistoryState<any>>(createHistory(initialData));
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');
  const [theme, setTheme] = useState<string>('blue');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [outputLang, setOutputLang] = useState<LanguageCode>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [atsResult, setAtsResult] = useState(calculateATSScore(initialData));
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const data = history.present;

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  // Auto-save debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToStorage(data);
      setAtsResult(calculateATSScore(data));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const handleDataChange = (newData: any) => {
    setHistory(prev => pushToHistory(prev, newData));
  };

  const handleUndo = () => setHistory(prev => undo(prev));
  const handleRedo = () => setHistory(prev => redo(prev));

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `${data.personalInfo?.name || 'CV'}_Resume`,
  });

  const handleExportJson = () => {
    exportToJson(data, `${data.personalInfo?.name || 'cv'}-data.json`);
    showToast('CV data exported successfully!', 'success');
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const importedData = await importFromJson(file);
        handleDataChange(importedData);
        setIsImportModalOpen(false);
        showToast('CV data imported successfully!', 'success');
      } catch (error) {
        showToast('Error importing file: ' + (error as Error).message, 'error');
      }
    }
  };

  const handleCopyText = async () => {
    const text = generatePlainText(data);
    await copyToClipboard(text);
    showToast('Plain text copied to clipboard!', 'success');
  };

  const handleShare = async () => {
    const url = getShareUrl(data);
    await copyToClipboard(url);
    showToast('Shareable URL copied to clipboard!', 'success');
  };

  const handleReset = () => {
    setHistory(createHistory(initialData));
    clearStorage();
    setIsResetModalOpen(false);
    showToast('All data has been reset.', 'info');
  };

  return (
    <div className={`flex h-screen flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">CV Builder</h1>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div className="h-full bg-blue-600" style={{ width: `${atsResult.score}%` }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">ATS: {atsResult.score}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-2 dark:bg-gray-700" />
          <Button variant="ghost" size="icon" onClick={handleUndo} disabled={history.past.length === 0}>
            <Undo2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleRedo} disabled={history.future.length === 0}>
            <Redo2 className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-2 dark:bg-gray-700" />
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2" onClick={handlePrint}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="primary" size="sm" className="hidden sm:flex gap-2" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Editor Panel */}
        <div className="w-full md:w-1/2 lg:w-[45%] h-full border-r border-gray-200 dark:border-gray-700">
          <Editor data={data} onChange={handleDataChange} />
        </div>

        {/* Preview Panel */}
        <div className="flex-1 h-full bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
          <Preview 
            ref={previewRef} 
            data={data} 
            template={template} 
            theme={theme} 
            fontSize={fontSize}
            lang={outputLang}
          />
          
          {/* Floating Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button variant="primary" size="icon" className="h-12 w-12 rounded-full shadow-xl" onClick={handlePrint} title="Download PDF">
              <Download className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        title="App Settings"
        footer={
          <Button variant="primary" onClick={() => setIsSettingsOpen(false)}>Done</Button>
        }
      >
        <div className="space-y-8">
          {/* Language Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
              <Languages className="h-4 w-4" />
              Output Language
            </div>
            <select 
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value as LanguageCode)}
              className="w-full h-10 rounded-lg border-2 border-gray-100 bg-white px-3 text-sm font-bold focus:border-blue-600 focus:outline-none transition-all"
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

          {/* Template Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
              <Layout className="h-4 w-4" />
              Template
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['classic', 'modern', 'minimal'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`rounded-lg border-2 p-3 text-center transition-all ${
                    template === t 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
              <Palette className="h-4 w-4" />
              Color Theme
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['blue', 'gray', 'green', 'purple'].map((c) => (
                <button
                  key={c}
                  onClick={() => setTheme(c)}
                  className={`h-10 rounded-lg border-2 transition-all ${
                    theme === c ? 'border-blue-600' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c === 'blue' ? '#2563eb' : c === 'gray' ? '#374151' : c === 'green' ? '#15803d' : '#7e22ce' }}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
              <Type className="h-4 w-4" />
              Font Size
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`rounded-lg border-2 p-2 text-center transition-all ${
                    fontSize === s 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
              <Save className="h-4 w-4" />
              Data Management
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2" onClick={handleExportJson}>
                <Download className="h-4 w-4" />
                Export JSON
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setIsImportModalOpen(true)}>
                <Upload className="h-4 w-4" />
                Import JSON
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share URL
              </Button>
              <Button variant="danger" className="gap-2" onClick={() => setIsResetModalOpen(true)}>
                <Trash2 className="h-4 w-4" />
                Reset All
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Data?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsResetModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleReset}>Yes, Reset Everything</Button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          This will permanently delete all your CV data from this browser. This action cannot be undone.
        </p>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import CV Data"
        footer={
          <Button variant="ghost" onClick={() => setIsImportModalOpen(false)}>Cancel</Button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Select a previously exported JSON file to restore your CV data.
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportJson} 
            accept=".json"
            className="hidden"
          />
          <Button variant="primary" className="w-full h-24 border-dashed border-2 bg-gray-50 text-gray-500 hover:bg-gray-100" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-8 w-8 mb-2" />
            Click to Select JSON File
          </Button>
        </div>
      </Modal>
    </div>
  );
};
