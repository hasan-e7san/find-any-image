// app/favorites/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";
import { ImageResult } from "@/lib/search";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchFavorites();
    }
  }, [status]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites");
      const data = await response.json();
      if (Array.isArray(data)) {
        // Map database records back to ImageResult format
        const mapped = data.map((fav: any) => ({
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
  };

  const handleToggleFavorite = async (image: ImageResult) => {
    // In this page, toggling always means removing
    try {
      // Need to find the actual DB ID
      const response = await fetch("/api/favorites");
      const data = await response.json();
      const fav = data.find((f: any) => f.originalImageUrl === image.originalImageUrl);
      
      if (fav) {
        await fetch(`/api/favorites?id=${fav.id}`, { method: "DELETE" });
        setFavorites(favorites.filter(f => f.originalImageUrl !== image.originalImageUrl));
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-20 text-center">Loading your favorites...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
          <Heart size={24} />
        </div>
        <h1 className="text-3xl font-bold">Your Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-20 text-center">
          <p className="text-gray-500 text-lg mb-6">You haven't saved any images yet.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Start Searching
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
