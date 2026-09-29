import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  CheckSquare,
  Sparkles,
  Flame,
  Award,
  Clock,
  Plus,
  Play,
  RotateCw,
  Check,
  X,
} from 'lucide-react';

interface TodaysMissionViewProps {
  onNavigate: (tab: string) => void;
}

export const TodaysMissionView: React.FC<TodaysMissionViewProps> = ({ onNavigate }) => {
  const { profile, missions, toggleMission, addMission, careerTwin } = useCareerPilot();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Core Coding');
  const [newTaskMinutes, setNewTaskMinutes] = useState(25);
  const [newTaskDifficulty, setNewTaskDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newTaskXp, setNewTaskXp] = useState(25);

  const completedCount = missions.filter(m => m.completed).length;
  const totalXpAvailable = missions.reduce((acc, m) => acc + m.xp, 0);
  const totalMinutes = missions.reduce((acc, m) => acc + m.durationMinutes, 0);

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addMission({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      durationMinutes: newTaskMinutes,
      difficulty: newTaskDifficulty,
      xp: newTaskXp,
    });

    setNewTaskTitle('');
    setShowAddModal(false);
  };

  const handleGenerateAdaptiveMission = () => {
    const weakSkill = careerTwin.weakSkills[0] || 'Data Structures';
    addMission({
      title: `Intervention: Revisit ${weakSkill} & write unit tests`,
      category: 'Diagnostic Revision',
      durationMinutes: 20,
      difficulty: 'Medium',
      xp: 30,
    });
  };

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Editorial Header (Plate VI) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Daily High-Leverage Execution</span>
              <span aria-hidden="true">/</span>
              <span>Plate VI</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              Today's Mission
            </h1>
            <p className="mt-2 font-serif text-sm text-stone-600 dark:text-stone-400">
              Calibrated to your daily study allocation of <strong>{profile.studyTime}</strong> for{' '}
              <strong>{profile.targetCareer}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateAdaptiveMission}
              className="flex items-center gap-1.5 border border-stone-300 bg-white px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            >
              <RotateCw className="h-3.5 w-3.5 text-stone-500" />
              <span>Generate AI Mission</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 border border-stone-900 bg-stone-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Custom Goal</span>
            </button>
          </div>
        </div>

        {/* Overview Stats (Clean Editorial Ribbon) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 text-xs">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Tasks Completed
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {completedCount} <span className="text-stone-400 font-normal">/ {missions.length}</span>
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Daily quota tracking</div>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Daily XP Value
            </div>
            <div className="font-mono text-xl font-bold text-amber-900 dark:text-amber-300 mt-1">
              +{totalXpAvailable} XP
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Candidate tier growth</div>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Allocated Time Budget
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {totalMinutes} mins
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Focused practice time</div>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Active Streak
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-1.5">
              <Flame className="h-4 w-4 fill-amber-700 text-amber-700" />
              <span>{profile.streakDays} Days</span>
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Continuous momentum</div>
          </div>
        </div>
      </div>

      {/* Checklist (Clean Paper Folio Rows) */}
      <div className="space-y-3 font-serif">
        {missions.map(mission => (
          <div
            key={mission.id}
            onClick={() => toggleMission(mission.id)}
            className={`group flex items-center justify-between border p-4.5 cursor-pointer transition-all ${
              mission.completed
                ? 'border-stone-200 bg-stone-100/50 opacity-70 dark:border-stone-800 dark:bg-stone-900/30'
                : 'border-stone-300/80 bg-[#FAF8F5] hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-stone-700'
            }`}
          >
            <div className="flex items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  toggleMission(mission.id);
                }}
                className={`mt-0.5 sm:mt-0 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                  mission.completed
                    ? 'border-stone-900 bg-stone-900 text-amber-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'border-stone-300 bg-white hover:border-stone-900 dark:border-stone-700 dark:bg-stone-950'
                }`}
                aria-label="Toggle mission status"
              >
                {mission.completed && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
              </button>

              <div>
                <span
                  className={`text-sm font-medium block leading-snug ${
                    mission.completed
                      ? 'line-through text-stone-400 dark:text-stone-500'
                      : 'text-stone-900 dark:text-stone-100'
                  }`}
                >
                  {mission.title}
                </span>

                {/* Zero-Pill Unboxed Metadata */}
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-serif text-stone-800 dark:text-stone-200">
                    {mission.category}
                  </span>
                  <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                  <span className="flex items-center gap-1 font-mono text-[11px] tabular-nums">
                    <Clock className="h-3 w-3 text-stone-400" />
                    <span>{mission.durationMinutes} min</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    {mission.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-xs font-bold tabular-nums border px-2 py-0.5 ${
                  mission.completed
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-stone-300 bg-white text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100'
                }`}
              >
                +{mission.xp} XP
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Launch Focus Mode Action Banner */}
      <div className="border border-stone-900 bg-stone-900 p-7 text-amber-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber-400 dark:text-amber-800">
            Pomodoro Time-Block Protocol
          </div>
          <h3 className="mt-1 font-serif text-xl font-normal">
            Ready to execute these tasks without distraction?
          </h3>
          <p className="mt-1 font-serif text-xs italic text-stone-300 dark:text-stone-600">
            Launch Focus Mode to automatically divide your available time into structured sprints with resting intervals.
          </p>
        </div>

        <button
          onClick={() => onNavigate('focus')}
          className="flex items-center gap-2 border border-stone-700 bg-stone-800 px-6 py-3 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-700 dark:border-stone-300 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300 transition-colors whitespace-nowrap"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Launch Focus Session</span>
        </button>
      </div>

      {/* Add Custom Mission Modal (Editorial Sheet) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md border border-stone-300 bg-[#FAF8F5] p-7 shadow-xl dark:border-stone-700 dark:bg-stone-900">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
              <h2 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                Add Custom Daily Goal
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMission} className="mt-5 space-y-4 text-xs font-serif">
              <div>
                <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Read Java Concurrency in Practice Ch. 3"
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value)}
                    className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-sans"
                  >
                    <option value="Core Coding">Core Coding</option>
                    <option value="DSA">DSA</option>
                    <option value="Databases">Databases</option>
                    <option value="Projects">Projects</option>
                    <option value="Interview">Interview</option>
                    <option value="Revision">Revision</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newTaskMinutes}
                    onChange={e => setNewTaskMinutes(parseInt(e.target.value, 10) || 25)}
                    className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newTaskDifficulty}
                    onChange={e => setNewTaskDifficulty(e.target.value as any)}
                    className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-sans"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                    XP Reward
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newTaskXp}
                    onChange={e => setNewTaskXp(parseInt(e.target.value, 10) || 20)}
                    className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-stone-900 bg-stone-900 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                >
                  Add to Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
