import React from 'react';
import { Plus, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Trips: React.FC = () => {
  const trips = [
    {
      id: 1,
      title: "European Adventure",
      destination: "Paris, Rome, Barcelona",
      dates: "June 15-30, 2024",
      duration: "15 days",
      status: "Planned"
    },
    {
      id: 2,
      title: "Asian Explorer",
      destination: "Tokyo, Seoul, Bangkok",
      dates: "September 10-25, 2024",
      duration: "16 days",
      status: "Draft"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-travel-secondary">Trip Plans</h1>
          <p className="text-travel-secondary/70 mt-2">Plan and organize your travel adventures</p>
        </div>
        <Button className="bg-travel-primary hover:bg-travel-dark">
          <Plus className="h-4 w-4 mr-2" />
          New Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Card key={trip.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl text-travel-secondary">{trip.title}</CardTitle>
              <CardDescription className="flex items-center text-travel-secondary/70">
                <MapPin className="h-4 w-4 mr-1" />
                {trip.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-travel-secondary/70">
                  <Calendar className="h-4 w-4 mr-2" />
                  {trip.dates}
                </div>
                <div className="flex items-center text-sm text-travel-secondary/70">
                  <Clock className="h-4 w-4 mr-2" />
                  {trip.duration}
                </div>
                <div className="mt-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trip.status === 'Planned' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trip.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trips;