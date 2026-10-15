import React, { useState } from 'react';
import { Binary, Activity, Code, Radio, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { PORTFOLIO_DATA, CapabilityCategory, CapabilityItem } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeItem, setActiveItem] = useState<{
    item: CapabilityItem;
    categoryTitle: string;
    accent: string;
  } | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'binary':
        return <Binary className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'radio':
      default:
        return <Radio className="w-5 h-5" />;
    }
  };

  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return {
          iconBg: 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400',
          hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-400',
          chipText: 'dark:text-cyan-300',
          footerText: 'text-cyan-600 dark:text-cyan-400',
          modalBorder: 'border-cyan-500/40',
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400',
          hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-400',
          chipText: 'dark:text-emerald-300',
          footerText: 'text-emerald-600 dark:text-emerald-400',
          modalBorder: 'border-emerald-500/40',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-500/10 text-amber-500 dark:text-amber-400',
          hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400',
          chipText: 'dark:text-amber-300',
          footerText: 'text-amber-600 dark:text-amber-400',
          modalBorder: 'border-amber-500/40',
        };
      case 'purple':
      default:
        return {
          iconBg: 'bg-purple-500/10 text-purple-500 dark:text-purple-400',
          hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-400',
          chipText: 'dark:text-purple-300',
          footerText: 'text-purple-600 dark:text-purple-400',
          modalBorder: 'border-purple-500/40',
        };
    }
  };

  return (
    <section id="skills" className="py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 font-mono text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
          <span>02.</span>
          <span className="uppercase tracking-wider">// HARDWARE REGISTER SPECIFICATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
          Technical Registers &amp; Capabilities
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          Proficiencies structured by hardware domains—from low-level physical analog circuits up
          through digital RTL synthesizable logic and verification benches.
        </p>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.categories.map((category) => {
          const styles = getAccentStyles(category.accent);
          return (
            <div
              key={category.id}
              className={`bg-white dark:bg-[#0e141c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 ${styles.hoverBorder} transition-all box-glow-hover flex flex-col justify-between group shadow-sm`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl ${styles.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
                  {category.code}
                </p>

                {/* Chip tag chips */}
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() =>
                        setActiveItem({
                          item,
                          categoryTitle: category.title,
                          accent: category.accent,
                        })
                      }
                      title={`Click to inspect register address: ${item.regAddress}`}
                      className={`px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#151e29] text-slate-800 ${styles.chipText} border border-slate-200 dark:border-slate-700/80 hover:border-cyan-400 transition-colors cursor-pointer text-left`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Footer Status */}
              <div
                className={`mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono ${styles.footerText}`}
              >
                <span>{category.status.left}</span>
                <span>{category.status.right}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Register Inspection Modal / Drawer when an item is selected */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#0c1219] text-slate-100 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl font-mono text-xs">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-wider">REGISTER INSPECTOR // MMIO</span>
            </div>

            <h3 className="text-xl font-bold font-heading text-white mb-1">
              {activeItem.item.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">{activeItem.categoryTitle}</p>

            <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 mb-4">
              <div className="flex justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="text-slate-400">REGISTER MAP:</span>
                <span className="text-cyan-300 font-bold">{activeItem.item.regAddress}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="text-slate-400">PROFICIENCY:</span>
                <span className="text-emerald-400 font-medium">{activeItem.item.level}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="text-slate-400">TOOLCHAINS / SCOPE:</span>
                <span className="text-amber-300 font-medium">{activeItem.item.tools}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400 block mb-1">SPECIFICATION:</span>
                <p className="text-slate-200 leading-relaxed text-[11px]">
                  {activeItem.item.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveItem(null)}
              className="w-full py-2.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors font-semibold cursor-pointer"
            >
              Close Register View
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
