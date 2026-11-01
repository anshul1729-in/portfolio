import type { FC } from 'react';
import { Terminal, Cpu, Network, Code2, Layers, Server } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Network': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Code': return <Code2 className="w-5 h-5 text-purple-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Server': return <Server className="w-5 h-5 text-blue-400" />;
      default: return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Mastery':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Advanced':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Mastery Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core CS &amp; Systems Competencies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every skill is backed by first-principles implementations — verified in production code and raw kernel syscalls.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="glass-card rounded-2xl p-6 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{category.description}</p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-2.5 mt-5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-750 transition-all flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-medium text-slate-200">
                          {skill.name}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${getLevelBadge(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      {skill.context && (
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <span className="text-slate-600">↳</span>
                          <span>{skill.context}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>{category.skills.length} competencies</span>
                <span className="text-cyan-400/80">Production tested</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
