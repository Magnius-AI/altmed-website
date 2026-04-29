import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.BACKEND_URL_INTERNAL ??
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const path = params.slug.join("/");
  const response = await fetch(`${API_URL}/uploads/${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return new NextResponse("Not found", { status: response.status });
  }

  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
