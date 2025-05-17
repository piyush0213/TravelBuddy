import React from 'react';
import Card, { CardContent } from '../../components/Card';
import Button from '../../components/Button';
import { MapPin, Info, Star, Calendar, Users } from 'lucide-react';
import { Destination } from '../../types';
import { motion } from 'framer-motion';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <motion.img 
            src={destination.imageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl" role="img" aria-label={destination.region}>
              {destination.emoji}
            </span>
          </motion.div>
          
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>4.8/5</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-teal-400 mr-1" />
                <span>Best time: Spring</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-purple-400 mr-1" />
                <span>Family-friendly</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <CardContent className="relative z-10 bg-white transition-colors duration-500 group-hover:bg-gray-50">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-700 transition-colors duration-500">
                {destination.name}
              </h3>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <MapPin size={14} className="mr-1 text-teal-600" />
                <span className="font-medium">{destination.region}</span>
              </div>
            </div>
            
            <motion.p 
              className="text-gray-600 mb-4"
              animate={{ height: isHovered ? "auto" : "3em" }}
              transition={{ duration: 0.3 }}
            >
              {destination.description}
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => onSelect(destination)} 
                icon={<Info size={16} />}
                className="w-full"
              >
                Explore {destination.name}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DestinationCard;