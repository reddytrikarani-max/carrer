import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  AlertCircle,
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
        return <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />;
      case 'in-progress':
        return <span className="h-2.5 w-2.5 rounded-full bg-amber-800 dark:bg-amber-400 animate-pulse" />;
      case 'revision-required':
        return <AlertCircle className="h-4 w-4 text-amber-900 dark:text-amber-400" />;
      case 'recommended':
        return <Clock className="h-4 w-4 text-stone-500" />;
      default:
        return <Lock className="h-4 w-4 text-stone-400" />;
    }
  };

  const getStatusBadge = (status: string, isRevision?: boolean) => {
    if (isRevision || status === 'revision-required') {
      return (
        <span className="border border-amber-900/30 bg-amber-50 px-2 py-0.5 font-mono text-[9px] uppercase font-bold text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Adaptive Revision
        </span>
      );
    }
    switch (status) {
      case 'completed':
        return (
          <span className="border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-mono text-[9px] uppercase font-bold text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
            Verified
          </span>
        );
      case 'in-progress':
        return (
          <span className="border border-stone-900 bg-stone-900 px-2 py-0.5 font-mono text-[9px] uppercase font-bold text-amber-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900">
            Active Milestone
          </span>
        );
      case 'recommended':
        return (
          <span className="border border-stone-300 px-2 py-0.5 font-mono text-[9px] uppercase font-bold text-stone-600 dark:border-stone-700 dark:text-stone-400">
            Unlocked
          </span>
        );
      default:
        return (
          <span className="border border-stone-200 px-2 py-0.5 font-mono text-[9px] uppercase text-stone-400 dark:border-stone-800">
            Locked
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
            <span>Adaptive Syllabus State Machine</span>
            <span aria-hidden="true">/</span>
            <span>Plate IV</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
            Adaptive AI Roadmap
          </h1>
          <p className="mt-3 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            This roadmap is an active curatorial curriculum, not a static video catalog. Passing a milestone diagnostic advances you into production capstones; failing to meet the benchmark automatically injects structured review nodes to eliminate conceptual blindness.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-stone-200 pt-4 dark:border-stone-800 text-xs font-serif">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-stone-600 dark:text-stone-400">Completed & Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-stone-900 dark:bg-stone-100" />
            <span className="text-stone-600 dark:text-stone-400">Active Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <span className="text-stone-600 dark:text-stone-400">Adaptive Revision Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="text-stone-600 dark:text-stone-400">Upcoming Stage</span>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Flow */}
      <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-3 md:before:left-5 before:top-4 before:bottom-4 before:w-px before:bg-stone-300 dark:before:bg-stone-800">
        {roadmap.map((node, index) => {
          const isExpanded = expandedNodeId === node.id;
          const isLocked = node.status === 'locked';

          return (
            <div key={node.id} className="relative group">
              {/* Timeline Pin Indicator */}
              <div
                className={`absolute -left-6 md:-left-10 top-4 flex h-5 w-5 items-center justify-center border bg-[#FAF8F5] dark:bg-stone-900 ${
                  node.status === 'completed'
                    ? 'border-emerald-700 text-emerald-700'
                    : node.status === 'in-progress'
                    ? 'border-stone-900 text-stone-900 ring-2 ring-stone-900/20 dark:border-stone-100 dark:text-stone-100'
                    : node.status === 'revision-required'
                    ? 'border-amber-800 text-amber-800 ring-2 ring-amber-800/20'
                    : 'border-stone-300 text-stone-400 dark:border-stone-700'
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 ${
                    node.status === 'completed'
                      ? 'bg-emerald-700'
                      : node.status === 'in-progress'
                      ? 'bg-stone-900 dark:bg-stone-100'
                      : node.status === 'revision-required'
                      ? 'bg-amber-800'
                      : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                />
              </div>

              {/* Node Card */}
              <div
                className={`border bg-[#FAF8F5] transition-all dark:bg-stone-900/60 ${
                  node.status === 'in-progress'
                    ? 'border-stone-900 dark:border-stone-100 shadow-sm'
                    : node.status === 'revision-required'
                    ? 'border-amber-800 bg-amber-50/20 dark:border-amber-900'
                    : 'border-stone-300/80 dark:border-stone-800'
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(node.id)}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between p-5 cursor-pointer gap-2"
                >
                  <div className="flex items-start sm:items-baseline gap-3">
                    <div className="mt-1">{getStatusIcon(node.status)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-stone-400">
                          STAGE {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-stone-300 dark:text-stone-700">·</span>
                        <span className="font-mono text-[10px] uppercase text-stone-500">
                          {node.category}
                        </span>
                        {getStatusBadge(node.status, node.isRevision)}
                      </div>
                      <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-1">
                        {node.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 text-xs pl-7 sm:pl-0">
                    <div className="flex items-center gap-3 text-stone-500 font-serif">
                      <span>Est. {node.estimatedHours} hrs</span>
                      {node.score !== undefined && (
                        <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                          Score: {node.score}%
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-stone-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-stone-200 p-6 dark:border-stone-800 space-y-5 text-xs">
                    {/* Adaptive Revision Alert if applicable */}
                    {node.reasonForAddition && (
                      <div className="border border-amber-800/40 bg-amber-50 p-4 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200 flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 shrink-0 text-amber-800 mt-0.5" />
                        <div className="font-serif leading-relaxed">
                          <strong>Adaptive Intervention:</strong> {node.reasonForAddition}
                        </div>
                      </div>
                    )}

                    {/* Editor's Rationale: Why does this matter? */}
                    <div className="border-l-2 border-stone-300 pl-4 py-1 dark:border-stone-700">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-1">
                        Editor's Rationale
                      </div>
                      <p className="font-serif text-stone-700 dark:text-stone-300 italic leading-relaxed text-sm">
                        "{node.whyItMatters}"
                      </p>
                    </div>

                    {/* 4 Stages: Learn -> Practice -> Apply -> Test */}
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
                        Mastery Syllabus (Learn → Practice → Apply → Test)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
                          <div className="font-mono text-[10px] uppercase font-bold text-stone-400 mb-1">
                            01. Learn
                          </div>
                          <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                            {node.fourStages.learn}
                          </p>
                        </div>

                        <div className="border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
                          <div className="font-mono text-[10px] uppercase font-bold text-stone-400 mb-1">
                            02. Practice
                          </div>
                          <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                            {node.fourStages.practice}
                          </p>
                        </div>

                        <div className="border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
                          <div className="font-mono text-[10px] uppercase font-bold text-stone-400 mb-1">
                            03. Apply
                          </div>
                          <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                            {node.fourStages.apply}
                          </p>
                        </div>

                        <div className="border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
                          <div className="font-mono text-[10px] uppercase font-bold text-stone-400 mb-1">
                            04. Test
                          </div>
                          <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                            {node.fourStages.test}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quiz & Action Controls */}
                    <div className="flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-800">
                      <span className="font-serif italic text-stone-500 text-xs">
                        Benchmark threshold: <strong>70%</strong> to advance syllabus
                      </span>

                      {!isLocked ? (
                        <button
                          onClick={() => setQuizModalData({ id: node.id, title: node.quizTopic })}
                          className="border border-stone-900 bg-stone-900 px-5 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                        >
                          <span>
                            {node.status === 'completed'
                              ? 'Retake Assessment'
                              : 'Take Diagnostic Assessment'}
                          </span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 font-serif italic text-stone-400 text-xs">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Complete preceding stages to unlock</span>
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
