import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { DEMO_RESUME_TEXT } from '../data/mockData';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const ResumeAnalyzerView: React.FC = () => {
  const { profile, careerTwin } = useCareerPilot();
  const [resumeText, setResumeText] = useState(DEMO_RESUME_TEXT);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetCareer: profile.targetCareer,
          assessedSkills: {
            Java: 'Beginner (45%)',
            DSA: 'Beginner (30%)',
            SQL: 'Intermediate (65%)',
            HTML_CSS: 'Intermediate (70%)',
          },
        }),
      });

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        setResumeText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Editorial Header (Plate IX) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 font-serif">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>ATS & Consistency Audit Engine</span>
              <span aria-hidden="true">/</span>
              <span>Plate IX</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              Resume Analyzer & Consistency Check
            </h1>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
              Audits candidate manuscripts against hiring rubrics for <strong>{profile.targetCareer}</strong>. Crucially cross-references claims made on paper (e.g. "Advanced Java") against demonstrated diagnostic scores to prevent embarrassing interview disqualification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 border border-stone-300 bg-white px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer transition-colors">
              <Upload className="h-3.5 w-3.5" />
              <span>Import Manuscript (TXT)</span>
              <input
                type="file"
                accept=".txt,.pdf,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !resumeText.trim()}
              className="flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-40 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isAnalyzing ? 'Auditing...' : 'Run Consistency Audit'}</span>
            </button>
          </div>
        </div>

        {/* Informational Guidance Ribbon */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-500 font-serif">
          <span>Target Rubric: <strong className="text-stone-800 dark:text-stone-200">{profile.targetCareer} Specialization</strong></span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <span>Diagnostic Cross-Check: <strong className="text-stone-800 dark:text-stone-200">Active</strong></span>
        </div>
      </div>

      {/* Two Column Layout: Resume Editor & Consistency Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-serif">
        {/* Left Column: Resume Textarea */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-4">
            <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
              Candidate Resume Manuscript
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Plain Text / Markdown Format
            </span>
          </div>

          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={20}
            className="w-full border border-stone-300 bg-white p-4 font-mono text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 focus:border-stone-900 focus:outline-none leading-relaxed"
            placeholder="Paste your resume text here..."
          />

          <div className="mt-4 flex justify-between font-mono text-[10px] text-stone-400">
            <span>Words: {resumeText.split(/\s+/).filter(Boolean).length}</span>
            <span>Character Count: {resumeText.length}</span>
          </div>
        </div>

        {/* Right Column: Consistency Audit Output */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-stone-800 mb-4">
            <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
              Audit Findings & Consistency Checks
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Curatorial Report
            </span>
          </div>

          {analysisResult ? (
            <div className="space-y-6 text-xs font-serif">
              {/* ATS Score Row */}
              <div className="border border-stone-300/80 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif font-medium text-stone-900 dark:text-stone-100 text-sm">
                    Candidate ATS Index
                  </span>
                  <span className="font-mono text-xl font-bold text-amber-900 dark:text-amber-300">
                    {analysisResult.atsScore} / 100
                  </span>
                </div>
                <div className="mt-2 h-1 w-full bg-stone-200 dark:bg-stone-800">
                  <div
                    className="h-full bg-stone-900 dark:bg-stone-100"
                    style={{ width: `${analysisResult.atsScore}%` }}
                  />
                </div>
                <p className="mt-2 font-serif italic text-stone-500 text-[11px]">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Crucial Consistency Check: Claims vs Reality */}
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Resume-Skill Consistency Check</span>
                </div>

                <div className="space-y-2">
                  {analysisResult.consistencyChecks?.map((item: any, i: number) => {
                    const isMismatch = item.status === 'mismatch';
                    return (
                      <div
                        key={i}
                        className={`border p-3.5 text-xs ${
                          isMismatch
                            ? 'border-amber-900/30 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/30'
                            : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950'
                        }`}
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif font-medium text-stone-900 dark:text-stone-100">
                            {item.skill}
                          </span>
                          <span
                            className={`font-mono text-[10px] uppercase px-1.5 py-0.2 font-bold ${
                              isMismatch
                                ? 'border border-amber-800 text-amber-900 dark:border-amber-700 dark:text-amber-300'
                                : 'border border-stone-300 text-stone-700 dark:border-stone-700 dark:text-stone-300'
                            }`}
                          >
                            {isMismatch ? 'Skill Verification Recommended' : 'Consistent Claim'}
                          </span>
                        </div>

                        <div className="mt-1.5 flex gap-4 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                          <span>Resume Claim: <strong className="text-stone-900 dark:text-stone-100">{item.resumeClaim}</strong></span>
                          <span>Assessed Reality: <strong className="text-stone-900 dark:text-stone-100">{item.assessmentLevel}</strong></span>
                        </div>

                        <p className="mt-2 text-[11px] text-stone-600 dark:text-stone-400 italic">
                          "{item.advice}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Missing Elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-950">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold mb-2">
                    Strengths
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-stone-700 dark:text-stone-300">
                    {analysisResult.strengths?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-stone-400">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-950">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">
                    Missing Competencies
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-stone-700 dark:text-stone-300">
                    {analysisResult.missingSkills?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-stone-400">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="border-t border-stone-200 pt-4 dark:border-stone-800">
                <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">
                  Actionable Editorial Revisions
                </div>
                <ul className="space-y-1.5 text-[11px] text-stone-700 dark:text-stone-300">
                  {analysisResult.improvementSuggestions?.map((s: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-stone-400">0{idx + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-xs text-stone-400 font-serif">
              <FileText className="h-10 w-10 text-stone-300 dark:text-stone-700 mb-3" />
              <p className="font-medium text-stone-600 dark:text-stone-300">
                Audit Results Awaiting Execution
              </p>
              <p className="mt-1 max-w-xs text-[11px] text-stone-400 italic">
                Click "Run Consistency Audit" to inspect claims, detect ATS blindspots, and verify demonstrated competencies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
