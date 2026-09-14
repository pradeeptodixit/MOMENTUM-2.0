import React, { useState } from 'react';
import { X, Trophy, Users, Send, Check, Sparkles } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { LayersGrowthTracker } from '../../integrations/LayersGrowthTracker';

interface ChallengeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChallengeGeneratorModal: React.FC<ChallengeGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { challenges, createChallenge } = useMomentum();
  const [topic, setTopic] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!topic.trim()) return;
    setIsCreating(true);
    await createChallenge(topic);
    setIsCreating(false);
    setTopic('');
  };

  const handleShareChallenge = (challengeId: string) => {
    LayersGrowthTracker.recordShare('challenge');
    setCopiedId(challengeId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Trophy className="w-4 h-4" />
          <span>7-DAY SPRINT GENERATOR</span>
        </div>

        <h3 className="text-xl font-black text-white">
          Challenge a Friend.
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          No toxic leaderboards. The social object is the mission itself: "Can you keep up with my 7-day sprint?"
        </p>

        {/* Generate Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. System Design, LeetCode, Fitness..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-dark border border-surface-border text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <button
            onClick={handleCreate}
            disabled={isCreating || !topic.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition disabled:opacity-50"
          >
            {isCreating ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Generate</span>
          </button>
        </div>

        {/* Active Challenges List */}
        <div className="mt-5 space-y-3">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
            Active Community Challenges:
          </div>

          {challenges.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-surface-dark border border-surface-border hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{c.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{c.description}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card border border-surface-border text-brand-400 flex-shrink-0 font-bold">
                  {c.dailyTimeBudgetMinutes}m / day
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-surface-border/50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{c.participantsCount} challengers</span>
                </div>

                <button
                  onClick={() => handleShareChallenge(c.id)}
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition"
                >
                  {copiedId === c.id ? (
                    <>
                      <Check className="w-3 h-3 text-brand-400" />
                      <span className="text-brand-400">Invite Copied!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>Challenge a Friend</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
