import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Image Search Results",
  description: "Browse image search results on Find Any Image and refine your next visual discovery.",
  path: "/search",
  keywords: ["search results", "image discovery"],
  noIndex: true,
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
