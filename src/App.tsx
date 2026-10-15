import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true; // Default to dark semiconductor aesthetic
    }
    return true;
  });

  const [clkFreq, setClkFreq] = useState<number>(100);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative font-sans transition-colors duration-300">
      {/* Ambient PCB Traces Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-75">
        <div className="absolute inset-0 bg-pcb-grid"></div>
        <svg
          className="absolute w-full h-full stroke-cyan-500/15 dark:stroke-cyan-400/20 fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit buses and IC routing lines */}
          <path
            d="M-50,120 L350,120 L420,190 L850,190 L920,120 L1600,120"
            strokeWidth="1.5"
            strokeDasharray="6,6"
            className="animate-pulse"
          ></path>
          <path
            d="M200,-50 L200,320 L270,390 L270,850 L200,920 L200,1400"
            strokeWidth="1.5"
            strokeDasharray="8,4"
          ></path>
          <path
            d="M1100,50 L1100,450 L1020,530 L1020,1100"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            className="animate-pulse"
          ></path>
          {/* IC Solder Pads */}
          <circle cx="350" cy="120" r="3.5" className="fill-cyan-400"></circle>
          <circle cx="420" cy="190" r="3.5" className="fill-cyan-400"></circle>
          <circle cx="850" cy="190" r="3.5" className="fill-emerald-400"></circle>
          <circle cx="270" cy="390" r="3.5" className="fill-cyan-400"></circle>
          <circle cx="1020" cy="530" r="3.5" className="fill-purple-400"></circle>
        </svg>

        {/* Top glowing semiconductor halo */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl rounded-full"></div>
      </div>

      {/* Sticky Terminal Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        clkFreq={clkFreq}
        setClkFreq={setClkFreq}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero
          clkFreq={clkFreq}
          onInitiateHandshake={() => setIsContactModalOpen(true)}
        />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact
          isModalOpen={isContactModalOpen}
          setIsModalOpen={setIsContactModalOpen}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
