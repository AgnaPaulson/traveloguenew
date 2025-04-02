
import React from "react";
import TripCard from "../TripCard";
import BudgetFilter from "../BudgetFilter";

interface TripData {
  id: number;
  image: string;
  title: string;
  location: string;
  days: number;
  price: number;
  rating: number;
}

interface PopularTripsSectionProps {
  trips: TripData[];
  onFilterChange: (min: number, max: number) => void;
}

const PopularTripsSection: React.FC<PopularTripsSectionProps> = ({ trips, onFilterChange }) => {
  return (
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
        <BudgetFilter onFilterChange={onFilterChange} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
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
        
        {trips.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">
              No trips found matching your budget criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTripsSection;
