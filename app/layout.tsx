// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImageSearch - Find and save high-quality images",
  description: "Search millions of royalty-free images for your projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-gray-50 border-t border-gray-100 py-10 mt-20">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      IS
                    </div>
                    <span className="font-bold text-lg">ImageSearch</span>
                  </div>
                  
                  <div className="flex gap-8 text-sm text-gray-500">
                    <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} ImageSearch. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
