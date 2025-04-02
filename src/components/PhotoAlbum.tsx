
import React, { useState } from "react";
import { 
  Image, 
  Camera, 
  Map, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Plus 
} from "lucide-react";

interface Photo {
  id: number;
  url: string;
  location: string;
  date: string;
  description: string;
}

const samplePhotos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    location: "Swiss Alps",
    date: "2023-06-15",
    description: "Beautiful view from the mountain top",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7",
    location: "Venice, Italy",
    date: "2023-05-22",
    description: "Gondola ride through the canals",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    location: "Bali, Indonesia",
    date: "2023-04-10",
    description: "Relaxing at the beach",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1519922639192-e73293ca430e",
    location: "Grand Canyon, USA",
    date: "2023-03-05",
    description: "The view was breathtaking!",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    location: "Kyoto, Japan",
    date: "2023-02-14",
    description: "Cherry blossoms in full bloom",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    location: "Paris, France",
    date: "2023-01-22",
    description: "Eiffel Tower at sunset",
  },
];

const PhotoAlbum: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const openPhotoViewer = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };
  
  const closePhotoViewer = () => {
    setSelectedPhoto(null);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    setSelectedPhoto(photos[currentIndex === 0 ? photos.length - 1 : currentIndex - 1]);
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    setSelectedPhoto(photos[currentIndex === photos.length - 1 ? 0 : currentIndex + 1]);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-travel-secondary flex items-center">
          <Camera className="h-6 w-6 text-travel-primary mr-2" />
          Travel Photo Album
        </h2>
        <button className="flex items-center bg-travel-primary text-white px-3 py-1 rounded-md">
          <Plus className="h-4 w-4 mr-1" />
          Add Photos
        </button>
      </div>
      
      <div className="p-4 md:p-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div 
              key={photo.id}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openPhotoViewer(photo, index)}
            >
              <img 
                src={`${photo.url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                alt={photo.description}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h3 className="text-white font-medium truncate">{photo.location}</h3>
                <p className="text-white/80 text-sm truncate">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={closePhotoViewer}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={`${selectedPhoto.url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`}
                  alt={selectedPhoto.description}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                <button 
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-2 hover:bg-white/50 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                
                <button 
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-2 hover:bg-white/50 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-3 mb-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    <Map className="h-3 w-3 mr-1 text-travel-primary" />
                    {selectedPhoto.location}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-travel-primary" />
                    {selectedPhoto.date}
                  </div>
                </div>
                
                <p className="text-gray-700">{selectedPhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAlbum;
