import { useState } from 'react';
import { type Journey } from '@/data/cities';
import { formatDuration } from '@/lib/routing';
import { Clock, ArrowRight, Moon, Mountain, Train as TrainIcon, Wallet, X } from 'lucide-react';

interface RouteResultsProps {
  routes: Journey[];
  fromName: string;
  toName: string;
  onBack: () => void;
  onSelectRoute: (route: Journey) => void;
}

const typeStyles: Record<string, { color: string; bg: string; icon: typeof Clock }> = {
  fastest: { color: 'var(--color-secondary)', bg: 'rgba(74,158,255,0.1)', icon: Clock },
  comfort: { color: 'var(--color-accent)', bg: 'rgba(245,166,35,0.1)', icon: Moon },
  balanced: { color: 'var(--color-primary)', bg: 'rgba(61,214,140,0.1)', icon: TrainIcon },
  scenic: { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', icon: Mountain },
};

export default function RouteResults({ routes, fromName, toName, onBack, onSelectRoute }: RouteResultsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (routes.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-20">
        <p className="text-[var(--color-text-dim)] text-lg">No routes found between these cities. Try different destinations.</p>
        <button onClick={onBack} className="mt-4 text-[var(--color-primary)] hover:underline">Go back</button>
      </div>
    );
  }

  const selected = routes.find((r) => r.id === selectedId);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] mb-2 flex items-center gap-1">
            <X className="w-4 h-4" /> New search
          </button>
          <h2 className="font-display text-3xl font-medium">
            {fromName} <ArrowRight className="inline w-6 h-6 text-[var(--color-text-dim)]" /> {toName}
          </h2>
          <p className="text-[var(--color-text-dim)] mt-1">{routes.length} route{routes.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      <div className="grid gap-4">
        {routes.map((route, idx) => {
          const style = typeStyles[route.type] || typeStyles.balanced;
          const Icon = style.icon;
          const isSelected = selectedId === route.id;

          return (
            <div
              key={route.id}
              onClick={() => setSelectedId(isSelected ? null : route.id)}
              className="glass rounded-2xl p-5 cursor-pointer transition-all hover:border-[var(--color-primary)]/40 animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms`, border: isSelected ? '1px solid var(--color-primary)' : undefined }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: style.bg }}>
                    <Icon className="w-5 h-5" style={{ color: style.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{route.title}</h3>
                      {route.overnightCount > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,0.15)', color: 'var(--color-accent)' }}>
                          Night train
                        </span>
                      )}
                      {route.scenicScore > 1 && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>
                          Scenic
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-dim)] mt-1">{route.description}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1.5 text-[var(--color-text-dim)]">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDuration(route.totalDurationMin)}
                      </span>
                      <span className="flex items-center gap-1.5 text-[var(--color-text-dim)]">
                        <ArrowRight className="w-3.5 h-3.5" />
                        {route.transfers} transfer{route.transfers !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1.5 text-[var(--color-text-dim)]">
                        <Wallet className="w-3.5 h-3.5" />
                        €{route.totalPriceEur}
                      </span>
                      {route.overnightCount > 0 && (
                        <span className="flex items-center gap-1.5 text-[var(--color-text-dim)]">
                          <Moon className="w-3.5 h-3.5" />
                          {route.overnightCount} overnight
                        </span>
                      )}
                    </div>

                    {/* City path */}
                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      {route.stops.map((stop, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          {i > 0 && <ArrowRight className="w-3 h-3 text-[var(--color-text-dim)]" />}
                          <span className={`text-xs px-2 py-1 rounded-md ${stop.isOvernight ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'bg-[var(--color-surface-2)] text-[var(--color-text-dim)]'}`}>
                            {stop.city.countryFlag} {stop.city.name}
                            {stop.isOvernight && ` · ${stop.nights}n`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="mt-5 pt-5 border-t border-[var(--color-border)] animate-fade-in">
                  <h4 className="text-sm font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-3">Journey details</h4>
                  <div className="space-y-3">
                    {route.legs.map((leg, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl">
                        <div className="text-center shrink-0">
                          <div className="text-xs text-[var(--color-text-dim)]">{leg.departureTime}</div>
                          <div className="text-xs text-[var(--color-text-dim)] mt-1">{leg.arrivalTime}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{leg.fromCity.countryFlag} {leg.fromCity.name}</span>
                            <ArrowRight className="w-3 h-3 text-[var(--color-text-dim)]" />
                            <span className="font-medium">{leg.toCity.countryFlag} {leg.toCity.name}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-dim)]">
                            <TrainIcon className="w-3 h-3" />
                            <span className="capitalize">{leg.segment.type}</span>
                            <span>·</span>
                            <span>{formatDuration(leg.segment.durationMin)}</span>
                            <span>·</span>
                            <span>{leg.segment.frequency}</span>
                            {leg.segment.scenic && <span style={{ color: '#a78bfa' }}>· Scenic</span>}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-[var(--color-primary)] shrink-0">€{leg.segment.priceEur}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectRoute(route); }}
                      className="flex-1 px-4 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold rounded-xl hover:bg-[var(--color-primary-dim)] transition-colors text-sm"
                    >
                      View stops & activities
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
