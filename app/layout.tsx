// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import GoogleAdSenseScript from "@/components/GoogleAdSenseScript";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SiteFooter from "@/components/SiteFooter";
import { getAdsConfig } from "@/lib/ads";
import { defaultLocale, getDirection, getTranslations, isLocale, LOCALE_COOKIE_NAME, type Locale } from "@/lib/i18n";
import { buildHomeMetadata } from "@/lib/seo";
import "./globals.css";
import Script from "next/script";

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
  const adsConfig = getAdsConfig();

  return (
    <html lang={initialLocale} dir={dir} suppressHydrationWarning>
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4305704904656915"
          crossOrigin="anonymous"></Script>
      </head>
      <body>
        <Providers initialLocale={initialLocale} adsConfig={adsConfig}>
          {adsConfig.client ? <GoogleAdSenseScript /> : null}
          <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            <div className="mx-auto flex w-full max-w-[1700px] flex-1 items-start gap-6 px-4 2xl:px-6">
              <main className="min-w-0 flex-1">{children}</main>
            </div>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
