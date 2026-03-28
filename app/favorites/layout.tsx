import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Saved Favorites",
  description: "Review the images you saved in your favorites on Find Any Image.",
  path: "/favorites",
  keywords: ["favorite images", "saved photos"],
  noIndex: true,
});

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
