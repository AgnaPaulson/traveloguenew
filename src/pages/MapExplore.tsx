import React from 'react';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MapExplore: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: "Paris, France",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
      description: "City of lights and romance"
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
      description: "Modern metropolis meets tradition"
    },
    {
      id: 3,
      name: "Santorini, Greece",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop",
      description: "Beautiful island paradise"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-travel-secondary mb-2">Explore Destinations</h1>
        <p className="text-travel-secondary/70">Discover amazing places around the world</p>
      </div>

      <div className="mb-8 flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search destinations..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="whitespace-nowrap">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-travel-secondary">
                <span>{destination.name}</span>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {destination.rating}
                </div>
              </CardTitle>
              <CardDescription>{destination.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapExplore;