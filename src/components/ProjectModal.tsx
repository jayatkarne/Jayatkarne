import React from 'react';
import { X, ExternalLink, Github, Check, Cpu, ShieldAlert, Activity } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0c1219] text-slate-100 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl font-mono text-xs max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>{project.categoryLabel}</span>
        </div>

        <h3 className="text-2xl font-bold font-heading text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Specifications Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 mb-6">
          <div>
            <div className="text-slate-500 text-[10px] uppercase">Target Hardware / RTL</div>
            <div className="text-slate-200 font-semibold mt-0.5">{project.specs.target}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] uppercase">Frequency / Throughput</div>
            <div className="text-cyan-400 font-semibold mt-0.5">{project.specs.throughputOrClock}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] uppercase">Coverage / Sensor Specs</div>
            <div className="text-emerald-400 font-semibold mt-0.5">{project.specs.coverageOrSensors}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] uppercase">Verification Status</div>
            <div className="text-amber-300 font-semibold mt-0.5">{project.specs.verificationStatus}</div>
          </div>
        </div>

        {/* Architecture Details */}
        <div className="space-y-2 mb-6">
          <div className="text-cyan-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            // ARCHITECTURAL IMPLEMENTATION
          </div>
          <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed bg-[#111722] p-4 rounded-xl border border-slate-800">
            {project.architecturalOverview}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          <div className="text-slate-400 text-[11px] uppercase tracking-wider">// VALIDATION CHECKLIST</div>
          <div className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
