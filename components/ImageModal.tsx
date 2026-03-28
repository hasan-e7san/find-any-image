// components/ImageModal.tsx
"use client";

import React, { useState } from "react";
import { X, ExternalLink, Download, Heart, HeartOff } from "lucide-react";
import { ImageResult } from "@/lib/search";
import { useSession } from "next-auth/react";

interface ImageModalProps {
  image: ImageResult | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (image: ImageResult) => void;
}

export default function ImageModal({ image, onClose, isFavorite, onToggleFavorite }: ImageModalProps) {
  if (!image) return null;

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    window.open(image.originalImageUrl, "_blank");
  };

  const handleToggleFavorite = async () => {
    if (!session) {
      alert("Please login to save favorites");
      return;
    }
    if (onToggleFavorite) {
      onToggleFavorite(image);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex-grow bg-gray-100 flex items-center justify-center overflow-hidden min-h-[300px]">
          <img
            src={image.originalImageUrl}
            alt={image.title}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>

        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-white border-l border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{image.title}</h2>
            <p className="text-sm text-gray-500 mb-6">Source: {image.sourceDomain}</p>

            <div className="space-y-3">
              <a
                href={image.sourcePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                Visit Page
              </a>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Original Image
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all ${
                isFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isFavorite ? (
                <>
                  <HeartOff size={18} className="mr-2" />
                  Remove from Favorites
                </>
              ) : (
                <>
                  <Heart size={18} className="mr-2" />
                  Save to Favorites
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
