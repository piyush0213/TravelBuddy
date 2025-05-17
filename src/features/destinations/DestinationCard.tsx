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
    <Card className="group transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
          <span className="text-xl" role="img" aria-label={destination.region}>
            {destination.emoji}
          </span>
        </div>
      </div>
      
      <CardContent>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{destination.region}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
        
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => onSelect(destination)} 
          icon={<Info size={16} />}
          className="w-full"
        >
          Select Destination
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;