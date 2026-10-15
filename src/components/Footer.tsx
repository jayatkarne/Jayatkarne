import React from 'react';
import { Cpu, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#06090d] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-500 dark:text-slate-400">
        {/* Brand Copyright */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span>
            Designed &amp; Synthesized by{' '}
            <strong className="text-slate-800 dark:text-slate-200">{PORTFOLIO_DATA.profile.name}</strong>{' '}
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Center status */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Static Timing Clean • Power Normalized</span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center space-x-3">
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            aria-label="Email Jay Atkarne"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-cyan-400 transition-all cursor-pointer ml-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
