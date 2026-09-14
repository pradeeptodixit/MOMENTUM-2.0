import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, User, Sliders } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { SpecialistType, CoachTone } from '../../types';

interface AICoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICoachDrawer: React.FC<AICoachDrawerProps> = ({ isOpen, onClose }) => {
  const {
    specialist,
    setSpecialist,
    coachTone,
    setCoachTone,
    coachChatMessages,
    sendCoachMessage,
    currentMission,
  } = useMomentum();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    setIsSending(true);
    await sendCoachMessage(text);
    setInputMessage('');
    setIsSending(false);
  };

  const quickPrompts = [
    'I only have 10 minutes today. Protect my highest-impact action.',
    'I feel exhausted. Adapt today for low energy.',
    'Negotiate: This mission feels too long.',
    'What should I prioritize right now?',
  ];

  const specialists: { id: SpecialistType; label: string }[] = [
    { id: 'coding', label: 'Coding Coach' },
    { id: 'startup', label: 'Startup Coach' },
    { id: 'study', label: 'Study Coach' },
    { id: 'fitness', label: 'Fitness Coach' },
    { id: 'career', label: 'Career Coach' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-cardElevated border-l border-surface-border w-full max-w-md h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Momentum Adaptive Coach</h3>
              <p className="text-[11px] text-slate-400">Collaborative plan negotiation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Coach Settings Pill Row (Specialist Mode & Tone) */}
        <div className="px-4 py-2.5 bg-surface-dark border-b border-surface-border flex items-center justify-between text-xs">
          {/* Specialist selector */}
          <select
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value as SpecialistType)}
            className="bg-surface-card border border-surface-border rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none"
          >
            {specialists.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Tone Selector */}
          <div className="flex items-center gap-1">
            {(['gentle', 'balanced', 'direct'] as CoachTone[]).map((t) => (
              <button
                key={t}
                onClick={() => setCoachTone(t)}
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition ${
                  coachTone === t
                    ? 'bg-brand-500 text-black font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {coachChatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] font-mono text-slate-500 mb-1 px-1 flex items-center gap-1">
                {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-brand-400" />}
                <span>{msg.sender === 'user' ? 'You' : 'Coach'} • {msg.time}</span>
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-black font-semibold'
                    : 'bg-surface-card border border-surface-border text-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-surface-dark/80 border-t border-surface-border flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="text-[11px] text-slate-300 hover:text-brand-300 bg-surface-card border border-surface-border hover:border-brand-500/30 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 transition"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-surface-border bg-surface-card flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Collaborate or negotiate with your plan..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-dark border border-surface-border text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={() => handleSend()}
            disabled={isSending || !inputMessage.trim()}
            className="p-2.5 rounded-xl bg-brand-500 text-black hover:bg-brand-400 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
