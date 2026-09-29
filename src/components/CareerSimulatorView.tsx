import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Zap,
  Check,
  FolderGit2,
} from 'lucide-react';

interface CareerSimulatorViewProps {
  onNavigate: (tab: string) => void;
}

export const CareerSimulatorView: React.FC<CareerSimulatorViewProps> = ({ onNavigate }) => {
  const { profile, careerRoles, switchCareerRole, careerTwin } = useCareerPilot();
  const [selectedRoleTitle, setSelectedRoleTitle] = useState(profile.targetCareer);

  const selectedRole =
    careerRoles.find(r => r.title.toLowerCase() === selectedRoleTitle.toLowerCase()) ||
    careerRoles[0];

  const isCurrentActive = profile.targetCareer.toLowerCase() === selectedRole.title.toLowerCase();

  // Compute simulate match percentage for the selected role
  const computeMatchForRole = (roleTitle: string) => {
    const role = careerRoles.find(r => r.title.toLowerCase() === roleTitle.toLowerCase());
    if (!role) return 50;

    let totalScore = 0;
    let maxScore = role.requiredSkills.length * 100;

    role.requiredSkills.forEach(req => {
      const userLevel = profile.skills[req.skill];
      let userScore = 20;
      if (userLevel === 'Advanced') userScore = 95;
      else if (userLevel === 'Intermediate') userScore = 75;
      else if (userLevel === 'Basic') userScore = 50;
      else if (userLevel === 'Beginner') userScore = 35;
      totalScore += Math.min(100, userScore);
    });

    return Math.min(100, Math.round((totalScore / maxScore) * 100));
  };

  const currentRoleMatch = computeMatchForRole(selectedRole.title);

  const handleSetActive = () => {
    switchCareerRole(selectedRole.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Compass className="h-4 w-4" />
            <span>Interactive Pathway Simulator</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Career Simulator
          </h1>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Test drive different tech specializations before committing. Compare hiring criteria, required tech stacks, compensation benchmarks, and your current capability match.
          </p>
        </div>

        {/* Career Selection Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {careerRoles.map(role => {
            const isSelected = selectedRole.title.toLowerCase() === role.title.toLowerCase();
            const match = computeMatchForRole(role.title);
            const isCurrent = profile.targetCareer.toLowerCase() === role.title.toLowerCase();

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleTitle(role.title)}
                className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:hover:border-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{role.title}</span>
                <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500">
                  {match}%
                </span>
                {isCurrent && (
                  <span className="rounded bg-indigo-600 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Career Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Details & Requirements */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-[11px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  Specialization Overview
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedRole.title}
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {selectedRole.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isCurrentActive ? (
                  <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Check className="h-4 w-4" />
                    <span>Active Target Career</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSetActive}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Set as Active Goal</span>
                  </button>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedRole.description}
            </p>

            {/* Quick Metrics */}
            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Avg. Compensation</span>
                <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedRole.avgSalary}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">Hiring Demand</span>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {selectedRole.hiringDemand}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">Typical Prep Timeline</span>
                <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedRole.typicalTimeline}
                </div>
              </div>
            </div>

            {/* Required Skills Table */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                Required Competencies & Your Current Match
              </h3>

              <div className="space-y-3">
                {selectedRole.requiredSkills.map(req => {
                  const userLevel = profile.skills[req.skill] || 'Beginner';
                  let currentPct = 20;
                  if (userLevel === 'Advanced') currentPct = 95;
                  else if (userLevel === 'Intermediate') currentPct = 75;
                  else if (userLevel === 'Basic') currentPct = 50;
                  else if (userLevel === 'Beginner') currentPct = 35;

                  const isGap = currentPct < req.minScore;

                  return (
                    <div
                      key={req.skill}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {req.skill}
                          </span>
                          {req.critical && (
                            <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[9px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                              Critical Bar
                            </span>
                          )}
                        </div>

                        <div className="text-[11px]">
                          <span className="text-slate-500">Your Level: </span>
                          <strong className="text-slate-800 dark:text-slate-200">{userLevel}</strong>
                          <span className="text-slate-400"> (Target: {req.targetLevel})</span>
                        </div>
                      </div>

                      <div className="h-2 w-full bg-slate-200/80 rounded-full dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            currentPct >= req.minScore ? 'bg-emerald-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${currentPct}%` }}
                        />
                      </div>

                      <div className="mt-1 flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Current: {currentPct}%</span>
                        <span>Target Bar: {req.minScore}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suggested Capstone Projects for this career */}
            <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                <FolderGit2 className="h-4 w-4 text-purple-600" />
                <span>Suggested Portfolio Projects for {selectedRole.title}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {selectedRole.keyProjects.map(proj => (
                  <div
                    key={proj}
                    className="rounded-xl border border-purple-100 bg-purple-50/40 p-3 text-purple-950 dark:border-purple-950 dark:bg-purple-950/20 dark:text-purple-200 font-medium"
                  >
                    {proj}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Simulation Impact on Roadmap */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Role Match Simulation
            </h3>

            {/* Gauge */}
            <div className="mt-5 flex flex-col items-center justify-center text-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600 dark:text-indigo-400 transition-all duration-500"
                    strokeDasharray={`${currentRoleMatch}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {currentRoleMatch}%
                  </span>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">
                    Match
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Based on your current {Object.keys(profile.skills).length} evaluated skills
              </div>
            </div>

            {/* Dynamic Roadmap Impact Notice */}
            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-xs dark:border-indigo-950 dark:bg-indigo-950/20">
              <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                <span>Adaptive Switch Impact</span>
              </div>
              <p className="mt-1.5 text-slate-600 dark:text-slate-400 leading-relaxed">
                If you activate <strong>{selectedRole.title}</strong>, CareerPilot will:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
                <li>Re-weight daily missions for {selectedRole.requiredSkills[0]?.skill || 'core requirements'}</li>
                <li>Recalculate Career Twin readiness to {currentRoleMatch}%</li>
                <li>Reorder roadmap nodes to prioritize specialized competencies</li>
              </ul>
            </div>

            {!isCurrentActive && (
              <button
                onClick={handleSetActive}
                className="mt-6 w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Switch Active Target to {selectedRole.title}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
