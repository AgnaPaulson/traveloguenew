
import React, { useState } from 'react';
import { Sparkles, Loader2, MapPin, Calendar, DollarSign } from 'lucide-react';
import { generateTripIdeas, generateItinerary, generateLocalTips, TravelPreferences } from '../services/ai';
import { TripSuggestion } from '../types/tripTypes';

const AITravelPlanner: React.FC = () => {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    budget: 2000,
    duration: 7,
    interests: [] as string[],
    climate: 'warm'
  });
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<TripSuggestion | null>(null);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [tips, setTips] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    'Culture', 'Nature', 'Food', 'Adventure', 'History',
    'Shopping', 'Relaxation', 'Photography', 'Art', 'Nightlife'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGetSuggestions = async () => {
    if (preferences.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get trip suggestion
      const tripSuggestion = await generateTripIdeas(preferences);
      setSuggestion(tripSuggestion);

      // Get itinerary
      const tripItinerary = await generateItinerary(
        tripSuggestion.destination,
        preferences.duration,
        preferences.interests
      );
      setItinerary(tripItinerary);

      // Get local tips
      const localTips = await generateLocalTips(tripSuggestion.destination);
      setTips(localTips);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          AI Travel Planner
        </h2>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Get personalized travel suggestions powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preferences Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Your Travel Preferences</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget (USD)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={preferences.budget}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    budget: parseInt(e.target.value)
                  }))}
                  className="focus:ring-travel-primary focus:border-travel-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={preferences.duration}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    duration: parseInt(e.target.value)
                  }))}
                  className="focus:ring-travel-primary focus:border-travel-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      preferences.interests.includes(interest)
                        ? 'bg-travel-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Climate Preference</label>
              <select
                value={preferences.climate}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  climate: e.target.value
                }))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-travel-primary focus:border-travel-primary sm:text-sm rounded-md"
              >
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
                <option value="moderate">Moderate</option>
                <option value="tropical">Tropical</option>
              </select>
            </div>

            <button
              onClick={handleGetSuggestions}
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get AI Suggestions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {suggestion && (
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
          )}

          {itinerary && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Your Itinerary</h3>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-600">
                  {itinerary}
                </pre>
              </div>
            </div>
          )}

          {tips && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Local Tips</h3>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-600">
                  {tips}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITravelPlanner;
