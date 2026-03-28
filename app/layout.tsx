// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SiteFooter from "@/components/SiteFooter";
import { GOOGLE_ADSENSE_CLIENT, getGoogleAdSenseScriptUrl } from "@/lib/ads";
import { defaultLocale, getDirection, getTranslations, isLocale, LOCALE_COOKIE_NAME, type Locale } from "@/lib/i18n";
import { buildHomeMetadata } from "@/lib/seo";
import "./globals.css";

async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return isLocale(cookieLocale) ? cookieLocale : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  const t = getTranslations(locale);

  return buildHomeMetadata(t.metadata.title, t.metadata.description, locale === "ar" ? "ar_AE" : "en_US");
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await getInitialLocale();
  const dir = getDirection(initialLocale);

  return (
    <html lang={initialLocale} dir={dir} suppressHydrationWarning>
      <body>
        {GOOGLE_ADSENSE_CLIENT ? (
          <Script
            id="google-adsense"
            src={getGoogleAdSenseScriptUrl()}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        ) : null}
        <Providers initialLocale={initialLocale}>
          <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
