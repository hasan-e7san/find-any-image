// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/account", "/favorites", "/api/favorites/:path*", "/api/history/:path*"],
};
