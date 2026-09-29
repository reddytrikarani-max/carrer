import React, { useState, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { X, CheckCircle2, AlertCircle, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizModalProps {
  topic: string;
  nodeId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  topic,
  nodeId,
  isOpen,
  onClose,
}) => {
  const { completeRoadmapNode, failRoadmapNode } = useCareerPilot();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadQuiz();
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setScorePercentage(0);
    }
  }, [isOpen, topic]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty: 'Intermediate' }),
      });
      const data = await res.json();
      if (data?.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setQuestions(getDefaultQuestions(topic));
      }
    } catch (err) {
      console.error(err);
      setQuestions(getDefaultQuestions(topic));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultQuestions = (t: string): QuizQuestion[] => [
    {
      id: 'q1',
      question: `In ${t}, what is the key architectural benefit of loose coupling in enterprise software?`,
      options: [
        'It allows modules to be modified, tested, and replaced independently without cascading breaks',
        'It forces all functions to be defined inside a single global file for faster compilation',
        'It reduces the need for database indexing',
        'It guarantees zero memory allocation on the JVM heap',
      ],
      correctIndex: 0,
      explanation: 'Loose coupling isolates components behind contracts or interfaces, enabling scalable refactoring and independent unit testing.',
    },
    {
      id: 'q2',
      question: `When analyzing performance bottlenecks related to ${t}, which metric provides the most accurate indicator of real-world user latency?`,
      options: [
        'Average CPU clock speed in GHz',
        'p99 (99th percentile) response time under sustained load',
        'Lines of code in the core repository',
        'Total number of comments per class',
      ],
      correctIndex: 1,
      explanation: 'p99 latency captures the slowest 1% of transactions, which represents the worst user experience and uncovers garbage collection pauses or lock contention.',
    },
    {
      id: 'q3',
      question: `Which scenario represents a common fatal pitfall when implementing ${t} in production?`,
      options: [
        'Writing comprehensive integration tests before deployment',
        'Unbounded resource consumption (e.g. unbounded thread pools or missing query timeouts)',
        'Using static type checking at compile time',
        'Employing standardized logging frameworks',
      ],
      correctIndex: 1,
      explanation: 'Unbounded queues, missing timeouts, and uncapped thread pools inevitably exhaust server memory during traffic spikes, causing complete service outages.',
    },
  ];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScorePercentage(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 70) {
      completeRoadmapNode(nodeId, finalScore);
    } else {
      failRoadmapNode(nodeId, finalScore);
    }
  };

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const allAnswered = questions.length > 0 && Object.keys(selectedAnswers).length === questions.length;
  const isPassing = scorePercentage >= 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Adaptive Diagnostic Assessment</span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
              {topic}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            <p className="mt-4 text-xs text-slate-500">Generating adaptive questions tailored to your gaps...</p>
          </div>
        ) : isSubmitted ? (
          /* Results View */
          <div className="py-6 text-center">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                isPassing
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
              }`}
            >
              {isPassing ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
              {isPassing ? 'Assessment Mastered!' : 'Gaps Identified — Roadmap Adapted'}
            </h3>

            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Your Diagnostic Score:{' '}
              <span className="font-mono font-bold text-lg text-slate-900 dark:text-slate-100">
                {scorePercentage}%
              </span>
            </div>

            <div className="mx-auto mt-4 max-w-md rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs dark:border-slate-800 dark:bg-slate-800/40">
              {isPassing ? (
                <div>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Roadmap Progress Verified (+40 XP)</span>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    You demonstrated solid conceptual command of {topic}. The next module in your Career Roadmap has been unlocked.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" />
                    <span>Adaptive Intervention Triggered</span>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    To ensure you don't encounter false confidence in job screenings, CareerPilot has automatically added{' '}
                    <strong className="text-slate-800 dark:text-slate-200">"{topic}"</strong> to your{' '}
                    <em>Knowledge Memory</em> and queued a targeted revision mission for you today.
                  </p>
                </div>
              )}
            </div>

            {/* Question Breakdown */}
            <div className="mt-6 text-left space-y-3 max-h-56 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`rounded-lg border p-3 text-xs ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                        : 'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="mt-1 text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Explanation:</span> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Return to Roadmap
              </button>
            </div>
          </div>
        ) : (
          /* Active Question View */
          currentQ && (
            <div className="py-4">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="font-mono">{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full dark:bg-slate-800 mb-6 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="mt-4 space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-xs transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 text-slate-500 dark:border-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswers[currentIndex] === undefined}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-40"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Submit & Adapt Roadmap</span>
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
