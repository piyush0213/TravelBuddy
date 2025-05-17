import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader } from '../../components/Card';
import { Globe, Filter, Check } from 'lucide-react';
import { Destination } from '../../types';
import DestinationCard from './DestinationCard';

const DestinationExplorer: React.FC = () => {
  const { destinations, setSelectedDestination } = useAppContext();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  
  const regions = Array.from(new Set(destinations.map(dest => dest.region)));
  
  const filteredDestinations = activeRegion 
    ? destinations.filter(dest => dest.region === activeRegion)
    : destinations;
    
  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="space-y-6">
      <Card className="transform transition-all duration-500 hover:shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="text-teal-600 mr-2 animate-spin-slow" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Explore Destinations</h2>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Filter className="text-teal-600 mr-2" size={18} />
              <span className="text-sm font-medium text-gray-700">Filter by region</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeRegion === null
                  ? 'bg-teal-100 text-teal-800 shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveRegion(null)}
            >
              <span className="flex items-center">
                All Regions
                {activeRegion === null && (
                  <Check className="inline ml-2 animate-bounce" size={14} />
                )}
              </span>
            </button>
            
            {regions.map(region => (
              <button
                key={region}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeRegion === region
                    ? 'bg-teal-100 text-teal-800 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveRegion(region)}
              >
                <span className="flex items-center">
                  {region}
                  {activeRegion === region && (
                    <Check className="inline ml-2 animate-bounce" size={14} />
                  )}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
        {filteredDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <DestinationCard 
              destination={destination} 
              onSelect={handleDestinationSelect} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationExplorer;