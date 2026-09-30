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
  // ── Northern Europe ──
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
  helsinki: {
    id: 'helsinki',
    name: 'Helsinki',
    country: 'Finland',
    countryFlag: '🇫🇮',
    lat: 60.17,
    lng: 24.94,
    description: 'Nordic design capital where saunas meet the sea — Art Nouveau, islands, and forest edges.',
    highlights: ['Senate Square', 'Suomenlinna', 'Temppeliaukio Church', 'Market Square'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['waterfront', 'design', 'historic'],
    budgetLevel: 'mid',
  },
  oslo: {
    id: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    countryFlag: '🇳🇴',
    lat: 59.91,
    lng: 10.75,
    description: 'Fjord-side capital where modern architecture meets Viking history and vast forests.',
    highlights: ['Vigeland Park', 'Opera House', 'Viking Ship Museum', 'Aker Brygge'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['waterfront', 'historic', 'nature'],
    budgetLevel: 'luxury',
  },
  reykjavik: {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    countryFlag: '🇮🇸',
    lat: 64.15,
    lng: -21.94,
    description: 'World\'s northernmost capital — geothermal pools, Northern Lights, and otherworldly landscapes.',
    highlights: ['Hallgrímskirkja', 'Blue Lagoon', 'Harpa Concert Hall', 'Sun Voyager'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['nature', 'historic', 'culture'],
    budgetLevel: 'luxury',
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
  riga: {
    id: 'riga',
    name: 'Riga',
    country: 'Latvia',
    countryFlag: '🇱🇻',
    lat: 56.95,
    lng: 24.11,
    description: 'Art Nouveau jewel on the Baltic — medieval old town, wooden houses, and lively markets.',
    highlights: ['Old Town', 'Art Nouveau District', 'Riga Central Market', 'Freedom Monument'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'architecture', 'foodie'],
    budgetLevel: 'budget',
  },
  tallinn: {
    id: 'tallinn',
    name: 'Tallinn',
    country: 'Estonia',
    countryFlag: '🇪🇪',
    lat: 59.44,
    lng: 24.75,
    description: 'Medieval walled city on the Baltic — turrets, cobblestones, and a thriving digital society.',
    highlights: ['Old Town', 'Toompea Castle', 'Kadriorg Palace', 'Telliskivi District'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'architecture', 'culture'],
    budgetLevel: 'budget',
  },
  vilnius: {
    id: 'vilnius',
    name: 'Vilnius',
    country: 'Lithuania',
    countryFlag: '🇱🇹',
    lat: 54.69,
    lng: 25.28,
    description: 'Baroque capital on the Neris — one of Europe\'s largest old towns and a booming arts scene.',
    highlights: ['Old Town', 'Gediminas Tower', 'Užupis', 'Vilnius Cathedral'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'architecture', 'culture'],
    budgetLevel: 'budget',
  },

  // ── British Isles ──
  london: {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    lat: 51.51,
    lng: -0.13,
    description: 'World capital of culture and commerce — museums, markets, pubs, and 2,000 years of history.',
    highlights: ['British Museum', 'Tower of London', 'Borough Market', 'Westminster'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'art', 'foodie'],
    budgetLevel: 'luxury',
  },
  dublin: {
    id: 'dublin',
    name: 'Dublin',
    country: 'Ireland',
    countryFlag: '🇮🇪',
    lat: 53.35,
    lng: -6.26,
    description: 'Literary city of pubs and poetry — Georgian squares, Guinness, and a thousand welcomes.',
    highlights: ['Trinity College', 'Temple Bar', 'Dublin Castle', 'Guinness Storehouse'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'mid',
  },

  // ── Western Europe ──
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
    country: 'Belgium',
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
  luxembourg: {
    id: 'luxembourg',
    name: 'Luxembourg',
    country: 'Luxembourg',
    countryFlag: '🇱🇺',
    lat: 49.61,
    lng: 6.13,
    description: 'Fortress city in a green gorge — grand ducal charm, viaducts, and EU institutions.',
    highlights: ['Old Town', 'Bock Casemates', 'Grand Ducal Palace', 'Adolphe Bridge'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['historic', 'architecture'],
    budgetLevel: 'luxury',
  },
  monaco: {
    id: 'monaco',
    name: 'Monaco',
    country: 'Monaco',
    countryFlag: '🇲🇨',
    lat: 43.74,
    lng: 7.42,
    description: 'Glamorous micro-state on the Riviera — casino, harbor, and Formula 1 glamour.',
    highlights: ['Monte Carlo Casino', 'Prince\'s Palace', 'Oceanographic Museum', 'Larvotto Beach'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['waterfront', 'luxury', 'mediterranean'],
    budgetLevel: 'luxury',
  },

  // ── Central Europe ──
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
  vienna: {
    id: 'vienna',
    name: 'Vienna',
    country: 'Austria',
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
  warsaw: {
    id: 'warsaw',
    name: 'Warsaw',
    country: 'Poland',
    countryFlag: '🇵🇱',
    lat: 52.23,
    lng: 21.01,
    description: 'Phoenix capital rebuilt from ruins — Old Town, palaces, and a vibrant modern core.',
    highlights: ['Old Town', 'Royal Castle', 'Łazienki Park', 'Warsaw Uprising Museum'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'architecture'],
    budgetLevel: 'budget',
  },
  bratislava: {
    id: 'bratislava',
    name: 'Bratislava',
    country: 'Slovakia',
    countryFlag: '🇸🇰',
    lat: 48.15,
    lng: 17.11,
    description: 'Castle on the Danube — compact old town, brutalist contrasts, and riverside cafés.',
    highlights: ['Bratislava Castle', 'Old Town', 'UFO Bridge', 'Devin Castle'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['historic', 'river', 'architecture'],
    budgetLevel: 'budget',
  },
  budapest: {
    id: 'budapest',
    name: 'Budapest',
    country: 'Hungary',
    countryFlag: '🇭🇺',
    lat: 47.50,
    lng: 19.04,
    description: 'Danube capital of thermal baths, grand boulevards, and ruin bars in old Jewish quarter.',
    highlights: ['Parliament', 'Buda Castle', 'Széchenyi Baths', 'Andrássy Avenue'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'architecture', 'culture', 'foodie'],
    budgetLevel: 'budget',
  },
  ljubljana: {
    id: 'ljubljana',
    name: 'Ljubljana',
    country: 'Slovenia',
    countryFlag: '🇸🇮',
    lat: 46.06,
    lng: 14.51,
    description: 'Green capital under a castle — dragon bridges, riverside cafés, and Tito-era modernism.',
    highlights: ['Ljubljana Castle', 'Triple Bridge', 'Tivoli Park', 'Central Market'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'river', 'nature'],
    budgetLevel: 'budget',
  },
  zagreb: {
    id: 'zagreb',
    name: 'Zagreb',
    country: 'Croatia',
    countryFlag: '🇭🇷',
    lat: 45.81,
    lng: 15.98,
    description: 'Austro-Hungarian capital with a Mediterranean soul — café culture, museums, and nearby nature.',
    highlights: ['Upper Town', 'Ban Jelačić Square', 'Museum of Broken Relationships', 'Mirogoj'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'budget',
  },

  // ── Switzerland ──
  bern: {
    id: 'bern',
    name: 'Bern',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    lat: 46.95,
    lng: 7.45,
    description: 'UNESCO old town on a river bend — arcades, fountains, and bear pits beneath a federal palace.',
    highlights: ['Old Town', 'Bärengraben', 'Zytglogge', 'Rosengarten'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'river', 'architecture'],
    budgetLevel: 'luxury',
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

  // ── Southern Europe ──
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
  lisbon: {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    countryFlag: '🇵🇹',
    lat: 38.72,
    lng: -9.14,
    description: 'City of seven hills and tiled façades — trams, fado, and Atlantic light at every turn.',
    highlights: ['Belém Tower', 'Alfama', 'Jerónimos Monastery', 'Bairro Alto'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['waterfront', 'historic', 'foodie', 'culture'],
    budgetLevel: 'budget',
  },
  andorra: {
    id: 'andorra',
    name: 'Andorra la Vella',
    country: 'Andorra',
    countryFlag: '🇦🇩',
    lat: 42.50,
    lng: 1.52,
    description: 'Pyrenean micro-state — ski slopes, tax-free shopping, and dramatic mountain scenery.',
    highlights: ['Caldea Spa', 'Old Town', 'Grandvalira', 'Casa de la Vall'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['mountains', 'nature', 'scenic'],
    budgetLevel: 'mid',
  },
  vaduz: {
    id: 'vaduz',
    name: 'Vaduz',
    country: 'Liechtenstein',
    countryFlag: '🇱🇮',
    lat: 47.14,
    lng: 9.52,
    description: 'Tiny Rhine-valley principality — castle above, vineyards below, and Alpine air.',
    highlights: ['Vaduz Castle', 'Kunstmuseum', 'Rhine Promenade', 'Sareis Chairlift'],
    stopRating: 2,
    overnightRating: 2,
    tags: ['mountains', 'nature', 'scenic'],
    budgetLevel: 'mid',
  },
  sanmarino: {
    id: 'sanmarino',
    name: 'San Marino',
    country: 'San Marino',
    countryFlag: '🇸🇲',
    lat: 43.94,
    lng: 12.45,
    description: 'Medieval republic on a mountain — towers, views, and Europe\'s oldest sovereign state.',
    highlights: ['Guaita Tower', 'Cesta Tower', 'Palazzo Pubblico', 'Monte Titano'],
    stopRating: 3,
    overnightRating: 2,
    tags: ['historic', 'mountains', 'scenic'],
    budgetLevel: 'mid',
  },
  vatican: {
    id: 'vatican',
    name: 'Vatican City',
    country: 'Vatican City',
    countryFlag: '🇻🇦',
    lat: 41.90,
    lng: 12.45,
    description: 'Smallest state on earth — St. Peter\'s, the Sistine Chapel, and centuries of art.',
    highlights: ['St. Peter\'s Basilica', 'Sistine Chapel', 'Vatican Museums', 'Castel Sant\'Angelo'],
    stopRating: 5,
    overnightRating: 2,
    tags: ['historic', 'art', 'culture'],
    budgetLevel: 'mid',
  },

  // ── Balkans ──
  sarajevo: {
    id: 'sarajevo',
    name: 'Sarajevo',
    country: 'Bosnia and Herzegovina',
    countryFlag: '🇧🇦',
    lat: 43.85,
    lng: 18.41,
    description: 'Where East meets West — Ottoman bazaars, Habsburg façades, and a resilient, welcoming spirit.',
    highlights: ['Baščaršija', 'Latin Bridge', 'Trebević Cable Car', 'Tunnel Museum'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'budget',
  },
  belgrade: {
    id: 'belgrade',
    name: 'Belgrade',
    country: 'Serbia',
    countryFlag: '🇷🇸',
    lat: 44.79,
    lng: 20.45,
    description: 'White city at the confluence of two rivers — fortress, nightlife, and a gritty creative pulse.',
    highlights: ['Kalemegdan', 'Skadarlija', 'Saint Sava', 'Ada Ciganlija'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'nightlife', 'culture'],
    budgetLevel: 'budget',
  },
  podgorica: {
    id: 'podgorica',
    name: 'Podgorica',
    country: 'Montenegro',
    countryFlag: '🇲🇪',
    lat: 42.44,
    lng: 19.26,
    description: 'Montenegro\'s low-key capital — rivers, parks, and gateway to the Adriatic coast.',
    highlights: ['Old Ribnica Bridge', 'Gorica Hill', 'Millennium Bridge', 'King\'s Park'],
    stopRating: 2,
    overnightRating: 2,
    tags: ['river', 'nature'],
    budgetLevel: 'budget',
  },
  tirana: {
    id: 'tirana',
    name: 'Tirana',
    country: 'Albania',
    countryFlag: '🇦🇱',
    lat: 41.33,
    lng: 19.82,
    description: 'Colorful, fast-changing capital — painted buildings, bunkers turned into art, and lively boulevards.',
    highlights: ['Skanderbeg Square', 'Bunk\'Art', 'Dajti Mountain Cable Car', 'Blloku District'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'budget',
  },
  skopje: {
    id: 'skopje',
    name: 'Skopje',
    country: 'North Macedonia',
    countryFlag: '🇲🇰',
    lat: 41.99,
    lng: 21.43,
    description: 'Capital of statues and stone bridges — Ottoman bazaar, brutalist blocks, and Kale Fortress above.',
    highlights: ['Old Bazaar', 'Stone Bridge', 'Kale Fortress', 'Millennium Cross'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['historic', 'culture', 'architecture'],
    budgetLevel: 'budget',
  },
  sofia: {
    id: 'sofia',
    name: 'Sofia',
    country: 'Bulgaria',
    countryFlag: '🇧🇬',
    lat: 42.70,
    lng: 23.32,
    description: 'Thracian, Roman, and Soviet layers under Mount Vitosha — thermal springs and lively boulevards.',
    highlights: ['Alexander Nevsky Cathedral', 'Serdica Ruins', 'Vitosha Boulevard', 'National Palace of Culture'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'mountains'],
    budgetLevel: 'budget',
  },
  bucharest: {
    id: 'bucharest',
    name: 'Bucharest',
    country: 'Romania',
    countryFlag: '🇷🇴',
    lat: 44.43,
    lng: 26.10,
    description: 'Little Paris of the East — grand boulevards, monumental palace, and a reviving old town.',
    highlights: ['Palace of Parliament', 'Old Town', 'Calea Victoriei', 'Herăstrău Park'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'architecture', 'culture'],
    budgetLevel: 'budget',
  },
  chisinau: {
    id: 'chisinau',
    name: 'Chișinău',
    country: 'Moldova',
    countryFlag: '🇲🇩',
    lat: 47.01,
    lng: 28.86,
    description: 'Green, wine-loving capital — Soviet-era boulevards, parks, and nearby underground cellars.',
    highlights: ['Stephen the Great Monument', 'Nativity Cathedral', 'Central Park', 'Cricova Winery'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'budget',
  },

  // ── Eastern Europe ──
  minsk: {
    id: 'minsk',
    name: 'Minsk',
    country: 'Belarus',
    countryFlag: '🇧🇾',
    lat: 53.90,
    lng: 27.57,
    description: 'Rebuilt Soviet capital — grand avenues, Independence Square, and a surprisingly green core.',
    highlights: ['Independence Square', 'Victory Park', 'Island of Tears', 'National Library'],
    stopRating: 3,
    overnightRating: 3,
    tags: ['architecture', 'historic', 'culture'],
    budgetLevel: 'budget',
  },
  kyiv: {
    id: 'kyiv',
    name: 'Kyiv',
    country: 'Ukraine',
    countryFlag: '🇺🇦',
    lat: 50.45,
    lng: 30.52,
    description: 'Golden-domed city on the Dnipro — ancient churches, river views, and a resilient, creative spirit.',
    highlights: ['Saint Sophia\'s', 'Kyiv Pechersk Lavra', 'Maidan Nezalezhnosti', 'Andriyivskyy Descent'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'architecture'],
    budgetLevel: 'budget',
  },

  // ── Italy (non-capital major cities) ──
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

  // ── Spain (non-capital major city) ──
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

  // ── France (non-capital major cities) ──
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

  // ── Germany (non-capital major cities) ──
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

  // ── Mediterranean ──
  athens: {
    id: 'athens',
    name: 'Athens',
    country: 'Greece',
    countryFlag: '🇬🇷',
    lat: 37.98,
    lng: 23.73,
    description: 'Cradle of democracy under the Acropolis — ancient ruins, lively plazas, and Aegean light.',
    highlights: ['Acropolis', 'Plaka', 'National Museum', 'Syntagma Square'],
    stopRating: 5,
    overnightRating: 5,
    tags: ['historic', 'culture', 'art', 'foodie'],
    budgetLevel: 'mid',
  },
  valletta: {
    id: 'valletta',
    name: 'Valletta',
    country: 'Malta',
    countryFlag: '🇲🇹',
    lat: 35.90,
    lng: 14.51,
    description: 'Fortified micro-capital built by knights — baroque palaces, harbor views, and Mediterranean grit.',
    highlights: ['St. John\'s Co-Cathedral', 'Grand Harbour', 'Upper Barrakka Gardens', 'Fort St. Elmo'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'waterfront', 'architecture'],
    budgetLevel: 'mid',
  },
  nicosia: {
    id: 'nicosia',
    name: 'Nicosia',
    country: 'Cyprus',
    countryFlag: '🇨🇾',
    lat: 35.17,
    lng: 33.36,
    description: 'Last divided capital in Europe — Venetian walls, a Green Line, and Levantine-Mediterranean charm.',
    highlights: ['Ledra Street', 'Selimiye Mosque', 'Cyprus Museum', 'Laiki Geitonia'],
    stopRating: 4,
    overnightRating: 4,
    tags: ['historic', 'culture', 'foodie'],
    budgetLevel: 'mid',
  },
};

export const trainSegments: TrainSegment[] = [
  // ── Stockholm ──
  { from: 'stockholm', to: 'copenhagen', durationMin: 310, type: 'high-speed', frequency: 'Every 2h', priceEur: 45, scenic: false },
  { from: 'stockholm', to: 'hamburg', durationMin: 660, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },
  { from: 'stockholm', to: 'oslo', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },
  { from: 'stockholm', to: 'helsinki', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: true },

  // ── Helsinki ──
  { from: 'helsinki', to: 'tallinn', durationMin: 120, type: 'regional', frequency: 'Daily', priceEur: 30, scenic: false },
  { from: 'helsinki', to: 'stockholm', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: true },

  // ── Oslo ──
  { from: 'oslo', to: 'copenhagen', durationMin: 390, type: 'intercity', frequency: 'Every 2h', priceEur: 50, scenic: true },
  { from: 'oslo', to: 'stockholm', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },

  // ── Copenhagen ──
  { from: 'copenhagen', to: 'hamburg', durationMin: 290, type: 'intercity', frequency: 'Every 2h', priceEur: 50, scenic: false },
  { from: 'copenhagen', to: 'berlin', durationMin: 420, type: 'intercity', frequency: 'Every 2h', priceEur: 55, scenic: false },
  { from: 'copenhagen', to: 'oslo', durationMin: 390, type: 'intercity', frequency: 'Every 2h', priceEur: 50, scenic: true },

  // ── Tallinn ──
  { from: 'tallinn', to: 'riga', durationMin: 270, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: false },
  { from: 'tallinn', to: 'helsinki', durationMin: 120, type: 'regional', frequency: 'Daily', priceEur: 30, scenic: false },

  // ── Riga ──
  { from: 'riga', to: 'vilnius', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: false },
  { from: 'riga', to: 'tallinn', durationMin: 270, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: false },

  // ── Vilnius ──
  { from: 'vilnius', to: 'riga', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: false },
  { from: 'vilnius', to: 'warsaw', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'vilnius', to: 'minsk', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 20, scenic: false },

  // ── Hamburg ──
  { from: 'hamburg', to: 'berlin', durationMin: 105, type: 'high-speed', frequency: 'Every 30min', priceEur: 30, scenic: false },
  { from: 'hamburg', to: 'copenhagen', durationMin: 290, type: 'intercity', frequency: 'Every 2h', priceEur: 50, scenic: false },
  { from: 'hamburg', to: 'amsterdam', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 60, scenic: false },
  { from: 'hamburg', to: 'munich', durationMin: 360, type: 'high-speed', frequency: 'Every 1h', priceEur: 75, scenic: false },

  // ── Berlin ──
  { from: 'berlin', to: 'prague', durationMin: 270, type: 'intercity', frequency: 'Every 2h', priceEur: 35, scenic: true },
  { from: 'berlin', to: 'munich', durationMin: 300, type: 'high-speed', frequency: 'Every 1h', priceEur: 60, scenic: false },
  { from: 'berlin', to: 'hamburg', durationMin: 105, type: 'high-speed', frequency: 'Every 30min', priceEur: 30, scenic: false },
  { from: 'berlin', to: 'warsaw', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'berlin', to: 'amsterdam', durationMin: 360, type: 'intercity', frequency: 'Every 2h', priceEur: 55, scenic: false },

  // ── Munich ──
  { from: 'munich', to: 'zurich', durationMin: 260, type: 'intercity', frequency: 'Every 2h', priceEur: 45, scenic: true },
  { from: 'munich', to: 'vienna', durationMin: 240, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: false },
  { from: 'munich', to: 'prague', durationMin: 380, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },
  { from: 'munich', to: 'berlin', durationMin: 300, type: 'high-speed', frequency: 'Every 1h', priceEur: 60, scenic: false },
  { from: 'munich', to: 'ljubljana', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: true },

  // ── Zurich ──
  { from: 'zurich', to: 'bern', durationMin: 60, type: 'intercity', frequency: 'Every 30min', priceEur: 25, scenic: true },
  { from: 'zurich', to: 'milan', durationMin: 210, type: 'high-speed', frequency: 'Every 2h', priceEur: 65, scenic: true },
  { from: 'zurich', to: 'munich', durationMin: 260, type: 'intercity', frequency: 'Every 2h', priceEur: 45, scenic: true },
  { from: 'zurich', to: 'paris', durationMin: 300, type: 'high-speed', frequency: 'Every 2h', priceEur: 80, scenic: false },
  { from: 'zurich', to: 'vienna', durationMin: 480, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },

  // ── Bern ──
  { from: 'bern', to: 'zurich', durationMin: 60, type: 'intercity', frequency: 'Every 30min', priceEur: 25, scenic: true },
  { from: 'bern', to: 'paris', durationMin: 250, type: 'high-speed', frequency: 'Every 2h', priceEur: 75, scenic: false },
  { from: 'bern', to: 'milan', durationMin: 200, type: 'scenic', frequency: 'Daily', priceEur: 60, scenic: true },

  // ── Vienna ──
  { from: 'vienna', to: 'prague', durationMin: 240, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'vienna', to: 'budapest', durationMin: 150, type: 'high-speed', frequency: 'Every 1h', priceEur: 30, scenic: false },
  { from: 'vienna', to: 'bratislava', durationMin: 60, type: 'regional', frequency: 'Every 30min', priceEur: 15, scenic: false },
  { from: 'vienna', to: 'munich', durationMin: 240, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: false },
  { from: 'vienna', to: 'rome', durationMin: 720, type: 'night', frequency: 'Daily', priceEur: 80, scenic: false },
  { from: 'vienna', to: 'zurich', durationMin: 480, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },
  { from: 'vienna', to: 'zagreb', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },

  // ── Prague ──
  { from: 'prague', to: 'munich', durationMin: 380, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: true },
  { from: 'prague', to: 'vienna', durationMin: 240, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'prague', to: 'berlin', durationMin: 270, type: 'intercity', frequency: 'Every 2h', priceEur: 35, scenic: true },
  { from: 'prague', to: 'warsaw', durationMin: 480, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },
  { from: 'prague', to: 'budapest', durationMin: 390, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },

  // ── Warsaw ──
  { from: 'warsaw', to: 'berlin', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'warsaw', to: 'prague', durationMin: 480, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },
  { from: 'warsaw', to: 'vilnius', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'warsaw', to: 'budapest', durationMin: 540, type: 'night', frequency: 'Daily', priceEur: 55, scenic: false },
  { from: 'warsaw', to: 'minsk', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: false },
  { from: 'warsaw', to: 'kyiv', durationMin: 720, type: 'night', frequency: 'Daily', priceEur: 60, scenic: false },

  // ── Bratislava ──
  { from: 'bratislava', to: 'vienna', durationMin: 60, type: 'regional', frequency: 'Every 30min', priceEur: 15, scenic: false },
  { from: 'bratislava', to: 'budapest', durationMin: 150, type: 'intercity', frequency: 'Every 2h', priceEur: 25, scenic: false },
  { from: 'bratislava', to: 'prague', durationMin: 240, type: 'intercity', frequency: 'Every 2h', priceEur: 30, scenic: false },

  // ── Budapest ──
  { from: 'budapest', to: 'vienna', durationMin: 150, type: 'high-speed', frequency: 'Every 1h', priceEur: 30, scenic: false },
  { from: 'budapest', to: 'prague', durationMin: 390, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'budapest', to: 'bratislava', durationMin: 150, type: 'intercity', frequency: 'Every 2h', priceEur: 25, scenic: false },
  { from: 'budapest', to: 'zagreb', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: false },
  { from: 'budapest', to: 'belgrade', durationMin: 420, type: 'night', frequency: 'Daily', priceEur: 50, scenic: false },
  { from: 'budapest', to: 'bucharest', durationMin: 600, type: 'night', frequency: 'Daily', priceEur: 55, scenic: false },

  // ── Ljubljana ──
  { from: 'ljubljana', to: 'munich', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: true },
  { from: 'ljubljana', to: 'zagreb', durationMin: 150, type: 'intercity', frequency: 'Every 2h', priceEur: 25, scenic: false },
  { from: 'ljubljana', to: 'venice', durationMin: 240, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: true },
  { from: 'ljubljana', to: 'vienna', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },

  // ── Zagreb ──
  { from: 'zagreb', to: 'vienna', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },
  { from: 'zagreb', to: 'budapest', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: false },
  { from: 'zagreb', to: 'ljubljana', durationMin: 150, type: 'intercity', frequency: 'Every 2h', priceEur: 25, scenic: false },
  { from: 'zagreb', to: 'belgrade', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'zagreb', to: 'sarajevo', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: true },

  // ── Paris ──
  { from: 'paris', to: 'london', durationMin: 135, type: 'high-speed', frequency: 'Every 30min', priceEur: 70, scenic: false },
  { from: 'paris', to: 'amsterdam', durationMin: 200, type: 'high-speed', frequency: 'Every 1h', priceEur: 65, scenic: false },
  { from: 'paris', to: 'brussels', durationMin: 90, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'paris', to: 'zurich', durationMin: 300, type: 'high-speed', frequency: 'Every 2h', priceEur: 80, scenic: false },
  { from: 'paris', to: 'bern', durationMin: 250, type: 'high-speed', frequency: 'Every 2h', priceEur: 75, scenic: false },
  { from: 'paris', to: 'madrid', durationMin: 660, type: 'night', frequency: 'Daily', priceEur: 90, scenic: false },
  { from: 'paris', to: 'milan', durationMin: 420, type: 'high-speed', frequency: 'Daily', priceEur: 90, scenic: true },
  { from: 'paris', to: 'luxembourg', durationMin: 130, type: 'high-speed', frequency: 'Every 2h', priceEur: 50, scenic: false },

  // ── London ──
  { from: 'london', to: 'paris', durationMin: 135, type: 'high-speed', frequency: 'Every 30min', priceEur: 70, scenic: false },
  { from: 'london', to: 'amsterdam', durationMin: 240, type: 'high-speed', frequency: 'Every 2h', priceEur: 65, scenic: false },
  { from: 'london', to: 'brussels', durationMin: 150, type: 'high-speed', frequency: 'Every 2h', priceEur: 60, scenic: false },
  { from: 'london', to: 'dublin', durationMin: 480, type: 'night', frequency: 'Daily', priceEur: 80, scenic: false },

  // ── Dublin ──
  { from: 'dublin', to: 'london', durationMin: 480, type: 'night', frequency: 'Daily', priceEur: 80, scenic: false },

  // ── Amsterdam ──
  { from: 'amsterdam', to: 'brussels', durationMin: 120, type: 'intercity', frequency: 'Every 1h', priceEur: 30, scenic: false },
  { from: 'amsterdam', to: 'paris', durationMin: 200, type: 'high-speed', frequency: 'Every 1h', priceEur: 65, scenic: false },
  { from: 'amsterdam', to: 'berlin', durationMin: 360, type: 'intercity', frequency: 'Every 2h', priceEur: 55, scenic: false },
  { from: 'amsterdam', to: 'london', durationMin: 240, type: 'high-speed', frequency: 'Every 2h', priceEur: 65, scenic: false },
  { from: 'amsterdam', to: 'hamburg', durationMin: 330, type: 'intercity', frequency: 'Every 2h', priceEur: 60, scenic: false },

  // ── Brussels ──
  { from: 'brussels', to: 'paris', durationMin: 90, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'brussels', to: 'amsterdam', durationMin: 120, type: 'intercity', frequency: 'Every 1h', priceEur: 30, scenic: false },
  { from: 'brussels', to: 'london', durationMin: 150, type: 'high-speed', frequency: 'Every 2h', priceEur: 60, scenic: false },
  { from: 'brussels', to: 'luxembourg', durationMin: 180, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },

  // ── Luxembourg ──
  { from: 'luxembourg', to: 'paris', durationMin: 130, type: 'high-speed', frequency: 'Every 2h', priceEur: 50, scenic: false },
  { from: 'luxembourg', to: 'brussels', durationMin: 180, type: 'intercity', frequency: 'Every 2h', priceEur: 40, scenic: false },
  { from: 'luxembourg', to: 'zurich', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 55, scenic: false },

  // ── Madrid ──
  { from: 'madrid', to: 'lisbon', durationMin: 600, type: 'night', frequency: 'Daily', priceEur: 60, scenic: false },
  { from: 'madrid', to: 'paris', durationMin: 660, type: 'night', frequency: 'Daily', priceEur: 90, scenic: false },
  { from: 'madrid', to: 'lisbon', durationMin: 540, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },

  // ── Lisbon ──
  { from: 'lisbon', to: 'madrid', durationMin: 540, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },

  // ── Milan ──
  { from: 'milan', to: 'zurich', durationMin: 210, type: 'high-speed', frequency: 'Every 2h', priceEur: 65, scenic: true },
  { from: 'milan', to: 'bern', durationMin: 200, type: 'scenic', frequency: 'Daily', priceEur: 60, scenic: true },
  { from: 'milan', to: 'rome', durationMin: 180, type: 'high-speed', frequency: 'Every 30min', priceEur: 55, scenic: true },
  { from: 'milan', to: 'paris', durationMin: 420, type: 'high-speed', frequency: 'Daily', priceEur: 90, scenic: true },
  { from: 'milan', to: 'vienna', durationMin: 780, type: 'night', frequency: 'Daily', priceEur: 80, scenic: false },
  { from: 'milan', to: 'ljubljana', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },

  // ── Rome ──
  { from: 'rome', to: 'milan', durationMin: 180, type: 'high-speed', frequency: 'Every 30min', priceEur: 55, scenic: true },
  { from: 'rome', to: 'vienna', durationMin: 720, type: 'night', frequency: 'Daily', priceEur: 80, scenic: false },
  { from: 'rome', to: 'athens', durationMin: 900, type: 'night', frequency: 'Daily', priceEur: 120, scenic: false },
  { from: 'rome', to: 'vatican', durationMin: 10, type: 'regional', frequency: 'Every 15min', priceEur: 2, scenic: false },

  // ── Vatican ──
  { from: 'vatican', to: 'rome', durationMin: 10, type: 'regional', frequency: 'Every 15min', priceEur: 2, scenic: false },

  // ── Athens ──
  { from: 'athens', to: 'rome', durationMin: 900, type: 'night', frequency: 'Daily', priceEur: 120, scenic: false },
  { from: 'athens', to: 'sofia', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },
  { from: 'athens', to: 'thessaloniki', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: true },

  // ── Sofia ──
  { from: 'sofia', to: 'athens', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },
  { from: 'sofia', to: 'belgrade', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'sofia', to: 'bucharest', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },
  { from: 'sofia', to: 'skopje', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 20, scenic: false },

  // ── Skopje ──
  { from: 'skopje', to: 'sofia', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 20, scenic: false },
  { from: 'skopje', to: 'belgrade', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: false },

  // ── Belgrade ──
  { from: 'belgrade', to: 'budapest', durationMin: 420, type: 'night', frequency: 'Daily', priceEur: 50, scenic: false },
  { from: 'belgrade', to: 'zagreb', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'belgrade', to: 'sofia', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'belgrade', to: 'sarajevo', durationMin: 480, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: true },
  { from: 'belgrade', to: 'skopje', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: false },
  { from: 'belgrade', to: 'podgorica', durationMin: 600, type: 'night', frequency: 'Daily', priceEur: 40, scenic: true },

  // ── Sarajevo ──
  { from: 'sarajevo', to: 'zagreb', durationMin: 360, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: true },
  { from: 'sarajevo', to: 'belgrade', durationMin: 480, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: true },
  { from: 'sarajevo', to: 'podgorica', durationMin: 300, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: true },

  // ── Podgorica ──
  { from: 'podgorica', to: 'belgrade', durationMin: 600, type: 'night', frequency: 'Daily', priceEur: 40, scenic: true },
  { from: 'podgorica', to: 'sarajevo', durationMin: 300, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: true },
  { from: 'podgorica', to: 'tirana', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 20, scenic: false },

  // ── Tirana ──
  { from: 'tirana', to: 'podgorica', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 20, scenic: false },
  { from: 'tirana', to: 'athens', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: true },

  // ── Bucharest ──
  { from: 'bucharest', to: 'budapest', durationMin: 600, type: 'night', frequency: 'Daily', priceEur: 55, scenic: false },
  { from: 'bucharest', to: 'sofia', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 45, scenic: false },
  { from: 'bucharest', to: 'chisinau', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: false },
  { from: 'bucharest', to: 'kyiv', durationMin: 900, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },

  // ── Chișinău ──
  { from: 'chisinau', to: 'bucharest', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: false },
  { from: 'chisinau', to: 'kyiv', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'chisinau', to: 'minsk', durationMin: 360, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: false },

  // ── Minsk ──
  { from: 'minsk', to: 'vilnius', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 20, scenic: false },
  { from: 'minsk', to: 'warsaw', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 30, scenic: false },
  { from: 'minsk', to: 'kyiv', durationMin: 480, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'minsk', to: 'chisinau', durationMin: 360, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: false },

  // ── Kyiv ──
  { from: 'kyiv', to: 'warsaw', durationMin: 720, type: 'night', frequency: 'Daily', priceEur: 60, scenic: false },
  { from: 'kyiv', to: 'minsk', durationMin: 480, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },
  { from: 'kyiv', to: 'bucharest', durationMin: 900, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },
  { from: 'kyiv', to: 'chisinau', durationMin: 600, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: false },

  // ── Valletta ──
  { from: 'valletta', to: 'rome', durationMin: 120, type: 'high-speed', frequency: 'Daily', priceEur: 80, scenic: false },

  // ── Nicosia ──
  { from: 'nicosia', to: 'athens', durationMin: 120, type: 'high-speed', frequency: 'Daily', priceEur: 90, scenic: false },

  // ── Andorra ──
  { from: 'andorra', to: 'madrid', durationMin: 420, type: 'regional', frequency: 'Daily', priceEur: 40, scenic: true },
  { from: 'andorra', to: 'paris', durationMin: 480, type: 'night', frequency: 'Daily', priceEur: 60, scenic: true },

  // ── Vaduz ──
  { from: 'vaduz', to: 'zurich', durationMin: 90, type: 'regional', frequency: 'Daily', priceEur: 25, scenic: true },
  { from: 'vaduz', to: 'munich', durationMin: 240, type: 'intercity', frequency: 'Daily', priceEur: 40, scenic: true },

  // ── San Marino ──
  { from: 'sanmarino', to: 'rome', durationMin: 240, type: 'regional', frequency: 'Daily', priceEur: 30, scenic: true },
  { from: 'sanmarino', to: 'milan', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 35, scenic: true },

  // ── Monaco ──
  { from: 'monaco', to: 'paris', durationMin: 300, type: 'high-speed', frequency: 'Daily', priceEur: 70, scenic: true },
  { from: 'monaco', to: 'milan', durationMin: 240, type: 'high-speed', frequency: 'Daily', priceEur: 55, scenic: true },
  { from: 'monaco', to: 'rome', durationMin: 300, type: 'high-speed', frequency: 'Daily', priceEur: 65, scenic: true },

  // ── Cologne ──
  { from: 'cologne', to: 'frankfurt', durationMin: 75, type: 'high-speed', frequency: 'Every 30min', priceEur: 40, scenic: false },
  { from: 'cologne', to: 'amsterdam', durationMin: 160, type: 'intercity', frequency: 'Every 1h', priceEur: 40, scenic: false },
  { from: 'cologne', to: 'brussels', durationMin: 110, type: 'high-speed', frequency: 'Every 1h', priceEur: 45, scenic: false },
  { from: 'cologne', to: 'paris', durationMin: 220, type: 'high-speed', frequency: 'Every 2h', priceEur: 80, scenic: false },
  { from: 'cologne', to: 'hamburg', durationMin: 260, type: 'high-speed', frequency: 'Every 1h', priceEur: 65, scenic: false },
  { from: 'cologne', to: 'berlin', durationMin: 260, type: 'high-speed', frequency: 'Every 1h', priceEur: 60, scenic: false },

  // ── Frankfurt ──
  { from: 'frankfurt', to: 'cologne', durationMin: 75, type: 'high-speed', frequency: 'Every 30min', priceEur: 40, scenic: false },
  { from: 'frankfurt', to: 'munich', durationMin: 210, type: 'high-speed', frequency: 'Every 1h', priceEur: 55, scenic: false },
  { from: 'frankfurt', to: 'paris', durationMin: 240, type: 'high-speed', frequency: 'Every 2h', priceEur: 75, scenic: false },
  { from: 'frankfurt', to: 'amsterdam', durationMin: 250, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: false },
  { from: 'frankfurt', to: 'berlin', durationMin: 240, type: 'high-speed', frequency: 'Every 30min', priceEur: 55, scenic: false },
  { from: 'frankfurt', to: 'brussels', durationMin: 190, type: 'high-speed', frequency: 'Every 2h', priceEur: 60, scenic: false },

  // ── Milan ──
  { from: 'milan', to: 'venice', durationMin: 150, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'milan', to: 'bologna', durationMin: 65, type: 'high-speed', frequency: 'Every 30min', priceEur: 25, scenic: false },
  { from: 'milan', to: 'florence', durationMin: 100, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },

  // ── Venice ──
  { from: 'venice', to: 'bologna', durationMin: 90, type: 'high-speed', frequency: 'Every 1h', priceEur: 25, scenic: false },
  { from: 'venice', to: 'florence', durationMin: 120, type: 'high-speed', frequency: 'Every 1h', priceEur: 30, scenic: true },
  { from: 'venice', to: 'rome', durationMin: 230, type: 'high-speed', frequency: 'Every 1h', priceEur: 50, scenic: true },
  { from: 'venice', to: 'vienna', durationMin: 440, type: 'night', frequency: 'Daily', priceEur: 60, scenic: false },

  // ── Bologna ──
  { from: 'bologna', to: 'florence', durationMin: 37, type: 'high-speed', frequency: 'Every 30min', priceEur: 15, scenic: true },
  { from: 'bologna', to: 'rome', durationMin: 130, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: true },
  { from: 'bologna', to: 'milan', durationMin: 65, type: 'high-speed', frequency: 'Every 30min', priceEur: 25, scenic: false },
  { from: 'bologna', to: 'venice', durationMin: 90, type: 'high-speed', frequency: 'Every 1h', priceEur: 25, scenic: false },

  // ── Florence ──
  { from: 'florence', to: 'rome', durationMin: 90, type: 'high-speed', frequency: 'Every 30min', priceEur: 25, scenic: true },
  { from: 'florence', to: 'milan', durationMin: 100, type: 'high-speed', frequency: 'Every 30min', priceEur: 35, scenic: false },
  { from: 'florence', to: 'bologna', durationMin: 37, type: 'high-speed', frequency: 'Every 30min', priceEur: 15, scenic: true },
  { from: 'florence', to: 'venice', durationMin: 120, type: 'high-speed', frequency: 'Every 1h', priceEur: 30, scenic: true },

  // ── Barcelona ──
  { from: 'barcelona', to: 'madrid', durationMin: 150, type: 'high-speed', frequency: 'Every 30min', priceEur: 40, scenic: false },
  { from: 'barcelona', to: 'marseille', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },
  { from: 'barcelona', to: 'paris', durationMin: 390, type: 'high-speed', frequency: 'Daily', priceEur: 80, scenic: true },
  { from: 'barcelona', to: 'lisbon', durationMin: 720, type: 'night', frequency: 'Daily', priceEur: 70, scenic: false },

  // ── Lyon ──
  { from: 'lyon', to: 'paris', durationMin: 120, type: 'high-speed', frequency: 'Every 30min', priceEur: 50, scenic: false },
  { from: 'lyon', to: 'marseille', durationMin: 110, type: 'high-speed', frequency: 'Every 1h', priceEur: 35, scenic: true },
  { from: 'lyon', to: 'milan', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 55, scenic: true },
  { from: 'lyon', to: 'barcelona', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },

  // ── Marseille ──
  { from: 'marseille', to: 'nice', durationMin: 160, type: 'intercity', frequency: 'Every 1h', priceEur: 25, scenic: true },
  { from: 'marseille', to: 'lyon', durationMin: 110, type: 'high-speed', frequency: 'Every 1h', priceEur: 35, scenic: true },
  { from: 'marseille', to: 'barcelona', durationMin: 300, type: 'intercity', frequency: 'Daily', priceEur: 50, scenic: true },
  { from: 'marseille', to: 'paris', durationMin: 180, type: 'high-speed', frequency: 'Every 1h', priceEur: 60, scenic: true },

  // ── Nice ──
  { from: 'nice', to: 'milan', durationMin: 300, type: 'intercity', frequency: 'Every 2h', priceEur: 45, scenic: true },
  { from: 'nice', to: 'marseille', durationMin: 160, type: 'intercity', frequency: 'Every 1h', priceEur: 25, scenic: true },
  { from: 'nice', to: 'monaco', durationMin: 25, type: 'regional', frequency: 'Every 30min', priceEur: 10, scenic: true },

  // ── Reykjavik ──
  // (Isolated — no train connections; reachable only by air/ferry)
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
