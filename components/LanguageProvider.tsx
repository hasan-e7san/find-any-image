"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import {
  defaultLocale,
  getDirection,
  getTranslations,
  isLocale,
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  type Direction,
  type Locale,
  type Translations,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  dir: Direction;
  isPending: boolean;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readPersistedLocale() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  const cookieLocale = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${LOCALE_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return null;
}

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => readPersistedLocale() ?? initialLocale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const dir = getDirection(locale);

    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.style.direction = dir;

    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    startTransition(() => {
      setLocaleState(nextLocale);
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir: getDirection(locale),
        isPending,
        setLocale,
        t: getTranslations(locale),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }

  return context;
}
