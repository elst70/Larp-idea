import { useState, type ComponentType } from 'react';
import { type Journey, type City } from '@/data/cities';
import { formatDuration } from '@/lib/routing';
import { getStopRecommendation } from '@/lib/ai';
import { X, Moon, MapPin, Star, Bed, Camera, Utensils, Mountain, Building, Clock, Wallet, Train as TrainIcon, ArrowRight } from 'lucide-react';

interface JourneyDetailProps {
  route: Journey;
  onBack: () => void;
}

interface Accommodation {
  name: string;
  type: string;
  pricePerNight: number;
  rating: number;
  description: string;
}

interface Activity {
  name: string;
  type: string;
  duration: string;
  price: number;
  icon: ComponentType<{ className?: string }>;
}

function getAccommodations(city: City): Accommodation[] {
  const base = city.budgetLevel === 'budget' ? 25 : city.budgetLevel === 'mid' ? 60 : 120;
  return [
    {
      name: `${city.name} Central Hostel`,
      type: 'Hostel',
      pricePerNight: Math.round(base * 0.5),
      rating: 4.2,
      description: 'Social vibe, walking distance to the center. Bunks and private rooms.',
    },
    {
      name: `Hotel ${city.name} Plaza`,
      type: 'Hotel',
      pricePerNight: Math.round(base),
      rating: 4.5,
      description: 'Comfortable mid-range hotel near the main station.',
    },
    {
      name: `${city.name} Boutique Suites`,
      type: 'Boutique',
      pricePerNight: Math.round(base * 1.8),
      rating: 4.8,
      description: 'Design-forward rooms with local character. Breakfast included.',
    },
  ];
}

function getActivities(city: City): Activity[] {
  return city.highlights.map((h, i) => {
    const tag = city.tags[i % city.tags.length];
    const icon = tag.includes('mountain') || tag.includes('nature') ? Mountain
      : tag.includes('food') ? Utensils
      : tag.includes('historic') || tag.includes('culture') || tag.includes('art') ? Building
      : Camera;
    return {
      name: h,
      type: tag,
      duration: `${2 + (i % 3)}h`,
      price: city.budgetLevel === 'budget' ? 0 + i * 5 : city.budgetLevel === 'mid' ? 10 + i * 8 : 20 + i * 12,
      icon,
    };
  });
}

export default function JourneyDetail({ route, onBack }: JourneyDetailProps) {
  const [activeStopIdx, setActiveStopIdx] = useState(0);

  const activeStop = route.stops[activeStopIdx];
  const accommodations = activeStop ? getAccommodations(activeStop.city) : [];
  const activities = activeStop ? getActivities(activeStop.city) : [];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] mb-2 flex items-center gap-1">
            <X className="w-4 h-4" /> Back to routes
          </button>
          <h2 className="font-display text-3xl font-medium">{route.title}</h2>
          <p className="text-[var(--color-text-dim)] mt-1">{route.description}</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-sm">{formatDuration(route.totalDurationMin)}</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-[var(--color-secondary)]" />
          <span className="text-sm">{route.transfers} transfers</span>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-[var(--color-accent)]" />
          <span className="text-sm">€{route.totalPriceEur} trains</span>
        </div>
        {route.overnightCount > 0 && (
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="text-sm">{route.overnightCount} overnight</span>
          </div>
        )}
        {route.scenicScore > 0 && (
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-[#a78bfa]" />
            <span className="text-sm">{route.scenicScore} scenic segments</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {route.stops.map((stop, i) => (
          <button
            key={i}
            onClick={() => setActiveStopIdx(i)}
            className={`px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
              activeStopIdx === i
                ? 'bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold'
                : 'bg-[var(--color-surface)] text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
            }`}
          >
            {stop.city.countryFlag} {stop.city.name}
            {stop.isOvernight && <Moon className="w-3 h-3" />}
          </button>
        ))}
      </div>

      {activeStop && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-2xl font-medium">{activeStop.city.countryFlag} {activeStop.city.name}</h3>
                  <p className="text-sm text-[var(--color-text-dim)]">{activeStop.city.country}</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-[var(--color-surface)] rounded-lg text-xs">
                    <Star className="w-3 h-3 text-[var(--color-accent)]" />
                    {activeStop.city.stopRating}/5
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text)]">{activeStop.city.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {activeStop.city.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-[var(--color-surface-2)] rounded-full text-[var(--color-text-dim)] capitalize">{t}</span>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-4">Activities and sights</h4>
              <div className="space-y-2">
                {activities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div key={act.name} className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{act.name}</div>
                        <div className="text-xs text-[var(--color-text-dim)] capitalize">{act.type} · {act.duration}</div>
                      </div>
                      <div className="text-sm text-[var(--color-text-dim)]">{act.price === 0 ? 'Free' : `€${act.price}`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Bed className="w-4 h-4" /> Where to stay
              </h4>
              <div className="space-y-3">
                {accommodations.map((acc) => (
                  <div key={acc.name} className="p-4 bg-[var(--color-surface)] rounded-xl hover:border-[var(--color-primary)]/30 border border-transparent transition-all">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="font-medium text-sm">{acc.name}</div>
                        <div className="text-xs text-[var(--color-text-dim)]">{acc.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[var(--color-primary)]">€{acc.pricePerNight}</div>
                        <div className="text-xs text-[var(--color-text-dim)]">per night</div>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-dim)] mt-2">{acc.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-[var(--color-accent)]" />
                      <span className="text-xs text-[var(--color-text-dim)]">{acc.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" /> Stop time guidance
              </h4>
              {(() => {
                const rec = getStopRecommendation(activeStop.city, activeStop.isOvernight ? 24 : 3);
                return (
                  <div className={`p-3 rounded-xl text-sm ${rec.feasible ? 'bg-[var(--color-primary)]/5 text-[var(--color-text)]' : 'bg-[var(--color-warning)]/5 text-[var(--color-warning)]'}`}>
                    {rec.suggestion}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-6 mt-6">
        <h4 className="text-sm font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrainIcon className="w-4 h-4" /> Train segments
        </h4>
        <div className="space-y-2">
          {route.legs.map((leg, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl">
              <div className="text-center shrink-0 w-12">
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
                  <span className="capitalize">{leg.segment.type}</span>
                  <span>·</span>
                  <span>{formatDuration(leg.segment.durationMin)}</span>
                  <span>·</span>
                  <span>{leg.segment.frequency}</span>
                  {leg.segment.scenic && <span className="text-[#a78bfa]">· Scenic route</span>}
                </div>
              </div>
              <div className="text-sm font-medium text-[var(--color-primary)] shrink-0">€{leg.segment.priceEur}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
