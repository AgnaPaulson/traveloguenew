import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoViewerProps {
  photos: Array<{
    id: string;
    url: string;
    title: string;
    location?: string;
  }>;
  initialIndex: number;
  onClose: () => void;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={handlePrevious}
          className="absolute left-4 text-white hover:text-gray-300 z-10"
        >
          <ChevronLeft className="h-12 w-12" />
        </button>

        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-h-[80vh] w-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-medium">{currentPhoto.title}</h3>
              {currentPhoto.location && (
                <p className="text-sm text-gray-300">{currentPhoto.location}</p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 text-white hover:text-gray-300 z-10"
        >
          <ChevronRight className="h-12 w-12" />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoViewer; 