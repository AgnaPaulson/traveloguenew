import { model, chatModel } from '../config/gemini';

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

export const generateTravelResponse = async (query: TravelQuery) => {
  try {
    const prompt = `As a travel expert, provide detailed information about ${query.destination || 'travel destinations'}.
    ${query.duration ? `Consider a trip duration of ${query.duration}.` : ''}
    ${query.interests?.length ? `Focus on activities related to: ${query.interests.join(', ')}.` : ''}
    ${query.budget ? `Within a budget of ${query.budget}.` : ''}
    Include:
    1. Best places to visit
    2. Local customs and tips
    3. Recommended activities
    4. Budget breakdown
    5. Travel tips`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating travel response:', error);
    throw error;
  }
};

export const sendChatMessage = async (message: string) => {
  try {
    const result = await chatModel.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}; 