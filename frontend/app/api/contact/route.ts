import { NextRequest, NextResponse } from "next/server";
import { getServerApiUrl } from "@/lib/server-api-url";

const API_URL = getServerApiUrl();

function getErrorMessage(payload: unknown) {
  if (!payload) {
    return "Contact request failed";
  }

  if (typeof payload === "string") {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const record = payload as { message?: unknown; error?: unknown };
    const message = record.message ?? record.error;
    if (Array.isArray(message)) {
      return message.join("; ");
    }
    if (typeof message === "string") {
      return message;
    }
  }

  return "Contact request failed";
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headers = new Headers({ "Content-Type": "application/json" });
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    headers.set("x-forwarded-for", forwardedFor);
  }
  if (realIp) {
    headers.set("x-real-ip", realIp);
  }

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers,
      body,
      cache: "no-store"
    });
    const payload = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      return NextResponse.json({ message: getErrorMessage(payload) }, { status: response.status });
    }

    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "The contact form is temporarily unavailable. Please call (703) 361-4357." },
      { status: 503 }
    );
  }
}
