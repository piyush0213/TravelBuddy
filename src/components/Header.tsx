import React from 'react';
import { Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
  activeFeature: string;
}

const Header: React.FC<HeaderProps> = ({ activeFeature }) => {
  const { selectedDestination } = useAppContext();

  const getTitle = () => {
    switch (activeFeature) {
      case 'destinations':
        return 'Explore Destinations';
      case 'packing':
        return 'Packing Checklist';
      case 'timeline':
        return 'Trip Timeline';
      case 'budget':
        return 'Budget Tracker';
      case 'gallery':
        return 'Travel Gallery';
      case 'currency':
        return 'Currency Converter';
      case 'language':
        return 'Language Phrases';
      default:
        return 'TravelBuddy';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        {getTitle()}
        {selectedDestination && activeFeature !== 'destinations' && (
          <span className="ml-2 text-sm text-gray-500">
            {selectedDestination.emoji} {selectedDestination.name}
          </span>
        )}
      </h1>
      
      <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
        <Menu size={24} />
      </button>
    </header>
  );
};

export default Header;