import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { SkillLevel } from '../types';
import {
  ArrowRight,
  ArrowLeft,
  Check,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-8 w-full max-w-2xl border border-stone-300 bg-[#FAF8F5] p-8 shadow-2xl dark:border-stone-800 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Candidate Dossier Calibration · Step 0{step} of 05
            </div>
            <h2 className="mt-1 font-serif text-2xl font-normal text-stone-900 dark:text-stone-100">
              {step === 1 && 'Academic Background & Coursework'}
              {step === 2 && 'Technical & Conceptual Proficiency'}
              {step === 3 && 'Target Engineering Specialization'}
              {step === 4 && 'Daily Study Capacity Allocation'}
              {step === 5 && 'Placement Readiness Target Horizon'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="mt-4 flex items-center justify-between gap-1.5">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className="flex-1">
              <div
                className={`h-0.5 transition-all duration-300 ${
                  s <= step ? 'bg-stone-900 dark:bg-stone-100' : 'bg-stone-200 dark:bg-stone-800'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step 1: Education */}
        {step === 1 && (
          <div className="mt-6 space-y-4 font-serif">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                  placeholder="e.g. Alex Chen"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={e => setFormData({ ...formData, college: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                  placeholder="e.g. National Institute of Tech"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                  placeholder="e.g. B.Tech / B.E."
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  Branch / Department
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                  placeholder="e.g. CSE / IT / ECE"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  Current Year
                </label>
                <select
                  value={formData.currentYear}
                  onChange={e => setFormData({ ...formData, currentYear: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year (Senior)</option>
                  <option value="Graduated">Recent Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  CGPA / Grade
                </label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                  placeholder="e.g. 8.4"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  Graduation Class Year
                </label>
                <input
                  type="text"
                  value={formData.gradYear}
                  onChange={e => setFormData({ ...formData, gradYear: e.target.value })}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                  placeholder="e.g. 2026"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {step === 2 && (
          <div className="mt-6">
            <p className="font-serif italic text-xs text-stone-500 mb-4">
              Select your initial assessed proficiency level. This establishes the baseline for your Career Twin.
            </p>

            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {AVAILABLE_SKILLS.map(skill => {
                const currentLevel = formData.skills[skill] || 'Beginner';
                return (
                  <div
                    key={skill}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950 gap-2 font-serif"
                  >
                    <span className="text-xs font-medium text-stone-900 dark:text-stone-100">
                      {skill}
                    </span>

                    <div className="flex items-center gap-1">
                      {SKILL_LEVELS.map(lvl => {
                        const isSelected = currentLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleSkillLevelChange(skill, lvl)}
                            className={`px-2.5 py-0.5 font-mono text-[10px] uppercase transition-colors ${
                              isSelected
                                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold'
                                : 'border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400'
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
            <p className="font-serif italic text-xs text-stone-500 mb-4">
              Designate your primary career target. CareerPilot adapts all daily problem sets and blueprints to this track.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {CAREER_GOAL_OPTIONS.map(role => {
                const isSelected = formData.targetCareer === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, targetCareer: role })}
                    className={`flex items-center justify-between border p-3 text-left font-serif text-xs transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium'
                        : 'border-stone-200 bg-white hover:border-stone-400 text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300'
                    }`}
                  >
                    <span>{role}</span>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>

            {formData.targetCareer === 'Other' && (
              <div className="mt-4 font-serif">
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">
                  Specify Custom Target Track
                </label>
                <input
                  type="text"
                  value={formData.customCareer}
                  onChange={e => setFormData({ ...formData, customCareer: e.target.value })}
                  placeholder="e.g. Embedded Firmware Engineer"
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Study Time */}
        {step === 4 && (
          <div className="mt-6">
            <p className="font-serif italic text-xs text-stone-500 mb-4">
              Designate your realistic daily focused study budget.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDY_TIME_OPTIONS.map(time => {
                const isSelected = formData.studyTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, studyTime: time })}
                    className={`border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                        : 'border-stone-200 bg-white hover:border-stone-400 text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-serif text-base font-medium">{time}</div>
                    <div className="font-mono text-[10px] uppercase opacity-70">daily focused deep work</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Timeline */}
        {step === 5 && (
          <div className="mt-6">
            <p className="font-serif italic text-xs text-stone-500 mb-4">
              Select your target placement recruitment drive horizon.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIMELINE_OPTIONS.map(time => {
                const isSelected = formData.timeline === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeline: time })}
                    className={`border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                        : 'border-stone-200 bg-white hover:border-stone-400 text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-serif text-base font-medium">{time}</div>
                    <div className="font-mono text-[10px] uppercase opacity-70">to become placement ready</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-800 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 dark:hover:text-stone-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="border border-stone-900 bg-stone-900 px-5 py-2 text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              <span>Continue</span>
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="border border-stone-900 bg-stone-900 px-6 py-2 text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              <span>Calibrate Candidate Twin</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
