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
  const { profile, careerRoles, switchCareerRole } = useCareerPilot();
  const [selectedRoleTitle, setSelectedRoleTitle] = useState(profile.targetCareer);

  const selectedRole =
    careerRoles.find(r => r.title.toLowerCase() === selectedRoleTitle.toLowerCase()) ||
    careerRoles[0];

  const isCurrentActive = profile.targetCareer.toLowerCase() === selectedRole.title.toLowerCase();

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
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
            <span>Specialization Simulator</span>
            <span aria-hidden="true">/</span>
            <span>Plate V</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
            Career Simulator
          </h1>
          <p className="mt-3 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Examine market demand, curriculum prerequisites, and compensation benchmarks before committing your academic preparation.
          </p>
        </div>

        {/* Career Selection Tabs (Editorial Tabular Buttons) */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
          {careerRoles.map(role => {
            const isSelected = selectedRole.title.toLowerCase() === role.title.toLowerCase();
            const match = computeMatchForRole(role.title);
            const isCurrent = profile.targetCareer.toLowerCase() === role.title.toLowerCase();

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleTitle(role.title)}
                className={`flex items-baseline gap-2.5 border px-3.5 py-2 font-serif text-xs transition-all ${
                  isSelected
                    ? 'border-stone-900 bg-stone-900 text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'border-stone-300 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{role.title}</span>
                <span className="font-mono text-[10px] font-bold opacity-70">
                  {match}%
                </span>
                {isCurrent && (
                  <span className="font-mono text-[9px] uppercase tracking-wider underline">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Career Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): Details & Requirements */}
        <div className="lg:col-span-2 space-y-8">
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-stone-200 pb-5 dark:border-stone-800">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
                  Track Overview
                </span>
                <h2 className="mt-1 font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                  {selectedRole.title}
                </h2>
                <p className="mt-1 font-serif text-xs italic text-stone-500">
                  "{selectedRole.tagline}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isCurrentActive ? (
                  <div className="border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-mono text-[11px] uppercase font-bold text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Active Target Track
                  </div>
                ) : (
                  <button
                    onClick={handleSetActive}
                    className="border border-stone-900 bg-stone-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                  >
                    <span>Set Active Goal</span>
                  </button>
                )}
              </div>
            </div>

            <p className="mt-5 font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {selectedRole.description}
            </p>

            {/* Quick Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-6 border-t border-stone-200 pt-5 dark:border-stone-800 text-xs">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">Compensation</span>
                <div className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {selectedRole.avgSalary}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">Market Demand</span>
                <div className="font-serif font-bold text-amber-900 dark:text-amber-300 mt-0.5">
                  {selectedRole.hiringDemand}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">Curriculum Pacing</span>
                <div className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {selectedRole.typicalTimeline}
                </div>
              </div>
            </div>

            {/* Required Skills Table */}
            <div className="mt-8">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-4">
                Prerequisite Competencies & Candidate Fit
              </h3>

              <div className="space-y-3">
                {selectedRole.requiredSkills.map(req => {
                  const userLevel = profile.skills[req.skill] || 'Beginner';
                  let currentPct = 20;
                  if (userLevel === 'Advanced') currentPct = 95;
                  else if (userLevel === 'Intermediate') currentPct = 75;
                  else if (userLevel === 'Basic') currentPct = 50;
                  else if (userLevel === 'Beginner') currentPct = 35;

                  return (
                    <div
                      key={req.skill}
                      className="border border-stone-200 bg-white p-3.5 text-xs dark:border-stone-800 dark:bg-stone-950 font-serif"
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-stone-900 dark:text-stone-100">
                            {req.skill}
                          </span>
                          {req.critical && (
                            <span className="border border-amber-800/30 px-1.5 py-0.2 font-mono text-[9px] uppercase font-bold text-amber-900 dark:border-amber-700 dark:text-amber-400">
                              Core Requirement
                            </span>
                          )}
                        </div>

                        <div className="font-mono text-[11px]">
                          <span className="text-stone-400">Assessed: </span>
                          <strong className="text-stone-800 dark:text-stone-200">{userLevel}</strong>
                          <span className="text-stone-400"> (Standard: {req.targetLevel})</span>
                        </div>
                      </div>

                      <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                        <div
                          className="h-full bg-stone-900 dark:bg-stone-100"
                          style={{ width: `${currentPct}%` }}
                        />
                      </div>

                      <div className="mt-1 flex justify-between font-mono text-[10px] text-stone-400">
                        <span>Current: {currentPct}%</span>
                        <span>Standard Bar: {req.minScore}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suggested Capstone Projects */}
            <div className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
                Suggested Capstone Monographs for {selectedRole.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {selectedRole.keyProjects.map(proj => (
                  <div
                    key={proj}
                    className="border border-stone-300/80 bg-stone-100/50 p-3.5 font-serif font-medium text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 leading-snug"
                  >
                    {proj}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Simulation Impact on Roadmap */}
        <div className="space-y-8">
          <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
            <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
              Pathway Match Calculation
            </h3>

            {/* Gauge */}
            <div className="mt-6 flex flex-col items-center justify-center text-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-200 dark:text-stone-800"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-stone-900 dark:text-stone-100 transition-all duration-500"
                    strokeDasharray={`${currentRoleMatch}, 100`}
                    strokeWidth="3"
                    strokeLinecap="butt"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {currentRoleMatch}%
                  </span>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-400">
                    Match
                  </span>
                </div>
              </div>

              <div className="mt-4 font-serif italic text-xs text-stone-500">
                Calculated across your {Object.keys(profile.skills).length} evaluated skills
              </div>
            </div>

            {/* Dynamic Roadmap Impact Notice */}
            <div className="mt-6 border-l-2 border-stone-400 pl-4 py-1 text-xs font-serif text-stone-700 dark:text-stone-300">
              <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                Curricular Recalibration:
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                Switching tracks automatically reweights your daily missions and alters roadmap milestones to target {selectedRole.title} interview patterns.
              </p>
            </div>

            {!isCurrentActive && (
              <button
                onClick={handleSetActive}
                className="mt-6 w-full border border-stone-900 bg-stone-900 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
              >
                Switch Active Track to {selectedRole.title}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
