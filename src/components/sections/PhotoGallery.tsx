import React, { useState, useCallback } from 'react';
import { Upload, Image, Trash2, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PhotoViewer from '../PhotoViewer';

interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  location?: string;
}

const PhotoGallery: React.FC = () => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    setIsUploading(true);
    // TODO: Implement actual file upload to Firebase Storage
    // For now, we'll just create mock data
    const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      title: file.name,
      date: new Date().toISOString(),
      location: 'Unknown Location'
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
    setIsUploading(false);
  }, [user]);

  const handleDelete = useCallback((id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  }, []);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handlePhotoClick = useCallback((index: number) => {
    setSelectedPhotoIndex(index);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-travel-secondary">Photo Gallery</h2>
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </label>
          </div>
        </div>

        {isUploading && (
          <div className="mb-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-travel-primary mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Uploading photos...</p>
          </div>
        )}

        {photos.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No photos yet</h3>
            <p className="mt-1 text-sm text-gray-500">Upload your travel photos to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div key={photo.id} className="group relative">
                <div 
                  className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 cursor-pointer"
                  onClick={() => handlePhotoClick(index)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="object-cover w-full h-full group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{photo.title}</h3>
                  <p className="text-xs text-gray-500">{photo.location}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(photo.url, photo.title);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      title="Download"
                    >
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(photo.id);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPhotoIndex !== null && (
          <PhotoViewer
            photos={photos}
            initialIndex={selectedPhotoIndex}
            onClose={() => setSelectedPhotoIndex(null)}
          />
        )}
      </div>
    </section>
  );
};

export default PhotoGallery; 