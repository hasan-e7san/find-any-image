// components/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Image as ImageIcon, User, Heart, LogOut } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchInput from "./SearchInput";

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useI18n();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <ImageIcon size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">{t.common.brand}</span>
        </Link>

        {(!isHomePage) && (
          <div className="flex-grow max-w-xl hidden md:block">
            <SearchInput className="max-w-full" />
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageSwitcher />
          {session ? (
            <>
              <Link
                href="/favorites"
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title={t.navbar.favorites}
              >
                <Heart size={20} />
              </Link>
              <Link
                href="/account"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title={t.navbar.account}
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                title={t.navbar.logout}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.navbar.login}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.navbar.register}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Search - Only show if not on home page */}
      {!isHomePage && (
        <div className="md:hidden px-4 pb-3">
          <SearchInput className="max-w-full" />
        </div>
      )}
    </nav>
  );
}
