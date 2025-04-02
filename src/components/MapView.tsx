
import React, { useState } from "react";
import { MapPin, Hotel, Navigation, Search } from "lucide-react";

const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a destination"
              className="py-2 pl-10 pr-4 block w-full border rounded-md focus:ring-travel-primary focus:border-travel-primary"
            />
          </div>
          <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary">
            <Navigation className="h-4 w-4 mr-2" />
            Locate
          </button>
        </div>
      </div>
      
      {/* Map Container (placeholder) */}
      <div className="map-container relative">
        {/* This would typically be replaced with an actual map implementation using Google Maps or similar */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-travel-primary" />
            <p className="text-lg font-medium">Map View</p>
            <p className="text-sm">Google Maps integration will appear here</p>
          </div>
        </div>
        
        {/* Example pins to simulate map markers */}
        <div className="absolute top-1/4 left-1/3">
          <div className="relative">
            <MapPin className="h-8 w-8 text-travel-primary" />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded-md shadow-md text-sm whitespace-nowrap">
              Central Park
            </div>
          </div>
        </div>
        
        <div className="absolute top-1/2 left-2/3">
          <div className="relative">
            <Hotel className="h-8 w-8 text-orange-500" />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded-md shadow-md text-sm whitespace-nowrap">
              Grand Hotel
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <h3 className="font-medium text-lg mb-3">Nearby Hotels</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="h-12 w-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                <Hotel className="h-6 w-6 text-travel-primary" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="font-medium text-travel-secondary">Hotel Example {i}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>0.{i} miles away</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-travel-primary">${80 + i * 20}</div>
                <div className="text-sm text-gray-500">per night</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
