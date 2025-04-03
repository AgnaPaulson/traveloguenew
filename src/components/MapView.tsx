
import React, { useState, useCallback, useRef, useEffect } from "react";
import { MapPin, Hotel, Navigation, Search, Coffee, Utensils, Camera, Beer, Mountain, Tent } from "lucide-react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Input } from "./ui/input";
import { toast } from "sonner";

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

const libraries = ["places"];

interface Place {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  rating?: number;
  types?: string[];
  vicinity?: string;
  icon?: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  restaurant: <Utensils className="h-4 w-4" />,
  cafe: <Coffee className="h-4 w-4" />,
  bar: <Beer className="h-4 w-4" />,
  lodging: <Hotel className="h-4 w-4" />,
  tourist_attraction: <Camera className="h-4 w-4" />,
  park: <Mountain className="h-4 w-4" />,
  campground: <Tent className="h-4 w-4" />,
};

const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<google.maps.Map>();
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries as any,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    placesServiceRef.current = new google.maps.places.PlacesService(map);
  }, []);

  // Search for location and nearby places
  const handleSearch = () => {
    if (!searchQuery || !isLoaded) return;
    
    setIsLoading(true);
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results && results[0] && mapRef.current) {
        const { location } = results[0].geometry;
        const newLocation = { lat: location.lat(), lng: location.lng() };
        
        setCurrentLocation(newLocation);
        mapRef.current.panTo(newLocation);
        mapRef.current.setZoom(14);
        
        // Search for cool places nearby
        findNearbyPlaces(newLocation);
        toast.success(`Found ${searchQuery}! Discovering nearby attractions...`);
      } else {
        toast.error("Couldn't find that location. Please try again.");
        setIsLoading(false);
      }
    });
  };

  // Find nearby interesting places
  const findNearbyPlaces = (location: { lat: number; lng: number }) => {
    if (!placesServiceRef.current) {
      setIsLoading(false);
      return;
    }

    const request = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: 5000, // 5km radius
      type: ['tourist_attraction', 'restaurant', 'park', 'museum', 'bar', 'lodging'],
      rankBy: google.maps.places.RankBy.PROMINENCE,
    };

    placesServiceRef.current.nearbySearch(
      request as google.maps.places.PlaceSearchRequest,
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Process and map the results
          const places: Place[] = results.slice(0, 10).map(place => ({
            id: place.place_id || Math.random().toString(),
            name: place.name || 'Unknown Place',
            position: { 
              lat: place.geometry?.location?.lat() || 0, 
              lng: place.geometry?.location?.lng() || 0 
            },
            rating: place.rating,
            types: place.types as string[],
            vicinity: place.vicinity,
            icon: place.icon,
          }));
          
          setNearbyPlaces(places);
        } else {
          setNearbyPlaces([]);
          toast.info("No notable attractions found nearby.");
        }
        setIsLoading(false);
      }
    );
  };

  // Get the icon for the place based on its type
  const getPlaceIcon = (place: Place) => {
    if (!place.types || place.types.length === 0) {
      return <MapPin className="h-4 w-4" />;
    }

    for (const type of place.types) {
      if (typeIcons[type]) {
        return typeIcons[type];
      }
    }
    
    return <MapPin className="h-4 w-4" />;
  };

  // Handle enter key press for search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loadError) return <div className="p-4 bg-red-50 text-red-500 rounded-lg">Error loading maps. Please check your API key and try again.</div>;
  if (!isLoaded) return <div className="p-4 text-center">Loading maps...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a destination"
              className="py-2 pl-10 pr-4 block w-full"
              disabled={isLoading}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
            disabled={isLoading}
          >
            {isLoading ? 
              "Searching..." : 
              <>
                <Navigation className="h-4 w-4 mr-2" />
                Discover
              </>
            }
          </button>
        </div>
      </div>
      
      <div className="map-container relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={currentLocation}
          onLoad={onMapLoad}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          }}
        >
          {/* Current location marker */}
          <Marker
            position={currentLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          />

          {/* Nearby places markers */}
          {nearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={place.position}
              onClick={() => setSelectedPlace(place)}
              icon={{
                url: place.types?.includes("lodging") 
                  ? "https://maps.google.com/mapfiles/ms/icons/hotel.png" 
                  : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(36, 36),
              }}
            />
          ))}

          {/* Info window for selected place */}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.position}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-2">
                <h3 className="font-medium text-travel-secondary">{selectedPlace.name}</h3>
                {selectedPlace.rating && (
                  <p className="text-sm text-gray-600">
                    Rating: {selectedPlace.rating} ★
                  </p>
                )}
                {selectedPlace.vicinity && (
                  <p className="text-xs text-gray-500 mt-1">{selectedPlace.vicinity}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      
      <div className="p-4 border-t">
        <h3 className="font-medium text-lg mb-3">
          {nearbyPlaces.length > 0 ? "Cool Places Nearby" : "Search for a location to find cool places"}
        </h3>
        
        {isLoading ? (
          <div className="text-center py-4">Loading nearby attractions...</div>
        ) : (
          <div className="space-y-3">
            {nearbyPlaces.map((place) => (
              <div 
                key={place.id} 
                className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedPlace(place);
                  mapRef.current?.panTo(place.position);
                }}
              >
                <div className="h-12 w-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-travel-primary">
                  {getPlaceIcon(place)}
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="font-medium text-travel-secondary">{place.name}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{place.vicinity || "Nearby"}</span>
                  </div>
                </div>
                {place.rating && (
                  <div className="text-right">
                    <div className="font-medium text-travel-primary">{place.rating} ★</div>
                    <div className="text-sm text-gray-500">rating</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {nearbyPlaces.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-4">
            Search for a destination to discover amazing places nearby!
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
