import type { FC } from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: FC<FooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-cyan-400">
              AP
            </div>
            <div>
              <div className="font-bold text-slate-100 font-mono text-sm">
                Anshul Pal
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Systems &amp; Full-Stack Software Engineer • July '27
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <span>•</span>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Simulators</a>
            <span>•</span>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <span>•</span>
            <a href="#resumes" className="hover:text-cyan-400 transition-colors">3-in-1 Resumes</a>
            <span>•</span>
            <a href="#timeline" className="hover:text-cyan-400 transition-colors">Timeline</a>
            <span>•</span>
            <button
              onClick={onOpenTerminal}
              className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Mode</span>
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Anshul Pal. All systems operational.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-slate-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
