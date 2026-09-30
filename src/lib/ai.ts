import { cities, type City } from '@/data/cities';
import { findRoutes, formatDuration, type RoutePath } from '@/lib/routing';

export interface SlowTravelPreferences {
  scenicViews: boolean;
  budgetFriendly: boolean;
  historicCities: boolean;
  nature: boolean;
  foodie: boolean;
  nightlife: boolean;
  romantic: boolean;
  customText: string;
}

export interface AIStopSuggestion {
  city: City;
  reason: string;
  recommendedNights: number;
  activities: string[];
}

export interface AIMessage {
  role: 'user' | 'ai';
  content: string;
  suggestions?: string[];
}

export function generateSlowTravelItinerary(
  startId: string,
  endId: string,
  prefs: SlowTravelPreferences,
  extraDays: number
): { stops: AIStopSuggestion[]; summary: string } {
  const routes = findRoutes(startId, endId);
  const route = routes.find((r) => r.type === 'scenic') || routes.find((r) => r.type === 'balanced') || routes[0];
  if (!route) return { stops: [], summary: 'No route found.' };

  const intermediateCities = route.stops.filter(
    (s) => s.city.id !== startId && s.city.id !== endId
  );

  const scored = intermediateCities.map((stop) => {
    let score = stop.city.overnightRating * 2;
    if (prefs.scenicViews && stop.city.tags.includes('scenic')) score += 3;
    if (prefs.scenicViews && stop.city.tags.includes('mountains')) score += 2;
    if (prefs.budgetFriendly && stop.city.budgetLevel === 'budget') score += 3;
    if (prefs.historicCities && stop.city.tags.includes('historic')) score += 3;
    if (prefs.nature && (stop.city.tags.includes('mountains') || stop.city.tags.includes('waterfront'))) score += 2;
    if (prefs.foodie && stop.city.tags.includes('foodie')) score += 3;
    if (prefs.nightlife && stop.city.tags.includes('nightlife')) score += 2;
    if (prefs.romantic && stop.city.tags.includes('romantic')) score += 3;
    return { stop, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const maxStops = Math.min(scored.length, 2 + Math.floor(extraDays / 1.5));
  const chosen = scored.slice(0, maxStops);

  const orderedStops = chosen
    .map((s) => s.stop)
    .sort((a, b) => {
      const aIdx = route.stops.findIndex((s) => s.city.id === a.city.id);
      const bIdx = route.stops.findIndex((s) => s.city.id === b.city.id);
      return aIdx - bIdx;
    });

  const stops: AIStopSuggestion[] = orderedStops.map((stop) => {
    const nights = stop.city.overnightRating >= 5 ? 2 : 1;
    const reasons: string[] = [];
    if (prefs.scenicViews && stop.city.tags.includes('scenic')) reasons.push('stunning scenery');
    if (prefs.budgetFriendly && stop.city.budgetLevel === 'budget') reasons.push('great value');
    if (prefs.historicCities && stop.city.tags.includes('historic')) reasons.push('rich history');
    if (prefs.nature && stop.city.tags.includes('mountains')) reasons.push('mountain nature');
    if (prefs.foodie && stop.city.tags.includes('foodie')) reasons.push('incredible food');
    if (prefs.romantic && stop.city.tags.includes('romantic')) reasons.push('romantic atmosphere');

    const reason = reasons.length > 0
      ? `Perfect for you because of its ${reasons.slice(0, 2).join(' and ')}.`
      : `A ${stop.city.tags.slice(0, 2).join(' and ')} gem worth exploring.`;

    return {
      city: stop.city,
      reason,
      recommendedNights: nights,
      activities: stop.city.highlights.slice(0, 3),
    };
  });

  const totalNights = stops.reduce((sum, s) => sum + s.recommendedNights, 0);
  const summary = `${route.legs[0].fromCity.name} → ${stops.map((s) => s.city.name).join(' → ')} → ${route.legs[route.legs.length - 1].toCity.name}. ${totalNights} night${totalNights !== 1 ? 's' : ''} of exploration across ${stops.length} stop${stops.length !== 1 ? 's' : ''}.`;

  return { stops, summary };
}

export function generateAIResponse(
  userMessage: string,
  context: { startId?: string; endId?: string; currentItinerary?: AIStopSuggestion[]; prefs?: SlowTravelPreferences }
): AIMessage {
  const msg = userMessage.toLowerCase();

  if (msg.includes('extra day') || msg.includes('one more day') || msg.includes('add a day') || msg.includes('extra night')) {
    if (context.currentItinerary && context.currentItinerary.length > 0) {
      const best = context.currentItinerary
        .filter((s) => s.recommendedNights === 1)
        .sort((a, b) => b.city.overnightRating - a.city.overnightRating)[0];
      if (best) {
        return {
          role: 'ai',
          content: `If you add one more day, I'd spend it in ${best.city.name}. ${best.reason} You could visit ${best.activities.join(', ')} — it's worth slowing down there. Want me to add that night?`,
          suggestions: [`Yes, add a night in ${best.city.name}`, 'Maybe later', 'What about a different city?'],
        };
      }
    }
    return {
      role: 'ai',
      content: 'Adding an extra day opens up scenic alternatives. For example, if you take the route through Switzerland instead of the fastest path, you\'d see the Alps from your train window. Would you like me to reroute through Zurich or Bern?',
      suggestions: ['Reroute through Switzerland', 'Keep the fast route', 'Show me both options'],
    };
  }

  if (msg.includes('scenic') || msg.includes('view') || msg.includes('beautiful') || msg.includes('nature')) {
    return {
      role: 'ai',
      content: 'The most scenic stretches on European rail are the Bernina Pass (Zurich–Milan), the Semmering line (Vienna–Graz), and the Rhine Valley (Cologne–Mainz). If your route passes near any of these, I\'d strongly recommend taking them. Want me to adjust your route to include a scenic pass?',
      suggestions: ['Yes, make it scenic', 'Only if it doesn\'t add too much time', 'No, keep it fast'],
    };
  }

  if (msg.includes('cheap') || msg.includes('budget') || msg.includes('afford') || msg.includes('price')) {
    return {
      role: 'ai',
      content: 'To keep costs down: book night trains to save on a hotel night, use regional trains in Germany with the €49 ticket, and avoid high-speed on short segments. Berlin, Prague, and Bologna are great budget stops. Want me to find the cheapest route?',
      suggestions: ['Find the cheapest route', 'Show budget-friendly stops', 'How much can I save?'],
    };
  }

  if (msg.includes('night train') || msg.includes('overnight') || msg.includes('sleeper')) {
    return {
      role: 'ai',
      content: 'Night trains are the best way to cover long distances comfortably. Stockholm–Hamburg, Vienna–Venice, and Zurich–Vienna all have night services. You board in the evening, sleep, and wake up in a new country. Shall I prioritize overnight options?',
      suggestions: ['Yes, use night trains', 'Only for long segments', 'No, day trains only'],
    };
  }

  if (msg.includes('food') || msg.includes('eat') || msg.includes('culinary') || msg.includes('restaurant')) {
    return {
      role: 'ai',
      content: 'For food lovers, I\'d recommend stops in Bologna (the food capital of Italy), Lyon (gastronomy capital of France), and Copenhagen (New Nordic). Each has incredible markets and local specialties. Want me to add a foodie stop?',
      suggestions: ['Add Bologna', 'Add Lyon', 'Show me foodie stops'],
    };
  }

  if (msg.includes('hiking') || msg.includes('walk') || msg.includes('outdoor') || msg.includes('alps')) {
    return {
      role: 'ai',
      content: 'For hiking and outdoors, Oslo has forests and fjord trails right at the city edge, Ljubljana sits under mountains with easy trail access, and Nice gives you the Calanques coastal hikes. Want me to add an outdoor stop?',
      suggestions: ['Add Oslo', 'Add Ljubljana', 'Show outdoor options'],
    };
  }

  if (msg.includes('historic') || msg.includes('history') || msg.includes('old town') || msg.includes('castle')) {
    return {
      role: 'ai',
      content: 'For history, Prague\'s Old Town is a living medieval museum, Rome has 2,000 years layered on every street, and Athens\' Acropolis anchors Western civilization. Want me to prioritize historic stops?',
      suggestions: ['Add Prague', 'Add Rome', 'Prioritize historic cities'],
    };
  }

  if (msg.includes('how long') || msg.includes('much time') || msg.includes('hours')) {
    if (context.startId && context.endId) {
      const routes = findRoutes(context.startId, context.endId);
      const fastest = routes[0];
      if (fastest) {
        return {
          role: 'ai',
          content: `The fastest route from ${cities[context.startId].name} to ${cities[context.endId].name} takes ${formatDuration(fastest.totalDurationMin)} with ${fastest.transfers} transfer${fastest.transfers !== 1 ? 's' : ''}. But with stops, you\'d want to add at least a night or two. Want me to plan a multi-day version?`,
          suggestions: ['Plan a multi-day trip', 'Show me the fastest route', 'What if I add stops?'],
        };
      }
    }
  }

  if (msg.includes('stop') || msg.includes('where should i') || msg.includes('what to see')) {
    if (context.currentItinerary && context.currentItinerary.length > 0) {
      const stopList = context.currentItinerary.map((s) => `${s.city.name} (${s.recommendedNights} night${s.recommendedNights !== 1 ? 's' : ''})`).join(', ');
      return {
        role: 'ai',
        content: `Your current stops are: ${stopList}. Each was chosen based on your preferences. You could extend any of them, or I can suggest an additional stop. What sounds good?`,
        suggestions: ['Add another stop', 'Extend a stay', 'Show activities at each stop'],
      };
    }
    return {
      role: 'ai',
      content: 'Great question! The best stops depend on your interests. For a first trip, I\'d recommend cities with high stop ratings — Copenhagen, Berlin, Budapest, and Florence are all worth at least a night. Tell me what you enjoy and I\'ll tailor the stops.',
      suggestions: ['I like scenery', 'I like history', 'I like food'],
    };
  }

  return {
    role: 'ai',
    content: 'I can help you plan the perfect train journey. Ask me about scenic routes, night trains, budget tips, where to stop, or how long things take. You can also tell me what you enjoy — scenery, history, food, hiking — and I\'ll tailor the itinerary.',
    suggestions: ['Make it scenic', 'Add a night train', 'Where should I stop?', 'Keep it budget-friendly'],
  };
}

export function getStopRecommendation(city: City, hoursAvailable: number): { feasible: boolean; suggestion: string } {
  if (hoursAvailable < 2) {
    return { feasible: false, suggestion: `${hoursAvailable}h is very tight for ${city.name}. You\'d barely have time for a quick walk and a coffee. Consider extending to at least 3-4h, or skipping the stop.` };
  }
  if (hoursAvailable < 4) {
    return { feasible: true, suggestion: `${hoursAvailable}h in ${city.name} is enough for one highlight — I\'d pick ${city.highlights[0]} and grab a local meal nearby.` };
  }
  if (hoursAvailable < 8) {
    return { feasible: true, suggestion: `${hoursAvailable}h in ${city.name} lets you see 2-3 highlights: ${city.highlights.slice(0, 3).join(', ')}. Comfortable but not rushed.` };
  }
  return { feasible: true, suggestion: `${hoursAvailable}h in ${city.name} is a full day — you could see ${city.highlights.slice(0, 3).join(', ')} and still have time to wander. Consider staying overnight if you enjoy it.` };
}
