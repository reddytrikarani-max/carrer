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
  BookOpen,
  ExternalLink,
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

  const activeRoadmapNode =
    roadmap.find(r => r.status === 'in-progress' || r.status === 'revision-required') ||
    roadmap.find(r => r.status === 'recommended') ||
    roadmap[0];

  const recommendedProject = projects[0];

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* 1. Header Greeting & Dispatch Ribbon */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Candidate Dispatch</span>
              <span aria-hidden="true">/</span>
              <span>Academic Year 2026</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              Good Morning, {profile.name}
            </h1>
            <p className="mt-1 font-serif text-xs italic text-stone-500">
              {profile.degree} in {profile.branch} ({profile.currentYear}) · {profile.college}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('careertwin')}
              className="border border-stone-300 bg-stone-100/60 px-5 py-3 text-left transition-colors hover:border-stone-400 dark:border-stone-800 dark:bg-stone-800/60"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-500">
                Target Track
              </span>
              <span className="block font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                {profile.targetCareer}
              </span>
              <span className="block font-mono text-xs font-bold text-amber-900 dark:text-amber-300 mt-1">
                {careerTwin.careerReadiness}% Verified Readiness
              </span>
            </button>
          </div>
        </div>

        {/* Quick Stat Ribbon (Clean Editorial Row) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 text-xs">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-400">
              Daily Streak
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {profile.streakDays} Days
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Consecutive practice</div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-400">
              Candidate Tier
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {profile.xp} XP
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">{profile.level} Rank</div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-400">
              Weekly Volume
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {profile.weeklyHours} hrs
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Logged study time</div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-400">
              Milestones Solved
            </div>
            <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {profile.completedTasksCount} Completed
            </div>
            <div className="font-serif italic text-[11px] text-stone-500 mt-0.5">Verified diagnostic tasks</div>
          </div>
        </div>
      </div>

      {/* 2. Primary 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): Today's Mission & Adaptive Roadmap */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Mission Widget */}
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-baseline justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                  Today's Mission
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                  · {profile.studyTime} Daily Window
                </span>
              </div>
              <button
                onClick={() => onNavigate('missions')}
                className="font-serif text-xs italic text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 underline decoration-stone-300"
              >
                View Full Agenda
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {missions.slice(0, 4).map(mission => (
                <div
                  key={mission.id}
                  onClick={() => toggleMission(mission.id)}
                  className={`group flex items-center justify-between border p-3.5 cursor-pointer transition-all ${
                    mission.completed
                      ? 'border-stone-200 bg-stone-100/50 opacity-60 dark:border-stone-800 dark:bg-stone-950/40'
                      : 'border-stone-200 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={mission.completed}
                      onChange={() => toggleMission(mission.id)}
                      className="h-4 w-4 rounded-none border-stone-400 text-stone-900 focus:ring-0"
                    />
                    <div>
                      <span
                        className={`font-serif text-sm block ${
                          mission.completed
                            ? 'line-through text-stone-400'
                            : 'text-stone-900 dark:text-stone-100'
                        }`}
                      >
                        {mission.title}
                      </span>
                      <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2 mt-0.5">
                        <span>{mission.category}</span>
                        <span>·</span>
                        <span>{mission.durationMinutes} min</span>
                        <span>·</span>
                        <span>{mission.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300">
                    +{mission.xp} XP
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-800">
              <span className="font-serif text-xs italic text-stone-500">
                Completed {missions.filter(m => m.completed).length} of {missions.length} scheduled items
              </span>
              <button
                onClick={() => onNavigate('focus')}
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100 hover:text-amber-800"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Launch Deep Work Sprints</span>
              </button>
            </div>
          </div>

          {/* Current Adaptive Roadmap Module (Syllabus Dossier) */}
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-baseline justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-baseline gap-2">
                <h2 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                  Active Syllabus Milestone
                </h2>
                <span className="font-mono text-[10px] uppercase text-stone-400">· Stage In Progress</span>
              </div>
              <button
                onClick={() => onNavigate('roadmap')}
                className="font-serif text-xs italic text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 underline decoration-stone-300"
              >
                Full Syllabus
              </button>
            </div>

            {activeRoadmapNode && (
              <div className="mt-5 border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
                    {activeRoadmapNode.category}
                  </span>
                  <span className="font-mono text-xs text-stone-400">
                    Est. {activeRoadmapNode.estimatedHours} hours
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
                  {activeRoadmapNode.title}
                </h3>

                <p className="mt-1 font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {activeRoadmapNode.whyItMatters}
                </p>

                {/* 4 Stages Snapshot (Editorial Box Grid) */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="border border-stone-200 bg-stone-50/50 p-2.5 dark:border-stone-800 dark:bg-stone-950/40">
                    <div className="font-mono text-[10px] uppercase text-stone-500 font-bold">01. Learn</div>
                    <div className="truncate font-serif text-stone-700 dark:text-stone-300 mt-0.5">{activeRoadmapNode.fourStages.learn}</div>
                  </div>
                  <div className="border border-stone-200 bg-stone-50/50 p-2.5 dark:border-stone-800 dark:bg-stone-950/40">
                    <div className="font-mono text-[10px] uppercase text-stone-500 font-bold">02. Practice</div>
                    <div className="truncate font-serif text-stone-700 dark:text-stone-300 mt-0.5">{activeRoadmapNode.fourStages.practice}</div>
                  </div>
                  <div className="border border-stone-200 bg-stone-50/50 p-2.5 dark:border-stone-800 dark:bg-stone-950/40">
                    <div className="font-mono text-[10px] uppercase text-stone-500 font-bold">03. Apply</div>
                    <div className="truncate font-serif text-stone-700 dark:text-stone-300 mt-0.5">{activeRoadmapNode.fourStages.apply}</div>
                  </div>
                  <div className="border border-stone-200 bg-stone-50/50 p-2.5 dark:border-stone-800 dark:bg-stone-950/40">
                    <div className="font-mono text-[10px] uppercase text-stone-500 font-bold">04. Test</div>
                    <div className="truncate font-serif text-stone-700 dark:text-stone-300 mt-0.5">{activeRoadmapNode.fourStages.test}</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
                  <div className="font-mono text-xs text-stone-500">
                    {activeRoadmapNode.score ? (
                      <span>Diagnostic Score: <strong className="text-stone-900 dark:text-stone-100">{activeRoadmapNode.score}%</strong></span>
                    ) : (
                      <span>Diagnostic: Pending Verification</span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveQuizNode({ id: activeRoadmapNode.id, title: activeRoadmapNode.title })}
                    className="border border-stone-900 bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                  >
                    <span>Take Diagnostic Assessment</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Capstone Project */}
          {recommendedProject && (
            <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
              <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                    Recommended Capstone Monograph
                  </h2>
                  <span className="font-mono text-[10px] uppercase text-stone-400">· Selected Spec</span>
                </div>
                <button
                  onClick={() => onNavigate('projects')}
                  className="font-serif text-xs italic text-stone-600 hover:text-stone-900 dark:text-stone-400 underline decoration-stone-300"
                >
                  Blueprint Hub
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="border border-stone-300 px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-stone-700 dark:border-stone-700 dark:text-stone-300">
                    {recommendedProject.difficulty}
                  </span>
                  <span className="font-serif text-xs text-stone-500">{recommendedProject.duration}</span>
                </div>
                <h3 className="mt-2 font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                  {recommendedProject.title}
                </h3>
                <p className="mt-1 font-serif text-xs text-stone-600 dark:text-stone-400">
                  {recommendedProject.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {recommendedProject.skillsLearned.map(skill => (
                    <span
                      key={skill}
                      className="border border-stone-200 bg-stone-100/60 px-2 py-0.5 font-mono text-[10px] text-stone-700 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 span): Career Twin Snapshot & Dossier Notes */}
        <div className="space-y-8">
          {/* Career Twin Snapshot */}
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                The Career Twin
              </h2>
              <button
                onClick={() => onNavigate('careertwin')}
                className="font-serif text-xs italic text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline decoration-stone-300"
              >
                Inspect
              </button>
            </div>

            <div className="mt-5 flex items-center gap-5">
              {/* Circular Readiness Gauge with Antique Styling */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-200 dark:text-stone-800"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-900 dark:text-amber-300 transition-all duration-1000"
                    strokeDasharray={`${careerTwin.careerReadiness}, 100`}
                    strokeWidth="3"
                    strokeLinecap="butt"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                    {careerTwin.careerReadiness}%
                  </span>
                </div>
              </div>

              <div className="text-xs font-serif space-y-1">
                <div className="font-medium text-stone-900 dark:text-stone-100">
                  {activeCareerRole.title} Track
                </div>
                <div className="text-stone-500 text-[11px]">
                  Strong: <span className="text-stone-800 dark:text-stone-200 italic">{careerTwin.strongSkills.slice(0, 2).join(', ') || 'SQL, Git'}</span>
                </div>
                <div className="text-stone-500 text-[11px]">
                  Critical Gaps: <span className="text-amber-900 dark:text-amber-300 italic">{careerTwin.weakSkills.slice(0, 2).join(', ') || 'Java, DSA'}</span>
                </div>
              </div>
            </div>

            {/* Quick Skills breakdown mini */}
            <div className="mt-5 space-y-3 border-t border-stone-200 pt-4 dark:border-stone-800 text-xs">
              {careerTwin.skillsBreakdown.slice(0, 4).map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-[11px] font-serif mb-1">
                    <span className="text-stone-800 dark:text-stone-200 font-medium">{s.name}</span>
                    <span className="font-mono text-stone-500">{s.current}% / {s.target}%</span>
                  </div>
                  <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-stone-900 dark:bg-stone-100"
                      style={{ width: `${s.current}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics to Revisit (Knowledge Memory Ledger) */}
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                Knowledge Memory
              </h2>
              <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase">
                {knowledgeMemory.length} flagged
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {knowledgeMemory.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className="border border-stone-200 bg-white p-3 text-xs dark:border-stone-800 dark:bg-stone-900"
                >
                  <div className="flex items-center justify-between font-serif">
                    <span className="font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                      {item.topic}
                    </span>
                    <span className="font-mono text-[10px] text-amber-900 dark:text-amber-300 font-bold">
                      {item.mastery}%
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Career Advisory Team */}
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                The Advisory Collective
              </h2>
              <button
                onClick={() => onNavigate('careerteam')}
                className="font-serif text-xs italic text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline decoration-stone-300"
              >
                Meet All 8
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('chat')}
                className="border border-stone-200 bg-white p-3 text-left hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 transition-colors"
              >
                <div className="font-serif font-medium text-stone-900 dark:text-stone-100">CareerPilot</div>
                <div className="font-mono text-[10px] text-stone-400">Lead Mentor</div>
              </button>

              <button
                onClick={() => onNavigate('careerteam')}
                className="border border-stone-200 bg-white p-3 text-left hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 transition-colors"
              >
                <div className="font-serif font-medium text-stone-900 dark:text-stone-100">Learning Agent</div>
                <div className="font-mono text-[10px] text-stone-400">Pacing & Study</div>
              </button>

              <button
                onClick={() => onNavigate('careerteam')}
                className="border border-stone-200 bg-white p-3 text-left hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 transition-colors"
              >
                <div className="font-serif font-medium text-stone-900 dark:text-stone-100">Resume Agent</div>
                <div className="font-mono text-[10px] text-stone-400">ATS & Claims</div>
              </button>

              <button
                onClick={() => onNavigate('interview')}
                className="border border-stone-200 bg-white p-3 text-left hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 transition-colors"
              >
                <div className="font-serif font-medium text-stone-900 dark:text-stone-100">Interview Agent</div>
                <div className="font-mono text-[10px] text-stone-400">Mock Rounds</div>
              </button>
            </div>
          </div>

          {/* n8n Cloud Automation Integration Card */}
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-baseline justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                n8n Cloud Automation
              </h2>
              <span className="font-mono text-[10px] uppercase text-emerald-800 dark:text-emerald-400 font-bold">
                Linked
              </span>
            </div>

            <p className="mt-3 font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Workflow <code className="font-mono text-[10px] bg-stone-200/70 dark:bg-stone-800 px-1 py-0.5">Ew7nFj6ps20QqT5C</code> is configured to automate daily candidate dispatches and diagnostic sync.
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate('n8n')}
                className="flex-1 border border-stone-900 bg-stone-900 py-1.5 font-mono text-[11px] uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-center transition-colors"
              >
                Launch Hub
              </button>
              <a
                href="https://trikarani.app.n8n.cloud/workflow/Ew7nFj6ps20QqT5C"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stone-300 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 transition-colors inline-flex items-center gap-1"
              >
                <span>n8n</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Modal */}
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
