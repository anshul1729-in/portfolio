import { useState } from 'react';
import type { FC } from 'react';
import { ExternalLink, Search, Code2, Check, Copy, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  activeTrack: 'all' | 'systems' | 'core' | 'fullstack';
}

export const ProjectsSection: FC<ProjectsSectionProps> = ({ activeTrack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedArchitecture, setExpandedArchitecture] = useState<string | null>(null);
  const [copiedCloneId, setCopiedCloneId] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Proof of Work' },
    { id: 'distributed', name: 'Distributed & Consensus' },
    { id: 'systems', name: 'Linux & Systems' },
    { id: 'fullstack', name: 'Full-Stack & Web3' },
    { id: 'tools', name: 'CLI & Low-Level' },
  ];

  // Filter projects by track, category, and search query
  const filteredProjects = PROJECTS.filter((proj) => {
    // Role Track filter
    if (activeTrack !== 'all' && !proj.roleTrack.includes(activeTrack)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && !proj.categories.includes(selectedCategory as any)) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = proj.title.toLowerCase().includes(q);
      const matchDesc = proj.description.toLowerCase().includes(q);
      const matchTags = proj.tags.some(t => t.toLowerCase().includes(q));
      const matchLang = proj.language.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTags || matchLang;
    }

    return true;
  });

  const handleCopyClone = (proj: Project) => {
    const cloneCmd = `git clone ${proj.githubUrl}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopiedCloneId(proj.id);
    setTimeout(() => setCopiedCloneId(null), 2000);
  };

  const getLanguageColor = (lang: string) => {
    if (lang.includes('Go')) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    if (lang.includes('C')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    if (lang.includes('TypeScript') || lang.includes('JavaScript')) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (lang.includes('Python')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Flagship Proof-of-Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Systems built from scratch to investigate core computing boundaries, protocol lifecycles, and high availability.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, keyword, protocol..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs sm:text-sm text-slate-100 placeholder-slate-500 font-mono"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {activeTrack !== 'all' && (
            <span className="ml-auto text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
              Filtered by: {activeTrack.toUpperCase()}
            </span>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/90 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row: Language + Links */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border ${getLanguageColor(project.language)}`}>
                    {project.language}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Copy Git Clone */}
                    <button
                      onClick={() => handleCopyClone(project)}
                      className="p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1 transition-all cursor-pointer"
                      title="Copy git clone command"
                    >
                      {copiedCloneId === project.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">clone</span>
                        </>
                      )}
                    </button>

                    {/* GitHub Repo Link */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors"
                        title="View Live Platform"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  {project.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                      Featured
                    </span>
                  )}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-400/90 mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Metrics Badges */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono mb-4">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-[11px] text-slate-400 truncate">{m.label}</div>
                        <div className="text-xs font-bold text-cyan-300 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights List */}
                <ul className="space-y-2 mb-5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Architecture Snippet Accordion */}
                {project.architectureSnippet && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedArchitecture(
                        expandedArchitecture === project.id ? null : project.id
                      )}
                      className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 font-mono text-xs flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        {expandedArchitecture === project.id ? 'Hide Architecture Wire' : 'Inspect Architecture Wire'}
                      </span>
                      {expandedArchitecture === project.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {expandedArchitecture === project.id && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300/90 overflow-x-auto whitespace-pre leading-relaxed animate-in fade-in duration-200">
                        {project.architectureSnippet}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Tags */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-slate-700 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm font-mono">No projects found matching the current criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold font-mono text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
