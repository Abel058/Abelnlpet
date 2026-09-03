import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Quote, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check,
  Code2,
  BookmarkCheck
} from 'lucide-react';
import { Publication } from '../types';
import { publications, contactInfo } from '../data/portfolioData';
import { isSafeUrl, sanitizeSearchTerm } from '../lib/security';

interface PublicationsSectionProps {
  onOpenBibtex?: (pub: Publication) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = () => {
  const [rawSearchQuery, setRawSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [expandedBibtex, setExpandedBibtex] = useState<Record<string, boolean>>({});
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);

  // Sanitize search query to prevent script injections
  const searchQuery = useMemo(() => sanitizeSearchTerm(rawSearchQuery), [rawSearchQuery]);

  // Extract unique tags for scholarly filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, []);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        pub.title.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.authors.some(a => a.toLowerCase().includes(q)) ||
        pub.venue.toLowerCase().includes(q);

      const matchesTag = selectedTag === 'All' || pub.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBibtex = (id: string) => {
    setExpandedBibtex(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyBibtex = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopiedBibtexId(pub.id);
      setTimeout(() => setCopiedBibtexId(null), 2200);
    } catch {
      setCopiedBibtexId(pub.id);
      setTimeout(() => setCopiedBibtexId(null), 2200);
    }
  };

  return (
    <section id="publications" className="space-y-6">
      {/* Scholarly Section Header */}
      <div className="border-b border-[#E3DCCE] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#B34728] mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Google Scholar Records</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#131915]">
            Selected Publications
          </h2>
          <p className="text-xs sm:text-sm text-[#4E5A52] mt-1 max-w-2xl leading-relaxed">
            Recent contributions in Multilingual Speech Recognition (ASR), Ethiopic OCR, and African Language Processing. 
            Indexed on Google Scholar (User ID: <span className="font-mono text-[#131915] font-semibold">Flv67eoAAAAJ</span>).
          </p>
        </div>

        {isSafeUrl(contactInfo.scholarUrl) && (
          <a
            id="link-view-all-scholar"
            href={contactInfo.scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-[#173C2C] bg-[#EAF1ED] hover:bg-[#D9E7DF] border border-[#C5D9CE] transition-colors shrink-0"
          >
            <span>Full Scholar Index</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Filter and Search Controls (Clean, purposeful UI) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#4E5A52] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-publications"
            type="text"
            placeholder="Search papers by keyword, model, or language..."
            value={rawSearchQuery}
            onChange={(e) => setRawSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 text-xs rounded-md bg-white border border-[#E3DCCE] focus:outline-hidden focus:border-[#173C2C] transition-all text-[#131915] placeholder-[#4E5A52]/70 font-sans"
          />
          {rawSearchQuery && (
            <button
              onClick={() => setRawSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#4E5A52] hover:text-[#131915]"
            >
              [clear]
            </button>
          )}
        </div>

        {/* Academic Topic Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {allTags.slice(0, 5).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-2.5 py-1.5 rounded-md font-mono transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-[#173C2C] text-[#FAF7F0] font-semibold'
                  : 'bg-white hover:bg-[#F3EDE2] text-[#4E5A52] border border-[#E3DCCE]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPublications.length === 0 ? (
          <div className="p-8 text-center rounded-lg bg-white border border-[#E3DCCE]">
            <FileText className="w-8 h-8 text-[#4E5A52] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium text-[#131915]">No papers match your search criteria.</p>
            <button
              onClick={() => { setRawSearchQuery(''); setSelectedTag('All'); }}
              className="mt-2 text-xs font-mono text-[#B34728] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredPublications.map((pub, index) => {
            const isAbstractOpen = expandedAbstracts[pub.id] ?? false;
            const isBibtexOpen = expandedBibtex[pub.id] ?? false;
            const isCopied = copiedBibtexId === pub.id;

            return (
              <article
                key={pub.id}
                id={`publication-card-${pub.id}`}
                className="rounded-lg bg-white p-5 sm:p-6 border border-[#E3DCCE] hover:border-[#173C2C]/50 transition-colors shadow-xs"
              >
                {/* Numbered marker and title */}
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-[#B34728] mt-1 shrink-0">
                    [{index + 1}]
                  </span>

                  <div className="space-y-2 flex-1">
                    {/* Paper Title in Academic Style */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#131915] leading-snug">
                      {pub.title}
                    </h3>

                    {/* Authors List with Abel Mulat highlighted */}
                    <p className="text-xs text-[#4E5A52] leading-relaxed">
                      {pub.authors.map((author, aIdx) => {
                        const isAbel = author.toLowerCase().includes('abel mulat');
                        return (
                          <span key={aIdx}>
                            <span className={isAbel ? 'font-bold text-[#131915] underline decoration-[#173C2C] underline-offset-2' : ''}>
                              {author}
                            </span>
                            {aIdx < pub.authors.length - 1 ? ', ' : ''}
                          </span>
                        );
                      })}
                    </p>

                    {/* Venue, Year, and Citations */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#4E5A52]">
                      <span className="italic font-serif text-[#131915]">
                        {pub.venue}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-[#173C2C]">
                        {pub.year}
                      </span>
                      {pub.citationsCount !== undefined && pub.citationsCount > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-[11px] text-[#4E5A52]">
                            Citations: {pub.citationsCount}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Research Topic Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pub.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-[#4E5A52] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E3DCCE]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar (Classical Scholarly Text Buttons) */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                      {/* Abstract Toggle */}
                      <button
                        onClick={() => toggleAbstract(pub.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#131915] border border-[#E3DCCE] transition-colors cursor-pointer"
                      >
                        <span>[Abstract]</span>
                        {isAbstractOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {/* BibTeX Toggle */}
                      <button
                        onClick={() => toggleBibtex(pub.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#131915] border border-[#E3DCCE] transition-colors cursor-pointer"
                      >
                        <Quote className="w-3 h-3 text-[#173C2C]" />
                        <span>[BibTeX]</span>
                        {isBibtexOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {/* Google Scholar Entry */}
                      {isSafeUrl(pub.scholarUrl) && (
                        <a
                          href={pub.scholarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EAF1ED] hover:bg-[#D9E7DF] text-[#173C2C] border border-[#C5D9CE] transition-colors"
                        >
                          <span>[Google Scholar]</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}

                      {/* Code / Artifact Repository */}
                      {pub.codeUrl && isSafeUrl(pub.codeUrl) && (
                        <a
                          href={pub.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#B34728] border border-[#E3DCCE] transition-colors"
                        >
                          <Code2 className="w-3 h-3" />
                          <span>[Hugging Face / Code]</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {/* Inline Abstract Expansion (Human-readable academic editorial style) */}
                    {isAbstractOpen && (
                      <div className="mt-3 p-3.5 rounded bg-[#FAF7F0] border-l-2 border-[#173C2C] text-xs text-[#131915] leading-relaxed font-sans">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#173C2C] block mb-1">
                          Abstract
                        </span>
                        {pub.abstract}
                      </div>
                    )}

                    {/* Inline BibTeX Expansion (Direct citation block without modal disruption) */}
                    {isBibtexOpen && (
                      <div className="mt-3 p-3 rounded bg-[#131915] text-[#FAF7F0] border border-[#E3DCCE] relative">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#4E5A52]/50">
                          <span className="font-mono text-[11px] text-[#C5D9CE]">
                            BibTeX Entry
                          </span>
                          <button
                            onClick={() => handleCopyBibtex(pub)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-[#173C2C] hover:bg-[#102D21] text-white transition-colors cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[#77E2A8]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed text-[#DCD4C5]">
                          {pub.bibtex}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
