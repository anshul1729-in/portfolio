import { useState } from 'react';
import type { FC } from 'react';
import { Terminal, ArrowRight, Download, Sparkles, Server, Cpu, Database, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  activeTrack: 'all' | 'systems' | 'core' | 'fullstack';
  onTrackChange: (track: 'all' | 'systems' | 'core' | 'fullstack') => void;
  onOpenTerminal: () => void;
}

export const Hero: FC<HeroProps> = ({ activeTrack, onTrackChange, onOpenTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern bg-radial-gradient">
      {/* Decorative ambient glow orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-60 left-1/4 w-[350px] h-[250px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Top Graduation & Availability Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs font-mono mb-6 shadow-inner backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-semibold">Open to Work / Internships</span>
            <span className="text-slate-500">•</span>
            <span>Expected Graduation: <strong className="text-slate-200">July 2027</strong></span>
          </div>

          {/* Primary Name & Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Anshul Pal</span>
            <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-300">
              I build systems from first principles.
            </span>
          </h1>

          {/* Subtitle / Philosophy */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            From <span className="text-cyan-400 font-medium">Raft distributed consensus</span> clusters and 
            <span className="text-emerald-400 font-medium"> custom Linux container runtimes</span> to 
            <span className="text-purple-400 font-medium"> algorithmic recommendation engines</span> and 
            high-throughput full-stack platforms.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-10">
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-slate-800 text-left">
              <div className="text-cyan-400 font-mono font-bold text-xl sm:text-2xl">~400ms</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Raft Leader Failover</div>
            </div>
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-slate-800 text-left">
              <div className="text-emerald-400 font-mono font-bold text-xl sm:text-2xl">50 MB</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Cgroups v2 RAM Quota</div>
            </div>
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-slate-800 text-left">
              <div className="text-purple-400 font-mono font-bold text-xl sm:text-2xl">0 Deps</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Raw Sockets &amp; Syscalls</div>
            </div>
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-slate-800 text-left">
              <div className="text-amber-400 font-mono font-bold text-xl sm:text-2xl">July 2027</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Amity BCA (CS)</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Proof of Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#resumes"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>3 Tailored Resumes</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 font-mono text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>$ ./anshul.sh</span>
            </button>

            <button
              onClick={copyEmail}
              className="px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>anshul6272@gmail.com</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Role Selector for Tailoring View */}
          <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 p-2 rounded-2xl backdrop-blur-md">
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Customize View for Recruiter / Hiring Focus:
              </span>
              <span className="text-[11px] text-slate-500">Filter projects &amp; resumes</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => onTrackChange('all')}
                className={`py-2 px-3 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer ${
                  activeTrack === 'all'
                    ? 'bg-slate-800 text-white border border-slate-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                🌟 All Work
              </button>
              <button
                onClick={() => onTrackChange('systems')}
                className={`py-2 px-3 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTrack === 'systems'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Cloud &amp; Systems</span>
              </button>
              <button
                onClick={() => onTrackChange('core')}
                className={`py-2 px-3 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTrack === 'core'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Core SWE</span>
              </button>
              <button
                onClick={() => onTrackChange('fullstack')}
                className={`py-2 px-3 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTrack === 'fullstack'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-purple-300 hover:bg-purple-500/10'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>AI &amp; Full-Stack</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
