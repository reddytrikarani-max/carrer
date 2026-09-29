import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Sparkles,
  ArrowRight,
  CheckSquare,
  Cpu,
  GitPullRequestDraft,
  MapPin,
  Users2,
  FolderGit2,
  RotateCcw,
  BarChart3,
  Clock,
  Flame,
  Award,
  AlertCircle,
  Play,
  CheckCircle2,
  Bot,
} from 'lucide-react';
import { QuizModal } from './QuizModal';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const {
    profile,
    careerTwin,
    activeCareerRole,
    missions,
    toggleMission,
    roadmap,
    knowledgeMemory,
    projects,
  } = useCareerPilot();

  const [activeQuizNode, setActiveQuizNode] = useState<{ id: string; title: string } | null>(null);

  // Current active roadmap node
  const activeRoadmapNode =
    roadmap.find(r => r.status === 'in-progress' || r.status === 'revision-required') ||
    roadmap.find(r => r.status === 'recommended') ||
    roadmap[0];

  const recommendedProject = projects[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Greeting & Key Metrics */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-r from-white via-indigo-50/20 to-white p-6 shadow-xs dark:border-slate-800 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Personal Career Command Center</span>
            </div>
            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Good Morning, {profile.name}
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {profile.degree} in {profile.branch} ({profile.currentYear}) · {profile.college}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('careertwin')}
              className="flex items-center gap-3 rounded-xl border border-indigo-200/80 bg-indigo-50/80 px-4 py-2.5 dark:border-indigo-900/60 dark:bg-indigo-950/40 text-left transition-colors hover:border-indigo-300"
            >
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Target Career
                </span>
                <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                  {profile.targetCareer}
                </span>
              </div>
              <div className="h-8 w-px bg-indigo-200 dark:bg-indigo-800" />
              <div>
                <span className="block text-[10px] text-slate-500">Readiness</span>
                <span className="block font-mono text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                  {careerTwin.careerReadiness}%
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Stat Ribbon */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {profile.streakDays} Days
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Daily Study Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {profile.xp} XP · {profile.level}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Rank Progress</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {profile.weeklyHours} hrs
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Weekly Learning</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {profile.completedTasksCount} Tasks
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Milestones Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Today's Mission & Adaptive Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Mission Widget */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Today's Mission
                </h2>
                <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {profile.studyTime} Focus
                </span>
              </div>
              <button
                onClick={() => onNavigate('missions')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {missions.slice(0, 4).map(mission => (
                <div
                  key={mission.id}
                  onClick={() => toggleMission(mission.id)}
                  className={`group flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                    mission.completed
                      ? 'border-emerald-200 bg-emerald-50/40 opacity-75 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={mission.completed}
                      onChange={() => toggleMission(mission.id)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span
                        className={`text-xs font-medium block ${
                          mission.completed
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {mission.title}
                      </span>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{mission.category}</span>
                        <span>·</span>
                        <span className="font-mono">{mission.durationMinutes} min</span>
                        <span>·</span>
                        <span>{mission.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs font-bold tabular-nums rounded px-2 py-0.5 ${
                      mission.completed
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                    }`}
                  >
                    +{mission.xp} XP
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="text-[11px] text-slate-500">
                Completed {missions.filter(m => m.completed).length} of {missions.length} daily goals
              </span>
              <button
                onClick={() => onNavigate('focus')}
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Start Focus Timer</span>
              </button>
            </div>
          </div>

          {/* Current Adaptive Roadmap Module */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Current Roadmap Module
                </h2>
              </div>
              <button
                onClick={() => onNavigate('roadmap')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center gap-1"
              >
                <span>Full Roadmap</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {activeRoadmapNode && (
              <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 dark:border-indigo-950 dark:bg-indigo-950/20">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                    {activeRoadmapNode.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    Est. {activeRoadmapNode.estimatedHours} hours
                  </span>
                </div>

                <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-slate-100">
                  {activeRoadmapNode.title}
                </h3>

                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {activeRoadmapNode.whyItMatters}
                </p>

                {/* 4 Stages Snapshot */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="rounded-lg bg-white p-2 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">1. Learn</div>
                    <div className="truncate text-slate-500">{activeRoadmapNode.fourStages.learn}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">2. Practice</div>
                    <div className="truncate text-slate-500">{activeRoadmapNode.fourStages.practice}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">3. Apply</div>
                    <div className="truncate text-slate-500">{activeRoadmapNode.fourStages.apply}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">4. Test</div>
                    <div className="truncate text-slate-500">{activeRoadmapNode.fourStages.test}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500">
                    {activeRoadmapNode.score ? (
                      <span>Last Diagnostic Score: <strong className="font-mono text-slate-900 dark:text-slate-100">{activeRoadmapNode.score}%</strong></span>
                    ) : (
                      <span>Not yet evaluated</span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveQuizNode({ id: activeRoadmapNode.id, title: activeRoadmapNode.title })}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Take Adaptive Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Capstone Project */}
          {recommendedProject && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Recommended Project of the Week
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center gap-1"
                >
                  <span>Project Hub</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    {recommendedProject.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">{recommendedProject.duration}</span>
                </div>
                <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-slate-100">
                  {recommendedProject.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {recommendedProject.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {recommendedProject.skillsLearned.map(skill => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 span): Career Twin Snapshot, Skill Gap, Topics to Revisit, AI Team */}
        <div className="space-y-6">
          {/* Career Twin Snapshot */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Career Twin Snapshot
                </h2>
              </div>
              <button
                onClick={() => onNavigate('careertwin')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Inspect
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              {/* Circular Readiness Gauge */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600 dark:text-indigo-500 transition-all duration-1000"
                    strokeDasharray={`${careerTwin.careerReadiness}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {careerTwin.careerReadiness}%
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {activeCareerRole.title}
                </div>
                <div className="text-slate-500">
                  Strong: <span className="font-medium text-emerald-600 dark:text-emerald-400">{careerTwin.strongSkills.slice(0, 2).join(', ') || 'SQL, Git'}</span>
                </div>
                <div className="text-slate-500">
                  Critical Gaps: <span className="font-medium text-amber-600 dark:text-amber-400">{careerTwin.weakSkills.slice(0, 2).join(', ') || 'Java, DSA'}</span>
                </div>
              </div>
            </div>

            {/* Quick Skills breakdown mini */}
            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800 text-xs">
              {careerTwin.skillsBreakdown.slice(0, 4).map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{s.name}</span>
                    <span className="font-mono text-slate-500">{s.current}% / {s.target}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        s.current >= s.target ? 'bg-emerald-500' : s.current >= 50 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${s.current}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics to Revisit (Knowledge Memory) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Topics to Revisit
                </h2>
              </div>
              <span className="font-mono text-xs font-semibold text-amber-600">
                {knowledgeMemory.length}
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {knowledgeMemory.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3 text-xs dark:border-amber-950/60 dark:bg-amber-950/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {item.topic}
                    </span>
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                      {item.mastery}%
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Career Team Quick Launcher */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Users2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Your AI Career Team
                </h2>
              </div>
              <button
                onClick={() => onNavigate('careerteam')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Meet All 8
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('chat')}
                className="rounded-xl border border-slate-200 p-2.5 text-left hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-indigo-600 dark:text-indigo-400">CareerPilot</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">Lead AI Career Mentor</div>
              </button>

              <button
                onClick={() => onNavigate('careerteam')}
                className="rounded-xl border border-slate-200 p-2.5 text-left hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-cyan-600 dark:text-cyan-400">Learning Agent</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">Pacing & Study Blocks</div>
              </button>

              <button
                onClick={() => onNavigate('careerteam')}
                className="rounded-xl border border-slate-200 p-2.5 text-left hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-rose-600 dark:text-rose-400">Resume Agent</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">ATS & Consistency</div>
              </button>

              <button
                onClick={() => onNavigate('interview')}
                className="rounded-xl border border-slate-200 p-2.5 text-left hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-bold text-blue-600 dark:text-blue-400">Interview Agent</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">Mock STAR Rounds</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuizNode && (
        <QuizModal
          nodeId={activeQuizNode.id}
          topic={activeQuizNode.title}
          isOpen={!!activeQuizNode}
          onClose={() => setActiveQuizNode(null)}
        />
      )}
    </div>
  );
};
