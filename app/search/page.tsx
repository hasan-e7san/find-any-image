// app/search/page.tsx
"use client";

import React, { Suspense, useEffect, useEffectEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import AdUnit from "@/components/AdUnit";
import { useAdsConfig } from "@/components/AdsConfigProvider";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";
import { useI18n } from "@/components/LanguageProvider";
import { formatNumber } from "@/lib/i18n";
import { ImageResult } from "@/lib/search";

type FavoriteRecord = {
  id: string;
  originalImageUrl: string;
};

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const [results, setResults] = useState<ImageResult[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [effectiveQuery, setEffectiveQuery] = useState(query);
  const [queryWasTranslated, setQueryWasTranslated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: session } = useSession();
  const { locale, t } = useI18n();
  const { searchSlot } = useAdsConfig();

  const fetchResults = useEffectEvent(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`);
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
        setTotalHits(typeof data.totalHits === "number" ? data.totalHits : data.results.length);
        setTotalPages(typeof data.totalPages === "number" ? data.totalPages : 1);
        setEffectiveQuery(typeof data.effectiveQuery === "string" ? data.effectiveQuery : query);
        setQueryWasTranslated(Boolean(data.queryWasTranslated));
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  });

  const fetchFavorites = useEffectEvent(async () => {
    try {
      const response = await fetch("/api/favorites");
      const data = (await response.json()) as FavoriteRecord[];
      if (Array.isArray(data)) {
        setFavorites(data.map((fav) => fav.originalImageUrl));
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  });

  useEffect(() => {
    if (query) {
      void fetchResults();
      return;
    }

    setResults([]);
    setTotalHits(0);
    setTotalPages(1);
    setEffectiveQuery(query);
    setQueryWasTranslated(false);
    setLoading(false);
  }, [page, query]);

  useEffect(() => {
    if (session) {
      void fetchFavorites();
      return;
    }

    setFavorites([]);
  }, [session]);

  const handleToggleFavorite = async (image: ImageResult) => {
    const isFav = favorites.includes(image.originalImageUrl);
    
    if (isFav) {
      // Find the favorite ID to delete
      try {
        const response = await fetch("/api/favorites");
        const data = (await response.json()) as FavoriteRecord[];
        const fav = data.find((item) => item.originalImageUrl === image.originalImageUrl);
        if (fav) {
          await fetch(`/api/favorites?id=${fav.id}`, { method: "DELETE" });
          setFavorites(favorites.filter((url) => url !== image.originalImageUrl));
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

  const handlePageChange = (nextPage: number) => {
    if (!query || nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (nextPage === 1) {
      params.delete("page");
    } else {
      params.set("page", nextPage.toString());
    }

    setSelectedImage(null);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.searchPage.resultsFor(query)}</h1>
        <p className="text-gray-500">{t.searchPage.foundImages(formatNumber(locale, totalHits))}</p>
        {queryWasTranslated ? (
          <p className="mt-2 text-sm text-blue-600">{t.searchPage.translatedForPixabay(effectiveQuery)}</p>
        ) : null}
        {totalPages > 1 ? (
          <p className="mt-2 text-sm text-gray-400">
            {t.searchPage.pageStatus(formatNumber(locale, page), formatNumber(locale, totalPages))}
          </p>
        ) : null}
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

      {totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || loading}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.searchPage.previousPage}
          </button>
          <div className="min-w-32 rounded-lg bg-gray-50 px-4 py-2 text-center text-sm text-gray-500">
            {t.searchPage.pageStatus(formatNumber(locale, page), formatNumber(locale, totalPages))}
          </div>
          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || loading}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.searchPage.nextPage}
          </button>
        </div>
      ) : null}

      {/* Results Ads */}
      <div className="mt-16 w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <AdUnit
            slot={searchSlot}
            fallbackTitle={t.searchPage.adUnit}
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const { t } = useI18n();

  return (
    <Suspense fallback={<div className="p-20 text-center">{t.searchPage.loading}</div>}>
      <SearchContent />
    </Suspense>
  );
}
