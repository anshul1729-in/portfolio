import type { FC } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, BookOpen } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE } from '../data/portfolioData';

export const ExperienceEducation: FC = () => {
  return (
    <section id="timeline" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Trajectory &amp; Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education &amp; Experience
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Academic foundation in core computer science paired with hands-on full-stack delivery and autonomous systems research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Education Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold animate-pulse">
                  Expected July 2027
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {PERSONAL_INFO.education.institution}
              </h3>
              <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                {PERSONAL_INFO.education.degree}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {PERSONAL_INFO.education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {PERSONAL_INFO.education.location}
                </span>
              </div>

              {/* Coursework */}
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Rigorous Coursework:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PERSONAL_INFO.education.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Status: Active Undergrad</span>
              <span className="text-emerald-400 font-semibold">Available for Roles</span>
            </div>
          </div>

          {/* Work Experience Card */}
          {WORK_EXPERIENCE.map((exp) => (
            <div
              key={exp.company}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono font-medium">
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {exp.company}
                </h3>
                <div className="text-sm font-semibold text-emerald-400 mt-0.5">
                  {exp.role}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

                {/* Accomplishments */}
                <ul className="space-y-2.5 mb-6">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Production Deployment</span>
                <span className="text-emerald-400">Sub-second LCP</span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
