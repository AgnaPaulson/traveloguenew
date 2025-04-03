import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatBot from './ChatBot';

const ChatBotButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-travel-primary text-white rounded-full shadow-lg hover:bg-travel-dark transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatBotButton; 