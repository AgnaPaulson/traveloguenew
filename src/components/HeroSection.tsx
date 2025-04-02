
import React from "react";
import { Search, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-travel-secondary to-travel-primary">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          opacity: 0.6,
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Your Journey, Your Story
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 animate-slide-up">
            Plan, track, and document your adventures with the ultimate travel companion app
          </p>
          
          {/* Search bar */}
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg max-w-2xl mx-auto flex animate-slide-up">
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full flex-1">
              <MapPin className="h-5 w-5 text-travel-primary mr-2" />
              <input
                type="text"
                placeholder="Where to next?"
                className="bg-transparent outline-none flex-1 text-travel-secondary"
              />
            </div>
            <button className="ml-2 bg-travel-primary text-white px-6 py-3 rounded-full font-medium hover:bg-travel-dark transition-colors flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
