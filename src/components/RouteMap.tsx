/// <reference types="google.maps" />
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  useMap,
  type MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { cityList, type City } from '@/data/cities';
import { findReachableCities, findRoutes, formatDuration } from '@/lib/routing';
import { X, Star, Clock, Moon, Train } from 'lucide-react';

interface RouteMapProps {
  startCityId: string;
  onBack: () => void;
  onSelectCity: (city: City) => void;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function MapController({ startCity, reachable }: { startCity: City; reachable: { cityId: string; hours: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: startCity.lat, lng: startCity.lng });
    reachable.forEach((r) => {
      const city = cityList.find((c) => c.id === r.cityId);
      if (city) bounds.extend({ lat: city.lat, lng: city.lng });
    });
    if (reachable.length > 0) {
      map.fitBounds(bounds, 60);
    } else {
      map.setCenter({ lat: startCity.lat, lng: startCity.lng });
      map.setZoom(6);
    }
  }, [map, startCity, reachable]);
  return null;
}

function RouteLines({ startCity, reachable }: { startCity: City; reachable: { cityId: string; hours: number }[] }) {
  const map = useMap();
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  const clearPolylines = useCallback(() => {
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
  }, []);

  useEffect(() => {
    if (!map) return;
    clearPolylines();

    reachable.forEach((r) => {
      const city = cityList.find((c) => c.id === r.cityId);
      if (!city) return;
      const opacity = Math.max(0.2, 1 - r.hours / 24);
      const polyline = new google.maps.Polyline({
        path: [
          { lat: startCity.lat, lng: startCity.lng },
          { lat: city.lat, lng: city.lng },
        ],
        geodesic: true,
        strokeColor: '#3dd68c',
        strokeOpacity: opacity,
        strokeWeight: 2,
        map,
      });
      polylinesRef.current.push(polyline);
    });

    return clearPolylines;
  }, [map, startCity, reachable, clearPolylines]);
  return null;
}

export default function RouteMap({ startCityId, onBack, onSelectCity }: RouteMapProps) {
  const [maxHours, setMaxHours] = useState(12);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const reachable = useMemo(() => {
    return findReachableCities(startCityId, maxHours);
  }, [startCityId, maxHours]);

  const reachableMap = useMemo(() => {
    const m = new Map<string, number>();
    reachable.forEach((r) => m.set(r.cityId, r.hours));
    return m;
  }, [reachable]);

  const startCity = cityList.find((c) => c.id === startCityId)!;
  const selectedCityData = selectedCity ? cityList.find((c) => c.id === selectedCity) : null;
  const routesToSelected = selectedCity ? findRoutes(startCityId, selectedCity) : [];

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
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
              Where can you go from {startCity.name}?
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
            Where can you go from {startCity.name}?
          </h2>
          <p className="text-[var(--color-text-dim)] mt-1">Cities reachable by train within your time budget.</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-4">
        <Clock className="w-5 h-5 text-[var(--color-primary)]" />
        <span className="text-sm text-[var(--color-text-dim)]">Max travel time:</span>
        <input
          type="range"
          min={4}
          max={24}
          value={maxHours}
          onChange={(e) => setMaxHours(Number(e.target.value))}
          className="flex-1 max-w-xs accent-[var(--color-primary)]"
        />
        <span className="text-sm font-medium w-16">{maxHours}h</span>
        <span className="text-sm text-[var(--color-text-dim)] ml-auto">{reachable.length} cities reachable</span>
      </div>

      <div className="glass rounded-2xl p-2 overflow-hidden" style={{ height: '520px' }}>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            defaultCenter={{ lat: startCity.lat, lng: startCity.lng }}
            defaultZoom={6}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapId="railwander-map"
            onCameraChanged={handleCameraChange}
            style={{ width: '100%', height: '100%', borderRadius: '12px' }}
          >
            <MapController startCity={startCity} reachable={reachable} />
            <RouteLines startCity={startCity} reachable={reachable} />

            {/* Start city marker */}
            <AdvancedMarker
              position={{ lat: startCity.lat, lng: startCity.lng }}
              title={`${startCity.name} (start)`}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-[var(--color-bg)]">
                  {startCity.countryFlag}
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-[var(--color-bg)]/80 text-xs text-[var(--color-primary)] font-medium whitespace-nowrap">
                  {startCity.name}
                </div>
              </div>
            </AdvancedMarker>

            {/* Reachable city markers */}
            {reachable.map((r) => {
              const city = cityList.find((c) => c.id === r.cityId);
              if (!city) return null;
              const isSelected = selectedCity === r.cityId;
              return (
                <AdvancedMarker
                  key={r.cityId}
                  position={{ lat: city.lat, lng: city.lng }}
                  title={`${city.name} (${Math.round(r.hours)}h)`}
                  onClick={() => setSelectedCity(r.cityId)}
                >
                  <div className={`relative flex flex-col items-center cursor-pointer transition-all ${isSelected ? 'scale-110' : ''}`}>
                    <div
                      className={`w-6 h-6 rounded-full border-2 shadow-lg flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? 'bg-[var(--color-accent)] border-white'
                          : 'bg-[var(--color-secondary)] border-white/80'
                      }`}
                    >
                      <span className="text-white">{city.countryFlag}</span>
                    </div>
                    <div className="mt-0.5 px-1.5 py-0.5 rounded bg-[var(--color-bg)]/70 text-[10px] text-white whitespace-nowrap">
                      {city.name} ({Math.round(r.hours)}h)
                    </div>
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

      {/* City detail panel */}
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
