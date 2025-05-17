import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Destination, 
  PackingItem, 
  TripDay, 
  BudgetItem, 
  GalleryImage,
  Currency 
} from '../types';
import { 
  initialDestinations,
  initialPackingItems,
  initialTripDays,
  initialBudgetItems,
  initialGalleryImages,
  initialCurrencies
} from '../data/initialData';

interface AppContextType {
  destinations: Destination[];
  packingItems: PackingItem[];
  tripDays: TripDay[];
  budgetItems: BudgetItem[];
  galleryImages: GalleryImage[];
  currencies: Currency[];
  selectedDestination: Destination | null;
  tripStartDate: Date | null;
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  setPackingItems: React.Dispatch<React.SetStateAction<PackingItem[]>>;
  setTripDays: React.Dispatch<React.SetStateAction<TripDay[]>>;
  setBudgetItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
  setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  setSelectedDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
  setTripStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [packingItems, setPackingItems] = useState<PackingItem[]>(initialPackingItems);
  const [tripDays, setTripDays] = useState<TripDay[]>(initialTripDays);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [tripStartDate, setTripStartDate] = useState<Date | null>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [currencies] = useState<Currency[]>(initialCurrencies);

  const value = {
    destinations,
    packingItems,
    tripDays,
    budgetItems,
    galleryImages,
    currencies,
    selectedDestination,
    tripStartDate,
    setDestinations,
    setPackingItems,
    setTripDays,
    setBudgetItems,
    setGalleryImages,
    setSelectedDestination,
    setTripStartDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};