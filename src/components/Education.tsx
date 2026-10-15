import React from 'react';
import { GraduationCap, Award, BookOpen, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 font-mono text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
          <span>05.</span>
          <span className="uppercase tracking-wider">// ACADEMIC CALIBRATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
          Formal Engineering Education
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTFOLIO_DATA.education.map((edu) => {
          const isCyan = edu.accent === 'cyan';
          const badgeClass = isCyan
            ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
            : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
          const hoverBorder = isCyan ? 'hover:border-cyan-400' : 'hover:border-emerald-400';
          const titleColor = isCyan ? 'dark:text-cyan-300' : 'dark:text-emerald-300';
          const cornerHalo = isCyan ? 'bg-cyan-500/5' : 'bg-emerald-500/5';

          return (
            <div
              key={edu.id}
              className={`bg-white dark:bg-[#0e141c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-sm ${hoverBorder} transition-all`}
            >
              <div
                className={`absolute top-0 right-0 w-36 h-36 ${cornerHalo} rounded-bl-full pointer-events-none transition-transform group-hover:scale-110`}
              ></div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded border font-medium ${badgeClass}`}
                >
                  {edu.badge}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {edu.period}
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                {edu.degree}
              </h3>
              <p className={`text-sm font-semibold text-slate-700 ${titleColor} mt-1`}>
                {edu.institution}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {edu.university}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                {edu.description}
              </p>

              {/* Core Academic Competencies */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                {edu.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isCyan ? 'text-cyan-400' : 'text-emerald-400'
                      }`}
                    />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
