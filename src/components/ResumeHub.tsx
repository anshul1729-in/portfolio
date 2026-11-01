import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { FileText, Download, ExternalLink, CheckCircle, Sparkles, Eye, UserCheck } from 'lucide-react';
import { RESUME_TRACKS, PERSONAL_INFO } from '../data/portfolioData';

interface ResumeHubProps {
  activeTrack: 'all' | 'systems' | 'core' | 'fullstack';
  onTrackChange: (track: 'all' | 'systems' | 'core' | 'fullstack') => void;
}

export const ResumeHub: FC<ResumeHubProps> = ({ activeTrack, onTrackChange }) => {
  // Default to activeTrack if it matches one of the three resumes, else default to 'systems'
  const initialTrackId = activeTrack === 'all' ? 'systems' : activeTrack;
  const [selectedResumeId, setSelectedResumeId] = useState<'systems' | 'core' | 'fullstack'>(initialTrackId);
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState<boolean>(false);

  // Sync if parent changed track
  useEffect(() => {
    if (activeTrack !== 'all') {
      setSelectedResumeId(activeTrack);
    }
  }, [activeTrack]);

  const currentResume = RESUME_TRACKS.find(r => r.id === selectedResumeId) || RESUME_TRACKS[0];

  return (
    <section id="resumes" className="py-20 relative bg-slate-950/60 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Targeted ATS-Engineered Resumes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            3-in-1 Role-Tailored Resume Station
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Select a specialized resume version aligned with your engineering team's tech stack and mission requirements.
          </p>
        </div>

        {/* Resume Selector Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
          {RESUME_TRACKS.map((track) => {
            const isSelected = track.id === selectedResumeId;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedResumeId(track.id);
                  onTrackChange(track.id);
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/70 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400" />
                )}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${track.badgeColor}`}>
                    {track.badge}
                  </span>
                  {isSelected && (
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                  )}
                </div>
                <div className="text-sm font-bold text-white mb-0.5">{track.title}</div>
                <div className="text-[11px] text-slate-400 font-mono line-clamp-1">{track.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Resume Detailed Panel */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl relative">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${currentResume.badgeColor}`}>
                  {currentResume.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">PDF File: {currentResume.fileName}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{currentResume.title}</h3>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {currentResume.summary}
              </p>
            </div>

            {/* Download & View Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={currentResume.filePath}
                download={currentResume.fileName}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>

              <a
                href={currentResume.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-mono flex items-center gap-2 transition-all hover:border-slate-600"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>Open in Tab</span>
              </a>

              <button
                onClick={() => setShowEmbeddedPdf(!showEmbeddedPdf)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs sm:text-sm font-mono flex items-center gap-2 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>{showEmbeddedPdf ? 'Hide Preview' : 'Inline Preview'}</span>
              </button>
            </div>
          </div>

          {/* Embedded PDF iframe viewer if toggled */}
          {showEmbeddedPdf && (
            <div className="my-6 rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
              <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PDF In-Browser Rendering: {currentResume.fileName}</span>
                <button
                  onClick={() => setShowEmbeddedPdf(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
              <iframe
                src={`${currentResume.filePath}#toolbar=0&navpanes=0`}
                title={currentResume.title}
                className="w-full h-[650px] border-none"
              />
            </div>
          )}

          {/* Targeted Roles Row */}
          <div className="my-6">
            <div className="text-xs font-mono text-slate-400 mb-2.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Optimized For Candidate Match:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentResume.targetRoles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs font-mono font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Core Key Highlights Breakdown */}
          <div className="my-6">
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume Core Impact Highlights:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentResume.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px] border border-cyan-500/20">
                    {idx + 1}
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Contact Footer */}
          <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
            <div>
              Education: <span className="text-slate-200">{PERSONAL_INFO.education.institution}</span> • BCA (Computer Science) • Expected <span className="text-cyan-400 font-bold">July 2027</span>
            </div>
            <div>
              Direct Contact: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 hover:underline">{PERSONAL_INFO.email}</a> • {PERSONAL_INFO.phone}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
