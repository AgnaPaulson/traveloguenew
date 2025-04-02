
import React from "react";
import MapView from "../MapView";
import { Globe } from "lucide-react";
import ReportGenerator from "../ReportGenerator";

const MapSection: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-travel-secondary mb-2 flex items-center">
          <Globe className="h-6 w-6 mr-2 text-travel-primary" />
          Explore Destinations
        </h2>
        <p className="text-gray-600">
          Find amazing locations and nearby hotels
        </p>
      </div>
      
      <ReportGenerator />
      
      <MapView />
    </section>
  );
};

export default MapSection;
