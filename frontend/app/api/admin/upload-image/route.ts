import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.BACKEND_URL_INTERNAL ??
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

function formatError(value: unknown) {
  if (!value) {
    return "Image upload failed";
  }

  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as { message?: unknown; error?: unknown };
    return formatError(record.message ?? record.error ?? JSON.stringify(value));
  }

  return String(value);
}

export async function POST(request: NextRequest) {
  const accessToken = cookies().get("altmed_admin_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const uploadFormData = new FormData();
  uploadFormData.append("file", file);

  const response = await fetch(`${API_URL}/api/uploads/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: uploadFormData,
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return NextResponse.json({ message: formatError(payload) }, { status: response.status });
  }

  return NextResponse.json(payload);
}
