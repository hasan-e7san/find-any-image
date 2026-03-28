// components/ImageGrid.tsx
"use client";

import React from "react";
import ImageCard from "./ImageCard";
import { ImageResult } from "@/lib/search";
import { useI18n } from "./LanguageProvider";

interface ImageGridProps {
  images: ImageResult[];
  onImageClick: (image: ImageResult) => void;
  loading?: boolean;
}

export default function ImageGrid({ images, onImageClick, loading }: ImageGridProps) {
  const { t } = useI18n();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">{t.imageGrid.empty}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard 
          key={image.id} 
          image={image} 
          onClick={onImageClick} 
        />
      ))}
    </div>
  );
}
