import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { ProjectBlueprint } from '../types';
import {
  FolderGit2,
  Sparkles,
  Database,
  CheckCircle2,
  GitBranch,
  FileText,
  Clock,
  Plus,
  ArrowRight,
  X,
  Layers,
} from 'lucide-react';

export const ProjectBuilderView: React.FC = () => {
  const { profile, careerTwin, projects, addProjectToRoadmap, completeProject, addNewProject } =
    useCareerPilot();

  const [selectedProject, setSelectedProject] = useState<ProjectBlueprint | null>(projects[0] || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customDifficulty, setCustomDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  const handleGenerateAIProject = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerGoal: profile.targetCareer,
          currentSkills: Object.keys(profile.skills),
          skillGaps: careerTwin.weakSkills,
          difficulty: customDifficulty,
        }),
      });

      const data = await res.json();
      if (data?.title) {
        const newProj: ProjectBlueprint = {
          id: `proj-${Date.now()}`,
          title: data.title,
          tagline: data.tagline || 'Custom AI Generated Production Architecture',
          difficulty: customDifficulty,
          duration: '2-3 weeks',
          targetCareer: profile.targetCareer,
          skillsLearned: [
            ...Object.values(data.techStack || {}).flat().slice(0, 5),
          ] as string[],
          problemStatement: data.problemStatement,
          objectives: data.objectives || [],
          features: data.features || [],
          techStack: data.techStack || { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], devops: ['Docker'] },
          databaseSchema: data.databaseSchema || [],
          developmentSteps: data.developmentSteps || [],
          testingChecklist: data.testingChecklist || [],
          githubChecklist: data.githubChecklist || [],
          resumeBullets: data.resumeBullets || [],
          inRoadmap: true,
          completed: false,
        };

        addNewProject(newProj);
        setSelectedProject(newProj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              <FolderGit2 className="h-4 w-4" />
              <span>Production Architecture Studio</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AI Project Builder
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Employers disregard basic CRUD tutorial clones (to-do lists, weather apps). CareerPilot designs comprehensive, distributed system blueprints with real database schemas, testing plans, and resume impact bullets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={customDifficulty}
              onChange={e => setCustomDifficulty(e.target.value as any)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="Beginner">Beginner Tier</option>
              <option value="Intermediate">Intermediate Tier</option>
              <option value="Advanced">Advanced (Production)</option>
            </select>

            <button
              onClick={handleGenerateAIProject}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-purple-500 disabled:opacity-40 transition-colors whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isGenerating ? 'Synthesizing Architecture...' : 'Generate New Blueprint'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects List + Active Blueprint Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Project Catalog */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Curated Capstone Blueprints ({projects.length})
          </div>

          {projects.map(proj => {
            const isSelected = selectedProject?.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs dark:border-purple-500 dark:bg-purple-950/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      proj.difficulty === 'Advanced'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : proj.difficulty === 'Intermediate'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {proj.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400">{proj.duration}</span>
                </div>

                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                  {proj.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {proj.tagline}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 dark:border-slate-800 text-[11px]">
                  {proj.completed ? (
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Completed</span>
                    </span>
                  ) : proj.inRoadmap ? (
                    <span className="font-semibold text-indigo-600">Active in Roadmap</span>
                  ) : (
                    <span className="text-slate-400">Available to Build</span>
                  )}

                  <span className="text-purple-600 font-semibold flex items-center gap-0.5">
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Blueprint Inspector */}
        {selectedProject ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              {/* Header and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                      {selectedProject.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Est. Duration: {selectedProject.duration}
                    </span>
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {!selectedProject.inRoadmap ? (
                    <button
                      onClick={() => addProjectToRoadmap(selectedProject.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add to My Roadmap</span>
                    </button>
                  ) : !selectedProject.completed ? (
                    <button
                      onClick={() => completeProject(selectedProject.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Mark Milestone Complete (+60 XP)</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3.5 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Milestone Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 1. Problem Statement & Objectives */}
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Problem Statement
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    {selectedProject.problemStatement}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Core Objectives
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {selectedProject.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Tech Stack */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Production Technology Stack
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/40">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Frontend</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedProject.techStack.frontend.join(', ')}
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/40">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Backend API</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedProject.techStack.backend.join(', ')}
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/40">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Database</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedProject.techStack.database.join(', ')}
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/40">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">DevOps & Cloud</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedProject.techStack.devops.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Database Schema Blueprint */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-indigo-600" />
                    <span>Database Structure & Relations</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.databaseSchema.map((t, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40"
                      >
                        <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-slate-100">
                          <span>TABLE: {t.table}</span>
                          <span className="text-[11px] font-sans font-normal text-slate-400">
                            {t.purpose}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {t.fields.map(f => (
                            <span
                              key={f}
                              className="rounded bg-white px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Development Steps */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Step-by-Step Development Phases
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.developmentSteps.map(step => (
                      <div
                        key={step.step}
                        className="flex items-start gap-3 rounded-xl border border-slate-100 p-3 text-xs dark:border-slate-800"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-mono text-[11px] font-bold dark:bg-purple-950 dark:text-purple-300">
                          {step.step}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {step.title} <span className="text-slate-400 font-normal">({step.estimatedHours} hrs)</span>
                          </div>
                          <p className="mt-0.5 text-slate-500 text-[11px] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Testing & GitHub Checklists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 text-xs">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Production Testing Checklist</span>
                    </h4>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                      {selectedProject.testingChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span>□</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 text-xs">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
                      <GitBranch className="h-4 w-4 text-indigo-500" />
                      <span>GitHub Repository Checklist</span>
                    </h4>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                      {selectedProject.githubChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span>□</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Resume XYZ Impact Bullets */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-xs dark:border-indigo-950 dark:bg-indigo-950/20">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1.5 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span>Resume Description (Google XYZ Impact Bullets)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Copy and paste these pre-formatted metric bullets directly onto your CV once built:
                  </p>
                  <ul className="space-y-2">
                    {selectedProject.resumeBullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="rounded-lg bg-white p-2.5 text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-slate-200 font-mono text-[11px] leading-relaxed border border-slate-200 dark:border-slate-700"
                      >
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center p-12 text-slate-400 text-xs">
            Select a project blueprint from the left catalog to inspect full database schemas, steps, and resume bullets.
          </div>
        )}
      </div>
    </div>
  );
};
