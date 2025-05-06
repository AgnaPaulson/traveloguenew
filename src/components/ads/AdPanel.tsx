
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AdPanel: React.FC = () => {
  return (
    <Card className="border-2 border-travel-primary shadow-lg mb-6 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Travel Promotion" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white text-xl font-bold mb-1">Special Summer Offer</h3>
            <p className="text-white/90 text-sm mb-2">Book now and get 20% off on your next adventure</p>
            <button className="bg-travel-primary hover:bg-travel-dark text-white font-medium py-2 px-4 rounded-md text-sm transition-colors w-fit">
              Learn More
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdPanel;
