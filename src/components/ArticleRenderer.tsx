import React from 'react';
import { ExternalLink, FileText, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  // Split content into paragraphs or blocks
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-6 text-slate-700 font-sans leading-relaxed text-base md:text-lg">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // 1. Check for H2 heading (starts with ## )
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace(/^##\s+/, '');

          // Special case: "Key Metrics" or "Program Overview" header handling if needed
          if (headingText === 'Key Metrics') {
            return null; // The metrics grid below renders it
          }

          return (
            <div key={idx} className="pt-6 pb-2 border-b border-slate-200/80 mt-8 first:mt-0">
              <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight flex items-center gap-3">
                <span className="w-2 h-7 bg-emerald-600 rounded-full inline-block shrink-0" />
                <span>{headingText}</span>
              </h2>
            </div>
          );
        }

        // 2. Check for H3 subheading (starts with ### )
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <div key={idx} className="mt-8 mb-3 bg-emerald-50/70 border border-emerald-100/80 p-4 md:p-5 rounded-2xl border-l-4 border-l-emerald-600 shadow-xs">
              <h3 className="font-sans font-extrabold text-lg md:text-xl text-emerald-950 flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-600 shrink-0" />
                <span>{headingText}</span>
              </h3>
            </div>
          );
        }

        // 3. Check for Blockquote (starts with > )
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed.split('\n').map(l => l.replace(/^>\s*/, ''));
          const quoteTitle = quoteLines[0].replace(/\*\*/g, '');
          const quoteBody = quoteLines.slice(1).join(' ');

          return (
            <div key={idx} className="my-8 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-md">
              <div className="absolute top-4 right-6 text-emerald-500/20 pointer-events-none">
                <Quote size={80} className="transform rotate-180" />
              </div>
              <div className="relative z-10 space-y-2">
                {quoteTitle && (
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-sans">
                    {quoteTitle}
                  </div>
                )}
                <p className="text-base md:text-xl font-medium leading-relaxed italic text-emerald-50">
                  &ldquo;{quoteBody || quoteTitle}&rdquo;
                </p>
              </div>
            </div>
          );
        }

        // 4. Check for Key Metrics List
        const lines = trimmed.split('\n');
        const isStatsBlock = lines.length >= 3 && lines.every(l => l.trim().startsWith('- **') || l.trim().startsWith('• **'));
        if (isStatsBlock) {
          const stats = lines.map(line => {
            const clean = line.trim().replace(/^[-•]\s*/, '');
            const match = clean.match(/^\*\*(.*?)\*\*\s*(.*)$/);
            if (match) {
              return { value: match[1], label: match[2] };
            }
            return { value: '', label: clean };
          });

          return (
            <div key={idx} className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, sIdx) => (
                <div key={sIdx} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-1">
                  <div className="font-sans font-black text-3xl md:text-4xl text-emerald-600 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // 5. Check for Download PDF Link [Title](URL) or https://
        if (trimmed.includes('https://drive.google.com') || trimmed.startsWith('[Download')) {
          const match = trimmed.match(/\[(.*?)\]\((.*?)\)/);
          const linkUrl = match ? match[2] : 'https://drive.google.com/file/d/1Z6CD41Iehd0Xm45XShoqg9dMafs6Msna/view?usp=sharing';
          const linkText = match ? match[1] : 'Download the Pilot Programme Public Report (PDF)';

          return (
            <div key={idx} className="my-8 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/40 border border-emerald-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileText size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-lg text-slate-900">Official Programme Public Report</h4>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-snug">
                    Access the complete document covering rationale, curriculum design, learning approach, outcomes, and lessons learned.
                  </p>
                </div>
              </div>

              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md shrink-0 cursor-pointer hover:shadow-lg"
              >
                <span>{linkText}</span>
                <ExternalLink size={16} />
              </a>
            </div>
          );
        }

        // 6. Check for Bullet List (lines starting with - or •)
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const listItems = trimmed.split('\n').map(l => l.replace(/^[-•]\s*/, ''));
          return (
            <ul key={idx} className="space-y-2.5 my-4">
              {listItems.map((item, lIdx) => (
                <li key={lIdx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-1" />
                  <span className="text-slate-700 font-sans text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        // 7. Check for standalone bold titles (**Title**)
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4 && !trimmed.slice(2, -2).includes('**')) {
          const titleText = trimmed.slice(2, -2);
          return (
            <div key={idx} className="mt-6 mb-2">
              <h3 className="font-sans font-bold text-slate-900 text-lg md:text-xl flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-600 rounded-full inline-block shrink-0" />
                <span>{titleText}</span>
              </h3>
            </div>
          );
        }

        // 8. Regular Paragraph with inline bold support
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={idx} className="text-slate-700 text-base md:text-lg leading-relaxed font-sans">
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
                return (
                  <strong key={pIdx} className="font-extrabold text-slate-900">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}
