// components/ImageCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ImageResult } from "@/lib/search";

interface ImageCardProps {
  image: ImageResult;
  onClick: (image: ImageResult) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]"
      onClick={() => onClick(image)}
    >
      <img
        src={image.thumbnailUrl}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
        <p className="text-white text-sm font-medium truncate">{image.title}</p>
        <p className="text-gray-300 text-xs truncate">{image.sourceDomain}</p>
      </div>
    </div>
  );
}
