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
        return 'The Career Twin';
      case 'simulator':
        return 'Pathway Simulator';
      case 'skillgap':
        return 'Skill Delta Engine';
      case 'roadmap':
        return 'Adaptive Syllabus';
      case 'missions':
        return "Daily Mission";
      case 'careerteam':
        return 'The Advisory Collective';
      case 'chat':
        return 'Lead Mentor AI';
      case 'projects':
        return 'Production Blueprints';
      case 'resume':
        return 'Resume & Claim Consistency';
      case 'interview':
        return 'Placement Rehearsal';
      case 'focus':
        return 'Deep Work Session';
      case 'progress':
        return 'Telemetry & Velocity';
      case 'n8n':
        return 'n8n Cloud Automation';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200/80 bg-[#FAF8F5]/90 px-4 md:px-6 backdrop-blur-md dark:border-stone-800/80 dark:bg-[#0C0A09]/90 transition-colors">
      {/* Zone 1: Mobile Toggle & Contextual Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-stone-500 hover:bg-stone-200/60 hover:text-stone-900 md:hidden dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-baseline gap-2 text-sm">
          <span className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 tracking-tight">
            CareerPilot <span className="italic font-normal text-amber-800 dark:text-amber-400">AI</span>
          </span>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <span className="font-serif italic text-xs text-stone-600 dark:text-stone-400">
            {getBreadcrumbTitle(activeTab)}
          </span>
        </div>
      </div>

      {/* Zone 2: Status & Gamification Stats (Editorial Tabular Style) */}
      <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
        {/* Streak */}
        <div className="flex items-center gap-1.5 border border-stone-200 bg-white/80 px-2.5 py-1 text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
          <Flame className="h-3.5 w-3.5 fill-amber-600 text-amber-600" />
          <span className="font-mono tabular-nums font-bold">{profile.streakDays}d</span>
          <span className="text-stone-400 text-[11px]">streak</span>
        </div>

        {/* XP & Level */}
        <div className="flex items-center gap-1.5 border border-stone-200 bg-white/80 px-2.5 py-1 text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
          <Award className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
          <span className="font-mono tabular-nums font-bold">{profile.xp} XP</span>
          <span className="text-stone-300 dark:text-stone-700">·</span>
          <span className="font-serif italic">{profile.level}</span>
        </div>

        {/* Career Readiness */}
        <div className="flex items-center gap-1.5 border border-stone-200 bg-stone-100/70 px-2.5 py-1 text-stone-900 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100">
          <span className="text-stone-500 font-serif italic text-[11px]">Readiness:</span>
          <span className="font-mono tabular-nums font-bold text-amber-900 dark:text-amber-300">
            {careerTwin.careerReadiness}%
          </span>
        </div>
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-stone-500 hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100 transition-colors"
          title={theme === 'dark' ? 'Switch to light paper' : 'Switch to dark gallery'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-stone-700" />}
        </button>

        <button
          onClick={resetToDemo}
          className="hidden lg:flex items-center gap-1.5 border border-stone-300 px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
          title="Reset to default candidate archive"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>

        <button
          onClick={onOpenOnboarding}
          className="border border-stone-900 bg-stone-900 px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
        >
          Recalibrate
        </button>

        <div className="ml-1 flex h-8 w-8 items-center justify-center border border-stone-300 bg-stone-200 font-serif text-xs font-bold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
          {profile.name.charAt(0) || 'D'}
        </div>
      </div>
    </header>
  );
};
