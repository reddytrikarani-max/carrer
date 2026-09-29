import React, { useState, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Coffee,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface FocusBlock {
  id: string;
  title: string;
  durationMinutes: number;
  isBreak: boolean;
  category: string;
  completed: boolean;
}

export const FocusModeView: React.FC = () => {
  const { profile, triggerCelebration, updateProfile } = useCareerPilot();
  const [selectedTotalHours, setSelectedTotalHours] = useState<'30m' | '1h' | '2h' | '3h'>('2h');

  // Dynamic time-blocked schedule
  const generateSchedule = (timeKey: string): FocusBlock[] => {
    if (timeKey === '30m') {
      return [
        { id: 'fb-1', title: 'Java Core Memory & Syntax Review', durationMinutes: 20, isBreak: false, category: 'Core Coding', completed: false },
        { id: 'fb-2', title: 'Two-Pointer Coding Diagnostic', durationMinutes: 10, isBreak: false, category: 'DSA', completed: false },
      ];
    }
    if (timeKey === '1h') {
      return [
        { id: 'fb-1', title: 'Learn Java OOP Polymorphism & Interfaces', durationMinutes: 25, isBreak: false, category: 'Core Coding', completed: false },
        { id: 'fb-2', title: 'Mental Reset & Hydration Break', durationMinutes: 5, isBreak: true, category: 'Break', completed: false },
        { id: 'fb-3', title: 'Solve 2 LeetCode Medium DSA Challenges', durationMinutes: 25, isBreak: false, category: 'DSA', completed: false },
        { id: 'fb-4', title: 'Knowledge Memory Review', durationMinutes: 5, isBreak: false, category: 'Revision', completed: false },
      ];
    }
    if (timeKey === '3h') {
      return [
        { id: 'fb-1', title: 'Deep Java OOP Architecture & Memory Model', durationMinutes: 45, isBreak: false, category: 'Core Coding', completed: false },
        { id: 'fb-2', title: 'Active Physical Rest Break', durationMinutes: 10, isBreak: true, category: 'Break', completed: false },
        { id: 'fb-3', title: 'Algorithm Sprints: HashMaps & Sliding Window', durationMinutes: 45, isBreak: false, category: 'DSA', completed: false },
        { id: 'fb-4', title: 'Hydration & Nutrition Break', durationMinutes: 10, isBreak: true, category: 'Break', completed: false },
        { id: 'fb-5', title: 'Distributed Capstone Project Backend APIs', durationMinutes: 50, isBreak: false, category: 'Projects', completed: false },
        { id: 'fb-6', title: 'Targeted Knowledge Revision & Diagnostic', durationMinutes: 20, isBreak: false, category: 'Revision', completed: false },
      ];
    }
    // Default 2 hours as requested in prompt:
    return [
      { id: 'fb-1', title: 'Learn Java OOP & Design Principles', durationMinutes: 25, isBreak: false, category: 'Core Coding', completed: false },
      { id: 'fb-2', title: 'Hydration & Screen Rest', durationMinutes: 5, isBreak: true, category: 'Break', completed: false },
      { id: 'fb-3', title: 'Solve 3 DSA Array & Pointer Problems', durationMinutes: 30, isBreak: false, category: 'DSA', completed: false },
      { id: 'fb-4', title: 'Micro Stretch & Walk', durationMinutes: 5, isBreak: true, category: 'Break', completed: false },
      { id: 'fb-5', title: 'Build Project Backend API Endpoint', durationMinutes: 30, isBreak: false, category: 'Projects', completed: false },
      { id: 'fb-6', title: 'Knowledge Memory Flashcard Revision', durationMinutes: 25, isBreak: false, category: 'Revision', completed: false },
    ];
  };

  const [blocks, setBlocks] = useState<FocusBlock[]>(() => generateSchedule('2h'));
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(blocks[0].durationMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      // Current block completed!
      handleBlockComplete(activeBlockIndex);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining]);

  const handleSelectTime = (key: '30m' | '1h' | '2h' | '3h') => {
    setSelectedTotalHours(key);
    const newSchedule = generateSchedule(key);
    setBlocks(newSchedule);
    setActiveBlockIndex(0);
    setSecondsRemaining(newSchedule[0].durationMinutes * 60);
    setIsActive(false);
  };

  const handleBlockComplete = (index: number) => {
    setBlocks(prev =>
      prev.map((b, i) => (i === index ? { ...b, completed: true } : b))
    );
    triggerCelebration();
    updateProfile({ xp: profile.xp + 25 });

    if (index + 1 < blocks.length) {
      setActiveBlockIndex(index + 1);
      setSecondsRemaining(blocks[index + 1].durationMinutes * 60);
    } else {
      setIsActive(false);
    }
  };

  const toggleBlockCheckbox = (index: number) => {
    setBlocks(prev =>
      prev.map((b, i) => (i === index ? { ...b, completed: !b.completed } : b))
    );
  };

  const handlePlayPause = () => {
    setIsActive(prev => !prev);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setSecondsRemaining(blocks[activeBlockIndex].durationMinutes * 60);
  };

  const activeBlock = blocks[activeBlockIndex];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <Timer className="h-4 w-4" />
              <span>Deep Work Orchestrator</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Focus Mode
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select your available study time. CareerPilot automatically divides it into optimal, research-backed Pomodoro blocks alternating deep coding sprints with cognitive rest.
            </p>
          </div>

          {/* Time Picker */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl dark:bg-slate-800">
            {(['30m', '1h', '2h', '3h'] as const).map(timeKey => (
              <button
                key={timeKey}
                onClick={() => handleSelectTime(timeKey)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedTotalHours === timeKey
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {timeKey === '30m' && '30 Min'}
                {timeKey === '1h' && '1 Hour'}
                {timeKey === '2h' && '2 Hours'}
                {timeKey === '3h' && '3+ Hours'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Timer Display + Scheduled Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Active Pomodoro Countdown Display */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {activeBlock?.isBreak ? (
              <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                <Coffee className="h-4 w-4" />
                <span>Rest Interval</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-4 w-4" />
                <span>Sprint Interval · {activeBlock?.category}</span>
              </span>
            )}
          </div>

          <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100 max-w-sm">
            {activeBlock?.title}
          </h3>

          {/* Large Digital Stopwatch Display */}
          <div className="my-8 flex h-48 w-48 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50/50 shadow-inner dark:border-slate-800 dark:bg-slate-800/40">
            <span className="font-mono text-5xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-slate-100">
              {formattedTime}
            </span>
          </div>

          {/* Play/Pause/Reset Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all ${
                isActive
                  ? 'bg-amber-600 hover:bg-amber-500'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 fill-current" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Start Focus Sprint</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetTimer}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 text-xs text-slate-400">
            Block {activeBlockIndex + 1} of {blocks.length}
          </div>
        </div>

        {/* Right: Scheduled Time-Block Checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Session Task Checklist
              </h2>
              <span className="text-[11px] text-slate-500">
                Generated for {selectedTotalHours} target
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-500">
              {blocks.filter(b => b.completed).length} / {blocks.length} Completed
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {blocks.map((block, idx) => {
              const isCurrent = idx === activeBlockIndex;
              return (
                <div
                  key={block.id}
                  onClick={() => {
                    setActiveBlockIndex(idx);
                    setSecondsRemaining(block.durationMinutes * 60);
                    setIsActive(false);
                  }}
                  className={`group flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-all ${
                    block.completed
                      ? 'border-emerald-200 bg-emerald-50/40 opacity-75 dark:border-emerald-950 dark:bg-emerald-950/20'
                      : isCurrent
                      ? 'border-indigo-600 bg-indigo-50/60 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/40'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={block.completed}
                      onChange={e => {
                        e.stopPropagation();
                        toggleBlockCheckbox(idx);
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            block.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {block.title}
                        </span>
                        {block.isBreak && (
                          <span className="rounded bg-teal-100 px-1.5 py-0.2 text-[9px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                            Rest
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {block.category} · {block.durationMinutes} mins
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-500">
                    {block.durationMinutes}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
