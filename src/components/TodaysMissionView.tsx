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
      title: `⚡ AI Intervention: Revisit ${weakSkill} & write unit tests`,
      category: 'Diagnostic Revision',
      durationMinutes: 20,
      difficulty: 'Medium',
      xp: 30,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <CheckSquare className="h-4 w-4" />
              <span>Daily High-Leverage Execution</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Today's Mission
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Tuned to your target study window of <strong>{profile.studyTime}</strong> for{' '}
              <strong>{profile.targetCareer}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateAdaptiveMission}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>Generate AI Mission</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Custom Goal</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Tasks Finished</span>
            <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
              {completedCount} / {missions.length}
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[11px]">Daily XP Value</span>
            <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">
              +{totalXpAvailable} XP
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[11px]">Total Time Budget</span>
            <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
              {totalMinutes} mins
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[11px]">Current Streak</span>
            <div className="font-mono font-bold text-amber-600 text-sm mt-0.5 flex items-center gap-1">
              <Flame className="h-4 w-4 fill-current" />
              <span>{profile.streakDays} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {missions.map(mission => (
          <div
            key={mission.id}
            onClick={() => toggleMission(mission.id)}
            className={`group flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
              mission.completed
                ? 'border-emerald-200 bg-emerald-50/40 opacity-80 dark:border-emerald-950 dark:bg-emerald-950/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <input
                type="checkbox"
                checked={mission.completed}
                onChange={() => toggleMission(mission.id)}
                className="mt-0.5 sm:mt-0 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span
                  className={`text-sm font-semibold block ${
                    mission.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {mission.title}
                </span>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {mission.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-mono">{mission.durationMinutes} min</span>
                  </span>
                  <span>·</span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[10px] font-semibold ${
                      mission.difficulty === 'Hard'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : mission.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {mission.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-xs font-bold tabular-nums rounded px-2.5 py-1 ${
                  mission.completed
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                }`}
              >
                +{mission.xp} XP
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Launch Focus Mode Action Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 dark:border-indigo-950 dark:bg-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
            Ready to execute these tasks without distraction?
          </h3>
          <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-400">
            Launch Focus Mode to automatically divide your available time into structured Pomodoro blocks with timer.
          </p>
        </div>

        <button
          onClick={() => onNavigate('focus')}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors whitespace-nowrap"
        >
          <Play className="h-4 w-4 fill-current" />
          <span>Launch Focus Session</span>
        </button>
      </div>

      {/* Add Custom Mission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Add Custom Daily Goal
            </h2>

            <form onSubmit={handleCreateMission} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Read Java Concurrency in Practice Ch. 3"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
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
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newTaskMinutes}
                    onChange={e => setNewTaskMinutes(parseInt(e.target.value, 10) || 25)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newTaskDifficulty}
                    onChange={e => setNewTaskDifficulty(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    XP Reward
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newTaskXp}
                    onChange={e => setNewTaskXp(parseInt(e.target.value, 10) || 20)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500"
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
