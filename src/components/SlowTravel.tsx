import { useState, useRef, useEffect } from 'react';
import { cityList, type City } from '@/data/cities';
import { generateSlowTravelItinerary, generateAIResponse, type SlowTravelPreferences, type AIStopSuggestion, type AIMessage } from '@/lib/ai';
import { formatDuration } from '@/lib/routing';
import { X, Sparkles, Send, Moon, Mountain, Clock, Wallet, MapPin, Utensils, Building, PartyPopper, Heart, PenLine, Check } from 'lucide-react';

interface SlowTravelProps {
  startId: string;
  endId: string;
  onBack: () => void;
}

const prefOptions = [
  { key: 'scenicViews', label: 'Scenic views', icon: Mountain },
  { key: 'budgetFriendly', label: 'Budget-friendly', icon: Wallet },
  { key: 'historicCities', label: 'Historic cities', icon: Building },
  { key: 'nature', label: 'Nature & outdoors', icon: MapPin },
  { key: 'foodie', label: 'Food & cuisine', icon: Utensils },
  { key: 'nightlife', label: 'Nightlife', icon: PartyPopper },
  { key: 'romantic', label: 'Romantic', icon: Heart },
] as const;

export default function SlowTravel({ startId, endId, onBack }: SlowTravelProps) {
  const [from, setFrom] = useState(startId);
  const [to, setTo] = useState(endId);
  const [prefs, setPrefs] = useState<SlowTravelPreferences>({
    scenicViews: true,
    budgetFriendly: false,
    historicCities: true,
    nature: false,
    foodie: false,
    nightlife: false,
    romantic: false,
    customText: '',
  });
  const [extraDays, setExtraDays] = useState(3);
  const [itinerary, setItinerary] = useState<{ stops: AIStopSuggestion[]; summary: string } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const startCity = cityList.find((c) => c.id === from)!;
  const endCity = cityList.find((c) => c.id === to)!;

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const togglePref = (key: keyof SlowTravelPreferences) => {
    setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
  };

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const result = generateSlowTravelItinerary(from, to, prefs, extraDays);
      setItinerary(result);
      setGenerating(false);
      setMessages([
        {
          role: 'ai',
          content: `Here's your slow-travel plan: ${result.summary}. You can ask me to adjust it — add a night, change a stop, or reroute for scenery.`,
          suggestions: ['Add an extra day', 'Make it more scenic', 'Where should I stop?'],
        },
      ]);
    }, 1200);
  };

  const sendMessage = (text: string) => {
    const userMsg: AIMessage = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const response = generateAIResponse(text, {
        startId: from,
        endId: to,
        currentItinerary: itinerary?.stops,
        prefs,
      });
      setMessages((m) => [...m, response]);
    }, 800);
  };

  const sortedCities = [...cityList].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] mb-2 flex items-center gap-1">
            <X className="w-4 h-4" /> Back
          </button>
          <h2 className="font-display text-3xl font-medium flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
            Slow-travel planner
          </h2>
          <p className="text-[var(--color-text-dim)] mt-1">Tell us what matters to you — we'll build the journey.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Left: Setup + itinerary */}
        <div className="space-y-6">
          {/* Setup */}
          <div className="glass rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">From</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                >
                  {sortedCities.map((c) => <option key={c.id} value={c.id}>{c.countryFlag} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">To</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                >
                  {sortedCities.map((c) => <option key={c.id} value={c.id}>{c.countryFlag} {c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-3">What matters to you?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {prefOptions.map((opt) => {
                  const active = prefs[opt.key as keyof SlowTravelPreferences] as boolean;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => togglePref(opt.key as keyof SlowTravelPreferences)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all border ${
                        active
                          ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-[var(--color-primary)]'
                          : 'bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {opt.label}
                      {active && <Check className="w-3.5 h-3.5 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">
                Anything else? Tell us in your own words
              </label>
              <div className="relative">
                <PenLine className="absolute left-3 top-3 w-4 h-4 text-[var(--color-text-dim)]" />
                <textarea
                  value={prefs.customText}
                  onChange={(e) => setPrefs((p) => ({ ...p, customText: e.target.value }))}
                  placeholder="e.g. I want to avoid big cities and see the Alps..."
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-sm resize-none focus:outline-none focus:border-[var(--color-primary)]"
                  rows={2}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">
                Extra days for stops: <span className="text-[var(--color-text)]">{extraDays} day{extraDays !== 1 ? 's' : ''}</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={extraDays}
                onChange={(e) => setExtraDays(Number(e.target.value))}
                className="w-full accent-[var(--color-primary)]"
              />
            </div>

            <button
              onClick={generate}
              disabled={generating}
              className="w-full px-4 py-3 bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold rounded-xl hover:bg-[var(--color-primary-dim)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? (
                <><Sparkles className="w-4 h-4 animate-pulse-soft" /> Planning your journey...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Generate itinerary</>
              )}
            </button>
          </div>

          {/* Itinerary */}
          {itinerary && (
            <div className="glass rounded-2xl p-6 animate-fade-up">
              <h3 className="font-display text-xl font-medium mb-1">Your journey</h3>
              <p className="text-sm text-[var(--color-text-dim)] mb-4">{itinerary.summary}</p>

              <div className="space-y-3">
                {/* Start city */}
                <div className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-primary)]/30">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/15 flex items-center justify-center text-lg">
                    {startCity.countryFlag}
                  </div>
                  <div>
                    <div className="font-medium">{startCity.name}</div>
                    <div className="text-xs text-[var(--color-text-dim)]">Departure</div>
                  </div>
                </div>

                {itinerary.stops.map((stop, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex justify-center py-1">
                      <div className="w-px h-6 bg-[var(--color-border)]" />
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[var(--color-surface)] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-lg shrink-0">
                        {stop.city.countryFlag}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{stop.city.name}</div>
                          <div className="flex items-center gap-1 text-xs text-[var(--color-accent)]">
                            <Moon className="w-3 h-3" />
                            {stop.recommendedNights} night{stop.recommendedNights !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <p className="text-xs text-[var(--color-text-dim)] mt-1">{stop.reason}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {stop.activities.map((a) => (
                            <span key={a} className="text-xs px-2 py-0.5 bg-[var(--color-surface-2)] rounded-full text-[var(--color-text-dim)]">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* End city */}
                <div className="flex justify-center py-1">
                  <div className="w-px h-6 bg-[var(--color-border)]" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-secondary)]/30">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/15 flex items-center justify-center text-lg">
                    {endCity.countryFlag}
                  </div>
                  <div>
                    <div className="font-medium">{endCity.name}</div>
                    <div className="text-xs text-[var(--color-text-dim)]">Final destination</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: AI chat */}
        <div className="glass rounded-2xl p-4 flex flex-col h-[600px] sticky top-4">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            </div>
            <div>
              <div className="text-sm font-medium">Travel assistant</div>
              <div className="text-xs text-[var(--color-text-dim)]">Ask me anything about your trip</div>
            </div>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="w-8 h-8 text-[var(--color-text-dim)] mx-auto mb-3" />
                <p className="text-sm text-[var(--color-text-dim)]">Generate an itinerary first, then ask me to adjust it.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-primary)] text-[var(--color-bg)]'
                      : 'bg-[var(--color-surface-2)] text-[var(--color-text)]'
                  }`}
                >
                  {msg.content}
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="text-xs px-2.5 py-1 bg-[var(--color-surface)] rounded-full text-[var(--color-text-dim)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all border border-[var(--color-border)]"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--color-border)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && chatInput.trim()) sendMessage(chatInput.trim()); }}
                placeholder="Ask about routes, stops, timing..."
                className="flex-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button
                onClick={() => chatInput.trim() && sendMessage(chatInput.trim())}
                className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-[var(--color-bg)] flex items-center justify-center hover:bg-[var(--color-primary-dim)] transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
