import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  GitPullRequestDraft,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
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
        return 'border border-amber-900/30 text-amber-950 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/40';
      case 'Needs Improvement':
        return 'border border-stone-300 text-stone-800 bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:bg-stone-800';
      case 'Almost Ready':
        return 'border border-stone-200 text-stone-700 bg-stone-50 dark:border-stone-800 dark:text-stone-400 dark:bg-stone-900';
      default:
        return 'border border-emerald-300 text-emerald-950 bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:bg-emerald-950/30';
    }
  };

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Diagnostic Delta Audit</span>
              <span aria-hidden="true">/</span>
              <span>Plate III</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              AI Skill Gap Analyzer
            </h1>
            <p className="mt-3 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Itemized variance between demonstrated coursework and actual hiring expectations for <strong>{profile.targetCareer}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('careertwin')}
              className="border border-stone-300 px-4 py-2 font-mono text-xs uppercase tracking-wider text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            >
              Career Twin
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="border border-stone-900 bg-stone-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              <span>View In Syllabus</span>
            </button>
          </div>
        </div>

        {/* Filter Bar (Clean Editorial Segmented Controls) */}
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t border-stone-200 pt-5 dark:border-stone-800">
          <div className="flex items-center gap-1 border border-stone-200 p-1 bg-white dark:border-stone-800 dark:bg-stone-950">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                filter === 'all'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              All Skills ({careerTwin.skillsBreakdown.length})
            </button>
            <button
              onClick={() => setFilter('Critical')}
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                filter === 'Critical'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              Critical ({careerTwin.skillsBreakdown.filter(s => s.gapStatus === 'Critical').length})
            </button>
            <button
              onClick={() => setFilter('Needs Improvement')}
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                filter === 'Needs Improvement'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              Needs Improvement ({careerTwin.skillsBreakdown.filter(s => s.gapStatus === 'Needs Improvement').length})
            </button>
            <button
              onClick={() => setFilter('Ready')}
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                filter === 'Ready'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              Ready ({careerTwin.skillsBreakdown.filter(s => s.gapStatus === 'Ready' || s.gapStatus === 'Almost Ready').length})
            </button>
          </div>

          <div className="font-serif italic text-xs text-stone-500">
            Target Bar: <strong className="text-stone-900 dark:text-stone-100 font-normal">{activeCareerRole.title} Specialization</strong>
          </div>
        </div>
      </div>

      {/* Skill Gap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map(skill => {
          const gap = Math.max(0, skill.target - skill.current);

          return (
            <div
              key={skill.name}
              className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between border-b border-stone-200/60 pb-3 dark:border-stone-800/60">
                  <div>
                    <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase text-stone-400">{skill.category}</span>
                  </div>

                  <span
                    className={`font-mono text-[10px] uppercase px-2 py-0.5 font-bold ${getStatusBadge(
                      skill.gapStatus
                    )}`}
                  >
                    {skill.gapStatus}
                  </span>
                </div>

                {/* Progress Comparison */}
                <div className="mt-5">
                  <div className="flex justify-between font-serif text-xs mb-1">
                    <span className="text-stone-600 dark:text-stone-400">
                      Current Grasp: <strong className="font-mono text-stone-900 dark:text-stone-100">{skill.current}%</strong>
                    </span>
                    <span className="text-stone-600 dark:text-stone-400">
                      Target Bar: <strong className="font-mono text-stone-900 dark:text-stone-100">{skill.target}%</strong>
                    </span>
                  </div>

                  <div className="relative h-1.5 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        skill.gapStatus === 'Critical'
                          ? 'bg-amber-900 dark:bg-amber-400'
                          : 'bg-stone-900 dark:bg-stone-100'
                      }`}
                      style={{ width: `${skill.current}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-stone-950 dark:bg-white"
                      style={{ left: `${skill.target}%` }}
                      title={`Target Bar: ${skill.target}%`}
                    />
                  </div>

                  <div className="mt-1 flex justify-between font-mono text-[10px] text-stone-400">
                    <span>Variance: {gap}% deficit</span>
                    <span>Standard Bar: {skill.target}%</span>
                  </div>
                </div>

                {/* Editor's Rationale */}
                <div className="mt-5 border-l-2 border-stone-300 pl-3.5 dark:border-stone-700 py-0.5 text-xs font-serif">
                  <span className="font-medium text-stone-900 dark:text-stone-100 block text-xs">
                    Editor's Rationale
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 italic mt-0.5 leading-relaxed text-[11px]">
                    "{skill.whyItMatters}"
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-3 dark:border-stone-800">
                <span className="font-mono text-[10px] uppercase text-stone-500">
                  Priority: <strong className="text-stone-900 dark:text-stone-100">{skill.importance}</strong>
                </span>

                <button
                  onClick={() => setActiveQuizTopic(skill.name)}
                  className="font-mono text-xs uppercase tracking-wider text-amber-900 dark:text-amber-400 hover:text-stone-900 dark:hover:text-white font-semibold underline decoration-stone-300"
                >
                  Test Diagnostic & Bridge
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
