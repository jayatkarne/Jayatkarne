import React from 'react';
import { Briefcase, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center space-x-2 font-mono text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
          <span>03.</span>
          <span className="uppercase tracking-wider">// CHRONOLOGICAL TRACE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
          Practical Industry Experience
        </h2>
      </div>

      {/* Circuit Bus Timeline */}
      <div className="relative border-l-2 border-cyan-500/30 dark:border-cyan-500/30 ml-4 sm:ml-8 space-y-12">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => {
          const isCyan = idx % 2 === 0;
          const nodeColor = isCyan
            ? 'border-cyan-400 group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.6)]'
            : 'border-emerald-400 group-hover:bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]';

          const hoverBorder = isCyan ? 'hover:border-cyan-400' : 'hover:border-emerald-400';
          const subColor = isCyan ? 'text-cyan-600 dark:text-cyan-400' : 'text-emerald-600 dark:text-emerald-400';
          const badgeBg = isCyan
            ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20'
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20';

          return (
            <div key={exp.id} className="relative pl-6 sm:pl-10 group">
              {/* PCB Solder Pad Node */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 ${nodeColor} transition-all`}
              ></div>

              <div
                className={`bg-white dark:bg-[#0e141c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm ${hoverBorder} transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                      {exp.role}
                      <span className={`text-xs font-mono font-normal px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                        {exp.company}
                      </span>
                    </h3>
                    <p className={`text-xs font-mono ${subColor} mt-0.5 font-medium`}>
                      {exp.subdomain}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto border border-slate-200 dark:border-slate-700">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
                  {exp.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx}>{point}</li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded ${
                        isCyan
                          ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
