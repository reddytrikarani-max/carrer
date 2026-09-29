import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  GitPullRequestDraft,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { QuizModal } from './QuizModal';

interface SkillGapViewProps {
  onNavigate: (tab: string) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({ onNavigate }) => {
  const { profile, careerTwin, activeCareerRole } = useCareerPilot();
  const [filter, setFilter] = useState<'all' | 'Critical' | 'Needs Improvement' | 'Ready'>('all');
  const [activeQuizTopic, setActiveQuizTopic] = useState<string | null>(null);

  const filteredSkills = careerTwin.skillsBreakdown.filter(skill => {
    if (filter === 'all') return true;
    if (filter === 'Critical') return skill.gapStatus === 'Critical';
    if (filter === 'Needs Improvement') return skill.gapStatus === 'Needs Improvement';
    if (filter === 'Ready') return skill.gapStatus === 'Ready' || skill.gapStatus === 'Almost Ready';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200';
      case 'Needs Improvement':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200';
      case 'Almost Ready':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200';
      default:
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <GitPullRequestDraft className="h-4 w-4" />
              <span>Diagnostic Delta Engine</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AI Skill Gap Analyzer
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Detailed comparison between your current demonstrated capability and the target employment bar for{' '}
              <strong>{profile.targetCareer}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('careertwin')}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              Career Twin
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
            >
              <span>Bridge Gaps in Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Bar (Segmented Controls) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg dark:bg-slate-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              All Skills ({careerTwin.skillsBreakdown.length})
            </button>
            <button
              onClick={() => setFilter('Critical')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'Critical'
                  ? 'bg-white text-rose-700 shadow-xs dark:bg-slate-700 dark:text-rose-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Critical ({careerTwin.skillsBreakdown.filter(s => s.gapStatus === 'Critical').length})
            </button>
            <button
              onClick={() => setFilter('Needs Improvement')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'Needs Improvement'
                  ? 'bg-white text-amber-700 shadow-xs dark:bg-slate-700 dark:text-amber-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Needs Improvement ({careerTwin.skillsBreakdown.filter(s => s.gapStatus === 'Needs Improvement').length})
            </button>
            <button
              onClick={() => setFilter('Ready')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'Ready'
                  ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-700 dark:text-emerald-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Ready ({careerTwin.skillsBreakdown.filter(s => s.gapStatus === 'Ready' || s.gapStatus === 'Almost Ready').length})
            </button>
          </div>

          <div className="text-xs text-slate-500">
            Target Role Baseline:{' '}
            <strong className="text-slate-800 dark:text-slate-200">{activeCareerRole.title}</strong>
          </div>
        </div>
      </div>

      {/* Skill Gap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map(skill => {
          const gap = Math.max(0, skill.target - skill.current);

          return (
            <div
              key={skill.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] text-slate-400">· {skill.category}</span>
                  </div>

                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getStatusBadge(
                      skill.gapStatus
                    )}`}
                  >
                    {skill.gapStatus}
                  </span>
                </div>

                {/* Progress Comparison */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      Current: <strong className="font-mono text-slate-900 dark:text-slate-100">{skill.current}%</strong>
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      Target: <strong className="font-mono text-slate-900 dark:text-slate-100">{skill.target}%</strong>
                    </span>
                  </div>

                  <div className="relative h-2.5 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.gapStatus === 'Critical'
                          ? 'bg-rose-500'
                          : skill.gapStatus === 'Needs Improvement'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${skill.current}%` }}
                    />
                    {/* Target marker line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white"
                      style={{ left: `${skill.target}%` }}
                      title={`Target Bar: ${skill.target}%`}
                    />
                  </div>

                  <div className="mt-1 flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Gap: {gap}%</span>
                    <span>Hiring Bar: {skill.target}%</span>
                  </div>
                </div>

                {/* Why It Matters */}
                <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                    Why does this matter?
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    {skill.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <span className="text-[11px] font-medium text-slate-500">
                  Priority: <strong>{skill.importance}</strong>
                </span>

                <button
                  onClick={() => setActiveQuizTopic(skill.name)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Test & Bridge Gap</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeQuizTopic && (
        <QuizModal
          nodeId="gap-test"
          topic={activeQuizTopic}
          isOpen={!!activeQuizTopic}
          onClose={() => setActiveQuizTopic(null)}
        />
      )}
    </div>
  );
};
