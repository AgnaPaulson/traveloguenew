import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TripCard from "../components/TripCard";
import BudgetFilter from "../components/BudgetFilter";
import MapView from "../components/MapView";
import FinanceTracker from "../components/FinanceTracker";
import PhotoAlbum from "../components/PhotoAlbum";
import { Globe, Landmark, MapPin, CreditCard, Camera, Compass } from "lucide-react";

const Index = () => {
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  
  const tripData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Italian Adventure",
      location: "Rome, Italy",
      days: 7,
      price: 1299,
      rating: 4.8,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Tropical Paradise",
      location: "Bali, Indonesia",
      days: 10,
      price: 1899,
      rating: 4.9,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "City Explorer",
      location: "New York, USA",
      days: 5,
      price: 999,
      rating: 4.7,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Cultural Immersion",
      location: "Kyoto, Japan",
      days: 8,
      price: 2199,
      rating: 4.9,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1533647326420-d4097513dc42?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Beach Retreat",
      location: "Santorini, Greece",
      days: 6,
      price: 1499,
      rating: 4.8,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Mountain Escape",
      location: "Interlaken, Switzerland",
      days: 7,
      price: 1699,
      rating: 4.7,
    },
  ];
  
  const filteredTrips = tripData.filter(
    (trip) => trip.price >= minBudget && trip.price <= maxBudget
  );
  
  const handleFilterChange = (min: number, max: number) => {
    setMinBudget(min);
    setMaxBudget(max);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Popular Trips Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-travel-secondary mb-2">
                Popular Trip Plans
              </h2>
              <p className="text-gray-600">
                Discover our most popular travel experiences
              </p>
            </div>
            <BudgetFilter onFilterChange={handleFilterChange} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                image={trip.image}
                title={trip.title}
                location={trip.location}
                days={trip.days}
                price={trip.price}
                rating={trip.rating}
              />
            ))}
            
            {filteredTrips.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 text-lg">
                  No trips found matching your budget criteria.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Map View Section */}
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
          
          <MapView />
        </section>
        
        {/* Finance Tracking Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-travel-secondary mb-2 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-travel-primary" />
              Finances Tracker
            </h2>
            <p className="text-gray-600">
              Keep track of your travel expenses
            </p>
          </div>
          
          <FinanceTracker />
        </section>
        
        {/* Photo Album Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-travel-secondary mb-2 flex items-center">
              <Camera className="h-6 w-6 mr-2 text-travel-primary" />
              Travel Memories
            </h2>
            <p className="text-gray-600">
              Capture and share your travel experiences
            </p>
          </div>
          
          <PhotoAlbum />
        </section>
        
        {/* Footer */}
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
      </div>
    </div>
  );
};

export default Index;
