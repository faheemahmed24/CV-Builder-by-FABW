'use client';

import React from 'react';
import { Classic } from './Templates/Classic';
import { Modern } from './Templates/Modern';
import { Minimal } from './Templates/Minimal';
import { LanguageCode } from '../lib/translations';
import { isRTL } from '../lib/textUtils';

interface PreviewProps {
  data: any;
  template: 'classic' | 'modern' | 'minimal';
  theme: string;
  fontSize: 'small' | 'medium' | 'large';
  lang: LanguageCode;
}

export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(
  ({ data, template, theme, fontSize, lang }, ref) => {
    const rtl = isRTL(lang);

    const renderTemplate = () => {
      switch (template) {
        case 'classic':
          return <Classic data={data} theme={theme} fontSize={fontSize} rtl={rtl} />;
        case 'modern':
          return <Modern data={data} theme={theme} fontSize={fontSize} rtl={rtl} />;
        case 'minimal':
          return <Minimal data={data} theme={theme} fontSize={fontSize} rtl={rtl} />;
        default:
          return <Classic data={data} theme={theme} fontSize={fontSize} rtl={rtl} />;
      }
    };

    return (
      <div className="h-full overflow-y-auto bg-gray-100 p-8 print:p-0 print:bg-white scrollbar-thin scrollbar-thumb-gray-300">
        <div
          ref={ref}
          dir={rtl ? 'rtl' : 'ltr'}
          className={`mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-12 shadow-2xl print:m-0 print:w-full print:max-w-none print:p-0 print:shadow-none ${rtl ? 'text-right' : 'text-left'}`}
          id="cv-preview"
        >
          {renderTemplate()}
        </div>
      </div>
    );
  }
);

Preview.displayName = 'Preview';
