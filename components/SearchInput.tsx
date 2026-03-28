// components/SearchInput.tsx
"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchInput({ initialValue = "", onSearch, className = "" }: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

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
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full max-w-2xl ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
        className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
      <div className="absolute left-3 text-gray-400">
        <Search size={18} />
      </div>
      <button
        type="submit"
        className="absolute right-2 px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Search
      </button>
    </form>
  );
}
