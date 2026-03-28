"use client";

import React, { createContext, useContext } from "react";
import type { AdsConfig } from "@/lib/ads";

const AdsConfigContext = createContext<AdsConfig | null>(null);

export function AdsConfigProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: AdsConfig;
}) {
  return (
    <AdsConfigContext.Provider value={config}>
      {children}
    </AdsConfigContext.Provider>
  );
}

export function useAdsConfig() {
  const context = useContext(AdsConfigContext);

  if (!context) {
    throw new Error("useAdsConfig must be used inside AdsConfigProvider");
  }

  return context;
}
