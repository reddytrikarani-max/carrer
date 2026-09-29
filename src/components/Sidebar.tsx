import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  LayoutDashboard,
  Cpu,
  Compass,
  GitPullRequestDraft,
  MapPin,
  CheckSquare,
  Users2,
  Bot,
  FolderGit2,
  FileText,
  Mic2,
  Timer,
  BarChart3,
  X,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}) => {
  const { profile, careerTwin, missions, knowledgeMemory } = useCareerPilot();

  const pendingMissionsCount = missions.filter(m => !m.completed).length;
  const memoryRevisitCount = knowledgeMemory.filter(k => k.status === 'Needs Revision').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'careertwin', label: 'Career Twin', icon: Cpu, badge: `${careerTwin.careerReadiness}%` },
    { id: 'simulator', label: 'Career Simulator', icon: Compass },
    { id: 'skillgap', label: 'Skill Gap', icon: GitPullRequestDraft },
    { id: 'roadmap', label: 'Roadmap', icon: MapPin },
    {
      id: 'missions',
      label: "Today's Mission",
      icon: CheckSquare,
      badge: pendingMissionsCount > 0 ? `${pendingMissionsCount}` : undefined,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    { id: 'careerteam', label: 'AI Career Team', icon: Users2 },
    { id: 'chat', label: 'CareerPilot AI', icon: Bot, isHighlight: true },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'interview', label: 'Mock Interview', icon: Mic2 },
    { id: 'focus', label: 'Focus Mode', icon: Timer },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Area */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              onClose();
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm group-hover:bg-indigo-500 transition-colors">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="block text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
                CareerPilot AI
              </span>
              <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Student Career Mentor
              </span>
            </div>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active Goal Banner */}
        <div className="mx-3 mt-3 rounded-lg border border-indigo-100 bg-indigo-50/60 p-3 dark:border-indigo-950/60 dark:bg-indigo-950/20">
          <div className="text-[11px] font-medium uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            Target Career
          </div>
          <div className="mt-0.5 truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
            {profile.targetCareer}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Readiness</span>
            <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
              {careerTwin.careerReadiness}%
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-indigo-200/50 dark:bg-indigo-950">
            <div
              className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
              style={{ width: `${careerTwin.careerReadiness}%` }}
            />
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : item.isHighlight
                    ? 'text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : item.isHighlight
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Topics to Revisit Indicator if items exist */}
        {memoryRevisitCount > 0 && (
          <div className="mx-3 mb-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 dark:border-amber-900/50 dark:bg-amber-950/20">
            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-800 dark:text-amber-300">
              <span>Topics to Revisit</span>
              <span className="rounded bg-amber-200/60 px-1 font-mono text-[10px] dark:bg-amber-900/60">
                {memoryRevisitCount}
              </span>
            </div>
            <p className="mt-1 line-clamp-1 text-[11px] text-amber-700 dark:text-amber-400">
              {knowledgeMemory[0]?.topic}
            </p>
          </div>
        )}

        {/* User Card */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              {profile.name.charAt(0) || 'D'}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                {profile.name}
              </div>
              <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                {profile.degree} · {profile.branch} ({profile.currentYear})
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
