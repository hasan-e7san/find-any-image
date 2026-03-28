import { withAuth } from "next-auth/middleware";

export default withAuth();

export const config = {
  matcher: ["/account", "/favorites", "/api/favorites/:path*", "/api/history/:path*"],
};
