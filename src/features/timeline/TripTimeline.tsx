import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { Calendar, Clock, Plus, MapPin, Trash2, Edit } from 'lucide-react';
import DayPlanner from './DayPlanner';
import { TripDay, Activity } from '../../types';

const TripTimeline: React.FC = () => {
  const { tripDays, setTripDays, tripStartDate } = useAppContext();
  const [selectedDay, setSelectedDay] = useState<TripDay | null>(null);
  
  const daysUntilTrip = tripStartDate 
    ? Math.ceil((tripStartDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
  const handleAddDay = () => {
    const lastDay = tripDays[tripDays.length - 1];
    const lastDate = lastDay ? new Date(lastDay.date) : tripStartDate;
    
    if (!lastDate) return;
    
    const newDate = new Date(lastDate);
    newDate.setDate(newDate.getDate() + 1);
    
    const newDay: TripDay = {
      id: Date.now().toString(),
      date: newDate.toISOString().split('T')[0],
      activities: [],
      notes: ''
    };
    
    setTripDays([...tripDays, newDay]);
    setSelectedDay(newDay);
  };
  
  const handleAddActivity = (day: TripDay, activity: Activity) => {
    setTripDays(days => 
      days.map(d => 
        d.id === day.id 
          ? { ...d, activities: [...d.activities, activity] } 
          : d
      )
    );
  };
  
  const handleUpdateDay = (updatedDay: TripDay) => {
    setTripDays(days => 
      days.map(day => 
        day.id === updatedDay.id ? updatedDay : day
      )
    );
    
    if (selectedDay && selectedDay.id === updatedDay.id) {
      setSelectedDay(updatedDay);
    }
  };
  
  const handleDeleteDay = (id: string) => {
    setTripDays(days => days.filter(day => day.id !== id));
    
    if (selectedDay && selectedDay.id === id) {
      setSelectedDay(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="bg-teal-50">
            <div className="flex items-center">
              <Calendar className="text-teal-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Trip Timeline</h2>
            </div>
          </CardHeader>
          
          <CardContent>
            {tripStartDate && (
              <div className="mb-4 p-4 bg-teal-50 rounded-lg text-center">
                <h3 className="text-sm font-medium text-teal-800 mb-1">Countdown to Trip</h3>
                <div className="text-3xl font-bold text-teal-700">
                  {daysUntilTrip} {daysUntilTrip === 1 ? 'day' : 'days'}
                </div>
                <p className="text-sm text-teal-600 mt-1">
                  Starting {tripStartDate.toLocaleDateString()}
                </p>
              </div>
            )}
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {tripDays.map(day => (
                <div 
                  key={day.id}
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${
                    selectedDay?.id === day.id 
                      ? 'bg-teal-50 border-teal-300' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-teal-600 mr-2" />
                      <span className="font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <button 
                      className="text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDay(day.id);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    {day.activities.length > 0 ? (
                      <div className="text-sm text-gray-500">
                        {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'} planned
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 italic">No activities yet</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              icon={<Plus size={16} />}
              onClick={handleAddDay}
            >
              Add Day
            </Button>
          </CardFooter>
        </Card>
        
        {selectedDay ? (
          <Card className="md:col-span-2">
            <CardHeader className="bg-teal-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Day Plan: {new Date(selectedDay.date).toLocaleDateString()}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Edit size={16} />}
                >
                  Edit Date
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <DayPlanner 
                day={selectedDay} 
                onUpdateDay={handleUpdateDay} 
                onAddActivity={handleAddActivity}
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-2 flex items-center justify-center">
            <CardContent className="text-center p-12">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No day selected</h3>
              <p className="text-gray-400 mb-6">Select a day from the timeline or add a new day</p>
              <Button
                variant="primary"
                icon={<Plus size={16} />}
                onClick={handleAddDay}
              >
                Add First Day
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TripTimeline;