
import React from "react";
import { Compass } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t pt-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-travel-secondary flex items-center">
            <Compass className="h-5 w-5 text-travel-primary mr-2" />
            Travelogue
          </h3>
          <p className="text-gray-500 mt-2">
            Your ultimate travel companion
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-travel-primary transition-colors">
            About
          </a>
          <a href="#" className="text-gray-500 hover:text-travel-primary transition-colors">
            Features
          </a>
          <a href="#" className="text-gray-500 hover:text-travel-primary transition-colors">
            Contact
          </a>
        </div>
      </div>
      
      <div className="text-center mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Travelogue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
