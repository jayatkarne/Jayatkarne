import React, { useState } from 'react';
import { Target, Zap, Cpu, Sparkles, Layers, Info } from 'lucide-react';
import { PORTFOLIO_DATA, FloorplanModule } from '../data/portfolioData';

export const About: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<FloorplanModule | null>(null);

  return (
    <section id="about" className="py-16 scroll-mt-20">
      {/* Timing Diagram Barrier */}
      <div className="relative py-6 mb-12 overflow-hidden">
        <div className="flex items-center space-x-4 text-xs font-mono text-cyan-600/70 dark:text-cyan-400/50">
          <span className="shrink-0 tracking-wider font-semibold">// TIMING_BARRIER_CLK_DOMAIN_CROSSING</span>
          <div className="w-full flex items-center">
            <svg
              className="w-full h-8 stroke-cyan-500 dark:stroke-cyan-400 fill-none opacity-40"
              preserveAspectRatio="none"
              viewBox="0 0 1000 30"
            >
              <path
                d="M0,25 L100,25 L100,5 L200,5 L200,25 L300,25 L300,5 L400,5 L400,25 L500,25 L500,5 L600,5 L600,25 L700,25 L700,5 L800,5 L800,25 L900,25 L900,5 L1000,5"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <span className="shrink-0 text-slate-500 dark:text-slate-400">T_hold = 0.24ns</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 font-mono text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
          <span>01.</span>
          <span className="uppercase tracking-wider">// ARCHITECTURAL OVERVIEW</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
          About The Engineer
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Narrative Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0e141c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            I am <strong className="text-slate-900 dark:text-white font-semibold">Jay Atkarne</strong>, an
            Electronics &amp; Telecommunication Engineering student obsessed with what happens beneath
            the silicon surface. My engineering journey bridges low-level physical microelectronics with
            digital RTL design and formal verification.
          </p>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            With foundational roots from my{' '}
            <strong className="text-cyan-600 dark:text-cyan-400 font-medium">
              Diploma in E&amp;TC at Govt Polytechnic Arvi
            </strong>{' '}
            and ongoing depth in my{' '}
            <strong className="text-cyan-600 dark:text-cyan-400 font-medium">
              B.Tech at BD College of Engineering, Sevagram (RTMNU)
            </strong>
            , I don’t just write code—I visualize gate synthesis, clock domain crossings (CDC), and
            setup/hold timing slacks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 font-heading">
                  Career Objective
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Verification Design Engineer: delivering reliable RTL IPs through UVM testbenches
                  and rigorous STA.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 font-heading">
                  Engineering Philosophy
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  "Verification is not just finding bugs; it is mathematically proving architectural intent."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Silicon Specification Sheet */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#070b10] text-slate-200 border border-slate-700/80 dark:border-cyan-500/20 rounded-2xl p-6 font-mono text-xs space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              DIE_SPEC_SHEET.TXT
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
              {PORTFOLIO_DATA.dieSpec.revision}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">DESIGNER:</span>
              <span className="text-slate-100 font-bold">{PORTFOLIO_DATA.dieSpec.designer}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">SPECIALIZATION:</span>
              <span className="text-emerald-400 font-medium">
                {PORTFOLIO_DATA.dieSpec.specialization}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">CURRENT_INSTITUTE:</span>
              <span className="text-slate-100">{PORTFOLIO_DATA.dieSpec.currentInstitute}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">LOCATION:</span>
              <span className="text-slate-100">{PORTFOLIO_DATA.dieSpec.location}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">CORE_INTERFACES:</span>
              <span className="text-cyan-400">{PORTFOLIO_DATA.dieSpec.coreInterfaces}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">SIMULATION_TOOLS:</span>
              <span className="text-slate-100">{PORTFOLIO_DATA.dieSpec.simulationTools}</span>
            </div>
          </div>

          {/* Interactive Silicon Die Floorplan Representation */}
          <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 text-[10px] text-slate-400">
              <span className="uppercase tracking-wider flex items-center gap-1 text-cyan-400">
                <Layers className="w-3 h-3" />
                Silicon Floorplan (Click Block)
              </span>
              <span className="text-emerald-400">{PORTFOLIO_DATA.dieSpec.timingSlack}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] text-cyan-300">
              {PORTFOLIO_DATA.floorplanModules.map((mod) => {
                const isSelected = selectedModule?.id === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(isSelected ? null : mod)}
                    className={`p-2 border rounded transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                        : 'border-dashed border-cyan-500/40 bg-cyan-950/30 hover:border-cyan-400 hover:bg-cyan-900/40'
                    }`}
                  >
                    <div className="font-bold text-[10px]">{mod.label}</div>
                    <div className="text-[8px] text-slate-400 mt-0.5 truncate">{mod.cellCount}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Module Detail Panel */}
            {selectedModule ? (
              <div className="mt-3 p-2.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-left text-[10px] space-y-1 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-cyan-300 font-bold">
                  <span>{selectedModule.name} Specs:</span>
                  <span className="text-emerald-400">WNS: {selectedModule.wns}</span>
                </div>
                <div className="text-slate-300 leading-relaxed">{selectedModule.description}</div>
                <div className="flex justify-between text-slate-400 text-[9px] pt-1 border-t border-cyan-900/50">
                  <span>Dynamic Power: {selectedModule.dynamicPower}</span>
                  <span>Freq: {selectedModule.clockFreq}</span>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-[10px] text-slate-400">
                Floorplan Utilization: {PORTFOLIO_DATA.dieSpec.floorplanUtilization} | Zero Negative Slack
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
