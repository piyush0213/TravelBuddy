import React from 'react';
import Card, { CardContent } from '../../components/Card';
import Button from '../../components/Button';
import { MapPin, Info } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  return (
    <Card className="group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          <span className="text-2xl" role="img" aria-label={destination.region}>
            {destination.emoji}
          </span>
        </div>
      </div>
      
      <CardContent className="relative z-10 bg-white transition-colors duration-500 group-hover:bg-gray-50">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-700 transition-colors duration-500">
            {destination.name}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <MapPin size={14} className="mr-1 text-teal-600" />
            <span className="font-medium">{destination.region}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {destination.description}
        </p>
        
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => onSelect(destination)} 
          icon={<Info size={16} />}
          className="w-full transform transition-transform duration-500 group-hover:scale-105"
        >
          Explore {destination.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;