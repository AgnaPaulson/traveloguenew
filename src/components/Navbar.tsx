import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Compass, Camera, CreditCard, BookOpen, LogOut, User } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

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
            {user ? (
              <div className="flex items-center">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
