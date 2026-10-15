import React, { useState } from 'react';
import { Mail, Phone, Github, Send, Copy, Check, Sparkles, X, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export const Contact: React.FC<ContactProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'RTL Design / UVM Verification Opportunity',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      // Also open mailto link with prefilled content
      const subject = encodeURIComponent(formData.subject || 'RTL Handshake Opportunity');
      const body = encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${subject}&body=${body}`;
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 scroll-mt-20">
      <div className="bg-gradient-to-br from-slate-900 via-[#0e141c] to-[#070b10] text-white rounded-3xl p-8 sm:p-12 border border-slate-700/80 dark:border-cyan-500/20 relative overflow-hidden shadow-2xl">
        {/* Background Neon trace accent */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>READY FOR INTERVIEW / RTL OPPORTUNITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Initiate Silicon Handshake
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Whether you are expanding an RTL design cluster, staffing a verification bench for tapeout,
            or looking for an enthusiastic engineering intern who lives in HDL, my channel is active.
          </p>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
            {/* Email Card */}
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              className="p-4 rounded-xl bg-[#121924]/90 border border-slate-700/80 hover:border-cyan-400 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Mail className="w-4 h-4" />
                <span className="font-bold">EMAIL</span>
              </div>
              <span className="text-slate-200 group-hover:text-cyan-300 truncate font-sans">
                {PORTFOLIO_DATA.profile.email}
              </span>
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${PORTFOLIO_DATA.profile.phone.replace(/[^0-9+]/g, '')}`}
              className="p-4 rounded-xl bg-[#121924]/90 border border-slate-700/80 hover:border-emerald-400 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                <Phone className="w-4 h-4" />
                <span className="font-bold">PHONE</span>
              </div>
              <span className="text-slate-200 group-hover:text-emerald-300 font-sans">
                {PORTFOLIO_DATA.profile.phone}
              </span>
            </a>

            {/* GitHub Card */}
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#121924]/90 border border-slate-700/80 hover:border-purple-400 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-2 text-purple-400 mb-2">
                <Github className="w-4 h-4" />
                <span className="font-bold">GITHUB</span>
              </div>
              <span className="text-slate-200 group-hover:text-purple-300 truncate font-sans">
                {PORTFOLIO_DATA.profile.githubUser}
              </span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center font-mono text-sm">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-cyan-400 text-[#070a0e] font-bold hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Transmit Email Message</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#0c1219] text-slate-100 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl font-mono text-xs">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setFormSent(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                PACKET_TRANSMISSION // HANDSHAKE
              </span>
            </div>

            <h3 className="text-xl font-bold font-heading text-white mb-1">
              Contact Jay Atkarne
            </h3>
            <p className="text-slate-400 mb-6 font-sans text-xs">
              Direct telemetry to <span className="text-cyan-400">jayatkarne@gmail.com</span>
            </p>

            {formSent ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-xl text-center space-y-3">
                <Check className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Signal Packet Transmitted!</h4>
                <p className="text-slate-300 font-sans text-xs">
                  Your mail client is opening with prefilled transmission details. You can also reach Jay directly at{' '}
                  <span className="text-emerald-400 font-mono">+91 79792896754</span>.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormSent(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-slate-300 font-mono text-[11px] mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. ASIC Engineering Lead"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono text-[11px] mb-1">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@semiconductor.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono text-[11px] mb-1">SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono text-[11px] mb-1">MESSAGE / PROJECT BRIEF</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about RTL tapeout, FPGA prototyping, or verification needs..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Handshake Protocol</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
