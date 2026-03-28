// app/api/search/route.ts
import { NextResponse } from "next/server";
import { searchImages } from "@/lib/search";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  try {
    const results = await searchImages(query, page);
    
    // Save history if logged in
    const session = await getServerSession(authOptions);
    if (session?.user && (session.user as any).id) {
      await prisma.searchHistory.create({
        data: {
          userId: (session.user as any).id,
          query: query,
        }
      });
    }

    return NextResponse.json({ query, page, results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
