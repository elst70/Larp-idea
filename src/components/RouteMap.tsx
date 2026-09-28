/// <reference types="google.maps" />
import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  useMap,
  type MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { cityList, type City } from '@/data/cities';
import { findReachableCities, findRoutes, formatDuration } from '@/lib/routing';
import { X, Star, Moon, Clock, Train } from 'lucide-react';

interface RouteMapProps {
  startCityId: string;
  onBack: () => void;
  onSelectCity: (city: City) => void;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const MAX_HOURS = 120;

function MapController({ reachable }: { reachable: { cityId: string; hours: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (reachable.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      reachable.forEach((r) => {
        const city = cityList.find((c) => c.id === r.cityId);
        if (city) bounds.extend({ lat: city.lat, lng: city.lng });
      });
      map.fitBounds(bounds, 60);
    }
  }, [map, reachable]);
  return null;
}

function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function RouteMap({ startCityId, onBack, onSelectCity }: RouteMapProps) {
  const [maxHours, setMaxHours] = useState(24);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const reachable = useMemo(() => {
    return findReachableCities(startCityId, maxHours);
  }, [startCityId, maxHours]);

  const startCity = cityList.find((c) => c.id === startCityId)!;
  const selectedCityData = selectedCity ? cityList.find((c) => c.id === selectedCity) : null;
  const routesToSelected = selectedCity ? findRoutes(startCityId, selectedCity) : [];

  const handleCameraChange = useCallback((_ev: MapCameraChangedEvent) => {
    setMapLoaded(true);
  }, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={onBack} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] mb-2 flex items-center gap-1">
              <X className="w-4 h-4" /> Back
            </button>
            <h2 className="font-display text-3xl font-medium">
              Destinations from {startCity.name}
            </h2>
          </div>
        </div>
        <div className="glass rounded-2xl p-8 text-center">
          <Train className="w-10 h-10 text-[var(--color-text-dim)] mx-auto mb-4" />
          <h3 className="font-display text-xl font-medium mb-2">Google Maps API key needed</h3>
          <p className="text-sm text-[var(--color-text-dim)] max-w-md mx-auto">
            To show the interactive map, add your Google Maps JavaScript API key to the environment
            variable <code className="text-[var(--color-primary)]">VITE_GOOGLE_MAPS_API_KEY</code> in your
            environment settings. You can get a key from the Google Cloud Console under "Maps JavaScript API".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] mb-2 flex items-center gap-1">
            <X className="w-4 h-4" /> Back
          </button>
          <h2 className="font-display text-3xl font-medium">
            Destinations from {startCity.name}
          </h2>
          <p className="text-[var(--color-text-dim)] mt-1">All cities reachable by train, with travel time shown on each marker.</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-4">
        <Clock className="w-5 h-5 text-[var(--color-primary)]" />
        <span className="text-sm text-[var(--color-text-dim)] whitespace-nowrap">Max travel time:</span>
        <input
          type="range"
          min={4}
          max={MAX_HOURS}
          step={1}
          value={maxHours}
          onChange={(e) => setMaxHours(Number(e.target.value))}
          className="flex-1 max-w-xs accent-[var(--color-primary)]"
        />
        <span className="text-sm font-medium w-20 whitespace-nowrap">{formatHours(maxHours)}</span>
        <span className="text-sm text-[var(--color-text-dim)] ml-auto whitespace-nowrap">{reachable.length} destinations</span>
      </div>

      <div className="glass rounded-2xl p-2 overflow-hidden" style={{ height: '560px' }}>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            defaultCenter={{ lat: startCity.lat, lng: startCity.lng }}
            defaultZoom={5}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapId="railwander-map"
            onCameraChanged={handleCameraChange}
            style={{ width: '100%', height: '100%', borderRadius: '12px' }}
          >
            <MapController reachable={reachable} />

            {reachable.map((r) => {
              const city = cityList.find((c) => c.id === r.cityId);
              if (!city) return null;
              const isSelected = selectedCity === r.cityId;
              const timeStr = formatHours(r.hours);
              return (
                <AdvancedMarker
                  key={r.cityId}
                  position={{ lat: city.lat, lng: city.lng }}
                  title={`${city.name} — ${timeStr}`}
                  onClick={() => setSelectedCity(r.cityId)}
                >
                  <div className={`relative flex flex-col items-center cursor-pointer transition-transform ${isSelected ? 'scale-125' : ''}`}>
                    <div
                      className={`rounded-full border-2 shadow-lg ${
                        isSelected
                          ? 'w-5 h-5 bg-[var(--color-accent)] border-white'
                          : 'w-3.5 h-3.5 bg-[var(--color-secondary)] border-white/80'
                      }`}
                    />
                  </div>
                </AdvancedMarker>
              );
            })}
          </GoogleMap>
        </APIProvider>
      </div>

      {!mapLoaded && (
        <div className="glass rounded-2xl p-4 mt-2 text-center">
          <div className="skeleton h-4 w-32 mx-auto rounded" />
        </div>
      )}

      {selectedCityData && (
        <div className="glass rounded-2xl p-6 mt-4 animate-fade-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-2xl font-medium">{selectedCityData.countryFlag} {selectedCityData.name}</h3>
              <p className="text-sm text-[var(--color-text-dim)]">{selectedCityData.country}</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-surface)] rounded-lg">
                <Star className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span className="text-sm">{selectedCityData.stopRating}/5 stop</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-surface)] rounded-lg">
                <Moon className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                <span className="text-sm">{selectedCityData.overnightRating}/5 overnight</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text)] mb-4">{selectedCityData.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCityData.highlights.map((h) => (
              <span key={h} className="text-xs px-2.5 py-1 bg-[var(--color-surface-2)] rounded-full text-[var(--color-text-dim)]">
                {h}
              </span>
            ))}
          </div>
          {routesToSelected.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[var(--color-text-dim)] uppercase tracking-wider">Routes from {startCity.name}</h4>
              {routesToSelected.slice(0, 3).map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-xl">
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-[var(--color-text-dim)]">{formatDuration(r.totalDurationMin)} · {r.transfers} transfers</div>
                  </div>
                  <div className="text-sm font-medium text-[var(--color-primary)]">€{r.totalPriceEur}</div>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => onSelectCity(selectedCityData)}
            className="w-full mt-4 px-4 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold rounded-xl hover:bg-[var(--color-primary-dim)] transition-colors text-sm"
          >
            Plan a trip to {selectedCityData.name}
          </button>
        </div>
      )}
    </div>
  );
}
