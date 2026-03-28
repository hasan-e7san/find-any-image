// components/SearchInput.tsx
"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "./LanguageProvider";

interface SearchInputProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchInput({ initialValue = "", onSearch, className = "" }: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();
  const { dir, t } = useI18n();
  const isRtl = dir === "rtl";

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 2) {
      if (onSearch) {
        onSearch(trimmedQuery);
      } else {
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      dir={dir}
      className={`relative flex items-center w-full max-w-2xl ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.searchInput.placeholder}
        className={clsx(
          "w-full rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500",
          isRtl ? "pr-10 pl-24 text-right" : "pl-10 pr-24 text-left",
        )}
      />
      <div className={clsx("absolute text-gray-400", isRtl ? "right-3" : "left-3")}>
        <Search size={18} />
      </div>
      <button
        type="submit"
        className={clsx(
          "absolute rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700",
          isRtl ? "left-2" : "right-2",
        )}
      >
        {t.searchInput.submit}
      </button>
    </form>
  );
}
