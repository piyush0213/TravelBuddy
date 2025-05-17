import React from 'react';
import { Compass, PackageCheck, Calendar, Wallet, Image, Currency as Currencies, Languages } from 'lucide-react';

interface SidebarProps {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeFeature, setActiveFeature }) => {
  const menuItems = [
    { id: 'destinations', name: 'Destinations', icon: <Compass size={20} /> },
    { id: 'packing', name: 'Packing List', icon: <PackageCheck size={20} /> },
    { id: 'timeline', name: 'Trip Timeline', icon: <Calendar size={20} /> },
    { id: 'budget', name: 'Budget Tracker', icon: <Wallet size={20} /> },
    { id: 'gallery', name: 'Travel Gallery', icon: <Image size={20} /> },
    { id: 'currency', name: 'Currency Converter', icon: <Currencies size={20} /> },
    { id: 'language', name: 'Language Phrases', icon: <Languages size={20} /> },
  ];

  return (
    <aside className="bg-teal-800 text-white w-full md:w-64 flex-shrink-0">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <span className="text-2xl font-bold flex items-center">
          <Compass size={28} className="mr-2" />
          TravelBuddy
        </span>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ${
                  activeFeature === item.id
                    ? 'bg-teal-700 text-white'
                    : 'text-teal-100 hover:bg-teal-700'
                }`}
                onClick={() => setActiveFeature(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto p-4 text-sm text-teal-200 hidden md:block">
        <p>Plan your perfect trip with TravelBuddy - your complete travel companion!</p>
      </div>
    </aside>
  );
};

export default Sidebar;