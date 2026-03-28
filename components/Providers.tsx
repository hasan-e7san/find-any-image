// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { AdsConfigProvider } from "./AdsConfigProvider";
import { LanguageProvider } from "./LanguageProvider";
import type { AdsConfig } from "@/lib/ads";
import type { Locale } from "@/lib/i18n";

export default function Providers({
  children,
  initialLocale,
  adsConfig,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
  adsConfig: AdsConfig;
}) {
  return (
    <AdsConfigProvider config={adsConfig}>
      <SessionProvider>
        <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>
      </SessionProvider>
    </AdsConfigProvider>
  );
}
