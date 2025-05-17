import React, { useState } from 'react';
import Button from '../../components/Button';
import { Clock, MapPin, Plus, Trash2 } from 'lucide-react';
import { TripDay, Activity } from '../../types';

interface DayPlannerProps {
  day: TripDay;
  onUpdateDay: (day: TripDay) => void;
  onAddActivity: (day: TripDay, activity: Activity) => void;
}

const DayPlanner: React.FC<DayPlannerProps> = ({ day, onUpdateDay, onAddActivity }) => {
  const [newActivityTime, setNewActivityTime] = useState('');
  const [newActivityDesc, setNewActivityDesc] = useState('');
  const [newActivityLocation, setNewActivityLocation] = useState('');
  const [notes, setNotes] = useState(day.notes);
  
  const handleAddActivity = () => {
    if (!newActivityTime || !newActivityDesc) return;
    
    const newActivity: Activity = {
      id: Date.now().toString(),
      time: newActivityTime,
      description: newActivityDesc,
      location: newActivityLocation || 'Not specified'
    };
    
    onAddActivity(day, newActivity);
    setNewActivityTime('');
    setNewActivityDesc('');
    setNewActivityLocation('');
  };
  
  const handleRemoveActivity = (activityId: string) => {
    const updatedActivities = day.activities.filter(a => a.id !== activityId);
    onUpdateDay({ ...day, activities: updatedActivities });
  };
  
  const handleUpdateNotes = () => {
    onUpdateDay({ ...day, notes });
  };
  
  // Sort activities by time
  const sortedActivities = [...day.activities].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Activities</h3>
        
        {sortedActivities.length > 0 ? (
          <div className="space-y-3">
            {sortedActivities.map(activity => (
              <div 
                key={activity.id}
                className="p-4 border border-gray-200 rounded-md bg-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center text-teal-700 mb-1">
                      <Clock size={16} className="mr-1" />
                      <span className="font-medium">{activity.time}</span>
                    </div>
                    <div className="text-gray-800">{activity.description}</div>
                    {activity.location && (
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="text-gray-400 hover:text-red-500 p-1"
                    onClick={() => handleRemoveActivity(activity.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-md">
            <Clock size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No activities planned for this day</p>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Activity</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 09:00"
                  value={newActivityTime}
                  onChange={(e) => setNewActivityTime(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="What are you doing?"
                  value={newActivityDesc}
                  onChange={(e) => setNewActivityDesc(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Location (optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Where is this activity?"
                value={newActivityLocation}
                onChange={(e) => setNewActivityLocation(e.target.value)}
              />
            </div>
            
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={16} />}
              onClick={handleAddActivity}
            >
              Add Activity
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Day Notes</h3>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[100px]"
          placeholder="Add notes for this day..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={handleUpdateNotes}
        ></textarea>
      </div>
    </div>
  );
};

export default DayPlanner;