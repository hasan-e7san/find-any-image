// app/terms/page.tsx
"use client";

import { useI18n } from "@/components/LanguageProvider";
import { formatDate } from "@/lib/i18n";

export default function TermsPage() {
  const { locale, t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t.termsPage.title}</h1>
      <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
        <p>
          {t.termsPage.lastUpdated}: {formatDate(locale, new Date())}
        </p>
        
        <h2 className="text-xl font-bold text-gray-900">{t.termsPage.sectionOneTitle}</h2>
        <p>{t.termsPage.sectionOneBody}</p>
        
        <h2 className="text-xl font-bold text-gray-900">{t.termsPage.sectionTwoTitle}</h2>
        <p>{t.termsPage.sectionTwoBody}</p>
        
        <h2 className="text-xl font-bold text-gray-900">{t.termsPage.sectionThreeTitle}</h2>
        <p>{t.termsPage.sectionThreeBody}</p>
      </div>
    </div>
  );
}
