export const SITE_NAME = "Find Any Image";
export const SITE_SHORT_NAME = "FindAnyImage";
export const SITE_DESCRIPTION =
  "Search millions of high-quality royalty-free images, save favorites, and discover visuals for your next project.";
export const SITE_TAGLINE = "Search, discover, and save the right image fast.";
export const SITE_KEYWORDS = [
  "image search",
  "find images",
  "royalty free images",
  "free stock photos",
  "pixabay search",
  "save image favorites",
  "image finder",
];
export const DEFAULT_OG_IMAGE_ALT = "Find Any Image search platform preview";

export function getSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  try {
    return new URL(rawSiteUrl);
  } catch {
    return new URL(`https://${rawSiteUrl}`);
  }
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}
