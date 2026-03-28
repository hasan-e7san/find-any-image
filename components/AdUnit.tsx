"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import {
  GOOGLE_ADSENSE_CLIENT,
  isGoogleAdSenseEnabled,
} from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdUnitProps = {
  slot: string;
  className?: string;
  fallbackHint?: string;
  fallbackTitle: string;
};

export default function AdUnit({
  slot,
  className,
  fallbackHint,
  fallbackTitle,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const requestedRef = useRef(false);
  const adSenseEnabled = isGoogleAdSenseEnabled(slot);

  useEffect(() => {
    if (!adSenseEnabled || requestedRef.current) {
      return;
    }

    const adElement = adRef.current;
    if (!adElement) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      requestedRef.current = true;
    } catch (error) {
      console.error("Failed to initialize Google AdSense ad unit.", error);
    }
  }, [adSenseEnabled]);

  if (!adSenseEnabled) {
    if (process.env.NODE_ENV === "production") {
      return null;
    }

    return (
      <div
        className={clsx(
          "flex min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-center text-gray-500",
          className,
        )}
      >
        <p>{fallbackTitle}</p>
        {fallbackHint ? <p className="mt-1 text-xs">{fallbackHint}</p> : null}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "min-h-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white/80",
        className,
      )}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={GOOGLE_ADSENSE_CLIENT}
        data-ad-format="auto"
        data-ad-slot={slot}
        data-full-width-responsive="true"
      />
    </div>
  );
}
