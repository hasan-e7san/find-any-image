// app/search/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";
import { ImageResult } from "@/lib/search";
import { useSession } from "next-auth/react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  useEffect(() => {
    if (session) {
      fetchFavorites();
    }
  }, [session]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites");
      const data = await response.json();
      if (Array.isArray(data)) {
        setFavorites(data.map((fav: any) => fav.originalImageUrl));
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleToggleFavorite = async (image: ImageResult) => {
    const isFav = favorites.includes(image.originalImageUrl);
    
    if (isFav) {
      // Find the favorite ID to delete
      try {
        const response = await fetch("/api/favorites");
        const data = await response.json();
        const fav = data.find((f: any) => f.originalImageUrl === image.originalImageUrl);
        if (fav) {
          await fetch(`/api/favorites?id=${fav.id}`, { method: "DELETE" });
          setFavorites(favorites.filter(url => url !== image.originalImageUrl));
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      try {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: image.title,
            thumbnailUrl: image.thumbnailUrl,
            originalImageUrl: image.originalImageUrl,
            sourcePageUrl: image.sourcePageUrl,
            sourceDomain: image.sourceDomain,
          }),
        });
        setFavorites([...favorites, image.originalImageUrl]);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold mb-2">Results for "{query}"</h1>
        <p className="text-gray-500">Found {results.length} images from Pixabay</p>
      </div>

      <ImageGrid 
        images={results} 
        onImageClick={setSelectedImage} 
        loading={loading} 
      />

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        isFavorite={selectedImage ? favorites.includes(selectedImage.originalImageUrl) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Results Ads */}
      <div className="mt-16 w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center text-gray-400 text-sm">
            Google Ad Unit (Responsive)
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
