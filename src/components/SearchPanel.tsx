import { useState, useRef, useEffect, useMemo } from 'react';
import { cityList, type City } from '@/data/cities';
import { Search, ArrowRight, MapPin, Sparkles, Compass, X } from 'lucide-react';

interface SearchPanelProps {
  onStartSearch: (from: string, to: string) => void;
  onOpenMap: (from: string) => void;
  onOpenSlowTravel: (from: string, to: string) => void;
}

function CityCombobox({
  label,
  selectedId,
  onSelect,
  excludeId,
}: {
  label: string;
  selectedId: string;
  onSelect: (id: string) => void;
  excludeId: string;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = cityList.find((c) => c.id === selectedId);

  const sortedCities = useMemo(() => [...cityList].sort((a, b) => a.name.localeCompare(b.name)), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return sortedCities;
    const q = query.toLowerCase();
    return sortedCities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [query, sortedCities]);

  useEffect(() => {
    setHighlightIdx(0);
  }, [filtered]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const chooseCity = (id: string) => {
    onSelect(id);
    setOpen(false);
    setQuery('');
  };

  const showInput = open || !selected;

  return (
    <div className="flex-1 w-full" ref={containerRef}>
      <label className="block text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)] pointer-events-none z-10" />

        {showInput ? (
          <input
            ref={inputRef}
            type="text"
            value={query}
            autoFocus={open}
            placeholder={selected ? `${selected.name}, ${selected.country}` : 'Type a city or country…'}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightIdx((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                const choice = filtered[highlightIdx];
                if (choice && choice.id !== excludeId) chooseCity(choice.id);
              } else if (e.key === 'Escape') {
                setOpen(false);
                setQuery('');
              }
            }}
            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl pl-10 pr-8 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-text-dim)]/60"
          />
        ) : (
          <button
            onClick={() => {
              setOpen(true);
              setQuery('');
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl pl-10 pr-8 py-3 text-left text-[var(--color-text)] cursor-pointer focus:outline-none focus:border-[var(--color-primary)] transition-colors flex items-center justify-between"
          >
            <span className="truncate">{selected?.countryFlag} {selected?.name}, {selected?.country}</span>
            <span className="text-[var(--color-text-dim)] text-xs">Change</span>
          </button>
        )}

        {open && !showInput && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            autoFocus
            placeholder="Type a city or country…"
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightIdx((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                const choice = filtered[highlightIdx];
                if (choice && choice.id !== excludeId) chooseCity(choice.id);
              } else if (e.key === 'Escape') {
                setOpen(false);
                setQuery('');
              }
            }}
            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl pl-10 pr-8 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-text-dim)]/60"
          />
        )}

        {open && selected && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] hover:text-[var(--color-text)] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {open && (
          <div className="absolute z-50 top-full left-0 right-0 mt-2 glass rounded-xl shadow-2xl max-h-64 overflow-y-auto border border-[var(--color-border)]">
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-[var(--color-text-dim)]">
                No cities found for &ldquo;{query}&rdquo;
              </div>
            )}
            {filtered.map((c, i) => {
              const isExcluded = c.id === excludeId;
              return (
                <button
                  key={c.id}
                  disabled={isExcluded}
                  onClick={() => !isExcluded && chooseCity(c.id)}
                  onMouseEnter={() => setHighlightIdx(i)}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                    i === highlightIdx
                      ? 'bg-[var(--color-primary)]/10'
                      : 'hover:bg-[var(--color-surface)]'
                  } ${isExcluded ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="text-lg shrink-0">{c.countryFlag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--color-text)] truncate">{c.name}</div>
                    <div className="text-xs text-[var(--color-text-dim)] truncate">{c.country}</div>
                  </div>
                  {isExcluded && <span className="text-xs text-[var(--color-text-dim)]">Already selected</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPanel({ onStartSearch, onOpenMap, onOpenSlowTravel }: SearchPanelProps) {
  const [from, setFrom] = useState('stockholm');
  const [to, setTo] = useState('milan');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight mb-4">
          The slow way<br className="md:hidden" /> across <span className="text-[var(--color-primary)]">Europe</span>
        </h1>
        <p className="text-[var(--color-text-dim)] text-lg max-w-xl mx-auto">
          Find the best way to travel across Europe by train.
          Discover scenic routes, great stopovers and cities worth staying in.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <CityCombobox
            label="From"
            selectedId={from}
            onSelect={setFrom}
            excludeId={to}
          />

          <div className="hidden md:flex items-center pb-3">
            <ArrowRight className="w-5 h-5 text-[var(--color-text-dim)]" />
          </div>

          <CityCombobox
            label="To"
            selectedId={to}
            onSelect={setTo}
            excludeId={from}
          />

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
