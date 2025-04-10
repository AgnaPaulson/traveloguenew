
import React from 'react';
import { Loader2, DollarSign, Calendar } from 'lucide-react';
import { TravelPreferences } from '../../services/ai';

interface TravelPreferencesFormProps {
  preferences: TravelPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<TravelPreferences>>;
  loading: boolean;
  handleGetSuggestions: () => void;
  error: string | null;
}

const TravelPreferencesForm: React.FC<TravelPreferencesFormProps> = ({
  preferences,
  setPreferences,
  loading,
  handleGetSuggestions,
  error
}) => {
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

  return (
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
              <span className="h-5 w-5 mr-2">✨</span>
              Get AI Suggestions
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
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
    </div>
  );
};

export default TravelPreferencesForm;
