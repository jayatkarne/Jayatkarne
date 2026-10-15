import React, { useState } from 'react';
import { Flame, Cpu, ShieldCheck, Github, ExternalLink, ArrowUpRight, Check } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'HARDWARE_ROBOTICS':
        return {
          icon: <Flame className="w-3.5 h-3.5" />,
          label: 'HARDWARE_ROBOTICS',
          className: 'bg-amber-500/10 text-amber-500 border border-amber-500/30',
        };
      case 'RTL_SYNTHESIS':
        return {
          icon: <Cpu className="w-3.5 h-3.5" />,
          label: 'RTL_SYNTHESIS',
          className: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
        };
      case 'UVM_TESTBENCH':
      default:
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          label: 'UVM_TESTBENCH',
          className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
        };
    }
  };

  const getHoverBorder = (category: string) => {
    switch (category) {
      case 'HARDWARE_ROBOTICS':
        return 'hover:border-amber-400 dark:hover:border-amber-400';
      case 'RTL_SYNTHESIS':
        return 'hover:border-cyan-400 dark:hover:border-cyan-400';
      case 'UVM_TESTBENCH':
      default:
        return 'hover:border-emerald-400 dark:hover:border-emerald-400';
    }
  };

  const getCheckColor = (category: string) => {
    switch (category) {
      case 'HARDWARE_ROBOTICS':
        return 'text-amber-400';
      case 'RTL_SYNTHESIS':
        return 'text-cyan-400';
      case 'UVM_TESTBENCH':
      default:
        return 'text-emerald-400';
    }
  };

  return (
    <section id="projects" className="py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 font-mono text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
            <span>04.</span>
            <span className="uppercase tracking-wider">// HARDWARE TAPE-OUTS &amp; BUILDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Featured Engineering Projects
          </h2>
        </div>

        <a
          href={PORTFOLIO_DATA.profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-cyan-500 hover:text-cyan-400 flex items-center space-x-1 group self-start sm:self-auto cursor-pointer"
        >
          <span>// View All Repositories</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.projects.map((project) => {
          const badge = getCategoryBadge(project.category);
          const hoverBorder = getHoverBorder(project.category);
          const checkColor = getCheckColor(project.category);

          return (
            <div
              key={project.id}
              className={`bg-white dark:bg-[#0e141c] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm ${hoverBorder} transition-all flex flex-col justify-between group box-glow-hover`}
            >
              <div className="p-6">
                {/* Header IC Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded flex items-center gap-1.5 font-medium ${badge.className}`}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub Repository for ${project.title}`}
                    className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                <h3
                  onClick={() => setSelectedProject(project)}
                  className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Checklist */}
                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${checkColor} shrink-0`} />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-[#080d13] border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-300">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tag}>
                      {tag}
                      {tIdx < project.tags.length - 1 && <span className="mx-1">•</span>}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-cyan-500 hover:text-cyan-400 text-xs font-mono font-semibold flex items-center gap-1 cursor-pointer ml-2"
                >
                  <span>Src</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Architectural Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
