export interface Destination {
  id: string;
  name: string;
  region: string;
  emoji: string;
  imageUrl: string;
  description: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  packed: boolean;
  essential: boolean;
}

export interface TripDay {
  id: string;
  date: string;
  activities: Activity[];
  notes: string;
}

export interface Activity {
  id: string;
  time: string;
  description: string;
  location: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  description: string;
  location: string;
  date: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Exchange rate relative to USD
}

export interface LanguagePhrase {
  phrase: string;
  translation: string;
  category: string;
}

export type TravelType = 'beach' | 'city' | 'mountain' | 'cultural' | 'adventure';