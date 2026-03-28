// app/privacy/page.tsx
"use client";

import { useI18n } from "@/components/LanguageProvider";
import { formatDate } from "@/lib/i18n";

export default function PrivacyPage() {
  const { locale, t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t.privacyPage.title}</h1>
      <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
        <p>
          {t.privacyPage.lastUpdated}: {formatDate(locale, new Date())}
        </p>
        <p>{t.privacyPage.intro}</p>
        
        <h2 className="text-xl font-bold text-gray-900">{t.privacyPage.sectionOneTitle}</h2>
        <p>{t.privacyPage.sectionOneBody}</p>
        
        <h2 className="text-xl font-bold text-gray-900">{t.privacyPage.sectionTwoTitle}</h2>
        <p>{t.privacyPage.sectionTwoBody}</p>
        
        <h2 className="text-xl font-bold text-gray-900">{t.privacyPage.sectionThreeTitle}</h2>
        <p>{t.privacyPage.sectionThreeBody}</p>
      </div>
    </div>
  );
}
