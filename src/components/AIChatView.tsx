import React, { useState, useRef, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { Bot, Send, Sparkles, Trash2, ArrowRight } from 'lucide-react';

interface AIChatViewProps {
  onNavigate: (tab: string) => void;
}

const QUICK_PROMPTS = [
  'What should I learn today?',
  'Which skills am I missing?',
  'Am I ready for a software developer role?',
  'Suggest a project for my current skills.',
  'Explain DSA to me.',
  'Prepare me for an interview.',
  'Analyze my progress.',
];

export const AIChatView: React.FC<AIChatViewProps> = ({ onNavigate }) => {
  const { profile, careerTwin, knowledgeMemory, chatMessages, addChatMessage, clearChat } =
    useCareerPilot();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim() || loading) return;

    addChatMessage({
      sender: 'user',
      text: message.trim(),
    });
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          agentType: 'careerpilot',
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
      addChatMessage({
        sender: 'ai',
        agentName: 'CareerPilot',
        text: data?.reply || 'I analyzed your profile and progress to answer your question.',
      });
    } catch (err) {
      console.error(err);
      addChatMessage({
        sender: 'ai',
        agentName: 'CareerPilot',
        text: `Based on your profile as a ${profile.degree} student targeting ${profile.targetCareer}, focusing on ${careerTwin.weakSkills[0] || 'core concepts'} will yield the fastest readiness gains.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                CareerPilot AI Mentor
              </h2>
              <span className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                Live Context
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Grounded in your {profile.targetCareer} Career Twin ({careerTwin.careerReadiness}% ready)
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          title="Clear Conversation"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mt-0.5">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl p-4 leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'border border-slate-100 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
              }`}
            >
              {msg.text}
              <div
                className={`mt-2 text-[10px] font-mono ${
                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-500 dark:border-slate-800 dark:bg-slate-800/80">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:0.2s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="border-t border-slate-100 px-6 py-2.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
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
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask CareerPilot anything (e.g. 'What should I learn today?')..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 disabled:opacity-40 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
