import React, { useState, useEffect } from 'react';
import { Cpu, Sun, Moon, Menu, X, Activity } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  clkFreq: number;
  setClkFreq: (val: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  clkFreq,
  setClkFreq,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clkHex, setClkHex] = useState('001003A0');
  const [clkCycleCount, setClkCycleCount] = useState(1048576);

  useEffect(() => {
    const interval = setInterval(() => {
      setClkCycleCount((prev) => {
        const next = prev + 16;
        setClkHex(next.toString(16).toUpperCase().padStart(8, '0'));
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { num: '01.', label: '//about', href: '#about' },
    { num: '02.', label: '//skills', href: '#skills' },
    { num: '03.', label: '//experience', href: '#experience' },
    { num: '04.', label: '//projects', href: '#projects' },
    { num: '05.', label: '//education', href: '#education' },
    { num: '06.', label: '//contact', href: '#contact' },
  ];

  const cycleFrequency = () => {
    const freqs = [50, 100, 200];
    const nextIdx = (freqs.indexOf(clkFreq) + 1) % freqs.length;
    setClkFreq(freqs[nextIdx]);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#070a0e]/85 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo: IC Chip Symbol */}
        <a href="#hero" className="group flex items-center space-x-3 font-mono">
          <div className="relative w-9 h-9 rounded-lg bg-slate-900 border border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(0,242,254,0.35)]">
            <Cpu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
              JA<span className="text-cyan-500">_RTL</span>
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                cycleFrequency();
              }}
              title="Click to toggle frequency (50/100/200MHz)"
              className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-mono tracking-widest hover:text-cyan-400 text-left cursor-pointer flex items-center gap-1"
            >
              <span>CLK={clkFreq}MHz</span>
              <Activity className="w-2.5 h-2.5 text-cyan-500 inline opacity-70" />
            </button>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all flex items-center space-x-1"
            >
              <span className="text-cyan-500 text-xs font-semibold">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Controls: Telemetry Clock, Theme Switch, Mobile Button */}
        <div className="flex items-center space-x-3">
          {/* Live Hardware Clock Badge */}
          <div
            onClick={cycleFrequency}
            title="Simulated Hardware Cycle Clock. Click to toggle frequency."
            className="hidden lg:flex items-center space-x-2 text-xs font-mono bg-cyan-950/40 dark:bg-cyan-950/50 text-cyan-400 border border-cyan-800/60 px-2.5 py-1 rounded-full cursor-pointer hover:border-cyan-500 transition-colors shadow-sm select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CLK: {clkHex}</span>
          </div>

          {/* Light/Dark Mode Switch */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-cyan-400 hover:border-cyan-500 transition-all shadow-sm cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d131a] px-4 py-3 space-y-2 font-mono text-sm animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800/60 text-xs text-cyan-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CLK={clkFreq}MHz
            </span>
            <span className="text-slate-400">HEX: {clkHex}</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-600 dark:text-slate-300 hover:text-cyan-400 flex items-center space-x-2"
            >
              <span className="text-cyan-500 text-xs">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
