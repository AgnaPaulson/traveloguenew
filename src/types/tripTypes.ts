
export interface TripDay {
  day: number;
  activities: string[];
}

export interface TripSuggestion {
  id: string;
  destination: string;
  budget: number;
  duration: number;
  description: string;
  highlights: string[];
  days: TripDay[];
  imageUrl?: string;
}

export const generateMockTrip = (prompt: string): TripSuggestion => {
  // Generate a mock trip based on the prompt
  const destinations = ['Paris', 'Tokyo', 'New York', 'Bali', 'Rome', 'London', 'Sydney'];
  const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
  const destination = prompt.includes('to') ? prompt.split('to ')[1].split(' ')[0] : randomDestination;
  const budget = Math.floor(Math.random() * 4000) + 1000;
  const duration = Math.floor(Math.random() * 7) + 3;
  
  const days: TripDay[] = [];
  for (let i = 1; i <= duration; i++) {
    days.push({
      day: i,
      activities: [
        `Morning: Explore local attractions in ${destination}`,
        `Afternoon: Visit popular landmarks`,
        `Evening: Enjoy local cuisine`
      ]
    });
  }
  
  return {
    id: `trip-${Date.now()}`,
    destination,
    budget,
    duration,
    description: `Discover the wonders of ${destination} on this ${duration}-day adventure.`,
    highlights: ['Local cuisine', 'Cultural experiences', 'Historical landmarks'],
    days
  };
};
