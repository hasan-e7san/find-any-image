"use client";

import { useEffect } from "react";
import { useAdsConfig } from "@/components/AdsConfigProvider";
import {
  GOOGLE_ADSENSE_READY_EVENT,
  getGoogleAdSenseScriptUrl,
} from "@/lib/ads";

declare global {
  interface Window {
    googleAdSenseScriptLoaded?: boolean;
  }
}

function dispatchReadyEvent() {
  window.dispatchEvent(new Event(GOOGLE_ADSENSE_READY_EVENT));
}

export default function GoogleAdSenseScript() {
  const { client } = useAdsConfig();

  useEffect(() => {
    if (!client) {
      return;
    }

    const scriptUrl = getGoogleAdSenseScriptUrl(client);
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`,
    );

    const markScriptAsReady = (script: HTMLScriptElement) => {
      script.dataset.loaded = "true";
      window.googleAdSenseScriptLoaded = true;
      dispatchReadyEvent();
    };

    const handleLoad = () => {
      if (existingScript) {
        markScriptAsReady(existingScript);
      }
    };

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        window.googleAdSenseScriptLoaded = true;
        dispatchReadyEvent();
        return;
      }

      existingScript.addEventListener("load", handleLoad, { once: true });

      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    script.crossOrigin = "anonymous";
    script.dataset.googleAdSenseScript = "true";

    const handleScriptLoad = () => {
      markScriptAsReady(script);
    };

    script.addEventListener("load", handleScriptLoad, { once: true });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleScriptLoad);
    };
  }, [client]);

  return null;
}
