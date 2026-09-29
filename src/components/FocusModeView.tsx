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
  Check,
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
        { id: 'fb-2', title: 'Mental Reset & Hydration Break', durationMinutes: 5, isBreak: true, category: 'Rest Interval', completed: false },
        { id: 'fb-3', title: 'Solve 2 LeetCode Medium DSA Challenges', durationMinutes: 25, isBreak: false, category: 'DSA', completed: false },
        { id: 'fb-4', title: 'Knowledge Memory Review', durationMinutes: 5, isBreak: false, category: 'Revision', completed: false },
      ];
    }
    if (timeKey === '3h') {
      return [
        { id: 'fb-1', title: 'Deep Java OOP Architecture & Memory Model', durationMinutes: 45, isBreak: false, category: 'Core Coding', completed: false },
        { id: 'fb-2', title: 'Active Physical Rest Break', durationMinutes: 10, isBreak: true, category: 'Rest Interval', completed: false },
        { id: 'fb-3', title: 'Algorithm Sprints: HashMaps & Sliding Window', durationMinutes: 45, isBreak: false, category: 'DSA', completed: false },
        { id: 'fb-4', title: 'Hydration & Nutrition Break', durationMinutes: 10, isBreak: true, category: 'Rest Interval', completed: false },
        { id: 'fb-5', title: 'Distributed Capstone Project Backend APIs', durationMinutes: 50, isBreak: false, category: 'Projects', completed: false },
        { id: 'fb-6', title: 'Targeted Knowledge Revision & Diagnostic', durationMinutes: 20, isBreak: false, category: 'Revision', completed: false },
      ];
    }
    // Default 2 hours as requested in prompt:
    return [
      { id: 'fb-1', title: 'Learn Java OOP & Design Principles', durationMinutes: 25, isBreak: false, category: 'Core Coding', completed: false },
      { id: 'fb-2', title: 'Hydration & Screen Rest', durationMinutes: 5, isBreak: true, category: 'Rest Interval', completed: false },
      { id: 'fb-3', title: 'Solve 3 DSA Array & Pointer Problems', durationMinutes: 30, isBreak: false, category: 'DSA', completed: false },
      { id: 'fb-4', title: 'Micro Stretch & Walk', durationMinutes: 5, isBreak: true, category: 'Rest Interval', completed: false },
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

  const handleResetCurrent = () => {
    setSecondsRemaining(blocks[activeBlockIndex].durationMinutes * 60);
    setIsActive(false);
  };

  const currentBlock = blocks[activeBlockIndex] || blocks[0];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const completedBlocks = blocks.filter(b => b.completed).length;

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100 font-serif">
      {/* Editorial Header (Plate XI) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Deep Work Protocol</span>
              <span aria-hidden="true">/</span>
              <span>Plate XI</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              Focus Mode & Time-Blocking
            </h1>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
              Transform unstructured study time into high-leverage cognitive sprints. Tell CareerPilot how much time you have, and execute each milestone with built-in rest intervals.
            </p>
          </div>

          {/* Time Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: '30m', label: '30 Minutes' },
              { id: '1h', label: '1 Hour' },
              { id: '2h', label: '2 Hours (Standard)' },
              { id: '3h', label: '3+ Hours' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => handleSelectTime(t.id as any)}
                className={`border px-3.5 py-2 font-serif text-xs transition-colors ${
                  selectedTotalHours === t.id
                    ? 'border-stone-900 bg-stone-900 text-amber-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium'
                    : 'border-stone-300 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 text-stone-700 dark:text-stone-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Informational Guidance Ribbon */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-serif">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Target Role:</span>{' '}
            <strong className="text-stone-800 dark:text-stone-200">{profile.targetCareer}</strong>
          </div>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Total Sprints in Ledger:</span>{' '}
            <strong className="font-mono text-stone-800 dark:text-stone-200">{blocks.length} Blocks</strong>
          </div>
        </div>
      </div>

      {/* Main Studio: Timer & Schedule Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Minimalist Editorial Timer Display (5 cols) */}
        <div className="lg:col-span-5 border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">
            Sprint {activeBlockIndex + 1} of {blocks.length} · {currentBlock.category}
          </div>

          <h2 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100 max-w-sm mb-6">
            {currentBlock.title}
          </h2>

          {/* Stopwatch Countdown */}
          <div className="my-4 font-mono text-7xl font-extralight tracking-tighter tabular-nums text-stone-900 dark:text-stone-100">
            {formattedTime}
          </div>

          <div className="mt-2 font-mono text-xs uppercase tracking-widest text-stone-400">
            {currentBlock.isBreak ? 'Rest Interval' : 'Active Cognitive Sprint'}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center gap-2 border px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                isActive
                  ? 'border-stone-300 bg-white text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100'
                  : 'border-stone-900 bg-stone-900 text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
              }`}
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              <span>{isActive ? 'Pause Sprint' : 'Commence Sprint'}</span>
            </button>

            <button
              onClick={handleResetCurrent}
              className="border border-stone-300 bg-white p-3 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
              title="Reset current sprint timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleBlockComplete(activeBlockIndex)}
              className="border border-stone-300 bg-white p-3 text-emerald-800 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-emerald-400"
              title="Mark sprint completed"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Time-Blocked Syllabus Ledger (7 cols) */}
        <div className="lg:col-span-7 border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-4 font-mono text-[10px] uppercase tracking-widest text-stone-400">
            <span>Structured Study Sequence</span>
            <span>Progress: {completedBlocks} / {blocks.length} Completed</span>
          </div>

          <div className="space-y-2.5">
            {blocks.map((b, i) => {
              const isCurrent = i === activeBlockIndex;
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setActiveBlockIndex(i);
                    setSecondsRemaining(b.durationMinutes * 60);
                    setIsActive(false);
                  }}
                  className={`flex items-center justify-between border p-3.5 cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-stone-900 bg-white shadow-2xs dark:border-stone-100 dark:bg-stone-950'
                      : b.completed
                      ? 'border-stone-200 bg-stone-100/50 opacity-60 dark:border-stone-800 dark:bg-stone-900/30'
                      : 'border-stone-300/60 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-stone-400">
                      {String(i + 1).padStart(2, '0')}.
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-serif text-xs font-medium ${
                            b.completed ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'
                          }`}
                        >
                          {b.title}
                        </span>
                        {b.isBreak && (
                          <span className="font-serif italic text-[11px] text-amber-800 dark:text-amber-400">
                            (Rest)
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-stone-400 block mt-0.5">
                        {b.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="tabular-nums text-stone-500">
                      {b.durationMinutes} min
                    </span>

                    {b.completed && (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
