import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  FolderGit2,
  Mic2,
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { profile, careerTwin, projects, roadmap } = useCareerPilot();

  // Weekly hours data
  const weeklyDays = [
    { day: 'Mon', hours: 2.5, lastWeek: 1.8 },
    { day: 'Tue', hours: 2.0, lastWeek: 2.0 },
    { day: 'Wed', hours: 1.5, lastWeek: 1.0 },
    { day: 'Thu', hours: 2.2, lastWeek: 1.5 },
    { day: 'Fri', hours: 1.8, lastWeek: 2.2 },
    { day: 'Sat', hours: 3.0, lastWeek: 2.5 },
    { day: 'Sun', hours: 1.5, lastWeek: 1.0 },
  ];

  const thisWeekTotalHours = weeklyDays.reduce((acc, d) => acc + d.hours, 0);
  const lastWeekTotalHours = weeklyDays.reduce((acc, d) => acc + d.lastWeek, 0);
  const hoursGrowth = Math.round(((thisWeekTotalHours - lastWeekTotalHours) / lastWeekTotalHours) * 100);

  const completedProjectsCount = projects.filter(p => p.completed).length;
  const completedRoadmapCount = roadmap.filter(r => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <BarChart3 className="h-4 w-4" />
            <span>Telemetry & Velocity Analytics</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Progress Analytics
          </h1>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-time telemetry tracking your study velocity, diagnostic quiz trajectories, milestone completions, and readiness delta toward <strong>{profile.targetCareer}</strong>.
          </p>
        </div>
      </div>

      {/* Key Metric Comparisons: This Week vs Last Week */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Learning Hours */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Weekly Learning</span>
            <Clock className="h-4 w-4 text-teal-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {thisWeekTotalHours} hrs
            </span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +{hoursGrowth}%
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            vs. {lastWeekTotalHours} hrs last week
          </div>
        </div>

        {/* Metric 2: Tasks Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Milestones Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {profile.completedTasksCount}
            </span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +28%
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            vs. 11 tasks last week
          </div>
        </div>

        {/* Metric 3: Quiz Average */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Quiz Diagnostic Avg</span>
            <Award className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              78%
            </span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +14%
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            vs. 64% baseline diagnostic
          </div>
        </div>

        {/* Metric 4: Career Readiness */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Career Readiness</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {careerTwin.careerReadiness}%
            </span>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +12%
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            vs. 50% at onboarding
          </div>
        </div>
      </div>

      {/* Chart: Weekly Learning Hours Histogram */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Weekly Learning Hours: This Week vs Last Week
            </h2>
            <p className="text-[11px] text-slate-500">
              Consistent daily study habits drive rapid technical retention.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-indigo-600" />
              <span className="text-slate-600 dark:text-slate-400">This Week</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-slate-200 dark:bg-slate-700" />
              <span className="text-slate-600 dark:text-slate-400">Last Week</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="mt-8 flex items-end justify-between gap-3 h-48 px-2 sm:px-6">
          {weeklyDays.map(item => {
            const maxVal = 4; // max scale 4 hours
            const thisPct = (item.hours / maxVal) * 100;
            const lastPct = (item.lastWeek / maxVal) * 100;

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex justify-center items-end gap-1.5 h-full">
                  {/* Last Week Bar */}
                  <div
                    className="w-3 sm:w-4 bg-slate-200 rounded-t dark:bg-slate-700 transition-all duration-500"
                    style={{ height: `${lastPct}%` }}
                    title={`Last week: ${item.lastWeek} hrs`}
                  />
                  {/* This Week Bar */}
                  <div
                    className="w-3 sm:w-4 bg-indigo-600 rounded-t dark:bg-indigo-500 transition-all duration-500"
                    style={{ height: `${thisPct}%` }}
                    title={`This week: ${item.hours} hrs`}
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    {item.day}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {item.hours}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trajectory Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roadmap Trajectory */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Roadmap Mastery Trajectory
            </span>
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {completedRoadmapCount} of {roadmap.length} Stages Unlocked
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {roadmap.slice(0, 5).map(node => (
              <div key={node.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      node.status === 'completed'
                        ? 'bg-emerald-500'
                        : node.status === 'in-progress'
                        ? 'bg-indigo-600'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {node.title}
                  </span>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio & Mock Milestones */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Placement Readiness Milestones
            </span>
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
              3 of 5 Cleared
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Capstone Projects Completed</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{completedProjectsCount} / {projects.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">ATS Resume Benchmark</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">74 / 100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Technical Mock Sessions</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">3 Sessions (Avg. 84%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Knowledge Memory Gaps Resolved</span>
              <span className="font-mono font-bold text-teal-600 dark:text-teal-400">8 Topics Mastered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
