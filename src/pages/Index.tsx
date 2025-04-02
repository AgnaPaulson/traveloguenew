
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PopularTripsSection from "../components/sections/PopularTripsSection";
import MapSection from "../components/sections/MapSection";
import FinanceSection from "../components/sections/FinanceSection";
import PhotoSection from "../components/sections/PhotoSection";
import Footer from "../components/sections/Footer";

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
        <PopularTripsSection 
          trips={filteredTrips} 
          onFilterChange={handleFilterChange} 
        />
        
        {/* Map View Section */}
        <MapSection />
        
        {/* Finance Tracking Section */}
        <FinanceSection />
        
        {/* Photo Album Section */}
        <PhotoSection />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
