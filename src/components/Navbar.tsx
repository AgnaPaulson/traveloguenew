
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Compass, 
  Camera, 
  CreditCard, 
  BookOpen, 
  LogOut, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
          
          {/* Desktop Navigation */}
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-travel-secondary p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
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
              <Link
                to="/login"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-travel-secondary hover:text-travel-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/trips" 
                className="text-travel-secondary hover:text-travel-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trip Plans
              </Link>
              <Link 
                to="/map" 
                className="text-travel-secondary hover:text-travel-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/finances" 
                className="text-travel-secondary hover:text-travel-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Finance
              </Link>
              <Link 
                to="/album" 
                className="text-travel-secondary hover:text-travel-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Photos
              </Link>
              
              {/* Mobile login/profile section */}
              {user ? (
                <div className="flex flex-col space-y-3 pt-2 border-t">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700 truncate max-w-[200px]">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
