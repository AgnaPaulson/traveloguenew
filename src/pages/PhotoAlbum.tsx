import React from 'react';
import { Upload, Search, Grid, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PhotoAlbum: React.FC = () => {
  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      location: "Paris, France",
      date: "June 2024"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      location: "Tokyo, Japan",
      date: "March 2024"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      location: "Santorini, Greece",
      date: "August 2023"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      location: "Swiss Alps",
      date: "December 2023"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      location: "Bali, Indonesia",
      date: "February 2024"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      location: "Amazon Rainforest",
      date: "May 2024"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-travel-secondary">Photo Album</h1>
          <p className="text-travel-secondary/70 mt-2">Capture and organize your travel memories</p>
        </div>
        <Button className="bg-travel-primary hover:bg-travel-dark">
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </div>

      <div className="mb-8 flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search photos by location or date..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Grid className="h-4 w-4 mr-2" />
          Grid View
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Timeline
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square overflow-hidden">
              <img 
                src={photo.url} 
                alt={photo.location}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm text-travel-secondary">{photo.location}</p>
              <p className="text-xs text-travel-secondary/70">{photo.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhotoAlbum;