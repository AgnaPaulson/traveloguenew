
import React from 'react';
import { MapPin } from 'lucide-react';
import { TripSuggestion } from '../../types/tripTypes';

interface TripSuggestionCardProps {
  suggestion: TripSuggestion;
}

const TripSuggestionCard: React.FC<TripSuggestionCardProps> = ({ suggestion }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="h-6 w-6 text-travel-primary mr-2" />
        {suggestion.destination}
      </h3>
      <p className="text-gray-600 mb-4">{suggestion.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Estimated Budget</p>
          <p className="text-xl font-semibold text-travel-primary">
            ${suggestion.budget}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Recommended Duration</p>
          <p className="text-xl font-semibold text-travel-primary">
            {suggestion.duration} days
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Highlights</h4>
        <ul className="space-y-2">
          {suggestion.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-travel-primary">•</span>
              <span className="ml-2">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {suggestion.days && suggestion.days.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Daily Itinerary</h4>
          <div className="space-y-4">
            {suggestion.days.map((day) => (
              <div key={day.day} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Day {day.day}</p>
                <ul className="space-y-1">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSuggestionCard;
