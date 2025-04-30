import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";

interface ImageSectionProps {
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  uploadedImages,
  setUploadedImages,
}) => {
  const handleImageUpload = () => {
    // Mock image upload - in a real app, this would handle file selection and upload
    const newImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setUploadedImages([...uploadedImages, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-xl font-semibold mb-4">Profile Images</h2>
      <p className="text-muted-foreground mb-4">
        Upload at least 2 photos of yourself (maximum 6)
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative group">
            <Avatar className="w-full h-32 rounded-md">
              <AvatarImage
                src={image}
                alt="Profile photo"
                className="object-cover"
              />
              <AvatarFallback>Photo</AvatarFallback>
            </Avatar>
            <button
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveImage(index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {uploadedImages.length < 6 && (
          <button
            onClick={handleImageUpload}
            className="w-full h-32 border-2 border-dashed border-muted-foreground rounded-md flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <Upload size={24} />
            <span className="mt-2 text-sm">Upload Photo</span>
          </button>
        )}
      </div>

      {uploadedImages.length < 2 ? (
        <p className="text-red-500 text-sm mt-4">
          Please upload at least 2 photos to complete this section.
        </p>
      ) : (
        <p className="text-green-500 text-sm mt-4">
          Great! This section is complete.
        </p>
      )}
    </div>
  );
};

export default ImageSection;
