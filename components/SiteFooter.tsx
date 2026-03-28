"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "./LanguageProvider";

export default function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t border-gray-100 bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
              FI
            </div>
            <span className="text-lg font-bold">{t.common.brand}</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-500">
            <Link href="/privacy" className="transition-colors hover:text-blue-600">
              {t.common.privacyPolicy}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-blue-600">
              {t.common.termsOfService}
            </Link>
          </div>

          <p className="text-sm text-gray-400">{t.common.allRightsReserved(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
