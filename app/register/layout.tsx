import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Create an Account",
  description: "Create a Find Any Image account to save images and revisit your searches later.",
  path: "/register",
  keywords: ["sign up", "create account"],
  noIndex: true,
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
