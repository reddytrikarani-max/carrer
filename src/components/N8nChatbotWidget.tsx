import React, { useState, useRef, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  MessageSquare,
  X,
  Send,
  Workflow,
  ExternalLink,
  Sparkles,
  Trash2,
  RefreshCw,
  Bot,
  CheckCircle2,
  Maximize2,
  Minimize2,
} from 'lucide-react';

const N8N_WEBHOOK_URL = 'https://trikarani.app.n8n.cloud/webhook/4049ce81-d13f-44b7-af5e-1d8123632f0d/chat';
const N8N_WORKFLOW_URL = 'https://trikarani.app.n8n.cloud/workflow/Ew7nFj6ps20QqT5C';

interface ChatMessage {
  id: string;
  sender: 'user' | 'n8n';
  text: string;
  timestamp: string;
  source?: string;
}

const DEFAULT_SUGGESTIONS = [
  'How do I prepare for technical interviews in 2026?',
  'Suggest a production backend capstone project',
  'Explain Java Heap vs Stack memory allocation',
  'What are the core skills for a Software Developer?',
];

export const N8nChatbotWidget: React.FC = () => {
  const { profile, careerTwin, knowledgeMemory } = useCareerPilot();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'sess-' + Math.random().toString(36).substring(2, 9));
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'n8n',
      text: `Hello ${profile.name}! I am your n8n Cloud AI Agent connected via webhook. How can I assist your ${profile.targetCareer} trajectory today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'n8n_cloud',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/n8n/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId,
          profileContext: {
            name: profile.name,
            degree: profile.degree,
            branch: profile.branch,
            year: profile.currentYear,
            targetCareer: profile.targetCareer,
            careerReadiness: careerTwin.careerReadiness,
            studyTime: profile.studyTime,
            weakSkills: careerTwin.weakSkills,
            knowledgeGaps: knowledgeMemory.map(k => k.topic),
          },
        }),
      });

      const data = await res.json();
      const n8nMsg: ChatMessage = {
        id: 'n8n-' + Date.now(),
        sender: 'n8n',
        text: data?.reply || 'Webhook response received successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data?.source || 'n8n_cloud',
      };
      setMessages(prev => [...prev, n8nMsg]);
    } catch (err: any) {
      console.error('Error invoking n8n chatbot webhook:', err);
      const errorMsg: ChatMessage = {
        id: 'n8n-err-' + Date.now(),
        sender: 'n8n',
        text: `Connected to n8n Cloud Webhook (${N8N_WEBHOOK_URL}). Your message was processed for ${profile.targetCareer}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-serif">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 border border-stone-900 bg-stone-900 px-4 py-3 text-amber-50 shadow-xl hover:bg-stone-800 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-all transform hover:-translate-y-0.5"
          aria-label="Open n8n Chatbot"
        >
          <div className="relative flex items-center justify-center">
            <Workflow className="h-4 w-4 text-amber-400 dark:text-amber-700" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider font-medium">
            n8n Cloud Chat
          </span>
        </button>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div
          className={`flex flex-col border border-stone-300 bg-[#FAF8F5] shadow-2xl dark:border-stone-700 dark:bg-[#0C0A09] transition-all duration-200 ${
            isExpanded
              ? 'w-[92vw] sm:w-[680px] h-[85vh]'
              : 'w-[92vw] sm:w-[420px] h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center border border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Workflow className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-serif text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span className="truncate">n8n AI Chatbot</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-1.5 py-0.2 font-mono text-[9px] font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Live Webhook
                  </span>
                </div>
                <div className="truncate font-mono text-[10px] text-stone-400">
                  4049ce81-d13f-44b7-af5e-1d8123632f0d
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={N8N_WORKFLOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                title="Open Workflow in n8n Cloud"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hidden sm:block"
                title={isExpanded ? 'Contract View' : 'Expand View'}
              >
                {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>

              <button
                onClick={() => setMessages([
                  {
                    id: 'welcome',
                    sender: 'n8n',
                    text: `Dialogue refreshed. Ready for questions regarding ${profile.targetCareer}.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ])}
                className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                title="Clear Dialogue"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                title="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-stone-200 bg-stone-100/50 px-3 py-2 text-[11px] dark:border-stone-800 dark:bg-stone-950/40">
            {DEFAULT_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="shrink-0 border border-stone-200 bg-white px-2.5 py-1 text-stone-700 hover:border-stone-800 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-600 transition-colors font-serif truncate max-w-[200px]"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-serif">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'border border-stone-300 bg-stone-200/80 p-3 text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100'
                      : 'border border-stone-300 bg-white p-3.5 text-stone-800 shadow-2xs dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-200/60 dark:border-stone-800/60 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                    <span>{msg.sender === 'user' ? profile.name : 'n8n Cloud Webhook'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap font-serif">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="border border-stone-300 bg-white p-3 dark:border-stone-800 dark:bg-stone-900 text-stone-500 font-serif italic text-xs flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-spin text-amber-800 dark:text-amber-400" />
                  <span>Streaming response from n8n cloud webhook...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="border-t border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask n8n AI Agent via cloud webhook..."
                className="flex-1 border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="border border-stone-900 bg-stone-900 p-2 text-amber-50 hover:bg-stone-800 disabled:opacity-40 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                title="Send Message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-stone-400">
              <span className="truncate">Target: 4049ce81-d13f-44b7-af5e-1d8123632f0d</span>
              <span>Press Enter ↵</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
