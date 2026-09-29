import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { SkillLevel } from '../types';
import {
  GraduationCap,
  Layers,
  Target,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  X,
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_SKILLS = [
  'Java',
  'Python',
  'C',
  'JavaScript',
  'HTML/CSS',
  'SQL',
  'DSA',
  'Git/GitHub',
  'Communication',
  'Aptitude',
  'Problem Solving',
];

const CAREER_GOAL_OPTIONS = [
  'Software Developer',
  'Full Stack Developer',
  'Data Analyst',
  'AI/ML Engineer',
  'Cloud Engineer',
  'Cybersecurity',
  'Banking',
  'Government Jobs',
  'Other',
];

const STUDY_TIME_OPTIONS = ['30 minutes', '1 hour', '2 hours', '3+ hours'];
const TIMELINE_OPTIONS = ['3 months', '6 months', '9 months', '12 months'];
const SKILL_LEVELS: SkillLevel[] = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profile, completeOnboarding } = useCareerPilot();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: profile.name || 'Alex Chen',
    college: profile.college || 'National Institute of Technology',
    degree: profile.degree || 'B.Tech',
    branch: profile.branch || 'CSE',
    currentYear: profile.currentYear || '3rd Year',
    cgpa: profile.cgpa || '8.4',
    gradYear: profile.gradYear || '2026',
    skills: { ...profile.skills },
    targetCareer: profile.targetCareer || 'Software Developer',
    customCareer: '',
    studyTime: profile.studyTime || '2 hours',
    timeline: profile.timeline || '6 months',
  });

  if (!isOpen) return null;

  const handleSkillLevelChange = (skill: string, level: SkillLevel) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: level,
      },
    }));
  };

  const handleFinish = () => {
    const finalCareer =
      formData.targetCareer === 'Other' && formData.customCareer.trim()
        ? formData.customCareer.trim()
        : formData.targetCareer;

    completeOnboarding({
      name: formData.name,
      college: formData.college,
      degree: formData.degree,
      branch: formData.branch,
      currentYear: formData.currentYear,
      cgpa: formData.cgpa,
      gradYear: formData.gradYear,
      skills: formData.skills,
      targetCareer: finalCareer,
      studyTime: formData.studyTime,
      timeline: formData.timeline,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Career Calibration Studio</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
              {step === 1 && 'Step 1 — Academic Background'}
              {step === 2 && 'Step 2 — Current Technical & Soft Skills'}
              {step === 3 && 'Step 3 — Target Career Goal'}
              {step === 4 && 'Step 4 — Available Daily Study Time'}
              {step === 5 && 'Step 5 — Target Career Timeline'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="mt-4 flex items-center justify-between gap-2">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step 1: Education */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="e.g. Alex Chen"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={e => setFormData({ ...formData, college: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="e.g. National Institute of Tech"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="e.g. B.Tech / B.E. / BCA / MCA"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Branch / Major
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="e.g. CSE / IT / ECE"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Current Year
                </label>
                <select
                  value={formData.currentYear}
                  onChange={e => setFormData({ ...formData, currentYear: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year (Final Year)</option>
                  <option value="Graduated">Recent Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  CGPA / Percentage
                </label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="e.g. 8.4"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={formData.gradYear}
                  onChange={e => setFormData({ ...formData, gradYear: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="e.g. 2026"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {step === 2 && (
          <div className="mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Select your current proficiency level for key competencies. This calibrates your baseline Career Twin.
            </p>

            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
              {AVAILABLE_SKILLS.map(skill => {
                const currentLevel = formData.skills[skill] || 'Beginner';
                return (
                  <div
                    key={skill}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800 dark:bg-slate-800/40 gap-2"
                  >
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {skill}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {SKILL_LEVELS.map(lvl => {
                        const isSelected = currentLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleSkillLevelChange(skill, lvl)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Career Goal */}
        {step === 3 && (
          <div className="mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Choose your target destination. CareerPilot will build an adaptive roadmap with real hiring expectations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {CAREER_GOAL_OPTIONS.map(role => {
                const isSelected = formData.targetCareer === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, targetCareer: role })}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:hover:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{role}</span>
                    {isSelected && <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>

            {formData.targetCareer === 'Other' && (
              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Specify Custom Career Goal
                </label>
                <input
                  type="text"
                  value={formData.customCareer}
                  onChange={e => setFormData({ ...formData, customCareer: e.target.value })}
                  placeholder="e.g. Embedded Firmware Engineer"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Study Time */}
        {step === 4 && (
          <div className="mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              How much focused time can you realistically invest every day? This tunes the daily missions and milestone pacing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDY_TIME_OPTIONS.map(time => {
                const isSelected = formData.studyTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, studyTime: time })}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <div className="font-semibold text-sm">{time}</div>
                      <div className="text-[11px] text-slate-500">per day</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Timeline */}
        {step === 5 && (
          <div className="mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              What is your target placement or readiness deadline?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIMELINE_OPTIONS.map(time => {
                const isSelected = formData.timeline === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeline: time })}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <div className="font-semibold text-sm">{time}</div>
                      <div className="text-[11px] text-slate-500">to become job-ready</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <span>Continue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate My Career Twin</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
