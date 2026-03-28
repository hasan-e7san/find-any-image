"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
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

function subscribeToLocale(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const persistedLocale = useSyncExternalStore(
    subscribeToLocale,
    () => readPersistedLocale() ?? initialLocale,
    () => initialLocale,
  );
  const [localeOverride, setLocaleOverride] = useState<Locale | null>(null);
  const [isPending, startTransition] = useTransition();
  const locale = localeOverride ?? persistedLocale;

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
      setLocaleOverride(nextLocale);
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
