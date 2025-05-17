import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DestinationExplorer from './features/destinations/DestinationExplorer';
import PackingList from './features/packing/PackingList';
import TripTimeline from './features/timeline/TripTimeline';
import BudgetTracker from './features/budget/BudgetTracker';
import TravelGallery from './features/gallery/TravelGallery';
import CurrencyConverter from './features/currency/CurrencyConverter';
import LanguageCheatSheet from './features/language/LanguageCheatSheet';
import { AppProvider } from './context/AppContext';

function App() {
  const [activeFeature, setActiveFeature] = useState('destinations');

  const renderFeature = () => {
    switch (activeFeature) {
      case 'destinations':
        return <DestinationExplorer />;
      case 'packing':
        return <PackingList />;
      case 'timeline':
        return <TripTimeline />;
      case 'budget':
        return <BudgetTracker />;
      case 'gallery':
        return <TravelGallery />;
      case 'currency':
        return <CurrencyConverter />;
      case 'language':
        return <LanguageCheatSheet />;
      default:
        return <DestinationExplorer />;
    }
  };

  return (
    <AppProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        <main className="flex-1 flex flex-col">
          <Header activeFeature={activeFeature} />
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            {renderFeature()}
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;