// app/account/page.tsx
"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, History, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";
import { formatDate, formatTime } from "@/lib/i18n";

type SearchHistoryItem = {
  id: string;
  query: string;
  createdAt: string;
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useI18n();

  const fetchHistory = useEffectEvent(async () => {
    try {
      const response = await fetch("/api/history");
      const data = (await response.json()) as SearchHistoryItem[];
      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      void fetchHistory();
    }
  }, [router, status]);

  if (status === "loading" || loading) {
    return <div className="p-20 text-center">{t.accountPage.loading}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-80">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <User size={48} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">{session?.user?.name}</h1>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>

            <div className="space-y-2">
              <Link 
                href="/favorites" 
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Search size={18} className="text-gray-400" />
                <span>{t.accountPage.myFavorites}</span>
              </Link>
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>{t.accountPage.logout}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search History Content */}
        <div className="flex-grow">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <History size={20} />
              </div>
              <h2 className="text-xl font-bold">{t.accountPage.searchHistory}</h2>
            </div>

            {history.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-10 text-center text-gray-500">
                {t.accountPage.emptyHistory}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {history.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <Search size={18} />
                      </div>
                      <div>
                        <Link 
                          href={`/search?q=${encodeURIComponent(item.query)}`}
                          className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.query}
                        </Link>
                        <p className="text-xs text-gray-400">
                          {formatDate(locale, item.createdAt)} {formatTime(locale, item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Link 
                      href={`/search?q=${encodeURIComponent(item.query)}`}
                      className="text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {t.accountPage.searchAgain}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
