// app/page.tsx
"use client";

import AdUnit from "@/components/AdUnit";
import SearchInput from "@/components/SearchInput";
import { useAdsConfig } from "@/components/AdsConfigProvider";
import { Search, Shield, Heart } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useI18n();
  const { homeSlot } = useAdsConfig();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 py-20 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {t.home.heroLead} <br />
            <span className="text-blue-200">{t.home.heroAccent}</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
            {t.home.heroDescription}
          </p>
          <div className="flex justify-center">
            <SearchInput className="max-w-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Ads Section */}
      <section className="w-full py-10 bg-gray-50 flex justify-center border-b border-gray-100">
        <div className="max-w-4xl w-full px-4">
          <AdUnit
            slot={homeSlot}
            fallbackTitle={t.home.adsPlaceholder}
            fallbackHint={t.home.adsHint}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 w-full">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.home.fastSearchTitle}</h3>
            <p className="text-gray-600">
              {t.home.fastSearchDescription}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.home.saveFavoritesTitle}</h3>
            <p className="text-gray-600">
              {t.home.saveFavoritesDescription}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.home.safeContentTitle}</h3>
            <p className="text-gray-600">
              {t.home.safeContentDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full py-20 bg-blue-50 border-y border-blue-100 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t.home.ctaTitle}</h2>
          <p className="text-gray-600 mb-10 text-lg">{t.home.ctaDescription}</p>
          <div className="flex justify-center">
            <SearchInput className="max-w-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
