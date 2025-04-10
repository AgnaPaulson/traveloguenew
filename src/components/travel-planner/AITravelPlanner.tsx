
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { generateTripIdeas, generateItinerary, generateLocalTips, TravelPreferences } from '../../services/ai';
import { TripSuggestion } from '../../types/tripTypes';
import TravelPreferencesForm from './TravelPreferencesForm';
import TripSuggestionCard from './TripSuggestionCard';
import MarkdownContentCard from './MarkdownContentCard';

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
        <TravelPreferencesForm 
          preferences={preferences}
          setPreferences={setPreferences}
          loading={loading}
          handleGetSuggestions={handleGetSuggestions}
          error={error}
        />

        {/* Results */}
        <div className="space-y-6">
          {suggestion && <TripSuggestionCard suggestion={suggestion} />}
          
          <MarkdownContentCard title="Your Itinerary" content={itinerary} />
          
          <MarkdownContentCard title="Local Tips" content={tips} />
        </div>
      </div>
    </div>
  );
};

export default AITravelPlanner;
