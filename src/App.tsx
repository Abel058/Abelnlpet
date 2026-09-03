import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  ArrowDown
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PublicationsSection } from './components/PublicationsSection';
import { BibtexModal } from './components/BibtexModal';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { Publication } from './types';
import { contactInfo, bioText } from './data/portfolioData';
import { isSafeUrl } from './lib/security';

export default function App() {
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [isGhModalOpen, setIsGhModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#131915] selection:bg-[#B34728] selection:text-[#FAF7F0] font-sans">
      {/* Editorial Academic Header */}
      <Navbar onOpenGhPagesGuide={() => setIsGhModalOpen(true)} />

      {/* Main Scholarly Layout */}
      <main id="top" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Academic Background, Skills, Contact */}
          <Sidebar />

          {/* Right Column: Research Statement & Publications */}
          <div className="flex-1 w-full space-y-10 min-w-0">
            
            {/* Research Statement Card */}
            <section 
              id="about" 
              className="rounded-lg bg-white p-6 sm:p-8 border border-[#E3DCCE] shadow-xs space-y-5"
            >
              <div className="border-b border-[#E3DCCE] pb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#B34728]">
                  Research Agenda &amp; Focus
                </span>
                <span className="text-[11px] font-mono text-[#4E5A52] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#173C2C]" />
                  <span>Verified Researcher</span>
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#131915] leading-tight">
                Speech Technologies and Language Processing for Underrepresented African Languages
              </h1>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#4E5A52] leading-relaxed">
                <p>
                  {bioText.full}
                </p>
                <p>
                  My research aims to systematically dismantle the severe resource disparity confronting African languages in modern AI. By pairing acoustic parameter sharing with cross-lingual phonetic transfer, our work expands speech technologies to millions of native speakers across Ethiopia while preserving linguistic fidelity.
                </p>
              </div>

              {/* Research Thrusts (Classical academic description instead of generic big number boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded bg-[#FAF7F0] border border-[#E3DCCE]">
                  <span className="font-mono text-[11px] font-semibold text-[#173C2C] block">
                    Multilingual ASR &amp; LID
                  </span>
                  <p className="text-[11px] text-[#4E5A52] mt-1 leading-snug">
                    Joint speech modeling across Semitic, Cushitic, and Omotic branches (Amharic, Tigrinya, Oromo, Sidaama, Wolaytta).
                  </p>
                </div>
                <div className="p-3.5 rounded bg-[#FAF7F0] border border-[#E3DCCE]">
                  <span className="font-mono text-[11px] font-semibold text-[#173C2C] block">
                    Judicial Transcription
                  </span>
                  <p className="text-[11px] text-[#4E5A52] mt-1 leading-snug">
                    Deep neural acoustic models deployed for spontaneous Amharic court hearings at the Federal Supreme Court of Ethiopia.
                  </p>
                </div>
                <div className="p-3.5 rounded bg-[#FAF7F0] border border-[#E3DCCE]">
                  <span className="font-mono text-[11px] font-semibold text-[#173C2C] block">
                    Ethiopic Syllabic OCR
                  </span>
                  <p className="text-[11px] text-[#4E5A52] mt-1 leading-snug">
                    Character recognition for 340+ Ge'ez syllabic glyphs with synthetic degradation modeling for archival documents.
                  </p>
                </div>
              </div>

              {/* Direct Jump Navigation */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 font-mono text-xs">
                <a
                  href="#publications"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#173C2C] text-[#FAF7F0] hover:bg-[#102D21] transition-colors"
                >
                  <span>Recent Publications</span>
                  <ArrowDown className="w-3 h-3" />
                </a>
                {isSafeUrl(contactInfo.scholarUrl) && (
                  <a
                    href={contactInfo.scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#FAF7F0] text-[#B34728] hover:bg-[#F3EDE2] border border-[#E3DCCE] transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Google Scholar Profile</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </section>

            {/* Publications Section (User's First 3 Google Scholar papers) */}
            <PublicationsSection onOpenBibtex={(pub) => setSelectedBibtexPub(pub)} />

          </div>
        </div>
      </main>

      {/* Scholarly Footer */}
      <footer className="mt-20 border-t border-[#E3DCCE] bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#4E5A52]">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#131915] text-sm">{contactInfo.name}</span>
              <span>—</span>
              <span>Natural Language Processing Researcher</span>
            </div>

            <div className="text-xs font-mono text-[#4E5A52]">
              © 2026 {contactInfo.name}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BibtexModal 
        publication={selectedBibtexPub} 
        onClose={() => setSelectedBibtexPub(null)} 
      />
      <GitHubPagesModal 
        isOpen={isGhModalOpen} 
        onClose={() => setIsGhModalOpen(false)} 
      />
    </div>
  );
}
