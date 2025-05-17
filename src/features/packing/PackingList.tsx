import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { PackageCheck, Plus, Check, Filter, Trash2 } from 'lucide-react';
import { PackingItem } from '../../types';

const PackingList: React.FC = () => {
  const { packingItems, setPackingItems } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Clothing');
  
  const categories = Array.from(new Set(packingItems.map(item => item.category)));
  
  const filteredItems = activeCategory 
    ? packingItems.filter(item => item.category === activeCategory)
    : packingItems;
  
  const handleTogglePacked = (id: string) => {
    setPackingItems(items => 
      items.map(item => 
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  
  const handleAddItem = () => {
    if (newItemName.trim() === '') return;
    
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: newItemCategory,
      packed: false,
      essential: false
    };
    
    setPackingItems(items => [...items, newItem]);
    setNewItemName('');
  };
  
  const handleDeleteItem = (id: string) => {
    setPackingItems(items => items.filter(item => item.id !== id));
  };
  
  const packedCount = packingItems.filter(item => item.packed).length;
  const totalCount = packingItems.length;
  const percentPacked = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PackageCheck className="text-teal-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Packing Checklist</h2>
            </div>
            <div className="flex items-center">
              <Filter className="text-gray-500 mr-1" size={18} />
              <span className="text-sm text-gray-500">Filter by category</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Packing Progress</span>
              <span className="text-sm text-gray-500">{packedCount} of {totalCount} items packed</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-teal-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${percentPacked}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All Categories
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className={`p-3 rounded-md border flex items-center justify-between transition-colors ${
                  item.packed 
                    ? 'bg-gray-50 border-gray-200' 
                    : item.essential
                      ? 'bg-white border-amber-200'
                      : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <button
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      item.packed 
                        ? 'bg-teal-600 border-teal-600 text-white' 
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleTogglePacked(item.id)}
                  >
                    {item.packed && <Check size={12} />}
                  </button>
                  
                  <div>
                    <span 
                      className={`text-gray-800 ${item.packed ? 'line-through text-gray-500' : ''}`}
                    >
                      {item.name}
                    </span>
                    <div className="flex items-center mt-0.5">
                      <span className="text-xs text-gray-500">{item.category}</span>
                      {item.essential && (
                        <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-800 text-xs rounded">
                          Essential
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new item..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
            />
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <Button
              variant="primary"
              icon={<Plus size={16} />}
              onClick={handleAddItem}
            >
              Add
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PackingList;