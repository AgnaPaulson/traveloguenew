
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Compass, Camera, CreditCard, BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-travel-primary" />
            <span className="text-2xl font-bold text-travel-secondary">
              Travelogue
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-travel-secondary hover:text-travel-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/trips" className="text-travel-secondary hover:text-travel-primary transition-colors font-medium">
              Trip Plans
            </Link>
            <Link to="/map" className="text-travel-secondary hover:text-travel-primary transition-colors font-medium">
              Explore
            </Link>
            <Link to="/finances" className="text-travel-secondary hover:text-travel-primary transition-colors font-medium">
              Finance
            </Link>
            <Link to="/album" className="text-travel-secondary hover:text-travel-primary transition-colors font-medium">
              Photos
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2 bg-travel-primary text-white rounded-full shadow-md hover:bg-travel-dark transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
