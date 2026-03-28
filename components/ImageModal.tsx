// components/ImageModal.tsx
"use client";

import React from "react";
import clsx from "clsx";
import { X, ExternalLink, Download, Heart, HeartOff } from "lucide-react";
import { ImageResult } from "@/lib/search";
import { useSession } from "next-auth/react";
import { useI18n } from "./LanguageProvider";

interface ImageModalProps {
  image: ImageResult | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (image: ImageResult) => void;
}

export default function ImageModal({ image, onClose, isFavorite, onToggleFavorite }: ImageModalProps) {
  const { data: session } = useSession();
  const { dir, t } = useI18n();
  const isRtl = dir === "rtl";

  if (!image) return null;

  const handleDownload = () => {
    window.open(image.originalImageUrl, "_blank");
  };

  const handleToggleFavorite = async () => {
    if (!session) {
      alert(t.imageModal.loginRequired);
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
          className={clsx(
            "absolute top-4 z-10 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-100",
            isRtl ? "left-4" : "right-4",
          )}
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

        <div
          className={clsx(
            "flex w-full flex-col justify-between bg-white p-6 md:w-80",
            isRtl ? "border-t border-gray-100 md:border-r md:border-t-0" : "border-t border-gray-100 md:border-l md:border-t-0",
          )}
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{image.title}</h2>
            <p className="mb-6 text-sm text-gray-500">
              {t.imageModal.source}: {image.sourceDomain}
            </p>

            <div className="space-y-3">
              <a
                href={image.sourcePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink size={16} className={clsx(isRtl ? "ml-2" : "mr-2")} />
                {t.imageModal.visitPage}
              </a>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Download size={16} className={clsx(isRtl ? "ml-2" : "mr-2")} />
                {t.imageModal.originalImage}
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
                  <HeartOff size={18} className={clsx(isRtl ? "ml-2" : "mr-2")} />
                  {t.imageModal.removeFromFavorites}
                </>
              ) : (
                <>
                  <Heart size={18} className={clsx(isRtl ? "ml-2" : "mr-2")} />
                  {t.imageModal.saveToFavorites}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
