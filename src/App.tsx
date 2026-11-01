import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeHub } from './components/ResumeHub';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';

export function App() {
  const [activeTrack, setActiveTrack] = useState<'all' | 'systems' | 'core' | 'fullstack'>('all');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Global hotkey to open terminal (Ctrl + ` or Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === 'k')) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      {/* Navigation Bar */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          activeTrack={activeTrack}
          onTrackChange={setActiveTrack}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Interactive Architecture Simulators */}
        <ArchitectureVisualizer />

        {/* 3-in-1 Resume Station */}
        <ResumeHub
          activeTrack={activeTrack}
          onTrackChange={setActiveTrack}
        />

        {/* Flagship Projects Showcase */}
        <ProjectsSection activeTrack={activeTrack} />

        {/* Skills Matrix */}
        <SkillsSection />

        {/* Trajectory & Education / Experience */}
        <ExperienceEducation />

        {/* Contact & Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
