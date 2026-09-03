import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  MapPin, 
  Building2, 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen,
  Code2,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import { contactInfo, academicBackground, skillGroups } from '../data/portfolioData';
import { isSafeUrl } from '../lib/security';

export const Sidebar: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [skillsExpanded, setSkillsExpanded] = useState(true);
  const [academicExpanded, setAcademicExpanded] = useState(true);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <aside 
      id="portfolio-sidebar"
      aria-label="Researcher Profile and Academic Background" 
      className="w-full lg:w-80 shrink-0 space-y-6"
    >
      {/* Profile & Verified Identification Card */}
      <div 
        id="profile-card"
        className="rounded-lg bg-white p-6 border border-[#E3DCCE] shadow-xs"
      >
        {/* Name & Academic Rank */}
        <div className="border-b border-[#E3DCCE] pb-4 mb-4">
          <h1 className="font-serif text-2xl font-bold text-[#131915] tracking-tight">
            {contactInfo.name}
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B34728] mt-1 font-mono">
            {contactInfo.title}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#4E5A52]">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#173C2C]" />
            <span>{contactInfo.location}</span>
          </div>
        </div>

        {/* Institutional Affiliation */}
        <div className="rounded-md bg-[#FAF7F0] border border-[#E3DCCE] p-3 mb-5">
          <div className="flex items-start gap-2.5 text-xs">
            <Building2 className="w-4 h-4 text-[#173C2C] mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-[#131915] block">Affiliation</span>
              <p className="text-[#4E5A52] leading-relaxed mt-0.5 font-sans">
                {contactInfo.affiliation}
              </p>
            </div>
          </div>
        </div>

        {/* Verified Scholarly Profiles & Direct Contact */}
        <div id="contact-info-section" className="space-y-2">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#4E5A52]">
              Verified Channels
            </h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#173C2C]">
              <ShieldCheck className="w-3 h-3" />
              <span>TLS / Secure</span>
            </span>
          </div>

          {/* Email Channel with Safe Copy */}
          <div className="flex items-center gap-1.5">
            <a
              id="btn-send-email"
              href={`mailto:${contactInfo.email}`}
              className="flex-1 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#131915] text-xs font-mono transition-colors border border-[#E3DCCE] truncate"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-[#173C2C]" />
              <span className="truncate">{contactInfo.email}</span>
            </a>
            <button
              id="btn-copy-email"
              onClick={handleCopyEmail}
              title="Copy verified email"
              aria-label="Copy verified email"
              className="p-2 rounded-md bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#4E5A52] hover:text-[#131915] transition-colors border border-[#E3DCCE] shrink-0"
            >
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-[#173C2C]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Google Scholar Profile */}
          {isSafeUrl(contactInfo.scholarUrl) && (
            <a
              id="link-google-scholar"
              href={contactInfo.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-md bg-[#FAF7F0] hover:bg-[#EAF1ED] text-[#131915] text-xs font-medium transition-colors border border-[#E3DCCE] group"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#173C2C]" />
                <span className="group-hover:text-[#173C2C] transition-colors">Google Scholar Profile</span>
              </span>
              <ExternalLink className="w-3 h-3 text-[#4E5A52] group-hover:text-[#173C2C] transition-colors" />
            </a>
          )}

          {/* Hugging Face / EthioNLP Repository */}
          {isSafeUrl(contactInfo.huggingfaceUrl) && (
            <a
              id="link-huggingface"
              href={contactInfo.huggingfaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-md bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#131915] text-xs font-medium transition-colors border border-[#E3DCCE] group"
            >
              <span className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#B34728]" />
                <span className="group-hover:text-[#B34728] transition-colors">Hugging Face (EthioNLP)</span>
              </span>
              <ExternalLink className="w-3 h-3 text-[#4E5A52] group-hover:text-[#B34728] transition-colors" />
            </a>
          )}
        </div>
      </div>

      {/* Academic Background / Curriculum */}
      <div 
        id="academic-background-card"
        className="rounded-lg bg-white p-6 border border-[#E3DCCE] shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-[#E3DCCE] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#173C2C]" />
            <h2 className="font-serif font-bold text-[#131915] text-base tracking-tight">
              Academic Background
            </h2>
          </div>
          <button
            onClick={() => setAcademicExpanded(!academicExpanded)}
            className="text-[#4E5A52] hover:text-[#131915] p-1 rounded"
            aria-label="Toggle academic background section"
          >
            {academicExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {academicExpanded && (
          <div className="space-y-5">
            {academicBackground.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-[#173C2C]/30 pl-3.5 py-0.5">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#B34728] block">
                  {exp.period}
                </span>
                <h3 className="text-xs font-bold text-[#131915] mt-0.5 leading-snug">
                  {exp.role}
                </h3>
                <p className="text-xs font-medium text-[#4E5A52] mt-0.5">
                  {exp.institution}
                </p>
                <p className="text-[11px] text-[#4E5A52] mt-1 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Technical & Research Competencies */}
      <div 
        id="skills-card"
        className="rounded-lg bg-white p-6 border border-[#E3DCCE] shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-[#E3DCCE] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#173C2C]" />
            <h2 className="font-serif font-bold text-[#131915] text-base tracking-tight">
              Research Competencies
            </h2>
          </div>
          <button
            onClick={() => setSkillsExpanded(!skillsExpanded)}
            className="text-[#4E5A52] hover:text-[#131915] p-1 rounded"
            aria-label="Toggle skills section"
          >
            {skillsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {skillsExpanded && (
          <div className="space-y-4">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-[#173C2C] font-semibold">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="inline-block text-[11px] font-mono text-[#131915] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E3DCCE]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
