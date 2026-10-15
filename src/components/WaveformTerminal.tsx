import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCw, Copy, Check, Code, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface WaveformTerminalProps {
  clkFreq: number;
}

export const WaveformTerminal: React.FC<WaveformTerminalProps> = ({ clkFreq }) => {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [cycleCount, setCycleCount] = useState(42);
  const [currentBusVal, setCurrentBusVal] = useState('0x4000_1004 (RTL_OK)');

  const busValues = [
    '0x4000_1004 (RTL_OK)',
    '0xDEAD_BEEF (WR_BURST)',
    '0xCAFE_BABE (FIFO_RD)',
    '0x5A5A_A5A5 (REG_TEST)',
    '0x0000_0020 (ISA_FETCH)',
  ];

  // Auto cycle clock waveform when running
  useEffect(() => {
    if (!isAutoRunning) return;
    const intervalTime = Math.max(300, Math.floor(1000 / (clkFreq / 25)));
    const timer = setInterval(() => {
      setWaveOffset((prev) => (prev + 20) % 80);
      setCycleCount((prev) => prev + 1);
      setCurrentBusVal((prev) => {
        const nextIdx = (busValues.indexOf(prev) + 1) % busValues.length;
        return busValues[nextIdx];
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isAutoRunning, clkFreq]);

  const handleManualCycle = () => {
    setWaveOffset((prev) => (prev + 20) % 80);
    setCycleCount((prev) => prev + 1);
    const nextIdx = (busValues.indexOf(currentBusVal) + 1) % busValues.length;
    setCurrentBusVal(busValues[nextIdx]);
  };

  const currentSnippet = PORTFOLIO_DATA.codeSnippets[activeSnippetIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Glowing edge borders */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-purple-500/30 blur-lg opacity-70"></div>

      <div className="relative rounded-2xl bg-[#090e15] border border-slate-700/80 dark:border-cyan-500/20 p-5 shadow-2xl font-mono text-xs text-slate-300">
        {/* Window Chrome Header */}
        <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400 gap-2">
          {/* Traffic lights & Tab Selectors */}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>

            {/* Snippet selector tabs */}
            <div className="flex items-center space-x-1 ml-2">
              {PORTFOLIO_DATA.codeSnippets.map((snippet, idx) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveSnippetIdx(idx)}
                  className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                    activeSnippetIdx === idx
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {snippet.filename}
                </button>
              ))}
            </div>
          </div>

          {/* SIM: PASS status diode */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>SIM: PASS</span>
            </div>
          </div>
        </div>

        {/* Interactive Waveform Visualizer */}
        <div className="mb-4 bg-[#05080c] p-3 rounded-lg border border-slate-800/80 relative overflow-hidden group">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-cyan-400 tracking-wide">// SIMULATED TIMING DIAGRAM</span>
              <span className="text-slate-500">[{clkFreq}MHz]</span>
              <span className="text-emerald-400/90 font-mono">CYCLE #{cycleCount}</span>
            </div>
            
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsAutoRunning(!isAutoRunning)}
                title={isAutoRunning ? "Pause clock generator" : "Resume clock generator"}
                className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer text-[10px]"
              >
                {isAutoRunning ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                <span>{isAutoRunning ? 'Pause' : 'Run'}</span>
              </button>
              <button
                onClick={handleManualCycle}
                className="text-slate-300 hover:text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 hover:border-cyan-500 transition-colors cursor-pointer text-[10px] flex items-center gap-1"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>Cycle CLK</span>
              </button>
            </div>
          </div>

          {/* SVG Timing Diagram */}
          <div className="overflow-x-hidden">
            <svg viewBox="0 0 400 130" className="w-full h-28 stroke-cyan-400 fill-none text-[9px] font-mono select-none">
              {/* Vertical Clock Grid Lines */}
              <line x1="80" y1="0" x2="80" y2="130" stroke="#1e293b" strokeDasharray="2,2" />
              <line x1="160" y1="0" x2="160" y2="130" stroke="#1e293b" strokeDasharray="2,2" />
              <line x1="240" y1="0" x2="240" y2="130" stroke="#1e293b" strokeDasharray="2,2" />
              <line x1="320" y1="0" x2="320" y2="130" stroke="#1e293b" strokeDasharray="2,2" />

              {/* CLK Signal */}
              <text x="5" y="24" fill="#94a3b8" stroke="none" fontWeight="bold">CLK</text>
              <g style={{ transform: `translateX(${waveOffset}px)`, transition: 'transform 0.25s linear' }}>
                <path
                  d="M -30,28 L -10,28 L -10,12 L 10,12 L 10,28 L 30,28 L 30,12 L 50,12 L 50,28 L 70,28 L 70,12 L 90,12 L 90,28 L 110,28 L 110,12 L 130,12 L 130,28 L 150,28 L 150,12 L 170,12 L 170,28 L 190,28 L 190,12 L 210,12 L 210,28 L 230,28 L 230,12 L 250,12 L 250,28 L 270,28 L 270,12 L 290,12 L 290,28 L 310,28 L 310,12 L 330,12 L 330,28 L 350,28 L 350,12 L 370,12 L 370,28 L 390,28 L 390,12 L 410,12 L 410,28 L 430,28"
                  stroke="#00f2fe"
                  strokeWidth="1.8"
                />
              </g>

              {/* RST_N Signal */}
              <text x="5" y="58" fill="#94a3b8" stroke="none" fontWeight="bold">RST_N</text>
              <path d="M 50,62 L 90,62 L 90,46 L 390,46" stroke="#f43f5e" strokeWidth="1.8" />
              <circle cx="90" cy="46" r="2.5" fill="#f43f5e" />

              {/* DATA_VALID */}
              <text x="5" y="92" fill="#94a3b8" stroke="none" fontWeight="bold">VALID</text>
              <path d="M 50,96 L 150,96 L 150,80 L 290,80 L 290,96 L 390,96" stroke="#10b981" strokeWidth="1.8" />
              <circle cx="150" cy="80" r="2.5" fill="#10b981" />

              {/* DATA_BUS [31:0] */}
              <text x="5" y="122" fill="#94a3b8" stroke="none" fontWeight="bold">BUS[31:0]</text>
              <polygon
                points="50,120 70,120 75,115 145,115 150,120 150,120 285,120 290,115 385,115 390,120"
                stroke="#f59e0b"
                strokeWidth="1.2"
                fill="rgba(245, 158, 11, 0.08)"
              />
              <text x="78" y="123" fill="#f59e0b" stroke="none" className="text-[8px]">0xDEAD_BEEF</text>
              <text x="175" y="123" fill="#f59e0b" stroke="none" className="text-[8px] font-semibold">{currentBusVal}</text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900 mt-1 font-mono">
            <span>Setup Slack: +0.48ns</span>
            <span>Hold Margin: +0.22ns</span>
            <span className="text-emerald-400">Zero Timing Violations</span>
          </div>
        </div>

        {/* Verilog Code Snippet Container */}
        <div className="relative rounded-lg bg-[#05080c]/90 border border-slate-800/90 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/60 border-b border-slate-800 text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Code className="w-3.5 h-3.5" />
              {currentSnippet.name} • {currentSnippet.language}
            </span>
            <button
              onClick={handleCopyCode}
              className="hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer text-[10px]"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="overflow-x-auto p-3 text-[11px] leading-relaxed max-h-56 select-text font-mono">
            <code>
              {currentSnippet.id === 'fifo' && (
                <>
                  <span className="code-comment">// Parameterized Synchronous FIFO Model</span>{'\n'}
                  <span className="code-keyword">module</span> <span className="code-var">sync_fifo</span> #({'\n'}
                  {'  '}<span className="code-keyword">parameter</span> <span className="code-type">DATA_W</span> = <span className="code-num">32</span>, <span className="code-type">DEPTH</span> = <span className="code-num">16</span>{'\n'}
                  )({'\n'}
                  {'  '}<span className="code-keyword">input</span>  <span className="code-type">wire</span>              clk, rst_n,{'\n'}
                  {'  '}<span className="code-keyword">input</span>  <span className="code-type">wire</span>              wr_en, rd_en,{'\n'}
                  {'  '}<span className="code-keyword">input</span>  <span className="code-type">wire</span> [DATA_W-<span className="code-num">1</span>:<span className="code-num">0</span>] wr_data,{'\n'}
                  {'  '}<span className="code-keyword">output</span> <span className="code-type">reg</span>  [DATA_W-<span className="code-num">1</span>:<span className="code-num">0</span>] rd_data,{'\n'}
                  {'  '}<span className="code-keyword">output</span> <span className="code-type">wire</span>             full, empty{'\n'}
                  );{'\n'}
                  {'  '}<span className="code-comment">// Functional RTL Architecture by Jay</span>{'\n'}
                  {'  '}<span className="code-keyword">always</span> @(<span className="code-keyword">posedge</span> clk <span className="code-keyword">or</span> <span className="code-keyword">negedge</span> rst_n) <span className="code-keyword">begin</span>{'\n'}
                  {'    '}<span className="code-keyword">if</span> (!rst_n) count &lt;= <span className="code-num">0</span>;{'\n'}
                  {'    '}<span className="code-keyword">else if</span> (wr_en &amp;&amp; !full) fifo_mem[w_ptr] &lt;= wr_data;{'\n'}
                  {'  '}<span className="code-keyword">end</span>{'\n'}
                  <span className="code-keyword">endmodule</span>
                </>
              )}
              {currentSnippet.id === 'alu' && (
                <>
                  <span className="code-comment">// Synthesizable RISC-V RV32I ALU Core</span>{'\n'}
                  <span className="code-keyword">module</span> <span className="code-var">rv32i_alu</span> ({'\n'}
                  {'  '}<span className="code-keyword">input</span>  <span className="code-type">wire</span> [31:0] a, b,{'\n'}
                  {'  '}<span className="code-keyword">input</span>  <span className="code-type">wire</span> [3:0]  alu_ctrl,{'\n'}
                  {'  '}<span className="code-keyword">output</span> <span className="code-type">reg</span>  [31:0] result,{'\n'}
                  {'  '}<span className="code-keyword">output</span> <span className="code-type">wire</span>        zero_flag{'\n'}
                  );{'\n'}
                  {'  '}<span className="code-keyword">always</span> @(*) <span className="code-keyword">begin</span>{'\n'}
                  {'    '}<span className="code-keyword">case</span> (alu_ctrl){'\n'}
                  {'      '}4'b0000: result = a + b; <span className="code-comment">// ADD</span>{'\n'}
                  {'      '}4'b1000: result = a - b; <span className="code-comment">// SUB</span>{'\n'}
                  {'      '}4'b0111: result = a &amp; b; <span className="code-comment">// AND</span>{'\n'}
                  {'      '}4'b0001: result = a &lt;&lt; b[4:0]; <span className="code-comment">// SLL</span>{'\n'}
                  {'      '}default: result = 32'h0;{'\n'}
                  {'    '}<span className="code-keyword">endcase</span>{'\n'}
                  {'  '}<span className="code-keyword">end</span>{'\n'}
                  {'  '}<span className="code-keyword">assign</span> zero_flag = (result == 32'h0);{'\n'}
                  <span className="code-keyword">endmodule</span>
                </>
              )}
              {currentSnippet.id === 'uvm' && (
                <>
                  <span className="code-comment">// UVM Sequencer Driver by Jay Atkarne</span>{'\n'}
                  <span className="code-keyword">class</span> <span className="code-var">alu_driver</span> <span className="code-keyword">extends</span> uvm_driver #(alu_seq_item);{'\n'}
                  {'  '}\`uvm_component_utils(alu_driver){'\n'}
                  {'  '}<span className="code-keyword">virtual</span> alu_if vif;{'\n'}
                  {'\n'}
                  {'  '}<span className="code-keyword">task</span> run_phase(uvm_phase phase);{'\n'}
                  {'    '}alu_seq_item item;{'\n'}
                  {'    '}<span className="code-keyword">forever</span> <span className="code-keyword">begin</span>{'\n'}
                  {'      '}seq_item_port.get_next_item(item);{'\n'}
                  {'      '}@(posedge vif.clk);{'\n'}
                  {'      '}vif.rst_n &lt;= item.rst_n;{'\n'}
                  {'      '}vif.wr_data &lt;= item.wr_data;{'\n'}
                  {'      '}<span className="code-comment">// Protocol assertion</span>{'\n'}
                  {'      '}<span className="code-keyword">assert</span> property (@(posedge vif.clk) vif.wr_en |-&gt; !vif.full);{'\n'}
                  {'      '}seq_item_port.item_done();{'\n'}
                  {'    '}<span className="code-keyword">end</span>{'\n'}
                  {'  '}<span className="code-keyword">endtask</span>{'\n'}
                  <span className="code-keyword">endclass</span>
                </>
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
