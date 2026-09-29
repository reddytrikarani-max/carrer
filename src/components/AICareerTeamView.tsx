import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { AI_AGENTS } from '../data/mockData';
import { AIAgent } from '../types';
import {
  Users2,
  Compass,
  BookOpen,
  CheckCircle2,
  Code2,
  FolderGit2,
  FileText,
  Mic2,
  TrendingUp,
  Sparkles,
  Send,
  X,
  Bot,
  ArrowRight,
} from 'lucide-react';

interface AICareerTeamViewProps {
  onNavigate: (tab: string) => void;
}

export const AICareerTeamView: React.FC<AICareerTeamViewProps> = ({ onNavigate }) => {
  const { profile, careerTwin, knowledgeMemory } = useCareerPilot();
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'agent'; text: string }[]>([]);

  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="h-4 w-4" />;
      case 'BookOpen':
        return <BookOpen className="h-4 w-4" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Code2':
        return <Code2 className="h-4 w-4" />;
      case 'FolderGit2':
        return <FolderGit2 className="h-4 w-4" />;
      case 'FileText':
        return <FileText className="h-4 w-4" />;
      case 'Mic2':
        return <Mic2 className="h-4 w-4" />;
      case 'TrendingUp':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const handleOpenAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setConversation([
      {
        role: 'agent',
        text: `Greetings, ${profile.name}. I am your ${agent.name}. I direct ${agent.role.toLowerCase()}. I have evaluated your candidate record (${careerTwin.careerReadiness}% readiness for ${profile.targetCareer}). How may I advise your preparation today?`,
      },
    ]);
    setQueryInput('');
  };

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText || queryInput;
    if (!textToSend.trim() || !selectedAgent || isLoading) return;

    const userMessage = textToSend.trim();
    setConversation(prev => [...prev, { role: 'user', text: userMessage }]);
    setQueryInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          agentType: selectedAgent.id,
          profileContext: {
            name: profile.name,
            degree: profile.degree,
            branch: profile.branch,
            year: profile.currentYear,
            targetCareer: profile.targetCareer,
            careerReadiness: careerTwin.careerReadiness,
            studyTime: profile.studyTime,
            skills: profile.skills,
            weakSkills: careerTwin.weakSkills,
            topicsToRevisit: knowledgeMemory.map(k => k.topic),
          },
        }),
      });

      const data = await res.json();
      setConversation(prev => [
        ...prev,
        { role: 'agent', text: data?.reply || 'I processed your inquiry with your full candidate profile context.' },
      ]);
    } catch (err) {
      console.error(err);
      setConversation(prev => [
        ...prev,
        {
          role: 'agent',
          text: `Regarding your track toward ${profile.targetCareer}: prioritize closing the gap in ${careerTwin.weakSkills[0] || 'core engineering fundamentals'} before scheduling placement screenings.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-stone-900 dark:text-stone-100">
      {/* Editorial Header (Plate VII) */}
      <div className="border border-stone-300/80 bg-[#FAF8F5] p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-stone-200 pb-6 dark:border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
              <span>The Advisory Collective</span>
              <span aria-hidden="true">/</span>
              <span>Plate VII</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
              Your AI Career Team
            </h1>
            <p className="mt-2 font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Eight specialized autonomous counselors continuously audit your diagnostic scores, monograph blueprints, and interview readiness for <strong>{profile.targetCareer}</strong>.
            </p>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors whitespace-nowrap"
          >
            <Bot className="h-4 w-4" />
            <span>Consult Lead Mentor</span>
          </button>
        </div>

        {/* Advisory Collective Info Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs font-serif text-stone-500">
          <div>
            <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">Counselors In Session:</span>{' '}
            <strong className="text-stone-800 dark:text-stone-200 font-mono">8 Specialized Agents</strong>
          </div>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <div>
            <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">Shared Memory Context:</span>{' '}
            <strong className="text-stone-800 dark:text-stone-200">Candidate Dossier Active</strong>
          </div>
        </div>
      </div>

      {/* Agents Grid (Museum / Catalog Format) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AI_AGENTS.map((agent, idx) => (
          <div
            key={agent.id}
            className="border border-stone-300/80 bg-[#FAF8F5] p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900/60 flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-700 transition-all font-serif group"
          >
            <div>
              <div className="flex items-baseline justify-between border-b border-stone-200/80 pb-3 dark:border-stone-800/80">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center border border-stone-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  {getAgentIcon(agent.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-medium text-stone-900 dark:text-stone-100">
                    {agent.name}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    {agent.role}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                {agent.description}
              </p>
            </div>

            <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800">
              <button
                onClick={() => handleOpenAgent(agent)}
                className="w-full flex items-center justify-center gap-2 border border-stone-300 bg-white py-2 font-mono text-xs uppercase tracking-wider text-stone-800 hover:border-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:border-stone-400 transition-colors"
              >
                <span>Consult Agent</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Agent Consultation Modal (Editorial Manuscript) */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="flex flex-col h-[620px] w-full max-w-2xl border border-stone-300 bg-[#FAF8F5] shadow-2xl dark:border-stone-700 dark:bg-stone-900 overflow-hidden font-serif">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-stone-300 bg-white text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  {getAgentIcon(selectedAgent.iconName)}
                </div>
                <div>
                  <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                    {selectedAgent.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-400">
                    {selectedAgent.role} · Advisory Session
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs leading-relaxed">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 ${
                      msg.role === 'user'
                        ? 'border border-stone-300 bg-stone-200/60 text-stone-900 dark:border-stone-700 dark:bg-stone-800/80 dark:text-stone-100'
                        : 'border-l-2 border-amber-900 bg-white text-stone-800 dark:border-amber-400 dark:bg-stone-950 dark:text-stone-200 shadow-2xs'
                    }`}
                  >
                    <div className="font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1">
                      {msg.role === 'user' ? profile.name : selectedAgent.name}
                    </div>
                    <div className="whitespace-pre-wrap font-serif text-xs">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="border-l-2 border-amber-900 bg-white p-4 text-stone-500 dark:border-amber-400 dark:bg-stone-950 text-xs italic">
                    {selectedAgent.name} is consulting your candidate records...
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="border-t border-stone-200 p-4 dark:border-stone-800">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={queryInput}
                  onChange={e => setQueryInput(e.target.value)}
                  placeholder={`Inquire with ${selectedAgent.name}...`}
                  className="flex-1 border border-stone-300 bg-white px-3.5 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-sans"
                />
                <button
                  type="submit"
                  disabled={!queryInput.trim() || isLoading}
                  className="flex items-center gap-1.5 border border-stone-900 bg-stone-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-40 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
