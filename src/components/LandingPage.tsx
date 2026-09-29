import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Compass,
  GitPullRequestDraft,
  MapPin,
  FolderGit2,
  FileText,
  Mic2,
  BarChart3,
  Bot,
  CheckCircle2,
  Award,
  BookOpen,
} from 'lucide-react';
import { useCareerPilot } from '../context/CareerPilotContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExplore,
}) => {
  const { theme, toggleTheme } = useCareerPilot();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 dark:bg-[#0C0A09] dark:text-stone-100 transition-colors selection:bg-stone-900 selection:text-amber-50">
      {/* Editorial Top Bar (3-Zone Contract) */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#FAF8F5]/90 px-6 py-4 backdrop-blur-md dark:border-stone-800/80 dark:bg-[#0C0A09]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Zone 1: Single text element wordmark with editorial serif */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
              CareerPilot <span className="italic font-normal text-amber-800 dark:text-amber-400">AI</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-stone-500">
              · Vol. 2026
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-stone-600 dark:text-stone-400">
            <a href="#methodology" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Methodology
            </a>
            <a href="#career-twin" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Digital Twin
            </a>
            <a href="#skill-gap" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Skill Delta
            </a>
            <a href="#roadmap" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Syllabus
            </a>
            <a href="#features" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              The Suite
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onExplore}
              className="text-xs tracking-wider uppercase font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="border border-stone-900 bg-stone-900 px-4 py-2 text-xs font-medium tracking-wider uppercase text-amber-50 shadow-xs hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Archival metadata kicker */}
            <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-mono text-stone-500 mb-6">
              <span>Autonomous Mentorship</span>
              <span aria-hidden="true">/</span>
              <span>Engineering Placement Syllabus</span>
              <span aria-hidden="true">/</span>
              <span>Spring 2026</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-stone-950 dark:text-stone-50 leading-[1.08] text-balance">
              Turn your current skills into your{' '}
              <span className="italic font-serif font-normal text-amber-900 dark:text-amber-200 underline decoration-amber-400/40 decoration-1 underline-offset-8">
                future career.
              </span>
            </h1>

            <p className="mt-8 text-base md:text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed max-w-2xl mx-auto">
              Know your path. Build your skills. Become job-ready. CareerPilot acts like your personal academic advisor and AI career mentor, transforming raw coursework into demonstrated software engineering mastery.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-stone-900 bg-stone-900 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-all shadow-sm"
              >
                <span>Initialize Candidate Twin</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-stone-300 bg-transparent px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-stone-800 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-900 transition-all"
              >
                <span>Inspect Career Tracks</span>
              </button>
            </div>

            {/* Editorial Benchmark Statistics */}
            <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
              <div>
                <div className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">62% → 94%</div>
                <div className="text-xs font-serif text-stone-600 dark:text-stone-400 mt-1">Average candidate readiness velocity across diagnostic milestones.</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">8 Curators</div>
                <div className="text-xs font-serif text-stone-600 dark:text-stone-400 mt-1">Autonomous multi-agent collective advising each applicant.</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">Adaptive</div>
                <div className="text-xs font-serif text-stone-600 dark:text-stone-400 mt-1">Continuous diagnostic intervention replacing static checklists.</div>
              </div>
            </div>
          </div>

          {/* Catalog Exhibition Frame */}
          <div className="mt-16 relative mx-auto max-w-5xl border border-stone-300 bg-[#F5F2EB] p-3 shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="overflow-hidden border border-stone-200 dark:border-stone-800">
              <img
                src="/src/assets/images/careerpilot_hero_preview_1790640341197.jpg"
                alt="CareerPilot Telemetry Preview"
                className="w-full h-auto object-cover max-h-[520px]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Editorial Margin Caption */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-stone-500 px-1">
              <span>PLATE I. — CAREERPILOT AUTONOMOUS STATE MACHINE & TELEMETRY</span>
              <span className="hidden sm:inline">ACCESSION NO. 2026.04.18</span>
            </div>
          </div>
        </div>
      </section>

      {/* 01. Systematic Methodology */}
      <section id="methodology" className="border-t border-stone-200 bg-[#FAF8F5] py-20 dark:border-stone-800 dark:bg-[#0C0A09]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-6 dark:border-stone-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Chapter 01
              </span>
              <h2 className="mt-1 font-serif text-3xl md:text-4xl font-normal text-stone-900 dark:text-stone-100">
                Curatorial Methodology
              </h2>
            </div>
            <p className="mt-3 md:mt-0 font-serif italic text-sm text-stone-500 max-w-md">
              "Most students learn passively from fragmented tutorials. CareerPilot turns engineering preparation into an adaptive science."
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border-t border-stone-300 pt-4 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">01 / CALIBRATION</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Candidate Calibration
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Log academic background, verified coursework, and daily study capacity to calibrate your baseline.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-4 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">02 / MODELING</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                The Career Twin
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                A digital model continuously cross-references your current grasp against actual industry hiring bars.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-4 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">03 / ADAPTATION</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Adaptive Diagnostics
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Milestones are tested, not assumed. Scoring under 70% automatically injects tailored revision and practice tasks.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-4 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">04 / DISPATCH</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Placement Verification
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Build verified production capstones, audit resume claim consistency, and rehearse simulated STAR interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02. The Career Twin & Skill Gap Analysis */}
      <section id="career-twin" className="border-t border-stone-200 bg-[#F5F2EB] py-20 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Chapter 02
              </span>
              <h2 className="mt-1 font-serif text-3xl md:text-5xl font-normal text-stone-900 dark:text-stone-100 leading-tight">
                The Digital Career Twin
              </h2>
              <p className="mt-4 font-serif text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Rather than relying on generic syllabi, CareerPilot generates an exact mathematical twin of your professional capability. Every completed assessment, solved problem, and mock interview directly recalibrates your composite readiness score.
              </p>

              <div className="mt-8 space-y-4 border-l-2 border-stone-300 pl-4 dark:border-stone-700">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Rigorous Gap Classification
                  </h4>
                  <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    Categorizes competencies into Critical, Needs Improvement, Almost Ready, and Ready.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
                    "Why Does This Matter?" Monograph
                  </h4>
                  <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    Every concept explicitly articulates its role in enterprise system design and interview filtering.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Knowledge Memory Ledger
                  </h4>
                  <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    Sub-topics where you struggle (e.g., hash collisions or SQL window functions) are cataloged for spaced review.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onExplore}
                  className="inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                >
                  <span>Explore Candidate Archive</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Dossier Card */}
            <div className="border border-stone-300 bg-[#FAF8F5] p-8 shadow-lg dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Dossier</span>
                  <div className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
                    Software Developer Assessment
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-amber-900 dark:text-amber-300">62%</span>
                  <span className="block font-mono text-[10px] uppercase text-stone-400">Readiness</span>
                </div>
              </div>

              {/* Editorial Line-Item Skills */}
              <div className="mt-6 space-y-4">
                {[
                  { name: 'Java Object-Oriented Architecture', current: 45, target: 80, delta: '-35%' },
                  { name: 'Data Structures & Algorithmic Bounds', current: 30, target: 75, delta: '-45%' },
                  { name: 'Relational Database Optimization & SQL', current: 65, target: 70, delta: '-5%' },
                  { name: 'Distributed Systems & Capstones', current: 50, target: 80, delta: '-30%' },
                  { name: 'Technical Articulation & STAR', current: 70, target: 75, delta: '-5%' },
                ].map(item => (
                  <div key={item.name} className="border-b border-stone-200/60 pb-3 dark:border-stone-800/60 text-xs">
                    <div className="flex justify-between items-baseline font-serif">
                      <span className="text-stone-900 dark:text-stone-100 font-medium">{item.name}</span>
                      <span className="font-mono text-stone-500">{item.current}% / {item.target}%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-stone-900 dark:bg-stone-100"
                        style={{ width: `${item.current}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] font-mono text-stone-400">
                      <span>Status: Verified Diagnostic</span>
                      <span className="text-amber-800 dark:text-amber-400 font-semibold">{item.delta} Gap</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Complete Feature Suite */}
      <section id="features" className="border-t border-stone-200 bg-[#FAF8F5] py-20 dark:border-stone-800 dark:bg-[#0C0A09]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-b border-stone-200 pb-6 dark:border-stone-800 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Chapter 03
            </span>
            <h2 className="mt-1 font-serif text-3xl md:text-4xl font-normal text-stone-900 dark:text-stone-100">
              The Curated Suite
            </h2>
            <p className="mt-2 font-serif text-sm text-stone-500">
              Engineered for academic rigor and career outcomes without pseudo-technical clutter.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">MODULE 01</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Career Simulator
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Compare hiring bars between Backend, Full-Stack, Data, and AI engineering tracks with dynamic syllabus reweighting.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">MODULE 02</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                AI Project Builder
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Generate production blueprints with relational database schemas, step-by-step milestones, and Google XYZ resume bullets.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">MODULE 03</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Resume-Skill Consistency Check
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Ensure claims made on paper (e.g. "Advanced Java") match your demonstrated assessment performance before technical screens.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">MODULE 04</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                AI Mock Interview
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Rehearse Technical, HR, and Behavioral rounds with instant evaluation on technical depth, STAR structure, and clarity.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">MODULE 05</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Multi-Agent Career Team
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Eight autonomous agents specialized in Learning Schedules, Assessment, Algorithms, Resumes, and Mock Interviews.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
              <span className="font-mono text-xs text-stone-400">MODULE 06</span>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-2">
                Focus Mode & Analytics
              </h3>
              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Time-blocked Pomodoro study sprints with stopwatch countdowns and weekly study hour histograms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Colophon & Footer */}
      <footer className="border-t border-stone-300 bg-[#F5F2EB] py-16 dark:border-stone-800 dark:bg-stone-950 text-stone-800 dark:text-stone-200">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="font-serif text-2xl font-normal italic tracking-tight text-stone-900 dark:text-stone-100 mb-2">
            CareerPilot AI
          </div>
          <p className="font-serif text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            "Know your path. Build your skills. Become job-ready." The autonomous career mentor for college students.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="border border-stone-900 bg-stone-900 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={onExplore}
              className="border border-stone-400 bg-transparent px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-800 hover:bg-stone-200 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900 transition-colors"
            >
              Enter Workspace
            </button>
          </div>

          <div className="mt-12 font-mono text-[10px] uppercase tracking-widest text-stone-400">
            © {new Date().getFullYear()} CareerPilot AI · Published & Distributed for Collegiate Placement Success
          </div>
        </div>
      </footer>
    </div>
  );
};
