import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, method, headers = {}, body } = await req.json();

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: method !== "GET" && method !== "HEAD" ? body : undefined,
    };

    const response = await fetch(url, fetchOptions);

    const resBody = await response.text();
    const resHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      resHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
      body: resBody,
    });
  } catch (error: any) {
    console.error("Server request error:", error);
    return NextResponse.json(
      { error: "Request failed", details: error.message },
      { status: 500 }
    );
  }
}
