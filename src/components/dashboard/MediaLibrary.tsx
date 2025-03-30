
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ImageItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

interface MediaLibraryProps {
  images: ImageItem[];
}

const MediaLibrary = ({ images }: MediaLibraryProps) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Media Library</h2>
      
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Upload Media</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop files here or click to browse
          </p>
          <input
            type="file"
            className="hidden"
            id="media-upload"
            onChange={() => {
              toast({
                title: "Feature is simulated",
                description: "This demo uses localStorage and can't store actual files.",
              });
            }}
          />
          <button
            onClick={() => document.getElementById('media-upload')?.click()}
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Select Files
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="bg-card rounded-lg overflow-hidden border">
              <div className="bg-muted h-40 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4">
                <p className="font-medium truncate">{image.name}</p>
                <p className="text-sm text-muted-foreground">{new Date(image.uploadedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No media items found. Upload images to see them here.
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
