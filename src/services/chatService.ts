
import { toast } from 'sonner';

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface TravelQuery {
  destination?: string;
  duration?: string;
  interests?: string[];
  budget?: string;
}

// This is a fallback implementation that doesn't require an API key
export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    console.log('Sending message:', message);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a response using the local implementation
    return generateTravelResponse(message);
  } catch (error: any) {
    console.error('Error sending chat message:', error);
    toast.error(error.message || 'Failed to send message');
    throw error;
  }
};

export const generateTravelResponse = (message: string): string => {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return "Hello there! How can I help plan your travels today?";
  } else if (lowercaseMessage.includes('destination') || lowercaseMessage.includes('where')) {
    return "Some popular destinations include Paris, Tokyo, New York, and Bali. What type of experience are you looking for?";
  } else if (lowercaseMessage.includes('budget') || lowercaseMessage.includes('cost')) {
    return "Budget planning is important! For a week's trip, consider approximately $1500-$3000 depending on the destination. Would you like budget tips for a specific location?";
  } else if (lowercaseMessage.includes('hotel') || lowercaseMessage.includes('stay')) {
    return "For accommodations, you can choose from hotels, hostels, vacation rentals, or unique options like treehouses and glamping. What's your preference?";
  } else if (lowercaseMessage.includes('flight') || lowercaseMessage.includes('fly')) {
    return "For the best flight deals, try booking 3-4 months in advance and consider midweek travel dates. Would you like tips for a specific route?";
  } else if (lowercaseMessage.includes('food') || lowercaseMessage.includes('eat')) {
    return "Local cuisine is a great way to experience a destination! Try researching traditional dishes and ask locals for restaurant recommendations. Any specific cuisine you're interested in?";
  } else if (lowercaseMessage.includes('activity') || lowercaseMessage.includes('do')) {
    return "Activities vary by destination - from museum tours in Paris to snorkeling in Bali. What types of activities interest you most?";
  } else if (lowercaseMessage.includes('travel') || lowercaseMessage.includes('trip')) {
    return "Planning a trip? I'd recommend starting with choosing a destination that matches your interests, then figuring out the logistics like transportation and accommodation. What kind of travel experience are you looking for?";
  } else if (lowercaseMessage.includes('weather') || lowercaseMessage.includes('climate')) {
    return "Weather can significantly impact your travel experience. Research the climate of your destination before booking. Most destinations have peak and off-seasons based on weather patterns. When are you planning to travel?";
  } else {
    return "That's a great question about travel! Would you like recommendations for destinations, accommodations, activities, or budget planning?";
  }
};
