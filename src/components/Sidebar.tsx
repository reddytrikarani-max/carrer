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
  BookOpen,
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
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'careertwin', label: 'Career Twin', icon: Cpu, badge: `${careerTwin.careerReadiness}%` },
    { id: 'simulator', label: 'Career Simulator', icon: Compass },
    { id: 'skillgap', label: 'Skill Gap', icon: GitPullRequestDraft },
    { id: 'roadmap', label: 'Syllabus Roadmap', icon: MapPin },
    {
      id: 'missions',
      label: "Daily Mission",
      icon: CheckSquare,
      badge: pendingMissionsCount > 0 ? `${pendingMissionsCount}` : undefined,
      badgeColor: 'border border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-300',
    },
    { id: 'careerteam', label: 'AI Advisory Team', icon: Users2 },
    { id: 'chat', label: 'Lead Mentor AI', icon: Bot, isHighlight: true },
    { id: 'projects', label: 'Project Blueprints', icon: FolderGit2 },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'interview', label: 'Mock Interview', icon: Mic2 },
    { id: 'focus', label: 'Focus Sprints', icon: Timer },
    { id: 'progress', label: 'Velocity Analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-stone-200/80 bg-[#FAF8F5] dark:border-stone-800/80 dark:bg-[#0C0A09] transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Area */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-stone-200/80 dark:border-stone-800/80">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              onClose();
            }}
            className="flex items-baseline gap-2 text-left group"
          >
            <span className="font-serif text-xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              CareerPilot <span className="italic text-amber-800 dark:text-amber-400">AI</span>
            </span>
          </button>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 md:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active Goal Banner (Editorial Dossier Style) */}
        <div className="mx-3 mt-3 border border-stone-300/80 bg-stone-100/50 p-3 dark:border-stone-800 dark:bg-stone-900/50">
          <div className="font-mono text-[9px] uppercase tracking-widest text-stone-500">
            Target Track
          </div>
          <div className="mt-0.5 truncate font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
            {profile.targetCareer}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
            <span className="font-serif italic">Readiness Bar</span>
            <span className="font-mono tabular-nums font-bold text-amber-900 dark:text-amber-300">
              {careerTwin.careerReadiness}%
            </span>
          </div>
          <div className="mt-1 h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-stone-900 dark:bg-stone-100 transition-all duration-500"
              style={{ width: `${careerTwin.careerReadiness}%` }}
            />
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
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
                className={`group flex w-full items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isActive
                    ? 'border-l-2 border-stone-900 bg-stone-200/50 text-stone-900 font-medium dark:border-stone-100 dark:bg-stone-800/60 dark:text-stone-100'
                    : item.isHighlight
                    ? 'text-amber-900 hover:bg-stone-100 dark:text-amber-300 dark:hover:bg-stone-900'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-100 font-normal'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate font-serif">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-stone-900 dark:text-stone-100'
                        : item.isHighlight
                        ? 'text-amber-800 dark:text-amber-400'
                        : 'text-stone-400 group-hover:text-stone-600 dark:text-stone-500 dark:group-hover:text-stone-300'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 font-mono text-[10px] tabular-nums ${
                      isActive
                        ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                        : item.badgeColor || 'border border-stone-200 text-stone-600 dark:border-stone-800 dark:text-stone-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Topics to Revisit Archival Note */}
        {memoryRevisitCount > 0 && (
          <div className="mx-3 mb-2 border border-amber-300/80 bg-amber-50/60 p-2.5 dark:border-amber-900/50 dark:bg-amber-950/20">
            <div className="flex items-center justify-between text-[11px] font-serif font-medium text-amber-950 dark:text-amber-300">
              <span className="italic">Curatorial Memory</span>
              <span className="font-mono text-[10px] font-bold text-amber-800 dark:text-amber-400">
                {memoryRevisitCount} flagged
              </span>
            </div>
            <p className="mt-1 line-clamp-1 font-serif text-[11px] text-amber-900/80 dark:text-amber-400/80">
              {knowledgeMemory[0]?.topic}
            </p>
          </div>
        )}

        {/* User Monograph Footer */}
        <div className="border-t border-stone-200/80 p-3 dark:border-stone-800/80">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center border border-stone-300 bg-stone-200 font-serif text-xs font-bold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
              {profile.name.charAt(0) || 'D'}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate font-serif text-xs font-medium text-stone-900 dark:text-stone-100">
                {profile.name}
              </div>
              <div className="truncate font-mono text-[10px] text-stone-500">
                {profile.degree} · {profile.branch} ({profile.currentYear})
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
