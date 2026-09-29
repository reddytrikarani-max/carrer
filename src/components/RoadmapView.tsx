import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  AlertCircle,
  ArrowDown,
  BookOpen,
  Code2,
  Hammer,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { QuizModal } from './QuizModal';

export const RoadmapView: React.FC = () => {
  const { profile, roadmap } = useCareerPilot();
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(roadmap[3]?.id || 'rm-4');
  const [quizModalData, setQuizModalData] = useState<{ id: string; title: string } | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedNodeId(prev => (prev === id ? null : id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'in-progress':
        return <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />;
      case 'revision-required':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'recommended':
        return <Clock className="h-5 w-5 text-indigo-400" />;
      default:
        return <Lock className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string, isRevision?: boolean) => {
    if (isRevision || status === 'revision-required') {
      return (
        <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Adaptive Revision Added
        </span>
      );
    }
    switch (status) {
      case 'completed':
        return (
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Completed & Verified
          </span>
        );
      case 'in-progress':
        return (
          <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            Active Milestone
          </span>
        );
      case 'recommended':
        return (
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Unlocked Next
          </span>
        );
      default:
        return (
          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Locked
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <MapPin className="h-4 w-4" />
            <span>Autonomous Adaptive Curriculum</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Adaptive AI Roadmap
          </h1>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This roadmap is not a static list of video links. It is a live state machine. If you score well on a diagnostic, CareerPilot advances you immediately; if gaps are exposed, it injects structured revision nodes to guarantee placement competence.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Completed & Evaluated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <span className="text-slate-600 dark:text-slate-400">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">Adaptive Revision Intercept</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">Upcoming Milestone</span>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Flow */}
      <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-3 md:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {roadmap.map((node, index) => {
          const isExpanded = expandedNodeId === node.id;
          const isLocked = node.status === 'locked';

          return (
            <div key={node.id} className="relative group">
              {/* Timeline Pin Indicator */}
              <div
                className={`absolute -left-6 md:-left-10 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white dark:bg-slate-900 ${
                  node.status === 'completed'
                    ? 'border-emerald-500 text-emerald-500'
                    : node.status === 'in-progress'
                    ? 'border-indigo-600 text-indigo-600 ring-4 ring-indigo-500/20'
                    : node.status === 'revision-required'
                    ? 'border-amber-500 text-amber-500 ring-4 ring-amber-500/20'
                    : 'border-slate-300 text-slate-400 dark:border-slate-700'
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    node.status === 'completed'
                      ? 'bg-emerald-500'
                      : node.status === 'in-progress'
                      ? 'bg-indigo-600'
                      : node.status === 'revision-required'
                      ? 'bg-amber-500'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              </div>

              {/* Node Card */}
              <div
                className={`rounded-2xl border bg-white transition-all dark:bg-slate-900 ${
                  node.status === 'in-progress'
                    ? 'border-indigo-300 dark:border-indigo-800 shadow-md ring-1 ring-indigo-500/20'
                    : node.status === 'revision-required'
                    ? 'border-amber-300 dark:border-amber-800 shadow-md bg-amber-50/20 dark:bg-amber-950/10'
                    : 'border-slate-200 dark:border-slate-800 shadow-xs'
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(node.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer gap-2"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="mt-0.5 sm:mt-0">{getStatusIcon(node.status)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-slate-400">
                          STAGE {index + 1}
                        </span>
                        <span className="text-[11px] text-slate-400">·</span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {node.category}
                        </span>
                        {getStatusBadge(node.status, node.isRevision)}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                        {node.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs pl-8 sm:pl-0">
                    <div className="flex items-center gap-3 text-slate-500">
                      <span>Est. {node.estimatedHours} hrs</span>
                      {node.score !== undefined && (
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                          Score: {node.score}%
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details: "Why does this matter?" & 4 Stages */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 dark:border-slate-800 space-y-4 text-xs">
                    {/* Adaptive Revision Alert if applicable */}
                    {node.reasonForAddition && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                        <div>
                          <strong>Adaptive Intervention:</strong> {node.reasonForAddition}
                        </div>
                      </div>
                    )}

                    {/* Why does this matter? */}
                    <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-950/60 dark:bg-indigo-950/20">
                      <div className="font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Why does this matter?</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {node.whyItMatters}
                      </p>
                    </div>

                    {/* 4 Stages: Learn -> Practice -> Apply -> Test */}
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Mastery Pipeline (Learn → Practice → Apply → Test)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>1. Learn</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            {node.fourStages.learn}
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            <Code2 className="h-3.5 w-3.5" />
                            <span>2. Practice</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            {node.fourStages.practice}
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            <Hammer className="h-3.5 w-3.5" />
                            <span>3. Apply</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            {node.fourStages.apply}
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            <GraduationCap className="h-3.5 w-3.5" />
                            <span>4. Test</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            {node.fourStages.test}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quiz & Action Controls */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                      <span className="text-slate-500 text-[11px]">
                        Passing threshold: <strong>70%</strong> to advance roadmap
                      </span>

                      {!isLocked ? (
                        <button
                          onClick={() => setQuizModalData({ id: node.id, title: node.quizTopic })}
                          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>
                            {node.status === 'completed'
                              ? 'Retake Assessment'
                              : 'Take Diagnostic Quiz'}
                          </span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Complete previous stages to unlock</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {quizModalData && (
        <QuizModal
          nodeId={quizModalData.id}
          topic={quizModalData.title}
          isOpen={!!quizModalData}
          onClose={() => setQuizModalData(null)}
        />
      )}
    </div>
  );
};
