import React from 'react';

interface GalleryGridProps {
  images: string[];
  mainImage?: string;
  onImageClick: (image: string) => void;
  aspectRatio?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  mainImage,
  onImageClick,
  aspectRatio = 'aspect-video',
}) => {
  const allImages = mainImage ? [mainImage, ...images] : images;

  if (allImages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {allImages.map((img, i) => (
        <div
          key={`${img}-${i}`}
          onClick={() => onImageClick(img)}
          className={`relative rounded-3xl overflow-hidden border border-white/10 ${aspectRatio} group cursor-zoom-in hover:border-primary/50 transition-colors`}
        >
          <img
            src={img}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={`Gallery ${i + 1}`}
          />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">zoom_in</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
