import { useState } from 'react';
import { cityList } from '@/data/cities';
import { Search, ArrowRight, MapPin, Sparkles, Compass } from 'lucide-react';

interface SearchPanelProps {
  onStartSearch: (from: string, to: string) => void;
  onOpenMap: (from: string) => void;
  onOpenSlowTravel: (from: string, to: string) => void;
}

export default function SearchPanel({ onStartSearch, onOpenMap, onOpenSlowTravel }: SearchPanelProps) {
  const [from, setFrom] = useState('stockholm');
  const [to, setTo] = useState('milan');

  const sortedCities = [...cityList].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight mb-4">
          Find the best way<br className="md:hidden" /> to travel across <span className="text-[var(--color-primary)]">Europe</span> by train
        </h1>
        <p className="text-[var(--color-text-dim)] text-lg max-w-xl mx-auto">
          Discover scenic routes, great stopovers and cities worth staying in.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">
              From
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-[var(--color-text)] appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              >
                {sortedCities.map((c) => (
                  <option key={c.id} value={c.id}>{c.countryFlag} {c.name}, {c.country}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden md:flex items-center pb-3">
            <ArrowRight className="w-5 h-5 text-[var(--color-text-dim)]" />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">
              To
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-[var(--color-text)] appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              >
                {sortedCities.map((c) => (
                  <option key={c.id} value={c.id}>{c.countryFlag} {c.name}, {c.country}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => onStartSearch(from, to)}
            className="w-full md:w-auto px-8 py-3 bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold rounded-xl hover:bg-[var(--color-primary-dim)] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 hover:scale-[1.02] active:scale-95"
          >
            <Search className="w-4 h-4" />
            Find routes
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[var(--color-border)]">
          <button
            onClick={() => onOpenMap(from)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-surface-2)] rounded-xl text-sm text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
          >
            <Compass className="w-4 h-4 text-[var(--color-secondary)]" />
            Explore the map
          </button>
          <button
            onClick={() => onOpenSlowTravel(from, to)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-surface-2)] rounded-xl text-sm text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            Plan a slow-travel journey
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-[var(--color-text-dim)]">Try:</span>
        {[
          { from: 'stockholm', to: 'milan', label: 'Stockholm → Milan' },
          { from: 'paris', to: 'rome', label: 'Paris → Rome' },
          { from: 'berlin', to: 'barcelona', label: 'Berlin → Barcelona' },
          { from: 'amsterdam', to: 'florence', label: 'Amsterdam → Florence' },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setFrom(preset.from); setTo(preset.to); }}
            className="text-sm px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-all"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
