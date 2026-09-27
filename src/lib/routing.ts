import { cities, getSegment, type City, type TrainSegment, type Journey, type JourneyLeg, type JourneyStop } from '@/data/cities';

export interface RoutePath {
  cityIds: string[];
  segments: TrainSegment[];
  totalDurationMin: number;
  totalPriceEur: number;
  transfers: number;
  scenicScore: number;
  hasNightTrain: boolean;
}

interface DijkstraNode {
  cityId: string;
  cost: number;
  path: string[];
  segments: TrainSegment[];
  totalDuration: number;
  totalPrice: number;
  transfers: number;
  scenicScore: number;
  hasNightTrain: boolean;
}

function getNeighborsWithSegments(cityId: string): { neighbor: string; segment: TrainSegment }[] {
  const results: { neighbor: string; segment: TrainSegment }[] = [];
  for (const seg of allSegments) {
    if (seg.from === cityId) results.push({ neighbor: seg.to, segment: seg });
    else if (seg.to === cityId) results.push({ neighbor: seg.from, segment: seg });
  }
  return results;
}

import { trainSegments as allSegments } from '@/data/cities';

function dijkstra(
  start: string,
  end: string,
  costFn: (seg: TrainSegment, node: DijkstraNode) => number,
  maxTransfers = 6
): RoutePath | null {
  const pq: DijkstraNode[] = [
    {
      cityId: start,
      cost: 0,
      path: [start],
      segments: [],
      totalDuration: 0,
      totalPrice: 0,
      transfers: 0,
      scenicScore: 0,
      hasNightTrain: false,
    },
  ];
  const visited = new Set<string>();

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost);
    const node = pq.shift()!;

    const key = `${node.cityId}-${node.transfers}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (node.cityId === end) {
      return {
        cityIds: node.path,
        segments: node.segments,
        totalDurationMin: node.totalDuration,
        totalPriceEur: node.totalPrice,
        transfers: node.transfers,
        scenicScore: node.scenicScore,
        hasNightTrain: node.hasNightTrain,
      };
    }

    if (node.transfers >= maxTransfers) continue;

    const neighbors = getNeighborsWithSegments(node.cityId);
    for (const { neighbor, segment } of neighbors) {
      if (node.path.includes(neighbor)) continue;

      const newNode: DijkstraNode = {
        cityId: neighbor,
        cost: node.cost + costFn(segment, node),
        path: [...node.path, neighbor],
        segments: [...node.segments, segment],
        totalDuration: node.totalDuration + segment.durationMin,
        totalPrice: node.totalPrice + segment.priceEur,
        transfers: node.transfers + 1,
        scenicScore: node.scenicScore + (segment.scenic ? 1 : 0),
        hasNightTrain: node.hasNightTrain || segment.type === 'night',
      };
      pq.push(newNode);
    }
  }
  return null;
}

function findAlternativePath(start: string, end: string, avoidCities: string[]): RoutePath | null {
  const pq: DijkstraNode[] = [
    {
      cityId: start,
      cost: 0,
      path: [start],
      segments: [],
      totalDuration: 0,
      totalPrice: 0,
      transfers: 0,
      scenicScore: 0,
      hasNightTrain: false,
    },
  ];
  const visited = new Set<string>();

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost);
    const node = pq.shift()!;
    const key = `${node.cityId}-${node.transfers}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (node.cityId === end) {
      return {
        cityIds: node.path,
        segments: node.segments,
        totalDurationMin: node.totalDuration,
        totalPriceEur: node.totalPrice,
        transfers: node.transfers,
        scenicScore: node.scenicScore,
        hasNightTrain: node.hasNightTrain,
      };
    }

    if (node.transfers >= 6) continue;

    const neighbors = getNeighborsWithSegments(node.cityId);
    for (const { neighbor, segment } of neighbors) {
      if (node.path.includes(neighbor)) continue;
      if (avoidCities.includes(neighbor) && neighbor !== end) continue;

      pq.push({
        cityId: neighbor,
        cost: node.cost + segment.durationMin,
        path: [...node.path, neighbor],
        segments: [...node.segments, segment],
        totalDuration: node.totalDuration + segment.durationMin,
        totalPrice: node.totalPrice + segment.priceEur,
        transfers: node.transfers + 1,
        scenicScore: node.scenicScore + (segment.scenic ? 1 : 0),
        hasNightTrain: node.hasNightTrain || segment.type === 'night',
      });
    }
  }
  return null;
}

function buildJourneyLegs(cityIds: string[], segments: TrainSegment[]): JourneyLeg[] {
  const legs: JourneyLeg[] = [];
  let currentHour = 8;

  for (let i = 0; i < segments.length; i++) {
    const fromCity = cities[cityIds[i]];
    const toCity = cities[cityIds[i + 1]];
    const seg = segments[i];

    const depHour = currentHour % 24;
    const depMin = Math.floor((currentHour / 24 - Math.floor(currentHour / 24)) * 60);
    const departureTime = `${String(depHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`;

    const arrivalTotal = currentHour + seg.durationMin / 60;
    const arrHour = Math.floor(arrivalTotal) % 24;
    const arrMin = Math.floor((arrivalTotal - Math.floor(arrivalTotal)) * 60);
    const arrivalTime = `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')}`;

    legs.push({ fromCity, toCity, segment: seg, departureTime, arrivalTime });
    currentHour = arrivalTotal + 1;
  }
  return legs;
}

function buildStops(cityIds: string[], overnightStops: Set<string>): JourneyStop[] {
  return cityIds.map((id, idx) => {
    const city = cities[id];
    const isOvernight = overnightStops.has(id);
    return {
      city,
      nights: isOvernight ? 1 : 0,
      isOvernight,
      arrivalTime: idx === 0 ? '08:00' : '',
    };
  });
}

export function findRoutes(startId: string, endId: string): Journey[] {
  const routes: Journey[] = [];

  // 1. Fastest route
  const fastest = dijkstra(startId, endId, (seg) => seg.durationMin);
  if (fastest) {
    const legs = buildJourneyLegs(fastest.cityIds, fastest.segments);
    routes.push({
      id: 'fastest',
      type: 'fastest',
      title: 'Fastest Route',
      description: `Direct as possible — ${fastest.transfers} transfer${fastest.transfers !== 1 ? 's' : ''}, no unnecessary stops.`,
      legs,
      stops: buildStops(fastest.cityIds, new Set()),
      totalDurationMin: fastest.totalDurationMin,
      totalPriceEur: fastest.totalPriceEur,
      transfers: fastest.transfers,
      overnightCount: 0,
      scenicScore: fastest.scenicScore,
      comfortScore: fastest.hasNightTrain ? 7 : 6,
    });
  }

  // 2. Comfort route (prefer night trains, fewer transfers)
  const comfort = dijkstra(startId, endId, (seg, node) => {
    let cost = seg.durationMin;
    if (seg.type === 'night') cost -= 120;
    if (node.transfers > 2) cost += 60;
    return cost;
  });
  if (comfort && comfort.cityIds.join(',') !== fastest?.cityIds.join(',')) {
    const overnightStops = new Set<string>();
    comfort.segments.forEach((s) => {
      if (s.type === 'night') {
        overnightStops.add(comfort.cityIds[comfort.segments.indexOf(s)]);
      }
    });
    const legs = buildJourneyLegs(comfort.cityIds, comfort.segments);
    routes.push({
      id: 'comfort',
      type: 'comfort',
      title: 'Comfort Route',
      description: comfort.hasNightTrain
        ? 'Overnight trains let you sleep through the long stretches.'
        : 'Fewer transfers, more relaxed pacing.',
      legs,
      stops: buildStops(comfort.cityIds, overnightStops),
      totalDurationMin: comfort.totalDurationMin,
      totalPriceEur: comfort.totalPriceEur,
      transfers: comfort.transfers,
      overnightCount: overnightStops.size,
      scenicScore: comfort.scenicScore,
      comfortScore: 9,
    });
  }

  // 3. Balanced route (medium transfers, some scenic)
  const balanced = dijkstra(startId, endId, (seg) => {
    let cost = seg.durationMin;
    if (seg.scenic) cost -= 30;
    if (seg.type === 'high-speed') cost -= 10;
    return cost;
  });
  if (balanced && balanced.cityIds.join(',') !== fastest?.cityIds.join(',') && balanced.cityIds.join(',') !== comfort?.cityIds.join(',')) {
    const legs = buildJourneyLegs(balanced.cityIds, balanced.segments);
    routes.push({
      id: 'balanced',
      type: 'balanced',
      title: 'Balanced Route',
      description: 'A good mix of speed and scenery — high-speed where it counts, scenic where it matters.',
      legs,
      stops: buildStops(balanced.cityIds, new Set()),
      totalDurationMin: balanced.totalDurationMin,
      totalPriceEur: balanced.totalPriceEur,
      transfers: balanced.transfers,
      overnightCount: 0,
      scenicScore: balanced.scenicScore,
      comfortScore: 7,
    });
  }

  // 4. Scenic route (maximize scenic segments)
  const scenic = dijkstra(startId, endId, (seg) => {
    return seg.durationMin - (seg.scenic ? 150 : 0) - (seg.type === 'scenic' ? 100 : 0);
  });
  if (scenic && scenic.cityIds.join(',') !== fastest?.cityIds.join(',') && scenic.cityIds.join(',') !== comfort?.cityIds.join(',') && scenic.cityIds.join(',') !== balanced?.cityIds.join(',')) {
    const legs = buildJourneyLegs(scenic.cityIds, scenic.segments);
    routes.push({
      id: 'scenic',
      type: 'scenic',
      title: 'Scenic Route',
      description: 'The most beautiful way there — mountain passes, coastal stretches, and river valleys.',
      legs,
      stops: buildStops(scenic.cityIds, new Set()),
      totalDurationMin: scenic.totalDurationMin,
      totalPriceEur: scenic.totalPriceEur,
      transfers: scenic.transfers,
      overnightCount: 0,
      scenicScore: scenic.scenicScore,
      comfortScore: 5,
    });
  }

  // 5. Explorer route (alternative path through different cities)
  const avoid = [fastest?.cityIds[1], comfort?.cityIds[1]].filter(Boolean) as string[];
  const explorer = findAlternativePath(startId, endId, avoid);
  if (explorer && explorer.cityIds.join(',') !== fastest?.cityIds.join(',') && explorer.cityIds.join(',') !== comfort?.cityIds.join(',')) {
    const overnightStops = new Set<string>();
    explorer.cityIds.forEach((id, idx) => {
      if (idx > 0 && idx < explorer.cityIds.length - 1 && cities[id].overnightRating >= 4) {
        overnightStops.add(id);
      }
    });
    const legs = buildJourneyLegs(explorer.cityIds, explorer.segments);
    routes.push({
      id: 'explorer',
      type: 'balanced',
      title: 'Explorer Route',
      description: 'Goes through different cities — great for travelers who want to see more along the way.',
      legs,
      stops: buildStops(explorer.cityIds, overnightStops),
      totalDurationMin: explorer.totalDurationMin,
      totalPriceEur: explorer.totalPriceEur,
      transfers: explorer.transfers,
      overnightCount: overnightStops.size,
      scenicScore: explorer.scenicScore,
      comfortScore: 6,
    });
  }

  return routes;
}

export function findReachableCities(startId: string, maxHours: number): { cityId: string; hours: number }[] {
  const results: { cityId: string; hours: number }[] = [];
  const pq: { cityId: string; hours: number; path: string[] }[] = [{ cityId: startId, hours: 0, path: [startId] }];
  const visited = new Set<string>();

  while (pq.length > 0) {
    pq.sort((a, b) => a.hours - b.hours);
    const node = pq.shift()!;
    if (visited.has(node.cityId)) continue;
    visited.add(node.cityId);

    if (node.cityId !== startId) {
      results.push({ cityId: node.cityId, hours: node.hours });
    }

    const neighbors = getNeighborsWithSegments(node.cityId);
    for (const { neighbor, segment } of neighbors) {
      if (node.path.includes(neighbor)) continue;
      const newHours = node.hours + segment.durationMin / 60;
      if (newHours <= maxHours) {
        pq.push({ cityId: neighbor, hours: newHours, path: [...node.path, neighbor] });
      }
    }
  }
  return results;
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
