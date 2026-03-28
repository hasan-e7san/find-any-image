import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Review the terms that govern your use of Find Any Image and the image data surfaced through the site.",
  path: "/terms",
  keywords: ["terms of service", "usage terms"],
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
