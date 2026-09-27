import { useState } from 'react';
import SearchPanel from '@/components/SearchPanel';
import RouteResults from '@/components/RouteResults';
import RouteMap from '@/components/RouteMap';
import SlowTravel from '@/components/SlowTravel';
import JourneyDetail from '@/components/JourneyDetail';
import { findRoutes } from '@/lib/routing';
import { cities, type Journey, type City } from '@/data/cities';
import { Train } from 'lucide-react';

type View = 'search' | 'results' | 'map' | 'slowtravel' | 'journeyDetail';

export default function App() {
  const [view, setView] = useState<View>('search');
  const [fromCity, setFromCity] = useState('stockholm');
  const [toCity, setToCity] = useState('milan');
  const [routes, setRoutes] = useState<Journey[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Journey | null>(null);

  const handleSearch = (from: string, to: string) => {
    setFromCity(from);
    setToCity(to);
    setRoutes(findRoutes(from, to));
    setView('results');
  };

  const handleOpenMap = (from: string) => {
    setFromCity(from);
    setView('map');
  };

  const handleOpenSlowTravel = (from: string, to: string) => {
    setFromCity(from);
    setToCity(to);
    setView('slowtravel');
  };

  const handleSelectRoute = (route: Journey) => {
    setSelectedRoute(route);
    setView('journeyDetail');
  };

  const handleMapSelectCity = (city: City) => {
    setToCity(city.id);
    setRoutes(findRoutes(fromCity, city.id));
    setView('results');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setView('search')}
            className="flex items-center gap-2 font-display text-xl font-medium"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center">
              <Train className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            RailWander
          </button>
          <nav className="flex gap-1">
            <button
              onClick={() => setView('search')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${view === 'search' ? 'bg-[var(--color-surface-2)] text-[var(--color-text)]' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'}`}
            >
              Search
            </button>
            <button
              onClick={() => setView('map')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${view === 'map' ? 'bg-[var(--color-surface-2)] text-[var(--color-text)]' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'}`}
            >
              Map
            </button>
            <button
              onClick={() => setView('slowtravel')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${view === 'slowtravel' ? 'bg-[var(--color-surface-2)] text-[var(--color-text)]' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'}`}
            >
              Slow travel
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-8 md:py-12">
        {view === 'search' && (
          <SearchPanel
            onStartSearch={handleSearch}
            onOpenMap={handleOpenMap}
            onOpenSlowTravel={handleOpenSlowTravel}
          />
        )}
        {view === 'results' && (
          <RouteResults
            routes={routes}
            fromName={cities[fromCity].name}
            toName={cities[toCity].name}
            onBack={() => setView('search')}
            onSelectRoute={handleSelectRoute}
          />
        )}
        {view === 'map' && (
          <RouteMap
            startCityId={fromCity}
            onBack={() => setView('search')}
            onSelectCity={handleMapSelectCity}
          />
        )}
        {view === 'slowtravel' && (
          <SlowTravel
            startId={fromCity}
            endId={toCity}
            onBack={() => setView('search')}
          />
        )}
        {view === 'journeyDetail' && selectedRoute && (
          <JourneyDetail
            route={selectedRoute}
            onBack={() => setView('results')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-[var(--color-text-dim)]">
            RailWander — plan train journeys across Europe. Routes and prices are illustrative.
          </p>
        </div>
      </footer>
    </div>
  );
}
