"use client";

import { useEffect } from "react";
import { useAdsConfig } from "@/components/AdsConfigProvider";
import {
  GOOGLE_ADSENSE_READY_EVENT,
  getGoogleAdSenseScriptUrl,
} from "@/lib/ads";

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

    const handleLoad = () => {
      if (existingScript) {
        existingScript.dataset.loaded = "true";
      }
      dispatchReadyEvent();
    };

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
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
      script.dataset.loaded = "true";
      dispatchReadyEvent();
    };

    script.addEventListener("load", handleScriptLoad, { once: true });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleScriptLoad);
    };
  }, [client]);

  return null;
}
