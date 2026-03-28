import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Your Account",
  description: "Manage your Find Any Image account details, saved favorites, and recent search history.",
  path: "/account",
  keywords: ["account settings", "saved image history"],
  noIndex: true,
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
