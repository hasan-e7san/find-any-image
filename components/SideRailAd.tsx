import AdUnit from "@/components/AdUnit";
import {
  GOOGLE_ADSENSE_LEFT_RAIL_SLOT,
  GOOGLE_ADSENSE_RIGHT_RAIL_SLOT,
} from "@/lib/ads";

type SideRailAdProps = {
  side: "left" | "right";
};

export default function SideRailAd({ side }: SideRailAdProps) {
  const slot =
    side === "left"
      ? GOOGLE_ADSENSE_LEFT_RAIL_SLOT
      : GOOGLE_ADSENSE_RIGHT_RAIL_SLOT;
  const fallbackTitle =
    side === "left" ? "Left ad rail" : "Right ad rail";

  return (
    <aside
      aria-label={fallbackTitle}
      className="sticky top-24 hidden w-[180px] shrink-0 2xl:block"
    >
      <AdUnit
        slot={slot}
        fallbackTitle={fallbackTitle}
        fallbackHint="Set a dedicated AdSense slot in your environment variables."
        className="min-h-[600px]"
      />
    </aside>
  );
}
