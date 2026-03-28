// app/page.tsx
import SearchInput from "@/components/SearchInput";
import { Search, Image, Shield, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 py-20 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            The world's most powerful <br />
            <span className="text-blue-200">Image Search</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
            Search millions of high-quality images from the best sources across the web. Save your favorites and access them anywhere.
          </p>
          <div className="flex justify-center">
            <SearchInput className="max-w-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Ads Section */}
      <section className="w-full py-10 bg-gray-50 flex justify-center border-b border-gray-100">
        <div className="max-w-4xl w-full px-4">
          <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 font-medium">
            <p>Google Ads Placeholder</p>
            <p className="text-xs mt-1">(Add your Google Ads script here)</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 w-full">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fast Search</h3>
            <p className="text-gray-600">
              Get high-quality results in milliseconds. We use top-tier APIs to ensure you find exactly what you need.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Save Favorites</h3>
            <p className="text-gray-600">
              Found an image you love? Save it to your account and access it later. We only store the metadata.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Safe Content</h3>
            <p className="text-gray-600">
              All search results are filtered for safety. We ensure that your search experience is always secure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full py-20 bg-blue-50 border-y border-blue-100 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Start searching today</h2>
          <p className="text-gray-600 mb-10 text-lg">Join thousands of users who find the best images for their projects every day.</p>
          <div className="flex justify-center">
            <SearchInput className="max-w-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
