import type { Metadata } from "next";
import { getGoogleAdSenseAccount } from "./ads";
import {
  DEFAULT_OG_IMAGE_ALT,
  getAbsoluteUrl,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SHORT_NAME,
} from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphLocale?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
  openGraphLocale = "en_US",
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getAbsoluteUrl(path);
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    metadataBase: getSiteUrl(),
    title: fullTitle,
    description,
    applicationName: SITE_NAME,
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [...SITE_KEYWORDS, ...keywords],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    classification: "Image search engine",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      address: false,
      email: false,
      telephone: false,
    },
    other: {
      "google-adsense-account": getGoogleAdSenseAccount(),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: openGraphLocale,
      images: [
        {
          url: getAbsoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: getAbsoluteUrl("/twitter-image"),
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    appleWebApp: {
      title: SITE_SHORT_NAME,
      capable: true,
      statusBarStyle: "default",
    },
  };
}

export function buildHomeMetadata(
  title: string,
  description: string,
  openGraphLocale = "en_US",
): Metadata {
  return {
    ...buildPageMetadata({
      title,
      description,
      path: "/",
      keywords: [
        "image inspiration",
        "photo discovery",
        "visual search",
      ],
      openGraphLocale,
    }),
    openGraph: {
      type: "website",
      url: getAbsoluteUrl("/"),
      siteName: SITE_NAME,
      title,
      description,
      locale: openGraphLocale,
      images: [
        {
          url: getAbsoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
  };
}

export function getDefaultSeoDescription() {
  return SITE_DESCRIPTION;
}
