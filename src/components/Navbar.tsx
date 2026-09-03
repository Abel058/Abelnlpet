import React from 'react';
import { 
  BookOpen, 
  Github, 
  ExternalLink,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { contactInfo } from '../data/portfolioData';
import { isSafeUrl } from '../lib/security';

interface NavbarProps {
  onOpenGhPagesGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGhPagesGuide }) => {
  return (
    <header 
      id="main-navbar"
      className="sticky top-0 z-40 w-full border-b border-[#E3DCCE] bg-[#FAF7F0]/95 backdrop-blur-xs transition-all"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Name and Discipline in scholarly typography */}
        <a 
          href="#top" 
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#173C2C] rounded-md py-1 pr-1"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#131915] group-hover:text-[#173C2C] transition-colors">
            {contactInfo.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#F3EDE2] text-[#173C2C] border border-[#E3DCCE] group-hover:bg-[#173C2C] group-hover:text-[#FAF7F0] group-hover:border-[#173C2C] transition-all duration-200 shadow-xs cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B6344] group-hover:bg-[#4ADE80] transition-colors animate-pulse" />
            <span>NLP &amp; Speech Researcher</span>
          </span>
        </a>

        {/* Semantic Navigation Links with identical pill badge styling and hover effects */}
        <nav aria-label="Page navigation" className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono font-medium">
          <a 
            href="#about" 
            className="group inline-flex items-center px-3 py-1 sm:py-1.5 rounded-full bg-[#F3EDE2] text-[#173C2C] border border-[#E3DCCE] hover:bg-[#173C2C] hover:text-[#FAF7F0] hover:border-[#173C2C] transition-all duration-200 shadow-xs cursor-pointer"
          >
            <span>Research</span>
          </a>
          <a 
            href="#publications" 
            className="group inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-[#F3EDE2] text-[#173C2C] border border-[#E3DCCE] hover:bg-[#173C2C] hover:text-[#FAF7F0] hover:border-[#173C2C] transition-all duration-200 shadow-xs cursor-pointer"
          >
            <span>Publications</span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold bg-[#173C2C] text-[#FAF7F0] group-hover:bg-[#FAF7F0] group-hover:text-[#173C2C] px-1.5 py-0.2 rounded-full transition-colors duration-200">
              3
            </span>
          </a>
          <a 
            href="#academic-background-card" 
            className="group inline-flex items-center px-3 py-1 sm:py-1.5 rounded-full bg-[#F3EDE2] text-[#173C2C] border border-[#E3DCCE] hover:bg-[#173C2C] hover:text-[#FAF7F0] hover:border-[#173C2C] transition-all duration-200 shadow-xs cursor-pointer"
          >
            <span>CV</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* GitHub Pages Deploy Guide */}
          <button
            id="btn-nav-gh-pages-guide"
            onClick={onOpenGhPagesGuide}
            className="group inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full text-xs font-mono font-medium text-[#173C2C] bg-[#F3EDE2] hover:bg-[#173C2C] hover:text-[#FAF7F0] border border-[#E3DCCE] hover:border-[#173C2C] transition-all duration-200 shadow-xs cursor-pointer"
            title="Deployment steps for GitHub Pages"
          >
            <Github className="w-3.5 h-3.5 text-[#173C2C] group-hover:text-[#FAF7F0] transition-colors" />
            <span className="hidden sm:inline">GitHub Pages</span>
          </button>

          {/* Direct Scholar Link (Secured with noopener noreferrer) */}
          {isSafeUrl(contactInfo.scholarUrl) && (
            <a
              id="btn-nav-scholar"
              href={contactInfo.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-mono font-medium text-[#FAF7F0] bg-[#173C2C] hover:bg-[#102D21] border border-[#173C2C] transition-all duration-200 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Scholar</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
