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
      <Card>
        <CardHeader className="bg-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="text-teal-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Explore Destinations</h2>
            </div>
            <div className="flex items-center">
              <Filter className="text-gray-500 mr-1" size={18} />
              <span className="text-sm text-gray-500">Filter by region</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeRegion === null
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveRegion(null)}
            >
              All Regions
              {activeRegion === null && <Check className="inline ml-1" size={14} />}
            </button>
            
            {regions.map(region => (
              <button
                key={region}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeRegion === region
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveRegion(region)}
              >
                {region}
                {activeRegion === region && <Check className="inline ml-1" size={14} />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map(destination => (
          <DestinationCard 
            key={destination.id} 
            destination={destination} 
            onSelect={handleDestinationSelect} 
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationExplorer;