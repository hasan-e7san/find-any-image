"use client";

import React from "react";
import clsx from "clsx";
import { Languages } from "lucide-react";
import { useI18n } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { isPending, locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
      <Languages size={16} className="text-gray-400" aria-hidden="true" />
      <span className="sr-only">{t.common.language}</span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        disabled={isPending}
        className={clsx(
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          locale === "en" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        disabled={isPending}
        className={clsx(
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          locale === "ar" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600",
        )}
        aria-pressed={locale === "ar"}
      >
        ع
      </button>
    </div>
  );
}
