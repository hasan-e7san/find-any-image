# Find Any Image Website

A powerful image search website built with Next.js, TypeScript, Tailwind CSS, NextAuth, SQLite, and Prisma.

## Features
- **Fast Image Search:** Powered by Pixabay API.
- **Authentication:** Secure login and registration.
- **Favorites:** Save images to your account for later viewing.
- **Search History:** Automatically tracks your recent searches when logged in.
- **Responsive Design:** Optimized for mobile and desktop.
- **Google AdSense:** Site-wide Auto Ads with a single publisher ID.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Database:** SQLite (via Prisma)
- **Auth:** NextAuth (Auth.js)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## Setup

1.  **Clone the repository** (if applicable).
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create or edit the `.env` file in the root directory:
    ```env
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="your-nextauth-secret"
    NEXTAUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"
    PIXABAY_API_KEY="your-pixabay-api-key"
    MYMEMORY_TRANSLATE_EMAIL="you@example.com"
    NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT="ca-pub-1234567890123456"
    ```
    *Note: You can get a free Pixabay API key at [https://pixabay.com/api/docs/](https://pixabay.com/api/docs/).*
    *Note: With Google AdSense Auto Ads enabled, you only need the publisher ID (`ca-pub-...`) in your environment variables.*

4.  **Setup Database:**
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## Implementation Details
- **API Proxying:** Search queries are handled via `/api/search` to protect your API keys and normalize results.
- **SQLite:** User data, favorites, and history are stored in a local SQLite database for simplicity.
- **Prisma:** Modern ORM for type-safe database interactions.

## License
MIT
