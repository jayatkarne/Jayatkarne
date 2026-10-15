import React, { useState, useEffect } from 'react';
import { Github, Mail, Download, Check, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { WaveformTerminal } from './WaveformTerminal';

interface HeroProps {
  clkFreq: number;
  onInitiateHandshake: () => void;
}

export const Hero: React.FC<HeroProps> = ({ clkFreq, onInitiateHandshake }) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const roles = PORTFOLIO_DATA.profile.roles;

  useEffect(() => {
    const current = roles[roleIdx];
    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && subText === current) {
      speed = 1800;
    } else if (isDeleting && subText === '') {
      speed = 350;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && subText === current) {
        setIsDeleting(true);
      } else if (isDeleting && subText === '') {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      } else if (isDeleting) {
        setSubText(current.substring(0, subText.length - 1));
      } else {
        setSubText(current.substring(0, subText.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [subText, isDeleting, roleIdx, roles]);

  const handleDownloadResume = () => {
    setDownloading(true);
    const content = `=====================================================
JAY ATKARNE - RTL DESIGN & VERIFICATION ENGINEER
=====================================================
Email: jayatkarne@gmail.com | Phone: +91 79792896754
GitHub: https://github.com/jayatkarne
Location: Maharashtra, India

[PROFESSIONAL PROFILE]
Electronics Engineering scholar specializing in ASIC/FPGA architecture,
Verilog RTL synthesis, and UVM testbench verification. Translating
complex state machines and high-throughput pipelines into bug-free,
tapeout-ready silicon.

[EDUCATION]
* B.Tech in Electronics (E&TC) | 2025 - 2028
  BD College of Engineering, Sevagram (RTMNU)
* Diploma in Electronics & Telecommunication | 2022 - 2025
  Government Polytechnic Arvi (MSBTE Board)

[CORE DOMAINS & REGISTERS]
- VLSI & RTL: Verilog HDL, SystemVerilog, VHDL, STA Analysis, SVA
- Verification: UVM Methodology, Constrained Random, Scoreboards
- Hardware & IoT: Arduino Uno/Nano, Embedded C, Sensors, Actuators, Oscilloscopes
- Automation: Python Scripting, C++, Linux CLI, Git

[EXPERIENCE]
* VLSI Design Intern | internpe.in | 2026 - Present
  - Synthesizable RTL blocks in Verilog adhering to strict synchronous design rules.
  - Comprehensive corner-case testbenches & STA verification.
* Robotics & Embedded Systems Intern | DoxPro Robotics | 2024
  - Embedded C firmware on Arduino Uno/Nano for autonomous hazard robotics.
  - Sensor signal acquisition and motor H-bridge driver control.

[PROJECTS]
1. IoT Autonomous Firefighting Robot (Hardware Robotics)
2. RISC-V (RV32I) Core in Verilog (RTL Synthesis)
3. AXI4-Lite Peripheral UVM Testbench (UVM Verification)
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Jay_Atkarne_RTL_Engineer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloading(false);
    }, 1500);
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Intro & Typing Header */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>{PORTFOLIO_DATA.profile.timescale}</span>
            <span className="text-slate-400">•</span>
            <span>{PORTFOLIO_DATA.profile.availability}</span>
          </div>

          <div>
            <p className="font-mono text-sm text-cyan-600 dark:text-cyan-400 mb-2">
              // Hello World, I am
            </p>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
              Jay{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 dark:text-glow-cyan">
                Atkarne
              </span>
            </h1>

            <div className="h-10 mt-3 flex items-center font-mono text-lg sm:text-2xl text-slate-700 dark:text-slate-300">
              <span className="text-slate-400 dark:text-cyan-500 mr-2 font-bold">&gt;</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{subText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse"></span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Electronics Engineering scholar specializing in{' '}
            <strong className="text-slate-900 dark:text-slate-200">ASIC/FPGA architecture</strong>,{' '}
            <strong className="text-cyan-600 dark:text-cyan-400">Verilog RTL synthesis</strong>, and{' '}
            <strong className="text-emerald-500 dark:text-emerald-400">UVM testbench verification</strong>
            . Translating complex state machines and high-throughput pipelines into bug-free,
            tapeout-ready silicon.
          </p>

          {/* Core Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-sm">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>{PORTFOLIO_DATA.profile.githubUser}</span>
            </a>

            <button
              onClick={onInitiateHandshake}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-white dark:bg-[#121a24] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all hover:bg-slate-50 dark:hover:bg-[#16212e] cursor-pointer shadow-sm"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Initiate Handshake</span>
            </button>

            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm"
            >
              {downloading ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Synthesizing PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Resume.pdf</span>
                </>
              )}
            </button>
          </div>

          {/* Micro specs strip */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div>
              <div className="text-slate-400 dark:text-slate-500">HDL FOCUS</div>
              <div className="text-slate-800 dark:text-slate-200 font-medium">
                Verilog • SystemVerilog
              </div>
            </div>
            <div>
              <div className="text-slate-400 dark:text-slate-500">VERIFICATION</div>
              <div className="text-slate-800 dark:text-slate-200 font-medium">
                UVM • Assertion (SVA)
              </div>
            </div>
            <div>
              <div className="text-slate-400 dark:text-slate-500">DEGREE</div>
              <div className="text-slate-800 dark:text-slate-200 font-medium">
                {PORTFOLIO_DATA.profile.degreeInfo}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Waveform & Verilog Inspector */}
        <div className="lg:col-span-5">
          <WaveformTerminal clkFreq={clkFreq} />
        </div>
      </div>
    </section>
  );
};
