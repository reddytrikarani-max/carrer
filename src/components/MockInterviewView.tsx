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
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Mic2 className="h-4 w-4" />
              <span>Placement Screening Simulator</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AI Mock Interview
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Interactive interview coach. Evaluates relevance, technical depth, STAR structural clarity, and filler phrases, providing instant benchmark models.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Mode:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg dark:bg-slate-800">
              {INTERVIEW_MODES.map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    setActiveMode(mode);
                    setQuestionIndex(0);
                    setEvaluation(null);
                    setUserAnswer('');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeMode === mode
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interview Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Question & Student Answer Area */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                  QUESTION {questionIndex + 1} OF {currentQuestions.length}
                </span>
                <span className="text-xs text-slate-400">· {activeMode} Round</span>
              </div>
              <button
                onClick={handleResetSession}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs dark:border-blue-950 dark:bg-blue-950/20">
              <div className="font-semibold text-blue-900 dark:text-blue-200 text-sm leading-relaxed">
                "{currentQuestion}"
              </div>
            </div>

            {/* Answer Input */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Your Spoken or Typed Response</span>
                <span className="font-mono">{userAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>

              <textarea
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                rows={9}
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-800 leading-relaxed focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 resize-none"
                placeholder={
                  activeMode === 'Behavioral'
                    ? 'Structure using STAR: Situation (context) -> Task (goal) -> Action (what you specifically coded/did) -> Result (quantified metrics)...'
                    : 'Articulate your technical reasoning, internal algorithms, edge cases, and time/space complexity trade-offs...'
                }
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <span className="text-[11px] text-slate-400">
              +30 XP awarded per evaluated response
            </span>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !userAnswer.trim()}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-500 disabled:opacity-40 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isEvaluating ? 'Evaluating Depth & Clarity...' : 'Submit Response for AI Scoring'}</span>
            </button>
          </div>
        </div>

        {/* Right: AI Scoring & Diagnostic Feedback */}
        <div className="space-y-6">
          {evaluation ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Response Composite Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                      {evaluation.overallScore || 84}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-colors"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* 4 Rubric Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Relevance</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                    {evaluation.relevance || 8} / 10
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Technical Depth</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                    {evaluation.technicalAccuracy || 8} / 10
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">STAR Structure</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                    {evaluation.clarity || 8} / 10
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Communication</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                    {evaluation.communication || 9} / 10
                  </div>
                </div>
              </div>

              {/* What went well */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-950 dark:bg-emerald-950/20 text-xs">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>What went well:</span>
                </div>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {evaluation.whatWentWell?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to improve */}
              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 dark:border-amber-950 dark:bg-amber-950/20 text-xs">
                <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span>Actionable points to improve:</span>
                </div>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {evaluation.whatToImprove?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benchmark Answer Structure */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                  <span>Model Benchmark Answer Structure:</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                  {evaluation.suggestedAnswerStructure}
                </p>
              </div>

              {/* Follow-up Question Preview */}
              {evaluation.nextFollowUpQuestion && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 text-xs dark:border-indigo-950 dark:bg-indigo-950/20 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">
                    Recommended Follow-up Question:
                  </span>
                  <span className="italic text-[11px]">"{evaluation.nextFollowUpQuestion}"</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-400 dark:border-slate-800">
              <Mic2 className="h-8 w-8 text-slate-300 mb-3" />
              <p className="font-medium text-slate-600 dark:text-slate-300">
                Evaluation results will appear here
              </p>
              <p className="mt-1 text-slate-400 max-w-xs">
                Provide your answer to question #{questionIndex + 1} on the left to receive an objective technical and STAR rating.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
