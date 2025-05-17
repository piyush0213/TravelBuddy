import { Destination, PackingItem, TripDay, BudgetItem, GalleryImage, Currency } from '../types';

export const initialDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    region: 'Europe',
    emoji: '🇫🇷',
    imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    description: 'The City of Light featuring the iconic Eiffel Tower and world-class museums.'
  },
  {
    id: '2',
    name: 'Tokyo',
    region: 'Asia',
    emoji: '🇯🇵',
    imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    description: 'A bustling metropolis that perfectly blends ultramodern and traditional.'
  },
  {
    id: '3',
    name: 'New York',
    region: 'North America',
    emoji: '🇺🇸',
    imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
    description: 'The Big Apple with its iconic skyline and diverse neighborhoods.'
  },
  {
    id: '4',
    name: 'Sydney',
    region: 'Oceania',
    emoji: '🇦🇺',
    imageUrl: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    description: 'Harbor city known for its iconic Opera House and beautiful beaches.'
  },
  {
    id: '5',
    name: 'Cape Town',
    region: 'Africa',
    emoji: '🇿🇦',
    imageUrl: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg',
    description: 'Stunning coastal city with Table Mountain as its backdrop.'
  },
  {
    id: '6',
    name: 'Rio de Janeiro',
    region: 'South America',
    emoji: '🇧🇷',
    imageUrl: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
    description: 'Famous for its Carnival, beautiful beaches, and the Christ the Redeemer statue.'
  }
];

export const initialPackingItems: PackingItem[] = [
  { id: '1', name: 'Passport', category: 'Documents', packed: false, essential: true },
  { id: '2', name: 'Phone Charger', category: 'Electronics', packed: false, essential: true },
  { id: '3', name: 'T-shirts', category: 'Clothing', packed: false, essential: true },
  { id: '4', name: 'Toothbrush', category: 'Toiletries', packed: false, essential: true },
  { id: '5', name: 'Travel Insurance', category: 'Documents', packed: false, essential: true },
  { id: '6', name: 'Camera', category: 'Electronics', packed: false, essential: false },
  { id: '7', name: 'Swimwear', category: 'Clothing', packed: false, essential: false },
  { id: '8', name: 'Sunscreen', category: 'Toiletries', packed: false, essential: true },
  { id: '9', name: 'First Aid Kit', category: 'Health', packed: false, essential: true },
  { id: '10', name: 'Travel Pillow', category: 'Comfort', packed: false, essential: false }
];

export const initialTripDays: TripDay[] = [
  {
    id: '1',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activities: [
      { id: '1', time: '09:00', description: 'Check-in at hotel', location: 'Hotel' },
      { id: '2', time: '12:00', description: 'Lunch at local restaurant', location: 'Downtown' },
      { id: '3', time: '14:00', description: 'City tour', location: 'Various landmarks' }
    ],
    notes: 'First day of our trip!'
  },
  {
    id: '2',
    date: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activities: [
      { id: '1', time: '10:00', description: 'Visit museum', location: 'National Museum' },
      { id: '2', time: '13:00', description: 'Lunch', location: 'Cafe near museum' },
      { id: '3', time: '16:00', description: 'Shopping', location: 'Main shopping district' }
    ],
    notes: 'Museum closes at 5pm!'
  }
];

export const initialBudgetItems: BudgetItem[] = [
  { id: '1', description: 'Flights', amount: 1200, category: 'Transportation', date: new Date().toISOString().split('T')[0] },
  { id: '2', description: 'Hotel (7 nights)', amount: 1400, category: 'Accommodation', date: new Date().toISOString().split('T')[0] },
  { id: '3', description: 'Food budget', amount: 700, category: 'Food', date: new Date().toISOString().split('T')[0] },
  { id: '4', description: 'Local transportation', amount: 200, category: 'Transportation', date: new Date().toISOString().split('T')[0] },
  { id: '5', description: 'Sightseeing & activities', amount: 500, category: 'Activities', date: new Date().toISOString().split('T')[0] },
  { id: '6', description: 'Shopping', amount: 300, category: 'Shopping', date: new Date().toISOString().split('T')[0] }
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    description: 'Beautiful sunset at the beach',
    location: 'Bali, Indonesia',
    date: '2023-07-15'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg',
    description: 'Mountain hiking adventure',
    location: 'Swiss Alps',
    date: '2023-06-22'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1851481/pexels-photo-1851481.jpeg',
    description: 'Historic city center',
    location: 'Prague, Czech Republic',
    date: '2023-05-10'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg',
    description: 'Traditional food market',
    location: 'Bangkok, Thailand',
    date: '2023-04-05'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg',
    description: 'Safari adventure',
    location: 'Serengeti, Tanzania',
    date: '2023-03-18'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg',
    description: 'Famous landmark',
    location: 'Rome, Italy',
    date: '2023-02-14'
  }
];

export const initialCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.93 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.52 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.37 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', rate: 0.90 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.25 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.30 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', rate: 17.04 }
];

export const languagePhrases = {
  beach: [
    { phrase: 'Where is the beach?', translation: 'Où est la plage?', category: 'Navigation' },
    { phrase: 'I need sunscreen', translation: 'J\'ai besoin de crème solaire', category: 'Shopping' },
    { phrase: 'Can I rent a beach chair?', translation: 'Puis-je louer une chaise de plage?', category: 'Services' }
  ],
  city: [
    { phrase: 'Where is the museum?', translation: 'Où est le musée?', category: 'Navigation' },
    { phrase: 'How much is the ticket?', translation: 'Combien coûte le billet?', category: 'Shopping' },
    { phrase: 'Is there public transportation?', translation: 'Y a-t-il des transports en commun?', category: 'Transportation' }
  ],
  mountain: [
    { phrase: 'Where are the hiking trails?', translation: 'Où sont les sentiers de randonnée?', category: 'Navigation' },
    { phrase: 'I need hiking boots', translation: 'J\'ai besoin de chaussures de randonnée', category: 'Shopping' },
    { phrase: 'Is it safe to climb?', translation: 'Est-ce sécuritaire de grimper?', category: 'Safety' }
  ],
  cultural: [
    { phrase: 'What time does the museum open?', translation: 'À quelle heure ouvre le musée?', category: 'Navigation' },
    { phrase: 'Do you speak English?', translation: 'Parlez-vous anglais?', category: 'Communication' },
    { phrase: 'This is delicious', translation: 'C\'est délicieux', category: 'Dining' }
  ],
  adventure: [
    { phrase: 'Where can I go rafting?', translation: 'Où puis-je faire du rafting?', category: 'Activities' },
    { phrase: 'I need safety equipment', translation: 'J\'ai besoin d\'équipement de sécurité', category: 'Shopping' },
    { phrase: 'Is there a guide available?', translation: 'Y a-t-il un guide disponible?', category: 'Services' }
  ]
};