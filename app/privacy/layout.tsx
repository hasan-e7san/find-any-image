import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Read how Find Any Image collects, stores, and uses account, search, and favorites data.",
  path: "/privacy",
  keywords: ["privacy policy", "data handling"],
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
