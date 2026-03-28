function readPublicEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

const DEFAULT_GOOGLE_ADSENSE_CLIENT = "ca-pub-4305704904656915";
export const GOOGLE_ADSENSE_READY_EVENT = "google-adsense-ready";

export type AdsConfig = {
  client: string;
  homeSlot: string;
  searchSlot: string;
  leftRailSlot: string;
  rightRailSlot: string;
};

export function getAdsConfig(): AdsConfig {
  return {
    client:
      readPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT") ||
      DEFAULT_GOOGLE_ADSENSE_CLIENT,
    homeSlot: readPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT"),
    searchSlot: readPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_SEARCH_SLOT"),
    leftRailSlot: readPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_LEFT_RAIL_SLOT"),
    rightRailSlot: readPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_RIGHT_RAIL_SLOT"),
  };
}

export function getGoogleAdSenseAccount() {
  return getAdsConfig().client;
}

export function isGoogleAdSenseEnabled(client: string, slot?: string) {
  return client.length > 0 && Boolean(slot);
}

export function getGoogleAdSenseScriptUrl(client: string) {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    client,
  )}`;
}
