
import { auth } from '../config/firebase';
import { toast } from 'sonner';

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    // Check if user is authenticated
    if (!auth.currentUser) {
      throw new Error('User must be logged in to send messages');
    }

    // Here you would typically implement your chat service
    // This is a placeholder implementation that returns mock responses
    console.log('Sending message:', message);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a simple response
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
  } else {
    return "That's a great question about travel! Would you like recommendations for destinations, accommodations, activities, or budget planning?";
  }
};
