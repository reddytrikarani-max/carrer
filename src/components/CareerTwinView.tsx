import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface CareerTwinViewProps {
  onNavigate: (tab: string) => void;
}

export const CareerTwinView: React.FC<CareerTwinViewProps> = ({ onNavigate }) => {
  const { profile, careerTwin, activeCareerRole } = useCareerPilot();

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Editorial Dossier Header */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Candidate Archival Record</span>
              <span aria-hidden="true">/</span>
              <span>Plate II</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              The Career Twin
            </h1>
            <p className="mt-3 font-serif text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Your digital counterpart continuously models how top engineering hiring committees and technical recruiters evaluate your credentials for the <strong>{profile.targetCareer}</strong> specialization.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-serif">
              <div className="border border-stone-200 bg-stone-100/60 px-3 py-1.5 dark:border-stone-800 dark:bg-stone-800/60">
                <span className="text-stone-500 italic">Degree & Branch:</span>{' '}
                <strong className="text-stone-900 dark:text-stone-100">{profile.degree} {profile.branch}</strong>
              </div>
              <div className="border border-stone-200 bg-stone-100/60 px-3 py-1.5 dark:border-stone-800 dark:bg-stone-800/60">
                <span className="text-stone-500 italic">Graduation Class:</span>{' '}
                <strong className="text-stone-900 dark:text-stone-100">{profile.gradYear}</strong>
              </div>
              <div className="border border-stone-200 bg-stone-100/60 px-3 py-1.5 dark:border-stone-800 dark:bg-stone-800/60">
                <span className="text-stone-500 italic">Study Allocation:</span>{' '}
                <strong className="text-stone-900 dark:text-stone-100">{profile.studyTime} / day</strong>
              </div>
            </div>
          </div>

          {/* Large Editorial Circular Gauge */}
          <div className="flex items-center justify-center gap-6 border border-stone-300 bg-stone-100/50 p-6 dark:border-stone-800 dark:bg-stone-800/40">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-200 dark:text-stone-700"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-900 dark:text-amber-300 transition-all duration-1000"
                  strokeDasharray={`${careerTwin.careerReadiness}, 100`}
                  strokeWidth="3"
                  strokeLinecap="butt"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {careerTwin.careerReadiness}%
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-400">
                  Readiness
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1 font-serif">
              <div className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                Track: {activeCareerRole.title}
              </div>
              <div className="text-stone-500 italic text-[11px]">
                Target Placement Window: <span className="font-mono text-stone-800 dark:text-stone-200 font-semibold">{careerTwin.learningTimeline}</span>
              </div>
              <div className="text-[11px] font-mono text-stone-400">
                Market Compensation: {activeCareerRole.avgSalary}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Radar & Circular Indicators Breakdown (3 Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Pillars Cards */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">I. Technical Algorithms</span>
            <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300">
              {Math.round(
                (careerTwin.skillsBreakdown.find(s => s.name === 'Java')?.current || 45) * 0.5 +
                (careerTwin.skillsBreakdown.find(s => s.name === 'DSA')?.current || 30) * 0.5
              )}%
            </span>
          </div>
          <div className="mt-5 space-y-4 text-xs font-serif">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Java Object Model</span>
                <span className="font-mono text-stone-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'Java')?.current || 45}%
                </span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'Java')?.current || 45}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Data Structures (Linear & Trees)</span>
                <span className="font-mono text-stone-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'DSA')?.current || 30}%
                </span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'DSA')?.current || 30}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Relational DBs & Query Tuning</span>
                <span className="font-mono text-stone-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'SQL')?.current || 65}%
                </span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'SQL')?.current || 65}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio & Production Readiness */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">II. Portfolio Architecture</span>
            <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300">
              {careerTwin.projectReadiness}%
            </span>
          </div>
          <div className="mt-5 space-y-4 text-xs font-serif">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Verified Capstone Systems</span>
                <span className="font-mono text-stone-500">{careerTwin.projectReadiness}%</span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${careerTwin.projectReadiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Git & Release Workflows</span>
                <span className="font-mono text-stone-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'Git/GitHub')?.current || 40}%
                </span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'Git/GitHub')?.current || 40}%` }}
                />
              </div>
            </div>

            <div className="pt-2 italic text-[11px] text-stone-500 leading-relaxed">
              Adding 1 verified distributed backend project bridges +20% to your portfolio score.
            </div>
          </div>
        </div>

        {/* Interview & Placement Readiness */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">III. Screening Rehearsals</span>
            <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300">
              {Math.round((careerTwin.interviewReadiness + 70) / 2)}%
            </span>
          </div>
          <div className="mt-5 space-y-4 text-xs font-serif">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Technical Diagnostic Screening</span>
                <span className="font-mono text-stone-500">{careerTwin.interviewReadiness}%</span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${careerTwin.interviewReadiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-stone-800 dark:text-stone-200">Communication & STAR Delivery</span>
                <span className="font-mono text-stone-500">70%</span>
              </div>
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div className="h-full bg-stone-900 dark:bg-stone-100" style={{ width: '70%' }} />
              </div>
            </div>

            <div className="pt-2 italic text-[11px] text-stone-500 leading-relaxed">
              Complete 2 mock rounds in the AI Interview simulator to unlock placement clearance.
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quadrants Matrix (Editorial Sectional Lists) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Strong Skills */}
        <div className="border border-stone-300/80 bg-stone-50/60 p-5 dark:border-stone-800 dark:bg-stone-900/40">
          <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold">
            01 / Demonstrated Mastery
          </div>
          <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100 mt-1">
            Strong Skills
          </h3>
          <ul className="mt-3 space-y-1.5 text-xs font-serif text-stone-700 dark:text-stone-300">
            {careerTwin.strongSkills.map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="font-mono text-stone-400">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weak Skills */}
        <div className="border border-stone-300/80 bg-stone-50/60 p-5 dark:border-stone-800 dark:bg-stone-900/40">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
            02 / Needs Reinforcement
          </div>
          <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100 mt-1">
            Weak Skills
          </h3>
          <ul className="mt-3 space-y-1.5 text-xs font-serif text-stone-700 dark:text-stone-300">
            {careerTwin.weakSkills.map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="font-mono text-stone-400">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Skills */}
        <div className="border border-stone-300/80 bg-stone-50/60 p-5 dark:border-stone-800 dark:bg-stone-900/40">
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            03 / Missing Prerequisites
          </div>
          <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100 mt-1">
            Missing Skills
          </h3>
          <ul className="mt-3 space-y-1.5 text-xs font-serif text-stone-700 dark:text-stone-300">
            {careerTwin.missingSkills.map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="font-mono text-stone-400">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Skills */}
        <div className="border border-stone-300/80 bg-stone-50/60 p-5 dark:border-stone-800 dark:bg-stone-900/40">
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            04 / Priority Curriculum
          </div>
          <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100 mt-1">
            Recommended Next
          </h3>
          <ul className="mt-3 space-y-1.5 text-xs font-serif text-stone-700 dark:text-stone-300">
            {careerTwin.recommendedSkills.map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="font-mono text-stone-400">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Banner (Editorial Card) */}
      <div className="border border-stone-900 bg-stone-900 p-8 text-amber-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl font-normal">
            Refine Candidate Telemetry
          </h3>
          <p className="mt-1 font-serif text-xs italic text-stone-400 dark:text-stone-600">
            Simulate other tracks or inspect the itemized Skill Gap analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('simulator')}
            className="border border-stone-700 bg-stone-800 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-amber-50 hover:bg-stone-700 dark:border-stone-300 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300 transition-colors"
          >
            Pathway Simulator
          </button>
          <button
            onClick={() => onNavigate('skillgap')}
            className="border border-amber-200/40 bg-amber-50 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-900 hover:bg-amber-100 dark:bg-stone-900 dark:text-amber-50 dark:hover:bg-stone-800 transition-colors"
          >
            Skill Delta Engine
          </button>
        </div>
      </div>
    </div>
  );
};
