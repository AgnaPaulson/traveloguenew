
import React from "react";
import { MapPin, Calendar, DollarSign, Star } from "lucide-react";

interface TripCardProps {
  image: string;
  title: string;
  location: string;
  days: number;
  price: number;
  rating: number;
}

const TripCard: React.FC<TripCardProps> = ({
  image,
  title,
  location,
  days,
  price,
  rating,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm py-1 px-2 rounded-full flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-travel-secondary mb-2 line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-travel-primary mr-1 flex-shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{location}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{days} days</span>
          </div>
          
          <div className="flex items-center font-medium text-travel-secondary">
            <DollarSign className="h-4 w-4 text-travel-primary mr-1" />
            <span>{price.toLocaleString()}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 py-2 bg-travel-light text-travel-primary rounded-lg font-medium hover:bg-travel-primary hover:text-white transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TripCard;
