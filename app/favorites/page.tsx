// app/favorites/page.tsx
"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";
import { useI18n } from "@/components/LanguageProvider";
import { ImageResult } from "@/lib/search";
import { Heart } from "lucide-react";

type FavoriteRecord = {
  id: string;
  title: string;
  thumbnailUrl: string;
  originalImageUrl: string;
  sourcePageUrl: string;
  sourceDomain: string;
};

export default function FavoritesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const { t } = useI18n();

  const fetchFavorites = useEffectEvent(async () => {
    try {
      const response = await fetch("/api/favorites");
      const data = (await response.json()) as FavoriteRecord[];
      if (Array.isArray(data)) {
        // Map database records back to ImageResult format
        const mapped = data.map((fav) => ({
          id: fav.id,
          title: fav.title,
          thumbnailUrl: fav.thumbnailUrl,
          originalImageUrl: fav.originalImageUrl,
          sourcePageUrl: fav.sourcePageUrl,
          sourceDomain: fav.sourceDomain,
          width: 0,
          height: 0,
        }));
        setFavorites(mapped);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      void fetchFavorites();
    }
  }, [router, status]);

  const handleToggleFavorite = async (image: ImageResult) => {
    // In this page, toggling always means removing
    try {
      // Need to find the actual DB ID
      const response = await fetch("/api/favorites");
      const data = (await response.json()) as FavoriteRecord[];
      const fav = data.find((item) => item.originalImageUrl === image.originalImageUrl);
      
      if (fav) {
        await fetch(`/api/favorites?id=${fav.id}`, { method: "DELETE" });
        setFavorites(favorites.filter((favorite) => favorite.originalImageUrl !== image.originalImageUrl));
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-20 text-center">{t.favoritesPage.loading}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
          <Heart size={24} />
        </div>
        <h1 className="text-3xl font-bold">{t.favoritesPage.title}</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-20 text-center">
          <p className="text-gray-500 text-lg mb-6">{t.favoritesPage.empty}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            {t.favoritesPage.startSearching}
          </button>
        </div>
      ) : (
        <ImageGrid 
          images={favorites} 
          onImageClick={setSelectedImage} 
        />
      )}

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        isFavorite={true}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
