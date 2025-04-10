
// Import the TripSuggestion type from tripTypes
import { TripSuggestion, generateMockTrip } from '../types/tripTypes';

export interface TravelPlan {
  destination: string;
  duration: string;
  budget: string;
  activities: string[];
  accommodations: string[];
  transportation: string[];
}

export interface PlanningResponse {
  plan?: TravelPlan;
  error?: string;
  loading?: boolean;
}

export interface TravelPreferences {
  budget: number;
  duration: number;
  interests: string[];
  climate: string;
}

export const generateTravelPlan = async (prompt: string): Promise<PlanningResponse> => {
  // This is a placeholder. The actual implementation will be created separately.
  console.log("Generate travel plan called with:", prompt);
  return {
    loading: false,
    plan: {
      destination: "Sample Destination",
      duration: "7 days",
      budget: "$1000",
      activities: ["Sample activity 1", "Sample activity 2"],
      accommodations: ["Sample accommodation"],
      transportation: ["Sample transportation"]
    }
  };
};

// Updated to match the expected function signature in AITravelPlanner
export const generateTripIdeas = async (preferences: TravelPreferences): Promise<TripSuggestion> => {
  console.log("Generating trip ideas based on preferences:", preferences);
  // Use the mock trip generator from tripTypes
  return generateMockTrip(`Trip to with budget ${preferences.budget} for ${preferences.duration} days`);
};

// Updated to match the expected function signature
export const generateItinerary = async (destination: string, duration: number, interests: string[]): Promise<string> => {
  console.log(`Generating itinerary for ${destination} for ${duration} days with interests:`, interests);
  
  let itinerary = `# ${duration}-Day Itinerary for ${destination}\n\n`;
  
  for (let i = 1; i <= duration; i++) {
    itinerary += `## Day ${i}\n`;
    itinerary += `- Morning: Explore local ${interests[0] || 'attractions'}\n`;
    itinerary += `- Afternoon: Visit popular ${interests[1] || 'landmarks'}\n`;
    itinerary += `- Evening: Experience local ${interests[2] || 'cuisine'}\n\n`;
  }
  
  return itinerary;
};

// Updated to match the expected function signature
export const generateLocalTips = async (destination: string): Promise<string> => {
  console.log(`Generating local tips for ${destination}`);
  
  return `# Local Tips for ${destination}\n\n` +
    `- Try the local cuisine, especially the regional specialties\n` +
    `- Visit during off-peak seasons to avoid crowds\n` +
    `- Use public transportation to get around efficiently\n` +
    `- Learn a few basic phrases in the local language\n` +
    `- Ask locals for restaurant recommendations instead of following tourist guides`;
};
