"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useAdsConfig } from "@/components/AdsConfigProvider";
import {
  GOOGLE_ADSENSE_READY_EVENT,
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
  const { client } = useAdsConfig();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const adRef = useRef<HTMLModElement | null>(null);
  const requestedRef = useRef(false);
  const adSenseEnabled = isGoogleAdSenseEnabled(client, slot);

  useEffect(() => {
    if (!adSenseEnabled || requestedRef.current) {
      return;
    }

    const adElement = adRef.current;
    const containerElement = containerRef.current;
    if (!adElement || !containerElement) {
      return;
    }

    let animationFrameId: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      scheduleRequest();
    });

    const requestAd = () => {
      if (requestedRef.current) {
        return;
      }

      const { width } = containerElement.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(containerElement);
      const isVisible =
        computedStyle.display !== "none" &&
        computedStyle.visibility !== "hidden" &&
        width >= 120;

      if (!isVisible) {
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        requestedRef.current = true;
        resizeObserver.disconnect();
      } catch (error) {
        console.error("Failed to initialize Google AdSense ad unit.", error);
      }
    };

    const scheduleRequest = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        requestAd();
      });
    };

    resizeObserver.observe(containerElement);
    window.addEventListener(GOOGLE_ADSENSE_READY_EVENT, scheduleRequest);
    window.addEventListener("load", scheduleRequest);
    scheduleRequest();

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      window.removeEventListener(GOOGLE_ADSENSE_READY_EVENT, scheduleRequest);
      window.removeEventListener("load", scheduleRequest);
    };
  }, [adSenseEnabled, slot]);

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
      ref={containerRef}
      className={clsx(
        "min-h-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white/80",
        className,
      )}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-format="auto"
        data-ad-slot={slot}
        data-full-width-responsive="true"
      />
    </div>
  );
}
