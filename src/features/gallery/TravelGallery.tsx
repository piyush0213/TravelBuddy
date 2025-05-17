import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { Image, X, Plus, MapPin, Calendar } from 'lucide-react';
import { GalleryImage } from '../../types';

const TravelGallery: React.FC = () => {
  const { galleryImages } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const handleOpenModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  
  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image className="text-teal-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Travel Gallery</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<Plus size={16} />}
            >
              Add Photos
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map(image => (
                <div 
                  key={image.id}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100"
                  onClick={() => handleOpenModal(image)}
                >
                  <img 
                    src={image.url} 
                    alt={image.description} 
                    className="w-full h-60 object-cover group-hover:opacity-90 transition-opacity duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 p-3 text-white">
                      <h3 className="font-medium line-clamp-2">{image.description}</h3>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{image.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-md">
              <Image size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No photos yet</h3>
              <p className="text-gray-400 mb-6">Add photos from your travels to create a gallery</p>
              <Button
                variant="primary"
                icon={<Plus size={16} />}
              >
                Upload Photos
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800">{selectedImage.description}</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.description} 
                    className="w-full object-contain rounded-md"
                  />
                </div>
                
                <div className="md:w-1/3 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                    <p className="text-gray-800">{selectedImage.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                    <div className="flex items-center text-gray-800">
                      <MapPin size={16} className="mr-1 text-teal-600" />
                      <span>{selectedImage.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                    <div className="flex items-center text-gray-800">
                      <Calendar size={16} className="mr-1 text-teal-600" />
                      <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelGallery;