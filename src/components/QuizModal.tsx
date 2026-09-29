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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl border border-stone-300 bg-[#FAF8F5] p-8 shadow-2xl dark:border-stone-800 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Diagnostic Assessment
            </div>
            <h2 className="mt-1 font-serif text-2xl font-normal text-stone-900 dark:text-stone-100">
              {topic}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin border-2 border-stone-900 border-t-transparent dark:border-stone-100" />
            <p className="mt-4 font-serif italic text-xs text-stone-500">Formulating diagnostic questions for candidate evaluation...</p>
          </div>
        ) : isSubmitted ? (
          /* Results View */
          <div className="py-6 text-center">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center border ${
                isPassing
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'border-amber-800 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {isPassing ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            </div>

            <h3 className="mt-4 font-serif text-2xl font-normal text-stone-900 dark:text-stone-100">
              {isPassing ? 'Diagnostic Mastered' : 'Variance Identified — Curriculum Adapted'}
            </h3>

            <div className="mt-2 font-serif text-sm text-stone-600 dark:text-stone-400">
              Candidate Diagnostic Score:{' '}
              <span className="font-mono font-bold text-lg text-stone-900 dark:text-stone-100">
                {scorePercentage}%
              </span>
            </div>

            <div className="mx-auto mt-5 max-w-md border border-stone-200 bg-white p-4 text-left text-xs font-serif dark:border-stone-800 dark:bg-stone-950">
              {isPassing ? (
                <div>
                  <div className="font-semibold text-emerald-800 dark:text-emerald-300 font-mono text-[10px] uppercase tracking-wider">
                    Syllabus Milestone Verified (+40 XP)
                  </div>
                  <p className="mt-1 text-stone-600 dark:text-stone-400 leading-relaxed">
                    You demonstrated rigorous conceptual command of {topic}. The subsequent milestone in your Adaptive Roadmap is now active.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-amber-900 dark:text-amber-300 font-mono text-[10px] uppercase tracking-wider">
                    Curricular Intervention Triggered
                  </div>
                  <p className="mt-1 text-stone-600 dark:text-stone-400 leading-relaxed">
                    To eliminate false confidence in technical interviews, CareerPilot has cataloged{' '}
                    <strong className="text-stone-900 dark:text-stone-100 font-medium">"{topic}"</strong> in your{' '}
                    <em>Knowledge Memory</em> and queued a targeted revision mission.
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
                    className={`border p-3.5 text-xs font-serif ${
                      isCorrect
                        ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                        : 'border-amber-300 bg-amber-50/40 dark:border-amber-900 dark:bg-amber-950/20'
                    }`}
                  >
                    <div className="font-medium text-stone-900 dark:text-stone-100">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="mt-1.5 text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                      <span className="font-mono text-[10px] uppercase text-stone-400">Analysis:</span> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="border border-stone-900 bg-stone-900 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                Return to Syllabus
              </button>
            </div>
          </div>
        ) : (
          /* Active Question View */
          currentQ && (
            <div className="py-4 font-serif">
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase text-stone-400 mb-3">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-0.5 w-full bg-stone-200 dark:bg-stone-800 mb-6 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-base font-normal text-stone-900 dark:text-stone-100 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="mt-5 space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex w-full items-start gap-3 border p-3.5 text-left text-xs transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-200/50 text-stone-900 dark:border-stone-100 dark:bg-stone-800 dark:text-stone-100 font-medium'
                          : 'border-stone-200 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="font-mono text-[10px] font-bold uppercase text-stone-500 mt-0.5">
                        [{String.fromCharCode(65 + optIdx)}]
                      </span>
                      <span className="flex-1 leading-relaxed font-serif">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-800">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 disabled:opacity-30 dark:hover:text-stone-100"
                >
                  Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswers[currentIndex] === undefined}
                    className="border border-stone-900 bg-stone-900 px-5 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-30 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    <span>Next Question</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="border border-stone-900 bg-stone-900 px-6 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-30 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    <span>Submit & Adapt Syllabus</span>
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
