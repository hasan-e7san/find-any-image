import type { NextFetchEvent } from "next/server";
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";

const authProxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export function proxy(request: NextRequestWithAuth, event: NextFetchEvent) {
  return authProxy(request, event);
}

export const config = {
  matcher: ["/account", "/favorites", "/api/favorites/:path*", "/api/history/:path*"],
};
