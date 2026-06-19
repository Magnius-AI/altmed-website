import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getServerApiUrl } from "@/lib/server-api-url";

const API_URL = getServerApiUrl();

export async function GET() {
  const accessToken = cookies().get("altmed_admin_access_token")?.value;

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const response = await fetch(`${API_URL}/api/contact/export`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    cache: "no-store"
  });

  const csv = await response.text();

  return new NextResponse(csv, {
    status: response.status,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="altmed-contact-submissions.csv"'
    }
  });
}
