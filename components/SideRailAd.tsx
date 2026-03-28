import AdUnit from "@/components/AdUnit";

type SideRailAdProps = {
  side: "left" | "right";
  slot: string;
};

export default function SideRailAd({ side, slot }: SideRailAdProps) {
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
