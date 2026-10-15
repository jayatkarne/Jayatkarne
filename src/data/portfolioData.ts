export interface CodeSnippet {
  id: string;
  name: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}

export interface FloorplanModule {
  id: string;
  name: string;
  label: string;
  cellCount: string;
  dynamicPower: string;
  clockFreq: string;
  wns: string; // Worst Negative Slack
  tns: string; // Total Negative Slack
  description: string;
}

export interface CapabilityItem {
  name: string;
  regAddress: string;
  level: string;
  tools: string;
  description: string;
}

export interface CapabilityCategory {
  id: string;
  title: string;
  code: string;
  icon: string;
  accent: 'cyan' | 'emerald' | 'amber' | 'purple';
  status: {
    left: string;
    right: string;
  };
  items: CapabilityItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  subdomain: string;
  period: string;
  active: boolean;
  bulletPoints: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'HARDWARE_ROBOTICS' | 'RTL_SYNTHESIS' | 'UVM_TESTBENCH';
  categoryLabel: string;
  accentColor: 'cyan' | 'emerald' | 'amber';
  icon: string;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl: string;
  specs: {
    target: string;
    throughputOrClock: string;
    coverageOrSensors: string;
    verificationStatus: string;
  };
  architecturalOverview: string;
}

export interface EducationItem {
  id: string;
  badge: string;
  period: string;
  degree: string;
  institution: string;
  university: string;
  accent: 'cyan' | 'emerald';
  description: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Jay Atkarne',
    title: 'RTL Design & Verification Engineer',
    roles: [
      'RTL Design Engineer',
      'Verification Engineer',
      'VLSI Enthusiast',
      'SystemVerilog / UVM Practitioner',
      'ASIC / FPGA Architect',
    ],
    timescale: '`timescale 1ns / 1ps',
    availability: 'AVAILABLE FOR RTL & UVM ROLES',
    summary:
      'Electronics Engineering scholar specializing in ASIC/FPGA architecture, Verilog RTL synthesis, and UVM testbench verification. Translating complex state machines and high-throughput pipelines into bug-free, tapeout-ready silicon.',
    email: 'jayatkarne@gmail.com',
    phone: '+91 79792896754',
    github: 'https://github.com/jayatkarne',
    githubUser: 'github/jayatkarne',
    linkedin: 'https://linkedin.com/in/',
    location: 'Maharashtra, India',
    degreeInfo: 'B.Tech E&TC (2025-28)',
  },
  dieSpec: {
    designer: 'Jay Atkarne',
    specialization: 'RTL Design & UVM Verification',
    currentInstitute: 'BDCE Sevagram (RTMNU)',
    location: 'Maharashtra, India',
    coreInterfaces: 'SPI, I2C, UART, AXI-Lite',
    simulationTools: 'ModelSim, EDA Playground, Vivado',
    revision: 'REV 2.4',
    floorplanUtilization: '84.7%',
    timingSlack: 'Zero Negative Slack (Clean STA)',
  },
  floorplanModules: [
    {
      id: 'riscv_alu',
      name: 'RISC-V ALU',
      label: 'RISC-V ALU',
      cellCount: '4,820 Gates',
      dynamicPower: '1.42 mW',
      clockFreq: '100 MHz (Target 200MHz)',
      wns: '+0.42 ns (PASS)',
      tns: '0.00 ns',
      description: '32-bit synthesizable arithmetic & logic execution stage with barrel shifter and single-cycle signed/unsigned comparison.',
    },
    {
      id: 'fsm_ctrl',
      name: 'FSM CTRL',
      label: 'FSM CTRL',
      cellCount: '1,280 Gates',
      dynamicPower: '0.65 mW',
      clockFreq: '100 MHz',
      wns: '+0.88 ns (PASS)',
      tns: '0.00 ns',
      description: 'Synchronous Mealy/Moore control unit handling instruction decode micro-sequencing with one-hot encoded state registers.',
    },
    {
      id: 'fifo_mem',
      name: 'FIFO 16x32',
      label: 'FIFO 16x32',
      cellCount: '3,110 Gates',
      dynamicPower: '2.18 mW',
      clockFreq: '100 MHz',
      wns: '+0.54 ns (PASS)',
      tns: '0.00 ns',
      description: 'Dual-port parameterized circular queue buffer with Gray code read/write pointer synchronization for clock domain safety.',
    },
    {
      id: 'sta_engine',
      name: 'STA ENGIN',
      label: 'STA ENGIN',
      cellCount: '2,940 Gates',
      dynamicPower: '1.05 mW',
      clockFreq: '100 MHz',
      wns: '+0.38 ns (PASS)',
      tns: '0.00 ns',
      description: 'Hardware monitor checking setup/hold margins, clock jitter tolerance, and boundary signal skew across voltage-temperature corners.',
    },
  ] as FloorplanModule[],
  codeSnippets: [
    {
      id: 'fifo',
      name: 'sync_fifo.v',
      filename: 'sync_fifo.v',
      language: 'Verilog HDL',
      description: 'Parameterized Synchronous FIFO RTL with empty/full status flags.',
      code: `// Parameterized Synchronous FIFO Model
module sync_fifo #(
  parameter DATA_W = 32, DEPTH = 16
)(
  input  wire              clk, rst_n,
  input  wire              wr_en, rd_en,
  input  wire [DATA_W-1:0] wr_data,
  output reg  [DATA_W-1:0] rd_data,
  output wire             full, empty
);
  reg [DATA_W-1:0] fifo_mem [0:DEPTH-1];
  reg [$clog2(DEPTH)-1:0] w_ptr, r_ptr;
  reg [$clog2(DEPTH):0]   count;

  assign full  = (count == DEPTH);
  assign empty = (count == 0);

  // Functional RTL Architecture by Jay
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      w_ptr   <= 0;
      r_ptr   <= 0;
      count   <= 0;
      rd_data <= 0;
    end else begin
      if (wr_en && !full) begin
        fifo_mem[w_ptr] <= wr_data;
        w_ptr <= w_ptr + 1'b1;
      end
      if (rd_en && !empty) begin
        rd_data <= fifo_mem[r_ptr];
        r_ptr <= r_ptr + 1'b1;
      end
      // Count update logic
      case ({wr_en && !full, rd_en && !empty})
        2'b10: count <= count + 1'b1;
        2'b01: count <= count - 1'b1;
        default: count <= count;
      endcase
    end
  end
endmodule`,
    },
    {
      id: 'alu',
      name: 'rv32i_alu.v',
      filename: 'rv32i_alu.v',
      language: 'Verilog HDL',
      description: 'Single-cycle 32-bit RV32I Arithmetic & Logic Unit.',
      code: `// Synthesizable RISC-V RV32I ALU Core
module rv32i_alu (
  input  wire [31:0] a, b,
  input  wire [3:0]  alu_ctrl,
  output reg  [31:0] result,
  output wire        zero_flag
);
  always @(*) begin
    case (alu_ctrl)
      4'b0000: result = a + b;           // ADD
      4'b1000: result = a - b;           // SUB
      4'b0100: result = a ^ b;           // XOR
      4'b0110: result = a | b;           // OR
      4'b0111: result = a & b;           // AND
      4'b0001: result = a << b[4:0];     // SLL
      4'b0101: result = a >> b[4:0];     // SRL
      4'b1101: result = $signed(a) >>> b[4:0]; // SRA
      4'b0010: result = ($signed(a) < $signed(b)) ? 32'd1 : 32'd0; // SLT
      4'b0011: result = (a < b) ? 32'd1 : 32'd0;                   // SLTU
      default: result = 32'h0000_0000;
    endcase
  end
  assign zero_flag = (result == 32'h0);
endmodule`,
    },
    {
      id: 'uvm',
      name: 'alu_sequencer_tb.v',
      filename: 'alu_sequencer_tb.v',
      language: 'SystemVerilog / UVM',
      description: 'Constrained random stimulus generator and assertion checker.',
      code: `// UVM Sequencer & Scoreboard Driver
class alu_driver extends uvm_driver #(alu_seq_item);
  \`uvm_component_utils(alu_driver)
  virtual alu_if vif;

  task run_phase(uvm_phase phase);
    alu_seq_item item;
    forever begin
      seq_item_port.get_next_item(item);
      @(posedge vif.clk);
      vif.rst_n    <= item.rst_n;
      vif.wr_en    <= item.wr_en;
      vif.wr_data  <= item.wr_data;
      // Assert protocol handshake timing
      assert property (@(posedge vif.clk) vif.wr_en |-> !vif.full)
        else \`uvm_error("DRV_OVRFLW", "Write attempted into FULL buffer");
      seq_item_port.item_done();
    end
  endtask
endclass`,
    },
  ] as CodeSnippet[],
  categories: [
    {
      id: 'vlsi_digital',
      title: 'VLSI & Digital Design',
      code: 'CORE_DOMAIN_01',
      icon: 'binary',
      accent: 'cyan',
      status: {
        left: 'Synthesis: High',
        right: 'Timing: Validated',
      },
      items: [
        { name: 'RTL Design', regAddress: '0x00_RTL_DSGN', level: 'Advanced', tools: 'Verilog, ModelSim', description: 'Synchronous digital logic modeling and datapath design.' },
        { name: 'Verilog HDL', regAddress: '0x04_VLOG_HDL', level: 'Advanced', tools: 'EDA Playground, Vivado', description: 'Synthesizable hardware description for state machines and pipes.' },
        { name: 'VHDL', regAddress: '0x08_VHDL_DESC', level: 'Proficient', tools: 'GHDL, ModelSim', description: 'Strongly typed hardware architectural modeling.' },
        { name: 'UVM Verification', regAddress: '0x0C_UVM_BENCH', level: 'Specialized', tools: 'SystemVerilog, SVA', description: 'Object-oriented testbenches, drivers, monitors, and scoreboards.' },
        { name: 'STA Analysis', regAddress: '0x10_STA_CHECK', level: 'Proficient', tools: 'Timing Analyzer, SDC', description: 'Setup, hold, skew, and clock domain crossing verification.' },
        { name: 'Digital Systems', regAddress: '0x14_DIG_SYST', level: 'Advanced', tools: 'Boolean, Karnaugh, FSM', description: 'Micro-architectures, ALU execution blocks, and memory controllers.' },
      ],
    },
    {
      id: 'electronics_analog',
      title: 'Electronics & Hardware',
      code: 'PHYS_ANALOG_02',
      icon: 'activity',
      accent: 'emerald',
      status: {
        left: 'Signal: Clean',
        right: 'Noise Margin: >1.8V',
      },
      items: [
        { name: 'EDC', regAddress: '0x20_EDC_PHYS', level: 'Advanced', tools: 'Semiconductor Physics', description: 'Electronic devices & semiconductor bandgap physics.' },
        { name: 'Basic Electronics', regAddress: '0x24_BASIC_ELEC', level: 'Advanced', tools: 'Diodes, Rectifiers', description: 'Passive and active circuit components and transient dynamics.' },
        { name: 'Digital Electronics', regAddress: '0x28_DIGI_ELEC', level: 'Advanced', tools: 'Logic ICs, MUX/DEMUX', description: 'Transistor-transistor logic and CMOS logic topologies.' },
        { name: 'Power Electronics', regAddress: '0x2C_PWR_ELEC', level: 'Proficient', tools: 'SMPS, Converters', description: 'Buck/boost switching stages, thermal dissipation, and regulators.' },
        { name: 'MOSFET / BJT', regAddress: '0x30_XSTR_BIAS', level: 'Advanced', tools: 'Biasing, Small Signal', description: 'Cutoff, saturation, triode characteristics and amplifier design.' },
        { name: 'Schematic Capture', regAddress: '0x34_SCHEM_CAD', level: 'Proficient', tools: 'Proteus, KiCad', description: 'Netlist generation, PCB trace routing, and decoupling design.' },
      ],
    },
    {
      id: 'programming_automation',
      title: 'Programming & Scripting',
      code: 'AUTOMATION_03',
      icon: 'code',
      accent: 'amber',
      status: {
        left: 'Regression: Auto',
        right: 'POSIX Compliant',
      },
      items: [
        { name: 'Embedded C', regAddress: '0x40_EMB_C_SRC', level: 'Advanced', tools: 'AVR-GCC, Keil', description: 'Bare-metal register manipulation, ISR handlers, and timers.' },
        { name: 'Python Scripting', regAddress: '0x44_PY_SCRIPT', level: 'Proficient', tools: 'NumPy, Scripts', description: 'Automated test vector generation and log parser scripts.' },
        { name: 'C++', regAddress: '0x48_CPP_LANG', level: 'Proficient', tools: 'OOP, STL', description: 'Object-oriented simulation models and algorithm verification.' },
        { name: 'Test Vector Gen', regAddress: '0x4C_TST_VECT', level: 'Specialized', tools: 'Random Stimulus', description: 'Corner-case stimulus arrays for RTL regression test pipelines.' },
        { name: 'Git / GitHub', regAddress: '0x50_GIT_REPO', level: 'Advanced', tools: 'Git CLI, CI/CD', description: 'Branching strategies, version control, and open-source repos.' },
        { name: 'Linux CLI', regAddress: '0x54_LNX_SHELL', level: 'Advanced', tools: 'Bash, POSIX, Make', description: 'Shell pipelines, synthesis scripting, and automation flow.' },
      ],
    },
    {
      id: 'embedded_iot',
      title: 'Hardware & IoT',
      code: 'EMBEDDED_SYS_04',
      icon: 'radio',
      accent: 'purple',
      status: {
        left: 'Baud: 115200',
        right: 'GPIO Verified',
      },
      items: [
        { name: 'Arduino Uno', regAddress: '0x60_ARD_UNO', level: 'Advanced', tools: 'ATmega328P', description: 'Rapid physical hardware prototyping and peripheral control.' },
        { name: 'Arduino Nano', regAddress: '0x64_ARD_NANO', level: 'Advanced', tools: 'Compact Prototyping', description: 'Miniaturized robotics systems and sensor telemetry.' },
        { name: 'IoT Sensors', regAddress: '0x68_IOT_SNSR', level: 'Advanced', tools: 'Optical, Flame, Temp', description: 'Analog/Digital transducer signal conditioning and calibration.' },
        { name: 'Actuators & Relays', regAddress: '0x6C_ACT_RELAY', level: 'Advanced', tools: 'H-Bridge, Optocouplers', description: 'High-current DC pumps, stepper/servo motors, and opto-isolation.' },
        { name: 'Robotics Control', regAddress: '0x70_ROBOT_CTRL', level: 'Proficient', tools: 'Feedback Loops', description: 'Kinematic control, PWM duty-cycling, and sensor arbitration.' },
        { name: 'UART/SPI/I2C', regAddress: '0x74_BUS_PROTO', level: 'Advanced', tools: 'Serial Busses, DSO', description: 'Master-slave synchronous and asynchronous bit-banging protocols.' },
      ],
    },
  ] as CapabilityCategory[],
  experiences: [
    {
      id: 'internpe',
      role: 'VLSI Design Intern',
      company: 'internpe.in',
      subdomain: 'RTL Synthesis & Digital Verification',
      period: '2026 • Present',
      active: true,
      bulletPoints: [
        'Developing modular, synthesizable digital hardware blocks in Verilog HDL adhering to strict synchronous design rules and clean clock domains.',
        'Implementing comprehensive testbenches to verify corner-case handling, edge glitches, and clock frequency domain integrity.',
        'Running static timing analysis (STA) checks to inspect setup/hold violations and optimize critical path delays across RTL modules.',
      ],
      tags: ['Verilog', 'UVM Methodology', 'ModelSim', 'STA', 'Digital Synthesis'],
    },
    {
      id: 'doxpro',
      role: 'Robotics & Embedded Systems Intern',
      company: 'DoxPro Robotics, Amravati',
      subdomain: 'Microcontroller Firmware & Hardware Interfacing',
      period: '2024',
      active: false,
      bulletPoints: [
        'Engineered autonomous micro-robotics logic utilizing Arduino Uno and Nano platforms programmed in Embedded C.',
        'Integrated sensor suites (optical, ultrasonic, flame detectors) with driver H-bridges and relay networks for real-time actuation.',
        'Diagnosed signal noise, ground bounces, and protocol timing discrepancies using digital storage oscilloscopes (DSO).',
      ],
      tags: ['Embedded C', 'Arduino Nano', 'IoT Actuators', 'Oscilloscope', 'H-Bridge Drivers'],
    },
  ] as ExperienceItem[],
  projects: [
    {
      id: 'firefighting_robot',
      title: 'IoT Autonomous Firefighting Robot',
      category: 'HARDWARE_ROBOTICS',
      categoryLabel: 'HARDWARE_ROBOTICS',
      accentColor: 'amber',
      icon: 'flame',
      description:
        'Autonomous hazard-response robot built with optical flame sensors, an automated submersible water pump, and H-bridge motor drivers governed by an Arduino microcontroller in Embedded C.',
      highlights: [
        'Flame detection vector tri-angulation with IR receiver array',
        'Automated relay-driven high-pressure submersible water pump',
        'Obstacle avoidance and fail-safe motor shutdown protocols',
      ],
      tags: ['Arduino', 'Embedded C', 'IoT Sensors', 'Motor Drivers'],
      githubUrl: 'https://github.com/jayatkarne',
      specs: {
        target: 'Arduino Uno / Nano ATmega328P',
        throughputOrClock: '16 MHz System Clock',
        coverageOrSensors: '3x IR Flame Sensors + Ultrasonic Range',
        verificationStatus: 'Lab Bench & Physical Field Verified',
      },
      architecturalOverview:
        'The robot samples optical flame intensity across three directional quadrant sensors. A voting and triangulation state machine in Embedded C computes the directional heading of the ignition hazard, adjusts differential motor speeds via dual L298N H-bridges, activates a relay-gated water impeller when within 30cm, and resumes scanning after temperature thresholds normalize.',
    },
    {
      id: 'riscv_core',
      title: 'RISC-V (RV32I) Core in Verilog',
      category: 'RTL_SYNTHESIS',
      categoryLabel: 'RTL_SYNTHESIS',
      accentColor: 'cyan',
      icon: 'cpu',
      description:
        'Designed a synthesizable 32-bit RISC-V integer CPU in Verilog. Includes Harvard-architecture instruction fetch, decode unit, 32 general-purpose registers, arithmetic logic unit, and data hazard protection.',
      highlights: [
        'Complete RV32I base integer instruction set implementation',
        'Zero timing violations on 50MHz FPGA target clock',
        'Modular ALU with barrel shifter and conditional branch logic',
      ],
      tags: ['Verilog', 'RISC-V', 'FPGA', 'ModelSim'],
      githubUrl: 'https://github.com/jayatkarne',
      specs: {
        target: 'Xilinx Artix-7 / Synthesizable ASIC RTL',
        throughputOrClock: '50 MHz FPGA Clock (Clean STA)',
        coverageOrSensors: 'RV32I Base Integer ISA (47 instructions)',
        verificationStatus: 'ModelSim Waveform Verified + Zero Slacks',
      },
      architecturalOverview:
        'Features a classic single-cycle datapath with decoupled instruction and data memories. The control unit decodes 32-bit R-type, I-type, S-type, B-type, U-type, and J-type opcodes in combinatorial logic, directing operands through a dual-read single-write 32x32 register file, a high-speed arithmetic unit, and sign-extension blocks.',
    },
    {
      id: 'axi_uvm_testbench',
      title: 'AXI4-Lite Peripheral UVM Testbench',
      category: 'UVM_TESTBENCH',
      categoryLabel: 'UVM_TESTBENCH',
      accentColor: 'emerald',
      icon: 'shield-check',
      description:
        'Constructed an object-oriented SystemVerilog UVM verification suite featuring driver, monitor, scoreboard, and sequence items to stress-test back-to-back read/write burst protocols.',
      highlights: [
        '100% Functional & Branch Coverage achieved in verification reports',
        'Constrained random testing with SystemVerilog Assertions (SVA)',
        'Scoreboard auto-comparison against behavioral reference model',
      ],
      tags: ['SystemVerilog', 'UVM', 'AXI4-Lite', 'Assertions'],
      githubUrl: 'https://github.com/jayatkarne',
      specs: {
        target: 'SystemVerilog UVM 1.2 Base Class Library',
        throughputOrClock: '100 MHz Simulation Clock Cycle',
        coverageOrSensors: '100% Functional & Branch Coverage',
        verificationStatus: 'Zero Assertion Failures across 10,000 runs',
      },
      architecturalOverview:
        'Implements standard UVM components (uvm_driver, uvm_monitor, uvm_agent, uvm_scoreboard, and uvm_env). The environment generates constrained randomized read and write transactions targeting memory-mapped slave registers, monitors the AXI handshakes (AWVALID/AWREADY, WVALID/WREADY, BVALID/BREADY), and checks data payload integrity against a golden reference model.',
    },
  ] as ProjectItem[],
  education: [
    {
      id: 'btech',
      badge: 'UNDERGRADUATE DEGREE',
      period: '2025 – 2028',
      degree: 'B.Tech in Electronics (E&TC)',
      institution: 'BD College of Engineering, Sevagram',
      university: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)',
      accent: 'cyan',
      description:
        'Concentration in advanced digital architecture, microelectronic circuit synthesis, solid-state electronics, and automated verification principles.',
      highlights: [
        'VLSI Architecture & CMOS Integrated Circuit Design',
        'Static Timing Analysis, Logic Synthesis & Clock Domain Crossings',
        'Digital Signal Processing & Microelectronic Communication Networks',
      ],
    },
    {
      id: 'diploma',
      badge: 'TECHNICAL DIPLOMA',
      period: '2022 – 2025',
      degree: 'Diploma in Electronics & Telecommunication',
      institution: 'Government Polytechnic Arvi',
      university: 'MSBTE Board',
      accent: 'emerald',
      description:
        'Rigorous hands-on foundation in analog electronic devices, digital logic gates, lab instrumentation (DSO, function generators), microcontrollers, and PCB prototyping.',
      highlights: [
        'Hands-on lab instrumentation (DSO, Spectrum Analyzer, Signal Gens)',
        'Fundamental Boolean algebra, flip-flops, counters & shift registers',
        'Semiconductor devices, MOSFET/BJT amplifier analysis & layout',
      ],
    },
  ] as EducationItem[],
};
