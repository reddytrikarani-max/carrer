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
  Layers,
  Flame,
  Award,
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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              CareerPilot AI
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#career-twin" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              AI Career Twin
            </a>
            <a href="#skill-gap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Skill Gap
            </a>
            <a href="#roadmap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Adaptive Roadmap
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExplore}
              className="text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            {/* Unboxed Metadata Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              <span>Personal AI Career Mentor</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Roadmap Engine</span>
              <span aria-hidden="true">·</span>
              <span>Tailored for Engineering Students</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15]">
              Turn your current skills into your{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                future career.
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Know your path. Build your skills. Become job-ready. CareerPilot continuously evaluates your diagnostic grasp, adapts your study roadmap, and guides you to placement success.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all"
              >
                <span>Explore Career Paths</span>
              </button>
            </div>

            {/* Quick Proof Metrics */}
            <div className="mt-12 flex items-center justify-center gap-8 text-xs text-slate-500 dark:text-slate-400">
              <div>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">62% → 94%</span>
                <div className="text-[11px]">Avg. Career Readiness Gain</div>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">8 Specialized</span>
                <div className="text-[11px]">AI Career Agents</div>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">Real-Time</span>
                <div className="text-[11px]">Adaptive Roadmap</div>
              </div>
            </div>
          </div>

          {/* Interactive AI Career Dashboard Preview */}
          <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
              <img
                src="/src/assets/images/careerpilot_hero_preview_1790640341197.jpg"
                alt="CareerPilot AI Dashboard Preview"
                className="w-full h-auto object-cover max-h-[520px]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Glassmorphism Overlay Card */}
            <div className="absolute -bottom-6 left-8 hidden sm:flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  Career Readiness: 62%
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  Java OOP · SQL Indexing · Distributed Systems
                </div>
              </div>
            </div>

            <div className="absolute -top-4 right-8 hidden sm:flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/95 px-3 py-2 text-xs font-semibold text-indigo-700 shadow-md backdrop-blur-md dark:border-indigo-900 dark:bg-indigo-950/95 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Personalized Career Twin Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* How CareerPilot Works */}
      <section id="how-it-works" className="border-t border-slate-200/80 bg-white py-20 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              01. Systematic Methodology
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              How CareerPilot Works
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Most students learn passively from random tutorials without knowing what hiring managers actually test. CareerPilot turns career preparation into an adaptive science.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/40">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">01</span>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                Calibrate Profile
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Input your college, branch, current skills, daily study hours, and target career destination.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/40">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">02</span>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                Generate Career Twin
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                CareerPilot maps your current capability curve against real employer hiring bars for your role.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/40">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">03</span>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                Adaptive Roadmap
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Follow daily missions. If diagnostic scores drop, CareerPilot automatically inserts targeted revision tasks.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/40">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">04</span>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                Placement Ready
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Build verified production projects, pass ATS resume checks, and practice AI mock interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Career Twin & Skill Gap Section */}
      <section id="career-twin" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                02. Intelligent Telemetry
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Your AI Career Twin
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A dynamic, living representation of your software engineering readiness. Your Career Twin doesn't stay static—it recalculates every time you complete a mission, pass a quiz, or solve a coding challenge.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-900 dark:text-slate-100">Precise Skill Gap Classification:</strong> Critical, Needs Improvement, Almost Ready, and Ready.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-900 dark:text-slate-100">"Why does this matter?" context:</strong> Learn how every concept connects directly to production architectures and interview screens.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-900 dark:text-slate-100">Knowledge Memory Engine:</strong> Automatically bookmarks tricky topics like HashMap collisions or SQL window functions for later revision.
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onExplore}
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  <span>Explore Demo Career Twin</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <div className="text-xs text-slate-500">Current Simulation</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Software Developer Career Twin
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold">
                  62% Ready
                </div>
              </div>

              {/* Skill Bars */}
              <div className="mt-5 space-y-3.5">
                {[
                  { name: 'Java OOP', current: 45, target: 80, gap: '35% Gap · Critical' },
                  { name: 'DSA & Algorithms', current: 30, target: 75, gap: '45% Gap · Critical' },
                  { name: 'SQL & Relational DBs', current: 65, target: 70, gap: '5% Gap · Almost Ready' },
                  { name: 'Production Projects', current: 50, target: 80, gap: '30% Gap · High' },
                  { name: 'Technical Communication', current: 70, target: 75, gap: '5% Gap · Ready' },
                  { name: 'Mock Interview Screening', current: 40, target: 80, gap: '40% Gap · Critical' },
                ].map(item => (
                  <div key={item.name} className="text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-800 dark:text-slate-200">{item.name}</span>
                      <span className="text-slate-500 font-mono">{item.current}% / {item.target}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                        style={{ width: `${item.current}%` }}
                      />
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-400">{item.gap}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="border-t border-slate-200/80 bg-white py-20 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              03. Complete Feature Suite
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Built for Engineering Students
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Every tool in CareerPilot works together to ensure you stand out in competitive placement drives and hackathons.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Career Simulator
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compare roles (Software Dev vs Data Analyst vs AI Engineer) and see how your skills and roadmap instantly reconfigure.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 mb-4">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                AI Project Builder
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate production blueprints: database schema, step-by-step dev instructions, testing checklists, and impact resume bullets.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Resume-Skill Consistency Check
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Avoid interview rejection by verifying that skills listed as "Advanced" in your resume match your actual assessment performance.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-4">
                <Mic2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                AI Mock Interview
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice Technical, HR, and Behavioral rounds with instant feedback on relevance, technical accuracy, and STAR structure.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 mb-4">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                8 AI Career Agents
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Specialized agents for Career Strategy, Learning Schedules, Code Explanations, Resumes, and Interview prep.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400 mb-4">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Focus Mode & Analytics
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Time-blocked study sessions with built-in timers, weekly learning velocity tracking, and "this week vs last week" analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-white py-16 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold">CareerPilot AI</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Ready to become job-ready?
          </h2>
          <p className="mt-2 text-xs md:text-sm text-slate-400 max-w-md mx-auto">
            Take the initial career diagnostic, generate your digital twin, and embark on your personalized roadmap today.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={onExplore}
              className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Launch Demo Workspace
            </button>
          </div>

          <div className="mt-12 text-xs text-slate-500">
            © {new Date().getFullYear()} CareerPilot AI. Know your path. Build your skills. Become job-ready.
          </div>
        </div>
      </footer>
    </div>
  );
};
