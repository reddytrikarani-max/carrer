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
        return <Compass className="h-5 w-5" />;
      case 'BookOpen':
        return <BookOpen className="h-5 w-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'Code2':
        return <Code2 className="h-5 w-5" />;
      case 'FolderGit2':
        return <FolderGit2 className="h-5 w-5" />;
      case 'FileText':
        return <FileText className="h-5 w-5" />;
      case 'Mic2':
        return <Mic2 className="h-5 w-5" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Bot className="h-5 w-5" />;
    }
  };

  const handleOpenAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setConversation([
      {
        role: 'agent',
        text: `Hello ${profile.name}! I am your ${agent.name}. I specialize in ${agent.role.toLowerCase()}. I have your current readiness (${careerTwin.careerReadiness}%) and target role (${profile.targetCareer}) loaded in my context. How can I help you today?`,
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
        { role: 'agent', text: data?.reply || 'I processed your query with your career profile context.' },
      ]);
    } catch (err) {
      console.error(err);
      setConversation(prev => [
        ...prev,
        {
          role: 'agent',
          text: `Based on your profile for ${profile.targetCareer}, focusing on ${careerTwin.weakSkills[0] || 'core concepts'} will yield the highest return on investment this week.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Users2 className="h-4 w-4" />
              <span>Multi-Agent Career Advisory Collective</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Your AI Career Team
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Eight autonomous agents work in tandem to guide you from enrollment to job offer. Each agent monitors your real-time diagnostic performance, resume drafts, and mock interview velocity.
            </p>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open Lead Mentor (CareerPilot)</span>
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {AI_AGENTS.map(agent => (
          <div
            key={agent.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 ${agent.accentColor}`}
                >
                  {getAgentIcon(agent.iconName)}
                </div>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 uppercase">
                  Active
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                {agent.name}
              </h3>
              <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                {agent.role}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {agent.description}
              </p>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                onClick={() => handleOpenAgent(agent)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Consult Agent</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Agent Consultation Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="flex flex-col h-[600px] w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 ${selectedAgent.accentColor}`}
                >
                  {getAgentIcon(selectedAgent.iconName)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {selectedAgent.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedAgent.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-100 p-3 text-slate-500 dark:bg-slate-800">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:0.2s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Quick Chips */}
            <div className="border-t border-slate-100 px-6 py-2.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Suggested Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedAgent.samplePrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendQuery(prompt)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800 bg-white dark:bg-slate-900">
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
                  placeholder={`Ask ${selectedAgent.name} about ${selectedAgent.role.toLowerCase()}...`}
                  className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={!queryInput.trim() || isLoading}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
