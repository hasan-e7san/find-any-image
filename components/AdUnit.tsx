"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useAdsConfig } from "@/components/AdsConfigProvider";
import {
  GOOGLE_ADSENSE_READY_EVENT,
  isGoogleAdSenseEnabled,
} from "@/lib/ads";

type AdsByGoogleQueue =
  | Array<Record<string, never>>
  | {
      push: (...values: Array<Record<string, never>>) => unknown;
    };

declare global {
  interface Window {
    adsbygoogle?: AdsByGoogleQueue;
    googleAdSenseScriptLoaded?: boolean;
  }
}

const MIN_AD_WIDTH = 120;
const MAX_REQUEST_ATTEMPTS = 8;
const REQUEST_RETRY_DELAY_MS = 250;

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
  const attemptsRef = useRef(0);
  const adSenseEnabled = isGoogleAdSenseEnabled(client, slot);

  useEffect(() => {
    requestedRef.current = false;
    attemptsRef.current = 0;
  }, [client, slot]);

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
    let retryTimeoutId: number | null = null;

    const clearRetryTimeout = () => {
      if (retryTimeoutId !== null) {
        window.clearTimeout(retryTimeoutId);
        retryTimeoutId = null;
      }
    };

    const isScriptReady = () =>
      window.googleAdSenseScriptLoaded === true ||
      document.querySelector(
        'script[data-google-ad-sense-script="true"][data-loaded="true"]',
      ) !== null;

    const isLayoutReady = () => {
      const containerStyle = window.getComputedStyle(containerElement);
      const adStyle = window.getComputedStyle(adElement);
      const containerWidth = Math.floor(
        containerElement.getBoundingClientRect().width,
      );
      const adWidth = Math.floor(adElement.getBoundingClientRect().width);

      return (
        containerElement.isConnected &&
        adElement.isConnected &&
        containerStyle.display !== "none" &&
        containerStyle.visibility !== "hidden" &&
        adStyle.display !== "none" &&
        adStyle.visibility !== "hidden" &&
        containerWidth >= MIN_AD_WIDTH &&
        adWidth >= MIN_AD_WIDTH
      );
    };

    const scheduleRetry = () => {
      if (
        requestedRef.current ||
        retryTimeoutId !== null ||
        attemptsRef.current >= MAX_REQUEST_ATTEMPTS
      ) {
        return;
      }

      retryTimeoutId = window.setTimeout(() => {
        retryTimeoutId = null;
        scheduleRequest();
      }, REQUEST_RETRY_DELAY_MS);
    };

    const resizeObserver = new ResizeObserver(() => {
      scheduleRequest();
    });

    const requestAd = () => {
      if (requestedRef.current) {
        return;
      }

      if (!isScriptReady() || !isLayoutReady()) {
        return;
      }

      attemptsRef.current += 1;

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        requestedRef.current = true;
        clearRetryTimeout();
        resizeObserver.disconnect();
      } catch (error) {
        scheduleRetry();
        if (attemptsRef.current < MAX_REQUEST_ATTEMPTS) {
          return;
        }
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
    resizeObserver.observe(adElement);
    window.addEventListener(GOOGLE_ADSENSE_READY_EVENT, scheduleRequest);
    window.addEventListener("load", scheduleRequest);
    window.addEventListener("resize", scheduleRequest);
    scheduleRequest();

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      clearRetryTimeout();
      resizeObserver.disconnect();
      window.removeEventListener(GOOGLE_ADSENSE_READY_EVENT, scheduleRequest);
      window.removeEventListener("load", scheduleRequest);
      window.removeEventListener("resize", scheduleRequest);
    };
  }, [adSenseEnabled, client, slot]);

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
        "min-h-[120px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white/80",
        className,
      )}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-format="auto"
        data-ad-slot={slot}
        data-full-width-responsive="true"
      />
    </div>
  );
}
