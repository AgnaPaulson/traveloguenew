
import React from "react";
import PhotoAlbum from "../PhotoAlbum";
import { Camera } from "lucide-react";

const PhotoSection: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-travel-secondary mb-2 flex items-center">
          <Camera className="h-6 w-6 mr-2 text-travel-primary" />
          Travel Memories
        </h2>
        <p className="text-gray-600">
          Capture and share your travel experiences
        </p>
      </div>
      
      <PhotoAlbum />
    </section>
  );
};

export default PhotoSection;
