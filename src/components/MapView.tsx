import React, { useState, useCallback, useRef } from "react";
import { MapPin, Hotel, Navigation, Search } from "lucide-react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 40.7128,
  lng: -74.0060, // New York coordinates as default
};

const hotels = [
  {
    id: 1,
    name: "Grand Hotel",
    position: { lat: 40.7589, lng: -73.9851 },
    price: 100,
    distance: 0.1,
  },
  {
    id: 2,
    name: "Luxury Suites",
    position: { lat: 40.7549, lng: -73.9840 },
    price: 120,
    distance: 0.2,
  },
  {
    id: 3,
    name: "City View Hotel",
    position: { lat: 40.7529, lng: -73.9870 },
    price: 140,
    distance: 0.3,
  },
];

const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const mapRef = useRef<google.maps.Map>();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleSearch = () => {
    if (!searchQuery) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results && results[0] && mapRef.current) {
        const { location } = results[0].geometry;
        mapRef.current.panTo({ lat: location.lat(), lng: location.lng() });
        mapRef.current.setZoom(13);
      }
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a destination"
              className="py-2 pl-10 pr-4 block w-full border rounded-md focus:ring-travel-primary focus:border-travel-primary"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Locate
          </button>
        </div>
      </div>
      
      <div className="map-container relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          onLoad={onMapLoad}
        >
          {hotels.map((hotel) => (
            <Marker
              key={hotel.id}
              position={hotel.position}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/hotel.png",
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              onClick={() => setSelectedHotel(hotel)}
            />
          ))}

          {selectedHotel && (
            <InfoWindow
              position={selectedHotel.position}
              onCloseClick={() => setSelectedHotel(null)}
            >
              <div>
                <h3 className="font-medium">{selectedHotel.name}</h3>
                <p className="text-sm text-gray-600">${selectedHotel.price} per night</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      
      <div className="p-4 border-t">
        <h3 className="font-medium text-lg mb-3">Nearby Hotels</h3>
        <div className="space-y-3">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id} 
              className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => {
                setSelectedHotel(hotel);
                mapRef.current?.panTo(hotel.position);
              }}
            >
              <div className="h-12 w-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                <Hotel className="h-6 w-6 text-travel-primary" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="font-medium text-travel-secondary">{hotel.name}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{hotel.distance} miles away</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-travel-primary">${hotel.price}</div>
                <div className="text-sm text-gray-500">per night</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
