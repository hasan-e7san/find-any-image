function readPublicEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

export const GOOGLE_ADSENSE_ACCOUNT =
  readPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT") ||
  "ca-pub-4305704904656915";

export const GOOGLE_ADSENSE_CLIENT = readPublicEnv(
  "NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT",
);

export const GOOGLE_ADSENSE_HOME_SLOT = readPublicEnv(
  "NEXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT",
);

export const GOOGLE_ADSENSE_SEARCH_SLOT = readPublicEnv(
  "NEXT_PUBLIC_GOOGLE_ADSENSE_SEARCH_SLOT",
);

export function isGoogleAdSenseEnabled(slot?: string) {
  return GOOGLE_ADSENSE_CLIENT.length > 0 && Boolean(slot);
}

export function getGoogleAdSenseScriptUrl() {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    GOOGLE_ADSENSE_CLIENT,
  )}`;
}
