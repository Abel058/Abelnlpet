import React, { useState } from 'react';
import { Copy, Check, X, BookOpen, Quote } from 'lucide-react';
import { Publication } from '../types';

interface BibtexModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({ publication, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!publication) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div 
      id="bibtex-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131915]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="bibtex-modal-card"
        className="bg-white rounded-lg shadow-xl border border-[#E3DCCE] w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3DCCE] bg-[#FAF7F0]">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#173C2C]" />
            <h3 className="font-serif font-bold text-[#131915] text-base">
              BibTeX Citation
            </h3>
          </div>
          <button
            id="btn-close-bibtex-modal"
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#4E5A52] hover:text-[#131915] p-1.5 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="font-serif text-sm font-semibold text-[#131915] leading-snug">
            "{publication.title}"
          </p>
          
          <div className="relative rounded bg-[#131915] p-4 font-mono text-xs text-[#DCD4C5] overflow-x-auto border border-[#4E5A52]/40">
            <pre className="whitespace-pre">{publication.bibtex}</pre>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs font-mono text-[#4E5A52]">
              Compatible with LaTeX, BibLaTeX, Zotero, and Mendeley.
            </span>
            <button
              id="btn-copy-bibtex-code"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium bg-[#173C2C] text-white hover:bg-[#102D21] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#77E2A8]" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy BibTeX</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
