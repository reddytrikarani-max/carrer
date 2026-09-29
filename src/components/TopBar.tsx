import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Sun,
  Moon,
  Flame,
  Award,
  RotateCcw,
  Sparkles,
  Menu,
} from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
  onOpenOnboarding: () => void;
  activeTab: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  onOpenOnboarding,
  activeTab,
}) => {
  const { profile, careerTwin, theme, toggleTheme, resetToDemo } = useCareerPilot();

  const getBreadcrumbTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Overview';
      case 'careertwin':
        return 'Your Career Twin';
      case 'simulator':
        return 'Career Simulator';
      case 'skillgap':
        return 'AI Skill Gap Analyzer';
      case 'roadmap':
        return 'Adaptive AI Roadmap';
      case 'missions':
        return "Today's Mission";
      case 'careerteam':
        return 'Your AI Career Team';
      case 'chat':
        return 'CareerPilot AI';
      case 'projects':
        return 'AI Project Builder';
      case 'resume':
        return 'Resume Analyzer & Consistency Check';
      case 'interview':
        return 'AI Mock Interview';
      case 'focus':
        return 'Focus Mode';
      case 'progress':
        return 'Progress Analytics';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 md:px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      {/* Zone 1: Mobile Toggle & Contextual Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            CareerPilot
          </span>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="font-medium text-slate-600 dark:text-slate-400">
            {getBreadcrumbTitle(activeTab)}
          </span>
        </div>
      </div>

      {/* Zone 2: Status & Gamification Stats */}
      <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
        {/* Streak */}
        <div className="flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-amber-600 dark:text-amber-400">
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-mono tabular-nums font-semibold">{profile.streakDays}d</span>
          <span className="text-slate-500 dark:text-slate-400">streak</span>
        </div>

        {/* XP & Level */}
        <div className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-indigo-600 dark:text-indigo-400">
          <Award className="h-4 w-4 text-indigo-500" />
          <span className="font-mono tabular-nums font-semibold">{profile.xp} XP</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>{profile.level}</span>
        </div>

        {/* Career Readiness */}
        <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          <span>Readiness:</span>
          <span className="font-mono tabular-nums font-bold">{careerTwin.careerReadiness}%</span>
        </div>
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>

        <button
          onClick={resetToDemo}
          className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
          title="Reset to default demo student"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Demo</span>
        </button>

        <button
          onClick={onOpenOnboarding}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <span>Recalibrate Path</span>
        </button>

        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-xs font-bold text-white shadow-inner">
          {profile.name.charAt(0) || 'D'}
        </div>
      </div>
    </header>
  );
};
