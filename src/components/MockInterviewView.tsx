import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Mic2,
  Sparkles,
  Play,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

const INTERVIEW_MODES = ['Technical', 'Behavioral', 'HR', 'Role-specific'] as const;
type InterviewMode = (typeof INTERVIEW_MODES)[number];

const SAMPLE_QUESTIONS: Record<InterviewMode, string[]> = {
  Technical: [
    'Explain how HashMaps resolve hash collisions internally in Java or C++, and what happens to lookup complexity as bucket size grows?',
    'What is the difference between synchronous and asynchronous I/O, and when would you favor an event-driven worker pool over multithreading?',
    'Describe how database indexing (B-Trees) speeds up read performance, and what trade-offs it introduces during high-frequency writes.',
  ],
  Behavioral: [
    'Tell me about a challenging bug you encountered in a project, how you diagnosed the root cause, and how you verified the fix.',
    'Describe a situation where you had a technical disagreement with a team member. How did you resolve it constructively?',
    'Tell me about a time you had to learn an unfamiliar technology or framework under tight project deadlines.',
  ],
  HR: [
    'Why are you specifically interested in software engineering roles at top product companies?',
    'Where do you see your engineering craftsmanship evolving over the next two years?',
    'How do you manage stress and prioritize tasks during heavy university exam and project weeks?',
  ],
  'Role-specific': [
    'How would you design a rate limiter to protect a public REST API against distributed Denial of Service (DDoS) traffic spikes?',
    'If your backend server p99 latency suddenly jumps from 45ms to 1200ms, walk me through your diagnostic triage procedure.',
    'How do you guarantee idempotency in payment processing or background order dispatching services?',
  ],
};

export const MockInterviewView: React.FC = () => {
  const { profile, triggerCelebration, updateProfile } = useCareerPilot();
  const [activeMode, setActiveMode] = useState<InterviewMode>('Technical');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const currentQuestions = SAMPLE_QUESTIONS[activeMode];
  const currentQuestion = currentQuestions[questionIndex] || currentQuestions[0];

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const res = await fetch('/api/gemini/evaluate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          answer: userAnswer,
          mode: activeMode,
          role: profile.targetCareer,
        }),
      });

      const data = await res.json();
      setEvaluation(data);
      updateProfile({ xp: profile.xp + 30 });
      triggerCelebration();
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setEvaluation(null);
    setQuestionIndex(prev => (prev + 1) % currentQuestions.length);
  };

  const handleResetSession = () => {
    setUserAnswer('');
    setEvaluation(null);
    setQuestionIndex(0);
  };

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100 font-serif">
      {/* Editorial Header (Plate X) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Placement Screening Simulator</span>
              <span aria-hidden="true">/</span>
              <span>Plate X</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              AI Mock Interview & Evaluation
            </h1>
            <p className="mt-2 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Oral defense rehearsal against realistic placement questions for <strong>{profile.targetCareer}</strong>. The evaluation jury critiques technical rigor, clarity, and STAR storytelling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetSession}
              className="flex items-center gap-1.5 border border-stone-300 bg-white px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Jury</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs (Clean Editorial Segmented Controls) */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2">
          {INTERVIEW_MODES.map(mode => {
            const isSelected = activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  setActiveMode(mode);
                  setQuestionIndex(0);
                  setEvaluation(null);
                  setUserAnswer('');
                }}
                className={`border px-4 py-2 font-serif text-xs transition-colors ${
                  isSelected
                    ? 'border-stone-900 bg-stone-900 text-amber-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium'
                    : 'border-stone-300 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{mode} Screening</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Oral Prompt & Answer Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Question & Candidate Answer */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-4 font-mono text-[10px] uppercase tracking-widest text-stone-400">
              <span>Oral Prompt {questionIndex + 1} of {currentQuestions.length}</span>
              <span>{activeMode} Round</span>
            </div>

            {/* The Question Prompt */}
            <div className="border-l-2 border-stone-900 bg-white p-5 dark:border-stone-100 dark:bg-stone-950">
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-800 dark:text-amber-400 block mb-1">
                Jury Question
              </span>
              <p className="font-serif text-base font-normal text-stone-900 dark:text-stone-100 leading-snug">
                "{currentQuestion}"
              </p>
            </div>

            {/* Answer Input */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2">
                <label className="font-serif text-xs font-medium text-stone-700 dark:text-stone-300">
                  Candidate Formulation & Defense
                </label>
                <span className="font-mono text-[10px] text-stone-400">
                  {userAnswer.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              <textarea
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                rows={10}
                placeholder="Structure your response clearly. For behavioral questions, adopt the Situation, Task, Action, Result (STAR) framework..."
                className="w-full border border-stone-300 bg-white p-4 font-serif text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 leading-relaxed"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-800">
            <button
              onClick={handleNextQuestion}
              className="font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            >
              Skip Question
            </button>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !userAnswer.trim()}
              className="flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-40 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isEvaluating ? 'Deliberating...' : 'Submit to Jury'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Jury Evaluation Rubric */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-4 font-mono text-[10px] uppercase tracking-widest text-stone-400">
            <span>Evaluation Dossier</span>
            <span>Rubric Analysis</span>
          </div>

          {evaluation ? (
            <div className="space-y-6 text-xs">
              {/* Overall Score */}
              <div className="border border-stone-300/80 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif font-medium text-stone-900 dark:text-stone-100 text-sm">
                    Composite Screening Index
                  </span>
                  <span className="font-mono text-xl font-bold text-amber-900 dark:text-amber-300">
                    {evaluation.overallScore} / 100
                  </span>
                </div>
                <div className="mt-2 h-1 w-full bg-stone-200 dark:bg-stone-800">
                  <div
                    className="h-full bg-stone-900 dark:bg-stone-100"
                    style={{ width: `${evaluation.overallScore}%` }}
                  />
                </div>
              </div>

              {/* 4 Pillar Breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">
                    Relevance
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                    {evaluation.relevance} / 10
                  </span>
                </div>

                <div className="border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">
                    Technical Depth
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                    {evaluation.technicalAccuracy} / 10
                  </span>
                </div>

                <div className="border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">
                    Structure & STAR
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                    {evaluation.clarity} / 10
                  </span>
                </div>

                <div className="border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">
                    Communication
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                    {evaluation.communication} / 10
                  </span>
                </div>
              </div>

              {/* Commendations & Blindspots */}
              <div className="space-y-4">
                <div className="border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-950">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold block mb-1.5">
                    Commended Elements
                  </span>
                  <ul className="space-y-1 text-stone-700 dark:text-stone-300">
                    {evaluation.whatWentWell?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-stone-400">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-950">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold block mb-1.5">
                    Critical Blindspots
                  </span>
                  <ul className="space-y-1 text-stone-700 dark:text-stone-300">
                    {evaluation.whatToImprove?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-stone-400">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Benchmark Architecture */}
              {evaluation.suggestedAnswerStructure && (
                <div className="border-l-2 border-stone-400 bg-white p-3.5 dark:border-stone-600 dark:bg-stone-950 text-stone-700 dark:text-stone-300">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block mb-1">
                    Exemplary Architecture Benchmark
                  </span>
                  <p className="italic text-[11px] leading-relaxed">
                    "{evaluation.suggestedAnswerStructure}"
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="w-full flex items-center justify-center gap-2 border border-stone-900 bg-stone-900 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                >
                  <span>Advance to Next Screening Question</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-xs text-stone-400">
              <Mic2 className="h-10 w-10 text-stone-300 dark:text-stone-700 mb-3" />
              <p className="font-medium text-stone-600 dark:text-stone-300">
                Awaiting Candidate Defense
              </p>
              <p className="mt-1 max-w-xs text-[11px] text-stone-400 italic">
                Formulate your answer and click "Submit to Jury" for structured scoring and rubric feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
