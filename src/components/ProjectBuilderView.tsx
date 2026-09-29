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
  Check,
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
          tagline: data.tagline || 'Custom Architectural Monograph Blueprint',
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
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Editorial Header (Plate VIII) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>Production Architecture Studio</span>
              <span aria-hidden="true">/</span>
              <span>Plate VIII</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              AI Project Builder
            </h1>
            <p className="mt-2 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Recruiters discard superficial tutorial clones (to-do lists, basic calculators). CareerPilot generates full-stack distributed system monographs featuring database schemas, step-by-step milestones, and Google XYZ resume bullets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={customDifficulty}
              onChange={e => setCustomDifficulty(e.target.value as any)}
              className="border border-stone-300 bg-white px-3 py-2 font-serif text-xs text-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
            >
              <option value="Beginner">Beginner Tier</option>
              <option value="Intermediate">Intermediate Tier</option>
              <option value="Advanced">Advanced / Distributed</option>
            </select>

            <button
              onClick={handleGenerateAIProject}
              disabled={isGenerating}
              className="flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isGenerating ? 'Synthesizing...' : 'Architect New Project'}</span>
            </button>
          </div>
        </div>

        {/* Project Selection Tabs (Editorial Tabular Ribbon) */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2">
          {projects.map(proj => {
            const isSelected = selectedProject?.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`flex items-baseline gap-2 border px-3.5 py-2 font-serif text-xs transition-colors ${
                  isSelected
                    ? 'border-stone-900 bg-stone-900 text-stone-100 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'border-stone-300 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{proj.title}</span>
                <span className="font-mono text-[10px] opacity-75">· {proj.difficulty}</span>
                {proj.completed && (
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                    [Verified]
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Project Monograph Blueprint */}
      {selectedProject && (
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 font-serif">
          {/* Monograph Title Block */}
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-400">
                <span>Technical Monograph Blueprint</span>
                <span aria-hidden="true">/</span>
                <span>Ref: {selectedProject.id}</span>
              </div>
              <h2 className="mt-1 font-serif text-2xl md:text-3xl font-normal text-stone-900 dark:text-stone-100">
                {selectedProject.title}
              </h2>
              <p className="mt-1 font-serif italic text-xs text-stone-500">
                "{selectedProject.tagline}"
              </p>

              {/* Zero-Pill Technology Stack */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Technologies:</span>
                {selectedProject.skillsLearned.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    {idx > 0 && <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>}
                    <span className="font-medium text-stone-900 dark:text-stone-100">{skill}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!selectedProject.completed ? (
                <button
                  onClick={() => completeProject(selectedProject.id)}
                  className="border border-stone-900 bg-stone-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                >
                  Mark Implemented
                </button>
              ) : (
                <div className="border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 font-mono text-[11px] uppercase font-bold text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Portfolio Verified
                </div>
              )}
            </div>
          </div>

          {/* Problem Statement & Objectives */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">
                Problem Statement & Architecture Motivation
              </h3>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif first-letter:text-4xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                {selectedProject.problemStatement}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">
                Core Architectural Objectives
              </h3>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                {selectedProject.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-stone-400">0{i + 1}.</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Database Schema (Clean Tabular Architecture) */}
          <div className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">
              Relational Database Entities & Schema
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedProject.databaseSchema.map(tbl => (
                <div
                  key={tbl.table}
                  className="border border-stone-300/80 bg-white p-4 dark:border-stone-800 dark:bg-stone-950 font-serif"
                >
                  <div className="flex items-baseline justify-between border-b border-stone-200 pb-2 dark:border-stone-800 font-mono">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{tbl.table}</span>
                    <span className="text-[10px] text-stone-400">table</span>
                  </div>
                  <p className="mt-2 text-[11px] text-stone-500 italic">
                    {tbl.purpose}
                  </p>
                  <div className="mt-3 font-mono text-[10px] text-stone-700 dark:text-stone-300 space-y-1">
                    {tbl.fields.map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <span className="text-stone-400">·</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Milestones */}
          <div className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-4">
              System Implementation Roadmap
            </h3>

            <div className="space-y-3">
              {selectedProject.developmentSteps.map(step => (
                <div
                  key={step.step}
                  className="border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950 text-xs font-serif"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {String(step.step).padStart(2, '0')}. {step.title}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">
                      Est. {step.estimatedHours}h
                    </span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-[11px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testing & GitHub Verification Checklists */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-stone-200 pt-6 dark:border-stone-800">
            {/* Testing Checklist */}
            <div className="border border-stone-300/80 bg-stone-100/40 p-5 dark:border-stone-800 dark:bg-stone-900/40">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
                Verification & Testing Protocol
              </h4>
              <ul className="space-y-2 text-xs font-serif text-stone-700 dark:text-stone-300">
                {selectedProject.testingChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-stone-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GitHub Checklist */}
            <div className="border border-stone-300/80 bg-stone-100/40 p-5 dark:border-stone-800 dark:bg-stone-900/40">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
                Repository Polish & Open-Source Checklist
              </h4>
              <ul className="space-y-2 text-xs font-serif text-stone-700 dark:text-stone-300">
                {selectedProject.githubChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-stone-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Google XYZ Resume Bullet Points */}
          <div className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">
              Google XYZ Resume Impact Statements
            </h3>

            <div className="space-y-2 font-serif text-xs">
              {selectedProject.resumeBullets.map((bullet, i) => (
                <div
                  key={i}
                  className="border-l-2 border-stone-400 bg-white p-3.5 dark:border-stone-600 dark:bg-stone-950 text-stone-800 dark:text-stone-200"
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block mb-1">
                    Accomplished [X] measured by [Y] via [Z]
                  </span>
                  <p className="leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
