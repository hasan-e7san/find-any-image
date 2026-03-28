import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Login",
  description: "Sign in to Find Any Image to save favorites and track your search history.",
  path: "/login",
  keywords: ["login", "account access"],
  noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
