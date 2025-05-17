import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader } from '../../components/Card';
import { Globe, Filter, Check, Search, MapPin } from 'lucide-react';
import { Destination } from '../../types';
import DestinationCard from './DestinationCard';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationExplorer: React.FC = () => {
  const { destinations, setSelectedDestination } = useAppContext();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  const regions = Array.from(new Set(destinations.map(dest => dest.region)));
  
  const filteredDestinations = destinations
    .filter(dest => !activeRegion || dest.region === activeRegion)
    .filter(dest => 
      searchQuery === '' || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="transform transition-all duration-500 hover:shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="text-teal-600 mr-2 animate-spin-slow" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">Explore Destinations</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Filter className="text-teal-600 mr-2" size={18} />
                    <span className="text-sm font-medium text-gray-700">Filter by region</span>
                  </div>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'grid' ? 'bg-teal-100' : 'bg-white/50'
                    }`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'map' ? 'bg-teal-100' : 'bg-white/50'
                    }`}
                    onClick={() => setViewMode('map')}
                  >
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-4 py-2 pl-10 bg-white/70 backdrop-blur-sm rounded-full border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-2 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
              </motion.button>
              
              {regions.map(region => (
                <motion.button
                  key={region}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard 
                  destination={destination} 
                  onSelect={handleDestinationSelect} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-lg p-4 h-[600px]"
          >
            <div className="h-full flex items-center justify-center text-gray-500">
              Interactive map view coming soon!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {filteredDestinations.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Globe className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No destinations found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default DestinationExplorer;