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
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Cpu className="h-4 w-4" />
              <span>Digital Career Twin Architecture</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Your Career Twin
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your digital counterpart continuously simulates how real engineering hiring managers and technical recruiters evaluate your profile for <strong>{profile.targetCareer}</strong>.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
              <div className="rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                <span className="text-slate-500">Degree & Branch:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">{profile.degree} {profile.branch}</strong>
              </div>
              <div className="rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                <span className="text-slate-500">Graduation Year:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">{profile.gradYear}</strong>
              </div>
              <div className="rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                <span className="text-slate-500">Daily Study Target:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">{profile.studyTime}</strong>
              </div>
            </div>
          </div>

          {/* Large Circular Gauge */}
          <div className="flex items-center justify-center gap-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-950 dark:bg-indigo-950/30">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000"
                  strokeDasharray={`${careerTwin.careerReadiness}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {careerTwin.careerReadiness}%
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-500">
                  Readiness
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Target: {activeCareerRole.title}
              </div>
              <div className="text-slate-500">
                Est. Placement Window: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{careerTwin.learningTimeline}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Avg Industry Compensation: {activeCareerRole.avgSalary}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Radar & Circular Indicators Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Pillars Cards */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500">Technical Coding</span>
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {Math.round(
                (careerTwin.skillsBreakdown.find(s => s.name === 'Java')?.current || 45) * 0.5 +
                (careerTwin.skillsBreakdown.find(s => s.name === 'DSA')?.current || 30) * 0.5
              )}%
            </span>
          </div>
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>Java OOP</span>
                <span className="font-mono text-slate-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'Java')?.current || 45}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'Java')?.current || 45}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Data Structures & Algorithms</span>
                <span className="font-mono text-slate-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'DSA')?.current || 30}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'DSA')?.current || 30}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>SQL & Databases</span>
                <span className="font-mono text-slate-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'SQL')?.current || 65}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'SQL')?.current || 65}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio & Production Readiness */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500">Portfolio & Architecture</span>
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
              {careerTwin.projectReadiness}%
            </span>
          </div>
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>Capstone Projects</span>
                <span className="font-mono text-slate-500">{careerTwin.projectReadiness}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${careerTwin.projectReadiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Version Control & Git/GitHub</span>
                <span className="font-mono text-slate-500">
                  {careerTwin.skillsBreakdown.find(s => s.name === 'Git/GitHub')?.current || 40}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${careerTwin.skillsBreakdown.find(s => s.name === 'Git/GitHub')?.current || 40}%` }}
                />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Adding 1 more production backend project bridges +20% to your portfolio score.
            </div>
          </div>
        </div>

        {/* Interview & Placement Readiness */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500">Behavioral & Interviewing</span>
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
              {Math.round((careerTwin.interviewReadiness + 70) / 2)}%
            </span>
          </div>
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>Technical Mock Rounds</span>
                <span className="font-mono text-slate-500">{careerTwin.interviewReadiness}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${careerTwin.interviewReadiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Communication & STAR Method</span>
                <span className="font-mono text-slate-500">70%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Complete 2 mock rounds in the AI Interview simulator to unlock placement clearance.
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quadrants: Strong, Weak, Missing, Recommended */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Strong Skills */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-950 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>Strong Skills</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-400">
            Competencies at or near hiring threshold
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
            {careerTwin.strongSkills.map(s => (
              <li key={s} className="flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weak Skills */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 dark:border-amber-950 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
            <AlertCircle className="h-4 w-4" />
            <span>Weak Skills</span>
          </div>
          <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-400">
            Requires structured revision & problem sets
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
            {careerTwin.weakSkills.map(s => (
              <li key={s} className="flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Skills */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 dark:border-rose-950 dark:bg-rose-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300">
            <Zap className="h-4 w-4" />
            <span>Missing Skills</span>
          </div>
          <p className="mt-1 text-[11px] text-rose-700 dark:text-rose-400">
            Mandatory prerequisites currently at 0 or beginner
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
            {careerTwin.missingSkills.map(s => (
              <li key={s} className="flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Skills */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 dark:border-indigo-950 dark:bg-indigo-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 dark:text-indigo-300">
            <Sparkles className="h-4 w-4" />
            <span>Recommended Next</span>
          </div>
          <p className="mt-1 text-[11px] text-indigo-700 dark:text-indigo-400">
            Highest leverage for accelerating readiness
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
            {careerTwin.recommendedSkills.map(s => (
              <li key={s} className="flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Banner */}
      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xs dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">
            Accelerate Your Career Twin
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Simulate other career tracks or inspect your detailed Skill Gap breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('simulator')}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Career Simulator
          </button>
          <button
            onClick={() => onNavigate('skillgap')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Skill Gap Analyzer
          </button>
        </div>
      </div>
    </div>
  );
};
