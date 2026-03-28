// app/terms/page.tsx
export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-bold text-gray-900">1. Usage</h2>
        <p>ImageSearch provides a tool to search and save image metadata. You are responsible for any use of the images you find. Always check the original source for licensing and usage rights.</p>
        
        <h2 className="text-xl font-bold text-gray-900">2. Content</h2>
        <p>We do not host the images shown in our search results. All images are the property of their respective owners and are provided via Pixabay's API.</p>
        
        <h2 className="text-xl font-bold text-gray-900">3. Accounts</h2>
        <p>You are responsible for keeping your password secure. We are not liable for any loss resulting from unauthorized access to your account.</p>
      </div>
    </div>
  );
}
