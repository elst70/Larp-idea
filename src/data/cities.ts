export interface City {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  lat: number;
  lng: number;
  description: string;
  highlights: string[];
  stopRating: number; // 1-5 how worthwhile as a stop
  overnightRating: number; // 1-5 how worthwhile for overnight
  tags: string[];
  budgetLevel: 'budget' | 'mid' | 'luxury';
}

export interface TrainSegment {
  from: string;
  to: string;
  durationMin: number;
  type: 'high-speed' | 'intercity' | 'regional' | 'night' | 'scenic';
  frequency: string;
  priceEur: number;
  scenic: boolean;
}

export interface JourneyLeg {
  fromCity: City;
  toCity: City;
  segment: TrainSegment;
  departureTime: string;
  arrivalTime: string;
}

export interface JourneyStop {
  city: City;
  nights: number;
  isOvernight: boolean;
  arrivalTime: string;
  departureTime?: string;
}

export interface Journey {
  id: string;
  type: 'fastest' | 'comfort' | 'balanced' | 'scenic' | 'slow';
  title: string;
  description: string;
  legs: JourneyLeg[];
  stops: JourneyStop[];
  totalDurationMin: number;
  totalPriceEur: number;
  transfers: number;
  overnightCount: number;
  scenicScore: number;
  comfortScore: number;
}

export const cities: Record<string, City> = {
  stockholm: {
    id: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    countryFlag: '🇸🇪',
    lat: 59.33,
    lng: 18.06,
    description: 'Spread across 14 islands, the Swedish capital blends medieval Gamla Stan with cutting-edge design.',
    highlights: ['Gamla Stan', 'Vasa Museum', 'Archipelago', 'Royal Palace'],
    stopRating: 4,
    overnightRating: 5,
    tags: ['historic', 'waterfront', 'design'],
    budgetLevel: 'mid',
  },
  copenhagen: {
    id: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    countryFlag: '🇩🇰',
    lat: 55.68,
    lng: 12.57,
    description: 'Cycling-friendly capital with colorful Nyhavn, Tivoli Gardens, and New Nordic cuisine.',
    highlights: ['Nyhavn', 'Tivoli', 'Christiania', 'Designmuseum'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'waterfront', 'design', 'foodie'],
    budgetLevel: 'mid',
  },
  hamburg: {
    id: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    countryFlag: '🇩🇪',
    lat: 53.55,
    lng: 9.99,
    description: 'Germany\'s gateway to the world — a maritime city with canals, warehouses, and a legendary port.',
    highlights: ['Speicherstadt', 'Elbphilharmonie', 'Miniatur Wunderland', 'Port of Hamburg'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['waterfront', 'maritime', 'culture'],
    budgetLevel: 'mid',
  },
  berlin: {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    countryFlag: '🇩🇪',
    lat: 52.52,
    lng: 13.405,
    description: 'Edgy, layered, and never finished — Berlin wears its history and its reinvention side by side.',
    highlights: ['Brandenburg Gate', 'Museum Island', 'East Side Gallery', 'Tempelhofer Feld'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'nightlife', 'art'],
    budgetLevel: 'budget',
  },
  cologne: {
    id: 'cologne',
    name: 'Cologne',
    country: 'Germany',
    countryFlag: '🇩🇪',
    lat: 50.94,
    lng: 6.96,
    description: 'Cathedral city on the Rhine with Roman roots and Germany\'s most beloved carnival.',
    highlights: ['Kölner Dom', 'Rhine Promenade', 'Old Town', 'Museum Ludwig'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['historic', 'river'],
    budgetLevel: 'budget',
  },
  frankfurt: {
    id: 'frankfurt',
    name: 'Frankfurt',
    country: 'Germany',
    countryFlag: '🇩🇪',
    lat: 50.11,
    lng: 8.68,
    description: 'Skyline city on the Main — a financial hub with a surprisingly charming old center.',
    highlights: ['Römerberg', 'Main Tower', 'Sachsenhausen', 'Städel Museum'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['city', 'transit-hub'],
    budgetLevel: 'mid',
  },
  munich: {
    id: 'munich',
    name: 'Munich',
    country: 'Germany',
    countryFlag: '🇩🇪',
    lat: 48.14,
    lng: 11.58,
    description: 'Bavaria\'s capital — beer gardens, baroque palaces, and Alpine views on the horizon.',
    highlights: ['Marienplatz', 'English Garden', 'Nymphenburg', 'BMW Welt'],
    stopRating: 4,
    overnightRating: 5,
    tags: ['historic', 'culture', 'nature'],
    budgetLevel: 'mid',
  },
  zurich: {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    lat: 47.38,
    lng: 8.54,
    description: 'Swiss elegance on the lake — precision, chocolate, and mountain panoramas.',
    highlights: ['Old Town', 'Lake Zurich', 'Kunsthaus', 'Uetliberg'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['waterfront', 'mountains', 'culture'],
    budgetLevel: 'luxury',
  },
  luzern: {
    id: 'luzern',
    name: 'Luzern',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    lat: 47.05,
    lng: 8.30,
    description: 'Storybook Switzerland — wooden bridges, lake steamers, and peaks in every direction.',
    highlights: ['Chapel Bridge', 'Mt. Rigi', 'Lake Lucerne', 'Lion Monument'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['waterfront', 'mountains', 'scenic', 'historic'],
    budgetLevel: 'luxury',
  },
  innsbruck: {
    id: 'innsbruck',
    name: 'Innsbruck',
    country: 'Austria',
    countryFlag: '🇦🇹',
    lat: 47.26,
    lng: 11.39,
    description: 'Capital of the Alps — a city where you step from medieval streets onto a cable car.',
    highlights: ['Nordkette Cable Car', 'Golden Roof', 'Old Town', 'Hofburg'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['mountains', 'scenic', 'historic', 'hiking'],
    budgetLevel: 'mid',
  },
  salzburg: {
    id: 'salzburg',
    name: 'Salzburg',
    country: 'Austria',
    countryFlag: '🇦🇹',
    lat: 47.81,
    lng: 13.04,
    description: 'Mozart\'s baroque birthplace — fortress, fountains, and Sound of Music hills.',
    highlights: ['Hohensalzburg', 'Old Town', 'Mirabell Gardens', 'Mozartgeburtshaus'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'mountains', 'scenic'],
    budgetLevel: 'mid',
  },
  vienna: {
    id: 'vienna',
    name: 'Vienna',
    country: ' Austria',
    countryFlag: '🇦🇹',
    lat: 48.21,
    lng: 16.37,
    description: 'Imperial grandeur and coffeehouse culture — waltzes, palaces, and Sachertorte.',
    highlights: ['Schönbrunn', 'St. Stephen\'s', 'Belvedere', 'Naschmarkt'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'art', 'foodie'],
    budgetLevel: 'mid',
  },
  prague: {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    countryFlag: '🇨🇿',
    lat: 50.08,
    lng: 14.44,
    description: 'City of a hundred spires — Gothic, Baroque, and Art Nouveau layered along the Vltava.',
    highlights: ['Charles Bridge', 'Prague Castle', 'Old Town Square', 'Jewish Quarter'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'architecture', 'culture', 'foodie'],
    budgetLevel: 'budget',
  },
  paris: {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    countryFlag: '🇫🇷',
    lat: 48.86,
    lng: 2.35,
    description: 'The eternal capital of light, love, and art — boulevards, boulangeries, and the Seine.',
    highlights: ['Eiffel Tower', 'Louvre', 'Montmartre', 'Notre-Dame'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'art', 'foodie', 'romantic'],
    budgetLevel: 'mid',
  },
  lyon: {
    id: 'lyon',
    name: 'Lyon',
    country: 'France',
    countryFlag: '🇫🇷',
    lat: 45.76,
    lng: 4.84,
    description: 'France\'s gastronomic capital — Renaissance traboules and bouchons on every corner.',
    highlights: ['Vieux Lyon', 'Fourvière', 'Traboules', 'Confluence'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'foodie', 'river'],
    budgetLevel: 'mid',
  },
  marseille: {
    id: 'marseille',
    name: 'Marseille',
    country: 'France',
    countryFlag: '🇫🇷',
    lat: 43.30,
    lng: 5.37,
    description: 'Mediterranean melting pot — calanques, old port, and sun-drenched grit.',
    highlights: ['Vieux-Port', 'Calanques', 'Notre-Dame de la Garde', 'Le Panier'],
    stopRating: 4,
    overnightRating: 3,
    tags: ['waterfront', 'mediterranean', 'historic'],
    budgetLevel: 'budget',
  },
  nice: {
    id: 'nice',
    name: 'Nice',
    country: 'France',
    countryFlag: '🇫🇷',
    lat: 43.70,
    lng: 7.27,
    description: 'Côte d\'Azur capital — Promenade des Anglais, pebble beaches, and pastel light.',
    highlights: ['Promenade', 'Vieux Nice', 'Colline du Château', 'Marc Chagall Museum'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['waterfront', 'mediterranean', 'beach'],
    budgetLevel: 'mid',
  },
  milan: {
    id: 'milan',
    name: 'Milan',
    country: 'Italy',
    countryFlag: '🇮🇹',
    lat: 45.46,
    lng: 9.19,
    description: 'Italy\'s style capital — fashion, design, and the Duomo that stops you in your tracks.',
    highlights: ['Duomo', 'Brera', 'Navigli', 'Last Supper'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['culture', 'art', 'foodie', 'design'],
    budgetLevel: 'mid',
  },
  venice: {
    id: 'venice',
    name: 'Venice',
    country: 'Italy',
    countryFlag: '🇮🇹',
    lat: 45.44,
    lng: 12.32,
    description: 'A dream on water — palazzos, gondolas, and calli that lead nowhere and everywhere.',
    highlights: ['St. Mark\'s', 'Grand Canal', 'Rialto', 'Murano'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['waterfront', 'historic', 'romantic', 'art'],
    budgetLevel: 'mid',
  },
  bologna: {
    id: 'bologna',
    name: 'Bologna',
    country: 'Italy',
    countryFlag: '🇮🇹',
    lat: 44.49,
    lng: 11.34,
    description: 'La Dotta, La Grassa, La Rossa — learned, fat, and red. Italy\'s most underrated city.',
    highlights: ['Piazza Maggiore', 'Two Towers', 'Porticoes', 'Food Valley'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'foodie', 'culture'],
    budgetLevel: 'budget',
  },
  florence: {
    id: 'florence',
    name: 'Florence',
    country: 'Italy',
    countryFlag: '🇮🇹',
    lat: 43.78,
    lng: 11.25,
    description: 'Cradle of the Renaissance — every street corner holds a masterpiece.',
    highlights: ['Uffizi', 'Duomo', 'Ponte Vecchio', 'Boboli Gardens'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'art', 'culture', 'foodie'],
    budgetLevel: 'mid',
  },
  rome: {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    countryFlag: '🇮🇹',
    lat: 41.90,
    lng: 12.50,
    description: 'The Eternal City — layers of empire, art, and dolce vita on every piazza.',
    highlights: ['Colosseum', 'Vatican', 'Trastevere', 'Pantheon'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'art', 'foodie'],
    budgetLevel: 'mid',
  },
  barcelona: {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    countryFlag: '🇪🇸',
    lat: 41.38,
    lng: 2.17,
    description: 'Gaudí meets the Mediterranean — tapas, beaches, and a Gothic Quarter that never sleeps.',
    highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter', 'La Rambla'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['waterfront', 'architecture', 'foodie', 'beach', 'culture'],
    budgetLevel: 'mid',
  },
  madrid: {
    id: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    countryFlag: '🇪🇸',
    lat: 40.42,
    lng: -3.70,
    description: 'Spain\'s sun-soaked capital — grand boulevards, world-class art, and late-night tapas.',
    highlights: ['Prado', 'Retiro Park', 'Plaza Mayor', 'Royal Palace'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['culture', 'art', 'foodie'],
    budgetLevel: 'budget',
  },
  amsterdam: {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    countryFlag: '🇳🇱',
    lat: 52.37,
    lng: 4.90,
    description: 'Canals, bikes, and Golden Age charm — a city that feels like an open-air museum.',
    highlights: ['Canal Ring', 'Rijksmuseum', 'Anne Frank House', 'Jordaan'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['waterfront', 'historic', 'culture', 'art'],
    budgetLevel: 'mid',
  },
  brussels: {
    id: 'brussels',
    name: 'Brussels',
    country: ' Belgium',
    countryFlag: '🇧🇪',
    lat: 50.85,
    lng: 4.35,
    description: 'Grand Place and comic strips — Europe\'s quirky, chocolate-loving capital.',
    highlights: ['Grand Place', 'Atomium', 'Magritte Museum', 'Comic Strip Route'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'mid',
  },
};

export const trainSegments: TrainSegment[] = [
  // Stockholm
  { from: 'stockholm', to: 'copenhagen', durationMin: 310, type: 'high-speed', frequency: 'Every 2h', priceEur: 45, scenic: false },
  { from: 'stockholm', to: 'hamburg', durationMin: 660, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },
  // Copenhagen
  { from: 'copenhagen', to: 'hamburg', durationMin: 290, type: 'intercity', frequency: 'Every 2h', priceEur: 50, scenic: false },
  { from: 'copenhagen', to: 'berlin', durationMin: 420, type: 'intercity', frequency: 'Every 2h', priceEur: 55, scenic: false },
  // Hamburg
  { from: 'hamburg', to: 'berlin', durationMin: 105, type: 'high-speed', frequency: 'Every 30min', priceEur: 30, scenic: false },
  { from: 'hamburg', to: 'cologne', durationMin: 260, type: 'high-speed', frequency: 'Every 1h', priceEur: 65, scenic: false },
  { from: 'hamburg', to: 'frankfurt', durationMin: 240, type: 'high-speed', frequency: 'Every 1h', priceEur: 70, scenic: false },
  { from: 'hamburg', to: 'amsterdam', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 60, scenic: false },
  // Berlin
  { from: 'berlin', to: 'prague', durationMin: 270, type: 'intercity', frequency: 'Every 2h', priceEur: 35, scenic: true },
  { from: 'berlin', to: 'munich', durationMin: 300, type: 'high-speed', frequency: 'Every 1h', priceEur: 60, scenic: false },
  { from: 'berlin', to: 'frankfurt', durationMin: 240, type: 'high-speed', frequency: 'Every 30min', priceEur: 55, scenic: false },
  { from: 'berlin', to: 'hamburg', durationMin: 105, type: 'high-speed', frequency: 'Every 30min', priceEur: 30, scenic: false },
  // Cologne
  { from: 'cologne', to: 'frankfurt', durationMin: 75, type: 'high-speed', frequency: 'Every 30min', priceEur: 40, scenic: false },
  { from: 'cologne', to: 'amsterdam', durationMin: 160, type: 'intercity', frequency: 'Every 1h', priceEur: 40, scenic: false },
  { from: 'cologne', to: 'brussels', durationMin: 110, type: 'high-speed', frequency: 'Every 1h', priceEur: 45, scenic: false },
  { from: 'cologne', to: 'paris', durationMin: 220, type: 'high-speed', frequency: 'Every 2h', priceEur: 80, scenic: false },
  // Frankfurt
  { from: 'frankfurt', to: 'munich', durationMin: 210, type: 'high-speed', frequency: 'Every 1h', priceEur: 55, scenic: false },
  { from: 'frankfurt', to: 'paris', durationMin: 240, type: 'high-speed', frequency: 'Every 2h', priceEur: 75, scenic: false },
  { from: 'frankfurt', to: 'brussels', durationMin: 190, type: 'high-speed', frequency: 'Every 2h', priceEur: 60, scenic: false },
  { from: 'frankfurt', to: 'amsterdam', durationMin: 250, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: false },
  // Munich
  { from: 'munich', to: 'zurich', durationMin: 260, type: 'intercity', frequency: 'Every 2h', priceEur: 45, scenic: true },
  { from: 'munich', to: 'innsbruck', durationMin: 120, type: 'intercity', frequency: 'Every 2h', priceEur: 30, scenic: true },
  { from: 'munich', to: 'salzburg', durationMin: 90, type: 'intercity', frequency: 'Every 30min', priceEur: 20, scenic: true },
  { from: 'munich', to: 'vienna', durationMin: 240, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: false },
  { from: 'munich', to: 'prague', durationMin: 380, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },
  // Zurich
  { from: 'zurich', to: 'luzern', durationMin: 60, type: 'intercity', frequency: 'Every 30min', priceEur: 25, scenic: true },
  { from: 'zurich', to: 'milan', durationMin: 210, type: 'high-speed', frequency: 'Every 2h', priceEur: 65, scenic: true },
  { from: 'zurich', to: 'innsbruck', durationMin: 210, type: 'intercity', frequency: 'Every 2h', priceEur: 45, scenic: true },
  // Luzern
  { from: 'luzern', to: 'milan', durationMin: 240, type: 'scenic', frequency: 'Daily', priceEur: 70, scenic: true },
  // Innsbruck
  { from: 'innsbruck', to: 'salzburg', durationMin: 120, type: 'intercity', frequency: 'Every 2h', priceEur: 30, scenic: true },
  { from: 'innsbruck', to: 'verona', durationMin: 210, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },
  // Salzburg
  { from: 'salzburg', to: 'vienna', durationMin: 150, type: 'high-speed', frequency: 'Every 30min', priceEur: 30, scenic: true },
  // Vienna
  { from: 'vienna', to: 'prague', durationMin: 240, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'vienna', to: 'venice', durationMin: 440, type: 'night', frequency: 'Daily', priceEur: 60, scenic: false },
  // Prague
  { from: 'prague', to: 'munich', durationMin: 380, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },
  { from: 'prague', to: 'vienna', durationMin: 240, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  // Paris
  { from: 'paris', to: 'lyon', durationMin: 120, type: 'high-speed', frequency: 'Every 30min', priceEur: 50, scenic: false },
  { from: 'paris', to: 'marseille', durationMin: 180, type: 'high-speed', frequency: 'Every 1h', priceEur: 60, scenic: true },
  { from: 'paris', to: 'nice', durationMin: 330, type: 'high-speed', frequency: 'Every 2h', priceEur: 75, scenic: true },
  { from: 'paris', to: 'milan', durationMin: 420, type: 'high-speed', frequency: 'Daily', priceEur: 90, scenic: true },
  { from: 'paris', to: 'amsterdam', durationMin: 200, type: 'high-speed', frequency: 'Every 1h', priceEur: 65, scenic: false },
  { from: 'paris', to: 'brussels', durationMin: 90, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'paris', to: 'frankfurt', durationMin: 240, type: 'high-speed', frequency: 'Every 2h', priceEur: 75, scenic: false },
  // Lyon
  { from: 'lyon', to: 'marseille', durationMin: 110, type: 'high-speed', frequency: 'Every 1h', priceEur: 35, scenic: true },
  { from: 'lyon', to: 'milan', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 55, scenic: true },
  // Marseille
  { from: 'marseille', to: 'nice', durationMin: 160, type: 'intercity', frequency: 'Every 1h', priceEur: 25, scenic: true },
  // Nice
  { from: 'nice', to: 'milan', durationMin: 300, type: 'intercity', frequency: 'Every 2h', priceEur: 45, scenic: true },
  // Milan
  { from: 'milan', to: 'venice', durationMin: 150, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'milan', to: 'bologna', durationMin: 65, type: 'high-speed', frequency: 'Every 30min', priceEur: 25, scenic: false },
  { from: 'milan', to: 'florence', durationMin: 100, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'milan', to: 'rome', durationMin: 180, type: 'high-speed', frequency: 'Every 30min', priceEur: 55, scenic: true },
  // Venice
  { from: 'venice', to: 'bologna', durationMin: 90, type: 'high-speed', frequency: 'Every 1h', priceEur: 25, scenic: false },
  { from: 'venice', to: 'florence', durationMin: 120, type: 'high-speed', frequency: 'Every 1h', priceEur: 30, scenic: true },
  { from: 'venice', to: 'rome', durationMin: 230, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: true },
  // Bologna
  { from: 'bologna', to: 'florence', durationMin: 37, type: 'high-speed', frequency: 'Every 30min', priceEur: 15, scenic: true },
  { from: 'bologna', to: 'rome', durationMin: 130, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: true },
  // Florence
  { from: 'florence', to: 'rome', durationMin: 90, type: 'high-speed', frequency: 'Every 30min', priceEur: 25, scenic: true },
  // Barcelona
  { from: 'barcelona', to: 'madrid', durationMin: 150, type: 'high-speed', frequency: 'Every 30min', priceEur: 40, scenic: false },
  { from: 'barcelona', to: 'marseille', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },
  // Madrid
  { from: 'madrid', to: 'barcelona', durationMin: 150, type: 'high-speed', frequency: 'Every 30min', priceEur: 40, scenic: false },
  // Amsterdam
  { from: 'amsterdam', to: 'brussels', durationMin: 120, type: 'intercity', frequency: 'Every 1h', priceEur: 30, scenic: false },
  { from: 'amsterdam', to: 'frankfurt', durationMin: 250, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: false },
  { from: 'amsterdam', to: 'cologne', durationMin: 160, type: 'intercity', frequency: 'Every 1h', priceEur: 40, scenic: false },
  // Brussels
  { from: 'brussels', to: 'paris', durationMin: 90, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'brussels', to: 'amsterdam', durationMin: 120, type: 'intercity', frequency: 'Every 1h', priceEur: 30, scenic: false },
  { from: 'brussels', to: 'frankfurt', durationMin: 190, type: 'high-speed', frequency: 'Every 2h', priceEur: 60, scenic: false },
];

export const cityList = Object.values(cities).filter((c): c is City => c !== undefined);

export function getCity(id: string): City | undefined {
  return cities[id];
}

export function getSegment(from: string, to: string): TrainSegment | undefined {
  return trainSegments.find(
    (s) => (s.from === from && s.to === to) || (s.from === to && s.to === from)
  );
}

export function getNeighbors(cityId: string): string[] {
  return trainSegments
    .filter((s) => s.from === cityId || s.to === cityId)
    .map((s) => (s.from === cityId ? s.to : s.from));
}
