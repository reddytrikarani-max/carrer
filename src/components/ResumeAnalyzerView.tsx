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
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <FileText className="h-4 w-4" />
              <span>ATS & Consistency Audit Engine</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AI Resume Analyzer & Consistency Check
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Audits your resume against <strong>{profile.targetCareer}</strong> hiring criteria. Crucially, it verifies that claims made on paper (e.g. "Advanced Java") actually align with your demonstrated diagnostic assessment scores.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              <Upload className="h-3.5 w-3.5" />
              <span>Upload Resume (TXT/PDF)</span>
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
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-500 disabled:opacity-40 transition-colors whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isAnalyzing ? 'Auditing Resume...' : 'Analyze Resume'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column: Editor / Text Input + Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Resume Input */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Resume Content (Plaintext / Markdown)
            </div>
            <button
              onClick={() => setResumeText(DEMO_RESUME_TEXT)}
              className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Load Demo Student Resume
            </button>
          </div>

          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={22}
            className="mt-3 w-full flex-1 rounded-xl border border-slate-200 p-3 font-mono text-xs text-slate-800 leading-relaxed focus:border-rose-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 resize-none"
            placeholder="Paste your resume plain text or upload a document..."
          />

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>{resumeText.trim().split(/\s+/).length} words</span>
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <span>Audit Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Analysis & Consistency Engine Output */}
        <div className="space-y-6">
          {analysisResult ? (
            <>
              {/* ATS Score Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400">
                      ATS Benchmark Score
                    </span>
                    <h3 className="mt-0.5 text-base font-bold text-slate-900 dark:text-slate-100">
                      Target Fit for {profile.targetCareer}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-3xl font-extrabold text-rose-600 dark:text-rose-400">
                      {analysisResult.atsScore || 74}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {analysisResult.summary}
                </p>
              </div>

              {/* CORE HIGHLIGHT: RESUME-SKILL CONSISTENCY CHECK */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-950 dark:bg-amber-950/20 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  <span>Resume-Skill Consistency Check</span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mb-3">
                  Cross-referencing stated resume claims against your actual diagnostic assessment performance:
                </p>

                <div className="space-y-2.5">
                  {analysisResult.consistencyChecks?.map((check: any, idx: number) => {
                    const isMismatch = check.status === 'mismatch';
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border p-3 text-xs ${
                          isMismatch
                            ? 'border-amber-300 bg-white/90 dark:border-amber-900 dark:bg-slate-900'
                            : 'border-emerald-200 bg-white/90 dark:border-emerald-950 dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {check.skill}
                          </span>
                          {isMismatch ? (
                            <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              <span>Skill Verification Recommended</span>
                            </span>
                          ) : (
                            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Verified Claim</span>
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 mb-1.5 font-mono">
                          <div>Resume Claim: <strong className="text-slate-800 dark:text-slate-200">{check.resumeClaim}</strong></div>
                          <div>Assessment Score: <strong className="text-slate-800 dark:text-slate-200">{check.assessmentLevel}</strong></div>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {check.advice}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Missing Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 text-xs">
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Identified Strengths</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                    {analysisResult.strengths?.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 text-xs">
                  <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" />
                    <span>Missing Critical Areas</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                    {analysisResult.weaknesses?.map((w: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Actionable Bullet Refactorings (XYZ Formula)
                </h4>
                <div className="space-y-2">
                  {analysisResult.improvementSuggestions?.map((sug: string, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11px] text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300"
                    >
                      {sug}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-400 dark:border-slate-800">
              <FileText className="h-8 w-8 text-slate-300 mb-3" />
              <p className="font-medium text-slate-600 dark:text-slate-300">
                No active resume audit loaded
              </p>
              <p className="mt-1 text-slate-400 max-w-sm">
                Click <strong>"Analyze Resume"</strong> above to extract ATS keywords, identify missing tech stacks, and verify consistency against your diagnostic tests.
              </p>
              <button
                onClick={handleRunAnalysis}
                className="mt-4 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white shadow-xs hover:bg-rose-500 transition-colors"
              >
                Run Immediate Audit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
