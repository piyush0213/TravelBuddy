import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { Languages, CheckSquare, Copy } from 'lucide-react';
import { TravelType } from '../../types';
import { languagePhrases } from '../../data/initialData';

const LanguageCheatSheet: React.FC = () => {
  const [selectedType, setSelectedType] = useState<TravelType>('beach');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const travelTypes: { type: TravelType; label: string; icon: string }[] = [
    { type: 'beach', label: 'Beach Vacation', icon: '🏖️' },
    { type: 'city', label: 'City Exploration', icon: '🏙️' },
    { type: 'mountain', label: 'Mountain Adventure', icon: '⛰️' },
    { type: 'cultural', label: 'Cultural Experience', icon: '🏛️' },
    { type: 'adventure', label: 'Adventure Trip', icon: '🧗' }
  ];
  
  const phrases = languagePhrases[selectedType];
  
  const handleCopyPhrase = (index: number, phrase: string) => {
    navigator.clipboard.writeText(phrase).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-teal-50">
          <div className="flex items-center">
            <Languages className="text-teal-600 mr-2" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Language Phrases</h2>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Select Your Travel Type</h3>
            <div className="flex flex-wrap gap-2">
              {travelTypes.map(({ type, label, icon }) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    selectedType === type
                      ? 'bg-teal-100 text-teal-800 border border-teal-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <span className="mr-2" role="img" aria-label={label}>
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4 mb-6">
            <h3 className="text-md font-medium text-teal-800 mb-2 flex items-center">
              <span className="mr-2" role="img" aria-label={selectedType}>
                {travelTypes.find(t => t.type === selectedType)?.icon}
              </span>
              Essential Phrases for {travelTypes.find(t => t.type === selectedType)?.label}
            </h3>
            <p className="text-teal-700">
              These phrases will help you communicate during your {selectedType} travel experience. 
              Click on any phrase to copy it for easy reference.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Group phrases by category */}
            {Array.from(new Set(phrases.map(p => p.category))).map(category => (
              <div key={category}>
                <h3 className="text-gray-700 font-medium mb-3">{category} Phrases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phrases
                    .filter(p => p.category === category)
                    .map((phrase, index) => (
                      <div 
                        key={index}
                        className="border border-gray-200 rounded-md bg-white overflow-hidden cursor-pointer hover:border-teal-300 transition-colors"
                        onClick={() => handleCopyPhrase(index, phrase.phrase)}
                      >
                        <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                          <span className="font-medium text-gray-800">{phrase.phrase}</span>
                          <button className="text-gray-400 hover:text-teal-600">
                            {copiedIndex === index ? (
                              <CheckSquare size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                        <div className="p-3 italic text-gray-600">
                          {phrase.translation}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gray-50 rounded-lg p-4 text-center">
            <h3 className="text-gray-700 font-medium mb-2">Need More Phrases?</h3>
            <p className="text-gray-600 mb-4">
              This is just a basic cheat sheet. For a complete language guide, consider 
              downloading a language app or purchasing a travel phrasebook.
            </p>
            <Button variant="outline">
              Download PDF Cheat Sheet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageCheatSheet;