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
    <div className="flex h-[calc(100vh-8.5rem)] flex-col border border-stone-300/80 bg-[#FAF8F5] shadow-xs dark:border-stone-800 dark:bg-stone-900/60 overflow-hidden font-serif">
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-stone-300 bg-white text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100">
            <Bot className="h-4.5 w-4.5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                Lead Mentor AI · CareerPilot
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                · Live Context Active
              </span>
            </div>
            <p className="font-serif italic text-xs text-stone-500">
              Personalized career counsel grounded in your {careerTwin.careerReadiness}% readiness for {profile.targetCareer}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 border border-stone-300 bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear Dialogue</span>
          </button>
        </div>
      </div>

      {/* Quick Inquiries Strip (Editorial Segmented Prompts) */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-stone-200/80 px-6 py-2.5 dark:border-stone-800/80 text-xs">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-stone-400">
          Suggested Inquiries:
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="border border-stone-300 bg-white px-3 py-1 text-xs text-stone-700 hover:border-stone-900 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:border-stone-600 transition-colors whitespace-nowrap font-serif"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl ${
                msg.sender === 'user'
                  ? 'border border-stone-300 bg-stone-200/60 p-4 text-stone-900 dark:border-stone-700 dark:bg-stone-800/80 dark:text-stone-100'
                  : 'border-l-2 border-amber-900 bg-white p-5 text-stone-800 dark:border-amber-400 dark:bg-stone-950 dark:text-stone-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200/60 dark:border-stone-800/60 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                <span>{msg.sender === 'user' ? profile.name : 'Lead Mentor Dispatch'}</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <div className="font-serif text-sm leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="border-l-2 border-amber-900 bg-white p-4 dark:border-amber-400 dark:bg-stone-950 text-xs italic text-stone-500 font-serif">
              Analyzing candidate dossier and synthesizing guidance...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Editorial Textarea & Input Bar */}
      <div className="border-t border-stone-200 p-4 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#0C0A09]">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask CareerPilot regarding roadmap pacing, project choices, or technical blindspots..."
            className="flex-1 border border-stone-300 bg-white px-4 py-2.5 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-amber-50 hover:bg-stone-800 disabled:opacity-40 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Transmit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
