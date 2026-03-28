// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>At ImageSearch, we respect your privacy. This policy explains how we handle your data.</p>
        
        <h2 className="text-xl font-bold text-gray-900">1. Data Collection</h2>
        <p>We only store your account information (name, email, and hashed password) and your saved favorites/search history. We do NOT store any image files locally.</p>
        
        <h2 className="text-xl font-bold text-gray-900">2. External APIs</h2>
        <p>Image data is fetched from Pixabay. When you search, your query is sent to Pixabay to retrieve results.</p>
        
        <h2 className="text-xl font-bold text-gray-900">3. Cookies</h2>
        <p>We use cookies to maintain your login session. No tracking cookies are used by us directly, though third-party services like Google Ads may use them.</p>
      </div>
    </div>
  );
}
