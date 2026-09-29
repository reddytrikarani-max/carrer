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
  const scoredNodes = roadmap.filter(r => typeof r.score === 'number' && r.score > 0);
  const quizAverage = scoredNodes.length > 0
    ? Math.round(scoredNodes.reduce((acc, n) => acc + (n.score || 0), 0) / scoredNodes.length)
    : 78;

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100 font-serif">
      {/* Editorial Header (Plate XII) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Telemetry & Velocity Analytics</span>
              <span aria-hidden="true">/</span>
              <span>Plate XII</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              Progress Analytics
            </h1>
            <p className="mt-2 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Empirical accounting of study velocity, diagnostic quiz trajectories, capstone project completions, and candidate readiness toward <strong>{profile.targetCareer}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-serif text-stone-500">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Readiness:</span>{' '}
              <strong className="font-mono text-base font-bold text-amber-900 dark:text-amber-300">{careerTwin.careerReadiness}%</strong>
            </div>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Tier:</span>{' '}
              <strong className="text-stone-800 dark:text-stone-200">{profile.level}</strong>
            </div>
          </div>
        </div>

        {/* Key Metric Comparisons: This Week vs Last Week (Clean Dossier Cards) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Metric 1: Learning Hours */}
          <div className="border border-stone-300/80 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 font-serif">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Weekly Learning</span>
              <Clock className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                {thisWeekTotalHours.toFixed(1)} hrs
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +{hoursGrowth}%
              </span>
            </div>
            <div className="mt-1 font-serif italic text-[11px] text-stone-500">
              vs. {lastWeekTotalHours.toFixed(1)} hrs prior session
            </div>
          </div>

          {/* Metric 2: Tasks Completed */}
          <div className="border border-stone-300/80 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 font-serif">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Milestones Finished</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                {profile.completedTasksCount}
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +28%
              </span>
            </div>
            <div className="mt-1 font-serif italic text-[11px] text-stone-500">
              vs. 11 tasks prior period
            </div>
          </div>

          {/* Metric 3: Quiz Average */}
          <div className="border border-stone-300/80 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 font-serif">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Quiz Diagnostic Avg</span>
              <Award className="h-3.5 w-3.5 text-amber-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-bold text-amber-900 dark:text-amber-300 tabular-nums">
                {quizAverage}%
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +5%
              </span>
            </div>
            <div className="mt-1 font-serif italic text-[11px] text-stone-500">
              Passing Benchmark: 75%
            </div>
          </div>

          {/* Metric 4: Capstones */}
          <div className="border border-stone-300/80 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 font-serif">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Capstones Shipped</span>
              <FolderGit2 className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                {completedProjectsCount} / {projects.length}
              </span>
              <span className="text-xs text-stone-500 font-serif italic">
                Verified
              </span>
            </div>
            <div className="mt-1 font-serif italic text-[11px] text-stone-500">
              Production blueprints built
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Weekly Hours Histogram (7 cols) */}
        <div className="lg:col-span-7 border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 font-serif">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-6 font-mono text-[10px] uppercase tracking-widest text-stone-400">
            <span>Study Velocity Histogram</span>
            <span>Daily Hours Allocation</span>
          </div>

          {/* Clean Editorial Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyDays.map(item => {
              const maxHours = 3.5;
              const heightPct = Math.round((item.hours / maxHours) * 100);
              const lastWeekPct = Math.round((item.lastWeek / maxHours) * 100);

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex items-end justify-center gap-1.5 h-40">
                    {/* Prior Week Indicator Bar */}
                    <div
                      className="w-2 border border-stone-300 bg-stone-200/50 dark:border-stone-700 dark:bg-stone-800/50"
                      style={{ height: `${lastWeekPct}%` }}
                      title={`Prior week: ${item.lastWeek} hrs`}
                    />
                    {/* Current Week Bar */}
                    <div
                      className="w-4.5 bg-stone-900 group-hover:bg-amber-900 dark:bg-stone-100 dark:group-hover:bg-amber-300 transition-colors"
                      style={{ height: `${heightPct}%` }}
                      title={`This week: ${item.hours} hrs`}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-stone-600 dark:text-stone-400">
                    {item.day}
                  </span>
                  <span className="font-mono text-[10px] text-stone-400 tabular-nums">
                    {item.hours}h
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 border-t border-stone-200 pt-3 dark:border-stone-800 text-[11px] font-serif text-stone-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 bg-stone-900 dark:bg-stone-100" />
              <span>Current Session Week</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-4 border border-stone-300 bg-stone-200/50 dark:border-stone-700" />
              <span>Prior Session Week</span>
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus Trajectory & Velocity Delta (5 cols) */}
        <div className="lg:col-span-5 border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 font-serif">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-6 font-mono text-[10px] uppercase tracking-widest text-stone-400">
            <span>Syllabus Trajectory</span>
            <span>Milestone Health</span>
          </div>

          <div className="space-y-4 text-xs">
            {roadmap.slice(0, 5).map(node => (
              <div
                key={node.id}
                className="border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950 font-serif"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {node.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>{node.category}</span>
                  <span className="font-mono tabular-nums">{node.estimatedHours}h estimated</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800 text-xs italic text-stone-500">
            Overall velocity indicates candidate readiness completion on schedule for graduation class of {profile.gradYear}.
          </div>
        </div>
      </div>
    </div>
  );
};
